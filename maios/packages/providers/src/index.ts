/**
 * @maios/providers — provider interfaces and capability types (plan §9).
 * These contracts are the mechanism that prevents another GHL-style lock-in.
 * Required families (§9.1): CRMProvider, TelephonyProvider, MessagingProvider,
 * AssetStorageProvider, VectorProvider, ModelProvider, TaskProvider,
 * NotificationProvider, AdPlatformProvider, IdentityProvider.
 */
export * from './context.js';
export * from './errors.js';
export * from './crm.js';
export * from './telephony.js';
export * from './messaging.js';
export * from './assets.js';
