import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Console } from '@yowari/xremote';
import { withAuthUser } from '../../hoc/withAuthUser';
import { useClientContext } from '../../providers/client-provider';
import ConsoleCard from '../../components/ConsoleCard';

function Home(): JSX.Element {
  const client = useClientContext();
  const navigate = useNavigate();
  const [consoles, setConsoles] = useState<Console[]>([]);
  const [loadingConsoles, setLoadingConsoles] = useState<boolean>(false);
  const [loadingStream, setLoadingStream] = useState<boolean>(false);

  useEffect(() => {
    const fetchConsoles = async () => {
      setLoadingConsoles(true);
      const response = await client.getConsoles();
      setConsoles(response.results);
      setLoadingConsoles(false);
    };

    fetchConsoles();
  }, [client]);

  const handleStartStream = async (console: Console) => {
    setLoadingStream(true);
    const session = await client.createSession(console.serverId);
    setLoadingStream(false);
    navigate(`/sessions/${session.sessionId}`);
  };

  return (
    <>
      <h1 id="consoles-heading">Consoles</h1>
      <ul className="list-unstyled row" aria-labelledby="consoles-heading">
        {loadingConsoles
          ? <div className="col text-center">
              <div className="spinner-border spinner-border-sm" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          : consoles.length > 0
            ? consoles.map((console) =>
                <li key={console.serverId} className="col col-md-6">
                  <ConsoleCard console={console} onStartStream={handleStartStream} loading={loadingStream} />
                </li>
              )
            : <div className="text-center text-muted" data-testid="home-emptyConsoleList">
                <p className="fs-1 m-0"><i className="bi bi-exclamation-octagon"></i></p>
                <p className="fs-4">No console found</p>
              </div>
        }
      </ul>
    </>
  );
}

export default withAuthUser(Home);
