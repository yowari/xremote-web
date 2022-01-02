import React, { ComponentType } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useClientContext } from '../providers/client-provider';

export const withAnonymousUser = <P extends object>(Component: ComponentType<P>) => (props: P) => {
  const client = useClientContext();
  const location = useLocation();
  const redirect = '/';

  return !!client.gstoken
    ? <Navigate to={redirect} state={{ from: location }} />
    : <Component {...props} />;
}
