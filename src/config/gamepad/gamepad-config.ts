import { Buttons, GamepadFrame } from '@yowari/xremote';
import defaultConfig from './default';

const BUTTON_MAPPING = {
  gamepadA: Buttons.A,
  gamepadB: Buttons.B,
  gamepadX: Buttons.X,
  gamepadY: Buttons.Y,
  leftBumper: Buttons.LeftShoulder,
  rightBumper: Buttons.RightShoulder,
  leftThumb: Buttons.LeftThumb,
  rightThumb: Buttons.RightThumb,
  dpadLeft: Buttons.DpadLeft,
  dpadRight: Buttons.DpadRight,
  dpadUp: Buttons.DpadUp,
  dpadDown: Buttons.DpadDown,
  center: Buttons.Nexus,
  view: Buttons.View,
  menu: Buttons.Menu
}

type GamepadConfig = {
  [button: string]: {
    index: number,
    isButton: boolean
  }
};

export function getGamepadConfig(): GamepadConfig {
  return defaultConfig;
}

export function createGamepadFrame(config: GamepadConfig, gamepad: Gamepad): GamepadFrame {
  return {
    gamepadIndex: 0,
    buttonMask: getButtonMask(config, gamepad),
    leftThumbXAxis: getLeftThumbXAxis(config, gamepad),
    leftThumbYAxis: getLeftThumbYAxis(config, gamepad),
    rightThumbXAxis: getRightThumbXAxis(config, gamepad),
    rightThumbYAxis: getRightThumbYAxis(config, gamepad),
    leftTrigger: getLeftTrigger(config, gamepad),
    rightTrigger: getRightTrigger(config, gamepad),
    physicalPhysicality: 0,
    virtualPhysicality: 0
  };
}

function getButtonMask(config: GamepadConfig, gamepad: Gamepad): number {
  let buttonMask = 0;
  for (let index = 0; index < gamepad.buttons.length; index++) {
    if (gamepad.buttons[index].value > 0) {
      const buttons = findButtons(config, index);
      for (const button of buttons) {
        buttonMask |= button;
      }
    }
  }
  return buttonMask;
}

function findButtons(config: GamepadConfig, buttonIndex: number): Buttons[] {
  const buttons: Buttons[] = [];

  for (const button in config) {
    if (config[button].isButton && config[button].index === buttonIndex) {
      buttons.push((BUTTON_MAPPING as any)[button]);
    }
  }

  return buttons;
}

function getLeftThumbXAxis(config: GamepadConfig, gamepad: Gamepad): number {
  let leftThumbXAxis = 0;

  if (!config.leftStickX.isButton) {
    const value = gamepad.axes[config.leftStickX.index];
    leftThumbXAxis = normalizeAxis(clampAnalog(value));
  }

  return leftThumbXAxis;
}

function getLeftThumbYAxis(config: GamepadConfig, gamepad: Gamepad): number {
  let leftThumbYAxis = 0;

  if (!config.leftStickY.isButton) {
    const value = gamepad.axes[config.leftStickY.index];
    leftThumbYAxis = normalizeAxis(clampAnalog(-value));
  }

  return leftThumbYAxis;
}

function getRightThumbXAxis(config: GamepadConfig, gamepad: Gamepad): number {
  let leftRightXAxis = 0;

  if (!config.rightStickX.isButton) {
    const value = gamepad.axes[config.rightStickX.index];
    leftRightXAxis = normalizeAxis(clampAnalog(value));
  }

  return leftRightXAxis;
}

function getRightThumbYAxis(config: GamepadConfig, gamepad: Gamepad): number {
  let leftRightYAxis = 0;

  if (!config.rightStickY.isButton) {
    const value = gamepad.axes[config.rightStickY.index];
    leftRightYAxis = normalizeAxis(clampAnalog(-value));
  }

  return leftRightYAxis;
}

function getLeftTrigger(config: GamepadConfig, gamepad: Gamepad): number {
  let leftTrigger = 0;

  if (config.leftTrigger.isButton) {
    const value = gamepad.buttons[config.leftTrigger.index].value;
    leftTrigger = normalizeTrigger(clampAnalog(value));
  }

  return leftTrigger;
}

function getRightTrigger(config: GamepadConfig, gamepad: Gamepad): number {
  let rightTrigger = 0;

  if (config.rightTrigger.isButton) {
    const value = gamepad.buttons[config.rightTrigger.index].value;
    rightTrigger = normalizeTrigger(clampAnalog(value));
  }

  return rightTrigger;
}

function clampAnalog(value: number): number {
  return Math.max(-1, Math.min(1, value));
}

function normalizeAxis(value: number): number {
  const max = 32767;
  const min = -32767;
  const result = Math.round(value * max);
  return Math.min(max, Math.max(min, result));
}

function normalizeTrigger(value: number): number {
  const max = 65535;
  const min = 0;
  const result = max * value;
  return Math.min(max, Math.max(min, result));
}
