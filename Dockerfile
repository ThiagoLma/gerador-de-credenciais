# Multi-stage Dockerfile otimizado para Next.js Standalone
# Etapa 1: Imagem base Node Alpine
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Etapa 2: Instalação de dependências
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# Etapa 3: Build da aplicação
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desabilita telemetria durante o build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# Etapa 4: Runner leve em produção (< 150MB)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Cria usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copia arquivos estáticos públicos
COPY --from=builder /app/public ./public

# Configura permissões para o cache do Next.js
RUN mkdir .next && chown nextjs:nodejs .next

# Copia o build standalone gerado
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
