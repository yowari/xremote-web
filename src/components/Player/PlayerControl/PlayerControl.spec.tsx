import { fireEvent, render, screen } from '@testing-library/react';
import PlayerControl from './PlayerControl';
import userEvent from '@testing-library/user-event';

describe('PlayerControl', () => {
  it.each([
    [false, 'bi-fullscreen'],
    [true, 'bi-fullscreen-exit']
  ])('should when isFullscreen is %s render %s', (isFullscreen, icon) => {
    render(<PlayerControl isFullscreen={isFullscreen} />);

    const fullscreenButton = screen.getByRole('button', { name: /fullscreen/i });
    const iconElem = fullscreenButton.querySelector('i');
    expect(iconElem?.classList).toContain(icon);
  });
  it('should should call onMouseOver when mouse is over the component', async () => {
    const handleMouseOverMock = jest.fn();

    render(<PlayerControl onMouseOver={handleMouseOverMock} />);
    await userEvent.hover(screen.getByTestId('playerControl-container'));

    expect(handleMouseOverMock).toHaveBeenCalled();
  });
  it('should should call onMouseLeave when mouse leaves the component', () => {
    const handleMouseLeaveMock = jest.fn();

    render(<PlayerControl onMouseLeave={handleMouseLeaveMock} />);
    fireEvent.mouseLeave(screen.getByTestId('playerControl-container'));

    expect(handleMouseLeaveMock).toHaveBeenCalled();
  });
  it('should should call onFullscreen when clicking fullscreen button', async () => {
    const handleFullscreenMock = jest.fn();

    render(<PlayerControl onFullscreen={handleFullscreenMock} />);
    const fullscreenButton = screen.getByRole('button', { name: /fullscreen/i });
    await userEvent.click(fullscreenButton);

    expect(handleFullscreenMock).toHaveBeenCalled();
  });
});
