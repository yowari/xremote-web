import { Navigate, useLocation } from 'react-router-dom';
import { useClientContext } from '../providers/client-provider';

export const withAuthUser = <P extends object>(Component: React.ComponentType<P>) => (props: P) => {
  const client = useClientContext();
  const location = useLocation();
  const redirect = '/login';

  return !!client.gstoken
    ? <Component {...props} />
    : <Navigate to={redirect} state={{ from: location }} />;
}
