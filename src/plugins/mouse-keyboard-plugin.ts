import { PlayerPlugin, PlayerPluginContext } from './plugin';

export class MouseKeyboardPlugin implements PlayerPlugin {
  onInit(context: PlayerPluginContext): void {
    throw new Error('Method not implemented.');
  }
  startEventCapture(): void {
    throw new Error('Method not implemented.');
  }
  stopEventCapture(): void {
    throw new Error('Method not implemented.');
  }
}
