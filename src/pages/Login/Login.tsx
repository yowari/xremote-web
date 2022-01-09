import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { withAnonymousUser } from '../../hoc/withAnonymousUser';
import { useAuthContext } from '../../providers/auth-provider';

function Login(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const oauthToken = formData.get('oauthToken') as string;

    setLoading(true);
    try {
      await login(oauthToken);
      navigate(from, { replace: true });
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return (
    <>
      <a href="https://github.com/yowari/xremote-web" target="_blank" rel="noreferrer" style={{ position: 'absolute', top: 0, right: 0 }}>
        <img
         loading="lazy"
         width="149"
         height="149"
         src="https://github.blog/wp-content/uploads/2008/12/forkme_right_gray_6d6d6d.png?resize=149%2C149"
         className="attachment-full size-full"
         alt="Fork me on GitHub"
         data-recalc-dims="1"
        />
      </a>
      <main className="d-flex align-items-center h-100">
        <form className="m-auto p-4 w-100" style={{ maxWidth: '330px' }} onSubmit={handleSubmit} aria-label="Login">
          <div className="text-center mb-4">
            <img className="mb-4" src="/images/xbox-logo.png" alt="Xbox Logo" />
            <h1 className="h3 fw-normal">Please authenticate</h1>
          </div>

          <div className="form-floating mb-3">
            <input
             type="password"
             className="form-control"
             id="oauthToken"
             name="oauthToken"
             aria-describedby="oauthTokenHelp"
             disabled={loading}
             required
             autoFocus
            />
            <label htmlFor="oauthToken">OAuth Token</label>
            <div id="oauthTokenHelp" className="form-text">
              Make sure you are logged in the <a href="https://account.xbox.com/account/signin?returnUrl=https%3A%2F%2Fwww.xbox.com%2Fen-US%2Fplay&ru=https%3A%2F%2Fwww.xbox.com%2Fen-US%2Fplay" target="blank">Xbox website</a>{' '}
              for valid streaming token.
            </div>
            <div className="form-text">
              Read the <a href="https://github.com/yowari/xremote-js/wiki/Authentication" target="blank">wiki page</a>{' '}
              for a step by step guide.
            </div>
          </div>

          <button type="submit" className="btn btn-lg btn-primary w-100" disabled={loading}>Submit</button>
        </form>
      </main>
    </>
  );
}

export default withAnonymousUser(Login);
