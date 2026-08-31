import { Controller, Get } from '@nestjs/common';

@Controller('admin/system')
export class HealthController {
  /** GET /v1/admin/system/health (plan §7.6) — no secret exposure (OPS-006). */
  @Get('health')
  health() {
    return {
      status: 'ok',
      service: 'maios-api',
      version: process.env.RELEASE_VERSION ?? 'dev',
      time: new Date().toISOString(),
    };
  }
}
