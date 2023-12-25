import { Suspense, useState } from 'react';
import { type ActionFunctionArgs, useLoaderData, redirect, Await, defer } from 'react-router-dom';
import type { List, Console } from '@yowari/xremote';
import ConsoleCard from '../../components/ConsoleCard';
import { invariant } from '../../utils/invariant';
import { createClient } from '../../utils/client';
import { requireAuth } from '../../utils/auth-guard';

type LoaderData = {
  consoles: Promise<List<Console>>;
};

export async function loader() {
  requireAuth();

  const client = createClient();

  return defer({
    consoles: client.getConsoles(),
  });
}

export async function action({ request }: ActionFunctionArgs) {
  requireAuth();

  const formData = await request.formData();
  const serverId = formData.get('serverId');
  invariant(typeof serverId === 'string', 'serverId is required');

  const client = createClient();
  const session = await client.createSession(serverId);

  return redirect(`/sessions/${session.sessionId}`);
}

export default function Home() {
  const { consoles } = useLoaderData() as LoaderData;
  const [loadingStream] = useState<boolean>(false);

  return (
    <>
      <h1 id="consoles-heading">Consoles</h1>
      <Suspense fallback={<LoadingConsoles />}>
        <Await resolve={consoles}>
          {(resolvedConsoles) => (
            resolvedConsoles.results.length > 0
              ? (
                  <ul className="list-unstyled row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4" aria-labelledby="consoles-heading">
                    {resolvedConsoles.results.map((console: Console) => (
                      <li key={console.serverId} className="col mb-3">
                        <ConsoleCard console={console} loading={loadingStream} />
                      </li>
                    ))}
                  </ul>
                )
              : <NoConsole />
          )}
        </Await>
      </Suspense>
    </>
  );
}

function LoadingConsoles() {
  return (
    <div className="col text-center">
      <div className="spinner-border spinner-border-sm" style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

function NoConsole() {
  return (
    <div className="text-center text-muted" data-testid="home-emptyConsoleList">
      <p className="fs-1 m-0"><i className="bi bi-exclamation-octagon"></i></p>
      <p className="fs-4">No console found</p>
    </div>
  );
}
