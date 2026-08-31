import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

/**
 * Modular monolith with strong module boundaries (plan §3):
 * tenancy/auth → crm → tracking/attribution → providers (close) → communications →
 * agents → assets → admin/system-health. Add modules per work-package order (§17).
 */
@Module({ controllers: [HealthController] })
export class AppModule {}
