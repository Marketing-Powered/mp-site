/**
 * MAIOS domain API (plan §3.1, §7.6).
 * Owns domain validation, authorization, transactions, provider adapters, REST
 * endpoints, WebSocket/SSE, and OpenAPI generation. Every request carries
 * correlation_id, tenant context, authenticated actor, and an idempotency key
 * where a write may be retried (§3.4).
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
