import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  it('should render application title', () => {
    const router = createMemoryRouter([
      {
        path: '/',
        element: <Header />,
      }
    ]);

    render(<RouterProvider router={router} />);

    expect(screen.getByRole('link', { name: /xremote home/i })).toHaveTextContent(/XRemote/i);
  });

  it('should call onOpenHelp when clicking on help button', async () => {
    const spyOpenHelpMock = vi.fn();

    const router = createMemoryRouter([
      {
        path: '/',
        element: <Header onOpenHelp={spyOpenHelpMock} />,
      }
    ]);

    render(<RouterProvider router={router} />);

    const helpButton = screen.getByRole('button', { name: /help/i });
    await userEvent.click(helpButton);

    expect(spyOpenHelpMock).toHaveBeenCalled();
  });
});
