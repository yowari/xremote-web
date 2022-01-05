import React, { ComponentType } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../providers/auth-provider';

export const withAnonymousUser = <P extends object>(Component: ComponentType<P>) => (props: P) => {
  const { isAuth } = useAuthContext();
  const location = useLocation();
  const redirect = '/';

  return isAuth
    ? <Navigate to={redirect} state={{ from: location }} />
    : <Component {...props} />;
}
