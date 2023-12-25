import { Client } from "@yowari/xremote";

export function createClient() {
  const client = new Client();

  const gstoken = localStorage.getItem('gstoken');
  if (typeof gstoken === 'string') {
    client.gstoken = gstoken;
  }

  return client;
}
