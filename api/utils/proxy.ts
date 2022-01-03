import { Context } from '@azure/functions';
import https, { RequestOptions } from 'https';

export const proxy = (host: string) => async (context: Context): Promise<any> => {
  const body = context.req.body ? new TextEncoder().encode(JSON.stringify(context.req.body)) : null;

  const headers = {
    'Content-Type': 'application/json',
  };
  if (context.req?.headers['authorization']) {
    headers['authorization'] = context.req?.headers['authorization'];
  }

  const options: RequestOptions = {
    host: host,
    port: 443,
    path: `/${context.req.params.path}`,
    method: context.req?.method,
    headers: headers,
  };

  context.log('proxy request ', options);

  const request = () => {
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let out = '';

        res.on('data', (data) => {
          out += data;
        });

        res.on('end', () => {
          const headers = { ...res.headers };
          delete headers['content-length'];
          resolve({
            status: res.statusCode,
            headers: headers,
            body: out ? JSON.parse(out) : out
          });
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      if (body) {
        req.write(body);
      }
      req.end();
    });
  };

  const response = await request();

  context.log('proxy response ', response);

  return response;
};
