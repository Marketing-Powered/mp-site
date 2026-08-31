# NestJS domain API — monorepo build via pnpm
FROM node:22-slim AS build
RUN corepack enable
WORKDIR /repo
COPY pnpm-workspace.yaml package.json tsconfig.base.json ./
COPY packages ./packages
COPY apps/api ./apps/api
RUN pnpm install --frozen-lockfile || pnpm install
RUN pnpm --filter @maios/api... build

FROM node:22-slim
RUN corepack enable
ENV NODE_ENV=production
WORKDIR /repo
COPY --from=build /repo ./
EXPOSE 4000
USER node
CMD ["node", "apps/api/dist/main.js"]
