import React from 'react';
import { render, screen } from '@testing-library/react';
import Toast from './Toast';
import userEvent from '@testing-library/user-event';

describe('Toast', () => {
  const title = 'Toast title';
  const content = 'Toast content example';
  it('should render toast correctly', () => {
    render(<Toast title={title} content={content} />);

    expect(screen.getByTestId('toast-title')).toHaveTextContent(title);
    expect(screen.getByTestId('toast-content')).toHaveTextContent(content);
  });
  it('should call onClose when click on the cross', () => {
    const handleCloseMock = jest.fn();

    render(<Toast title={title} content={content} onClose={handleCloseMock} />);
    const crossButton = screen.getByRole('button', { name: /close/i });
    userEvent.click(crossButton);

    expect(handleCloseMock).toHaveBeenCalled();
  });
});
