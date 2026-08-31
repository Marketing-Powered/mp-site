# First-party tracking ingestion service
FROM node:22-slim AS build
RUN corepack enable
WORKDIR /repo
COPY pnpm-workspace.yaml package.json tsconfig.base.json ./
COPY packages ./packages
COPY apps/tracking ./apps/tracking
RUN pnpm install --frozen-lockfile || pnpm install
RUN pnpm --filter @maios/tracking... build

FROM node:22-slim
ENV NODE_ENV=production
WORKDIR /repo
COPY --from=build /repo ./
EXPOSE 4100
USER node
CMD ["node", "apps/tracking/dist/index.js"]
