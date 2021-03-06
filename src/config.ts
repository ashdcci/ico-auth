import * as dotenv from 'dotenv';

dotenv.config();

const {
  REDIS_URL,
  REDIS_PASSWORD,
  REDIS_PAGE_LENGTH,
  PORT,
  HTTPS_PORT,
  HTTPS_SERVER,
  FORCE_HTTPS,
  THROTTLER_WHITE_LIST,
  THROTTLER_INTERVAL,
  THROTTLER_MAX,
  THROTTLER_MIN_DIFF,
  JWT_KEY_EXP,
  JWT_KEY,
  TENANT_WHITE_LIST,
  MAINTAIN_TLS_PORT,
  MAINTAIN_TLS_PEM,
  MAINTAIN_TLS_CA,
  MAINTAIN_TLS_CA_CN
} = process.env;

export default {
  app: {
    port: parseInt(PORT, 10) || 3000,
    httpsPort: parseInt(HTTPS_PORT, 10) || 4000,
    httpsServer: HTTPS_SERVER || 'disabled',
    forceHttps: FORCE_HTTPS || 'disabled'
  },
  jwt: {
    algorithm: 'HS256',
    secretSeparator: ':',
    expiration: parseInt(JWT_KEY_EXP, 10) || 604800,
    secret: JWT_KEY || 'uZrJ!xe*xN?!;oU.u*;QOSM+|=4C?WH?6eWPcK/6AkIXIVGQguSA*r'
  },
  redis: {
    url: REDIS_URL || 'redis://redis:6379',
    prefix: 'auth_',
    pageLength: parseInt(REDIS_PAGE_LENGTH, 10) || 100
  },
  throttler: {
    prefix: 'request_throttler_',
    interval: THROTTLER_INTERVAL || 1000, // time window in milliseconds
    maxInInterval: THROTTLER_MAX || 5, // max number of allowed requests from 1 IP in "interval" time window
    minDifference: THROTTLER_MIN_DIFF || 0, // optional, minimum time between 2 requests from 1 IP
    whiteList: THROTTLER_WHITE_LIST ? THROTTLER_WHITE_LIST.split(',') : [] // requests from these IPs won't be throttled
  },
  tenant: {
    whitelist: TENANT_WHITE_LIST ? TENANT_WHITE_LIST.split(',') : [],
    maintainTlsPort: parseInt(MAINTAIN_TLS_PORT, 10) || 6000,
    maintainTlsPem: MAINTAIN_TLS_PEM || '',
    maintainTlsCa: MAINTAIN_TLS_CA || '',
    maintainTlsCaCn: MAINTAIN_TLS_CA_CN || 'Auth Maintain'
  }
};
