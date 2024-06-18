import { Form, Link } from 'react-router-dom';

export interface HeaderProps {
  onOpenHelp?: () => void;
}

function Header({ onOpenHelp }: HeaderProps): JSX.Element {
  return (
    <nav className="navbar bg-body border-bottom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" aria-label="XRemote Home"><i className="bi bi-xbox"></i> XRemote</Link>
        <ul className="flex flex-row navbar-nav ms-auto" aria-label="App actions">
          <li className="nav-item">
            <button className="nav-link p-2" onClick={onOpenHelp} title="Help" aria-label="Help"><i className="bi bi-question-circle"></i></button>
          </li>
        </ul>
        <Form method="POST" action='/logout'>
          <button className="btn btn-outline-secondary rounded-pill ms-3">
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </Form>
      </div>
    </nav>
  );
}

export default Header;
