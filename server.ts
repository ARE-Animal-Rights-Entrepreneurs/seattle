import { graphql, nhost } from "./lib/nhost";

const server = Bun.serve({
  port: process.env.PORT || 3001,

  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    // API routes
    if (pathname.startsWith("/api/")) {
      return handleApi(req, pathname);
    }

    // Static file serving
    return serveStatic(pathname);
  },
});

async function handleApi(_req: Request, pathname: string): Promise<Response> {
  // GET /api/health
  if (pathname === "/api/health") {
    return Response.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      nhost: { region: nhost.region, subdomain: nhost.subdomain },
    });
  }

  // GET /api/impact
  if (pathname === "/api/impact") {
    type MetricsResponse = {
      latest_project_metrics_aggregate: {
        aggregate: {
          sum: {
            total_views: number | null;
          };
        };
      };
    };

    const result = await graphql<MetricsResponse>(
      `query GetImpactMetrics {
        latest_project_metrics_aggregate {
          aggregate {
            sum {
              total_views
            }
          }
        }
      }`,
      { useAdminSecret: true }
    );

    const totalViews =
      result.data?.latest_project_metrics_aggregate?.aggregate?.sum?.total_views ?? 200000;

    return Response.json({
      metrics: {
        dollarsRaised: 3800,
        peopleReached: totalViews,
      },
    });
  }

  // GET /api/projects
  if (pathname === "/api/projects") {
    type ProjectsResponse = {
      projects: Array<{
        project_handle: string;
        project_name: string | null;
        project_website: string | null;
        project_description: string | null;
      }>;
    };

    const result = await graphql<ProjectsResponse>(
      `query GetProjects {
        projects(order_by: { project_handle: asc }) {
          project_handle
          project_name
          project_website
          project_description
        }
      }`,
      { useAdminSecret: true }
    );

    if (result.errors && result.errors.length > 0) {
      return Response.json({ error: result.errors[0]?.message }, { status: 500 });
    }

    return Response.json({ projects: result.data?.projects ?? [] });
  }

  // GET /api/graphql-test
  if (pathname === "/api/graphql-test") {
    const result = await graphql(
      `query { __typename }`,
      { useAdminSecret: true }
    );
    return Response.json(result);
  }

  return Response.json({ error: "Not found" }, { status: 404 });
}

async function serveStatic(pathname: string): Promise<Response> {
  // Default to index.html for root
  let filePath = pathname === "/" ? "/index.html" : pathname;

  const file = Bun.file("." + filePath);

  if (await file.exists()) {
    return new Response(file);
  }

  // Fallback to index.html for SPA-style routing (optional)
  const indexFile = Bun.file("./index.html");
  if (await indexFile.exists()) {
    return new Response(indexFile);
  }

  return new Response("Not found", { status: 404 });
}

console.log(`Server running at http://localhost:${server.port}`);
