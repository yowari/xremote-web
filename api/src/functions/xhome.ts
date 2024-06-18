import { app } from '@azure/functions';
import { proxy } from '../utils/proxy';

export const httpTrigger = proxy(
  'https://uks.core.gssv-play-prodxhome.xboxlive.com'
);

app.http('xhome', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: httpTrigger,
  route: 'proxy/xhome/{*path}',
});
