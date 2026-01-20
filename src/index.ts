import { Hono } from "hono";
import { graphql, nhost } from "../lib/nhost";

const app = new Hono().basePath("/api");

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    nhost: { region: nhost.region, subdomain: nhost.subdomain },
  });
});

app.get("/impact", async (c) => {
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

  return c.json({
    metrics: {
      dollarsRaised: 3800,
      peopleReached: totalViews,
    },
  });
});

app.get("/projects", async (c) => {
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
    return c.json({ error: result.errors[0]?.message }, 500);
  }

  return c.json({ projects: result.data?.projects ?? [] });
});

app.get("/graphql-test", async (c) => {
  const result = await graphql(`query { __typename }`, { useAdminSecret: true });
  return c.json(result);
});

export default app;
