# ARE Seattle

A mostly static web application for Animal Rights Entrepreneurs Seattle chapter, featuring a landing page, metrics tracking system, and Discord bot integration.

## Tech Stack

### Runtime & Server
- **[Bun](https://bun.sh/)** - JavaScript runtime, package manager, and bundler
- **TypeScript** - Type-safe JavaScript with strict mode enabled

### Backend & Database
- **[Nhost](https://nhost.io/)** - Backend-as-a-Service platform providing:
  - **PostgreSQL** - Primary database
  - **Hasura** - GraphQL API layer with real-time subscriptions
  - **Auth** - Authentication service
  - **Storage** - S3-compatible file storage (MinIO)
  - **Functions** - Serverless functions

### Frontend
- **HTML/CSS/JS** - Static landing page with no build step required
- **Responsive design** - CSS Grid and Flexbox

### Integrations
- **Discord.js** - Bot for serving community statistics via slash commands

## Project Structure

```
are-seattle/
├── index.html              # Landing page
├── styles.css              # Landing page styles
├── impact-animation.js     # Client-side animations
├── server.ts               # Bun web server
├── lib/
│   └── nhost.ts            # Nhost GraphQL client
├── functions/              # Nhost serverless functions
├── nhost/
│   ├── nhost.toml          # Nhost configuration
│   ├── migrations/         # Database migrations
│   ├── metadata/           # Hasura metadata
│   └── seeds/              # Database seeds
└── docs/
    └── plans/              # Design documents
```

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) installed
- [Nhost CLI](https://docs.nhost.io/development/cli) for local development
- Docker (for running local Nhost stack)

### Installation

```bash
# Install dependencies
bun install

# Copy environment variables
cp .env.example .env
# Edit .env with your Nhost and Discord credentials
```

### Local Development

```bash
# Start the Nhost local development stack
nhost up

# Run the server with hot reloading
bun --hot run server.ts
```

The server runs on `http://localhost:3001` by default.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `NHOST_SUBDOMAIN` | Your Nhost project subdomain |
| `NHOST_REGION` | Nhost region (e.g., `us-west-2`) |
| `NHOST_GRAPHQL_SECRET` | Hasura admin secret |
| `DISCORD_TOKEN` | Discord bot token |
| `DISCORD_CLIENT_ID` | Discord application client ID |
| `PORT` | Server port (default: 3001) |

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /` | Landing page |
| `GET /api/health` | Health check |
| `GET /api/impact` | Impact metrics |
| `GET /api/graphql-test` | GraphQL connectivity test |

## Database Schema

The metrics system tracks social media analytics across multiple platforms:

- **projects** - ARE Seattle initiatives and their metadata
- **account_snapshots** - Per-platform metrics (followers, views, likes, etc.)
- **project_snapshots** - Aggregated project-level metrics

## Deployment

The backend is hosted on **Nhost**, which provides managed PostgreSQL, Hasura GraphQL, authentication, and serverless functions. The Bun server handles HTTP requests and serves the landing page.

## Customization

### Colors
Edit CSS variables in `styles.css` to change the color scheme:
```css
:root {
    --primary-color: #2d5a3d;  /* Main green */
    --accent-color: #f4a261;   /* Orange accent */
}
```

### Content
All landing page content is in `index.html`. Edit the text in each section to customize.

## License

Private - ARE Seattle
