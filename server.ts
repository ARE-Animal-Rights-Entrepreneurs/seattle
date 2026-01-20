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
    return Response.json({
      metrics: {
        dollarsRaised: 3800,
        peopleReached: 121000,
      },
    });
  }

  // Example: GraphQL query to nhost (with admin secret)
  // GET /api/graphql-test
  if (pathname === "/api/graphql-test") {
    const result = await graphql(
      `query { __typename }`,
      { useAdminSecret: true }
    );
    return Response.json(result);
  }

  // Add more API routes here...

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
