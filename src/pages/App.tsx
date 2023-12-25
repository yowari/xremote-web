import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Login from './Login';
import Session from './Session';
import withErrorCatch from '../hoc/withErrorCatch';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sessions/:sessionId" element={<Session />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default withErrorCatch(App);
