import { Link } from 'react-router-dom';

export interface HeaderProps {
  onLogout?: () => void;
  onOpenHelp?: () => void;
}

function Header({ onLogout, onOpenHelp }: HeaderProps): JSX.Element {
  return (
    <nav className="navbar navbar-light bg-white border-bottom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" aria-label="XRemote Home"><i className="bi bi-xbox"></i> XRemote</Link>
        <ul className="flex flex-row navbar-nav ms-auto">
          <li className="nav-item">
            <button className="nav-link p-2" onClick={onOpenHelp} title="Help" aria-label="Help"><i className="bi bi-question-circle"></i></button>
          </li>
        </ul>
        <button className="btn btn-outline-success ms-3" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Header;
