import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  it('should render application title', () => {
    render(<Header />, { wrapper: MemoryRouter });
    expect(screen.getByRole('link', { name: /xremote home/i })).toHaveTextContent(/XRemote/i);
  });
  it('should call onOpenHelp when clicking on help button', async () => {
    const handleOpenHelpMock = jest.fn();

    render(<Header onOpenHelp={handleOpenHelpMock} />, { wrapper: MemoryRouter });

    const helpButton = screen.getByRole('button', { name: /help/i });
    await userEvent.click(helpButton);

    expect(handleOpenHelpMock).toHaveBeenCalled();
  });

  it('should call onLogout when clicking on logout button', async () => {
    const handleLogoutMock = jest.fn();

    render(<Header onLogout={handleLogoutMock} />, { wrapper: MemoryRouter });

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    await userEvent.click(logoutButton);

    expect(handleLogoutMock).toHaveBeenCalled();
  });
});
