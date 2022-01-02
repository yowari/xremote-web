import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About', () => {
  it('should render app name and app version', () => {
    const appName = 'Application Test';
    const appVersion='1.0.0';

    render(<About appName={appName} appVersion={appVersion} />);

    expect(screen.getByText(appName)).toBeInTheDocument();
    expect(screen.getByText(appVersion)).toBeInTheDocument();
  });
});
