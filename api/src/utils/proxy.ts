import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';

export const proxy =
  (host: string) =>
  async (
    request: HttpRequest,
    context: InvocationContext
  ): Promise<HttpResponseInit> => {
    const requestText = await request.text();

    const body =
      requestText && request.headers.get('Content-Type') === 'application/json'
        ? JSON.parse(requestText)
        : null;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    const authorization = request.headers.get('xremote-authorization');
    if (authorization) {
      headers['authorization'] = authorization;
    }

    const requestProxy = new Request(`${host}/${request.params.path}`, {
      method: request.method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });
    context.log(`[${requestProxy.method}] ${requestProxy.url}`);

    const responseProxy = await fetch(requestProxy);

    return {
      body:
        requestProxy.headers.get('Content-Type') === 'application/json'
          ? await responseProxy.text()
          : null,
      status: responseProxy.status,
      headers: Object.fromEntries(responseProxy.headers.entries()),
    };
  };
