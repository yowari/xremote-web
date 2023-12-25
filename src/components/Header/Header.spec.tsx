import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('About', () => {
  it('should render application title', () => {
    render(<Header />, { wrapper: MemoryRouter });
    expect(screen.getByRole('link', { name: 'XRemote Home' })).toHaveTextContent(/XRemote/i);
  });
  it('should call onOpenHelp when clicking on help button', () => {
    const handleOpenHelpMock = jest.fn();

    render(<Header onOpenHelp={handleOpenHelpMock} />, { wrapper: MemoryRouter });

    const helpButton = screen.getByRole('link', { name: 'Help' });
    userEvent.click(helpButton);

    expect(handleOpenHelpMock).toHaveBeenCalled();
  });

  it('should call onLogout when clicking on logout button', () => {
    const handleLogoutMock = jest.fn();

    render(<Header onLogout={handleLogoutMock} />, { wrapper: MemoryRouter });

    const logoutButton = screen.getByRole('button', { name: /Logout/i });
    userEvent.click(logoutButton);

    expect(handleLogoutMock).toHaveBeenCalled();
  });
});
