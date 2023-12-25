import { Form } from 'react-router-dom';
import type { Console } from '@yowari/xremote';
import clsx from 'clsx';
import {
  XboxOne,
  XboxOneS,
  XboxOneSDigital,
  XboxOneX,
  XboxSeriesS,
  XboxSeriesX,
  DefaultXbox,
} from './XboxIcons';
import classes from './ConsoleCard.module.css';

const CONSOLE_ICONS = {
  XboxOne,
  XboxOneS,
  XboxOneSDigital,
  XboxOneX,
  XboxSeriesS,
  XboxSeriesX,
  DefaultXbox,
};

const STATE_ICONS = {
  Unknown: 'bi-question-circle',
  ConnectedStandby: 'bi-moon',
  On: 'bi-check-circle',
  Off: 'bi-power',
  SystemUpdate: 'bi-exclamation-triangle',
};

const STATE_TEXT = {
  Unknown: 'Unknown',
  ConnectedStandby: 'Standby',
  On: 'On',
  Off: 'Off',
  SystemUpdate: 'System Update',
};

export interface ConsoleCardProps {
  console: Console;
  loading?: boolean;
}

function ConsoleCard({ console, loading }: ConsoleCardProps) {
  const ConsoleIcon = CONSOLE_ICONS[console.consoleType as keyof typeof CONSOLE_ICONS] ?? DefaultXbox;
  const stateColor = STATE_ICONS[console.powerState as keyof typeof STATE_ICONS] ?? STATE_ICONS['Unknown'];
  const stateText = STATE_TEXT[console.powerState as keyof typeof STATE_TEXT] ?? STATE_TEXT['Unknown'];

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{console.deviceName}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          <i className={clsx(stateColor, 'bi')}></i> {stateText}
        </h6>

        <div className="text-center py-4">
          <ConsoleIcon className={classes.consoleIcon} />
        </div>

        <Form className="d-grid" method="POST">
          <input type="hidden" name="serverId" value={console.serverId} />
          <button className="btn btn-success" type="submit" disabled={loading}>
            <i className="bi bi-play-fill"></i> Start Stream
          </button>
        </Form>
      </div>
    </div>
  );
}

export default ConsoleCard;
