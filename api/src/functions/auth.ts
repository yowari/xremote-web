import { app } from '@azure/functions';
import { proxy } from '../utils/proxy';

export const httpTrigger = proxy('https://xhome.gssv-play-prod.xboxlive.com');

app.http('auth', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: httpTrigger,
  route: 'proxy/auth/{*path}',
});
