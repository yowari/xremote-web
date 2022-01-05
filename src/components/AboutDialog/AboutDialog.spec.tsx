import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutDialog from './AboutDialog';

describe('AboutDialog', () => {
  it('should render app name and app version', () => {
    const appName = 'Application Test';
    const appVersion='1.0.0';

    render(<AboutDialog appName={appName} appVersion={appVersion} />);

    expect(screen.getByText(appName)).toBeInTheDocument();
    expect(screen.getByText(appVersion)).toBeInTheDocument();
  });
});
