# First we want to build on an image the includes the environment we need to build and run our code, we can use 'node:16-alpine':
FROM node:alpine AS deps

# Now set the working directory to /app:
RUN apk add --no-cache libc6-compat
WORKDIR /app


FROM node:alpine AS builder
WORKDIR /app
COPY . .
RUN yarn build


FROM node:alpine AS runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001


COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/.pnp.cjs ./.pnp.cjs
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]
