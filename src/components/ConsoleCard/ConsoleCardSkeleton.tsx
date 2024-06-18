import { DefaultXbox } from "./XboxIcons";
import classes from './ConsoleCard.module.css';

export default function ConsoleCardSkeleton() {
  return (
    <div className="card" aria-hidden="true">
      <div className="card-body">
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-6"></span>
        </h5>
        <h6 className="card-subtitle mb-2 text-body-secondary placeholder-glow">
          <span className="placeholder col-7"></span>
        </h6>

        <div className="text-center text-muted py-4">
          <DefaultXbox className={classes.consoleIcon} />
        </div>

        <div className="d-grid">
          <button className="btn btn-success placeholder" type="submit" disabled></button>
        </div>
      </div>
    </div>
  );
}
