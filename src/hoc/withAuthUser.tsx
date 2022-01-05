import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../providers/auth-provider';

export const withAuthUser = <P extends object>(Component: React.ComponentType<P>) => (props: P) => {
  const { isAuth } = useAuthContext();
  const location = useLocation();
  const redirect = '/login';

  return isAuth
    ? <Component {...props} />
    : <Navigate to={redirect} state={{ from: location }} />;
}
