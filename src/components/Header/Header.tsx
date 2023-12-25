import { Link } from 'react-router-dom';

export interface HeaderProps {
  onLogout?: () => void;
  onOpenHelp?: () => void;
}

function Header({ onLogout, onOpenHelp }: HeaderProps): JSX.Element {
  const handleOpenHelp = (event: any) => {
    event.preventDefault();
    onOpenHelp?.();
  };

  return (
    <nav className="navbar navbar-light bg-white border-bottom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" title="XRemote Home"><i className="bi bi-xbox"></i> XRemote</Link>
        <ul className="flex flex-row navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link p-2" href="/#" onClick={handleOpenHelp} title="Help"><i className="bi bi-question-circle"></i></a>
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
