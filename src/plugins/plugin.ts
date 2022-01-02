import { Client } from '@yowari/xremote';

export interface PlayerPluginContext {
  videoElement: HTMLVideoElement;
  client: Client;
}

export interface PlayerPlugin {
  onInit(context: PlayerPluginContext): void;
  startEventCapture(): void;
  stopEventCapture(): void;
}
