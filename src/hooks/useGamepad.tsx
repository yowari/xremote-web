import { useCallback, useEffect } from 'react';
import { GamepadFrame } from '@yowari/xremote';
import { createGamepadFrame, getGamepadConfig } from '../config/gamepad';

const GAMEPAD_POLL_INTERVAL = 16;

const config = getGamepadConfig();

export function useGamepad(onGamepadChange?: (gamepad: GamepadFrame) => void): void {
  const findCompatibleGamepad = useCallback(() => {
    const gamepads = navigator.getGamepads();
    let gamepadIndex = -1;

    for (const gamepad of gamepads) {
      if (gamepad?.connected && checkXboxCompatibilityGamepad(gamepad)) {
        gamepadIndex = gamepad.index;
      }
    }

    return gamepadIndex;
  }, []);

  useEffect(() => {
    let lastGamepadTimestamp = 0;

    const intervalId = setInterval(() => {
      const gamepadIndex = findCompatibleGamepad();

      // detect gamepad input change
      if (gamepadIndex !== -1) {
        const gamepad = navigator.getGamepads()[gamepadIndex];
        if (gamepad) {
          if (lastGamepadTimestamp !== gamepad.timestamp) {
            lastGamepadTimestamp = gamepad.timestamp;
            onGamepadChange?.(createGamepadFrame(config, gamepad));
          }
        }
      }
    }, GAMEPAD_POLL_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, [onGamepadChange, findCompatibleGamepad]);
}

function checkXboxCompatibilityGamepad(gamepad: Gamepad): boolean {
  return gamepad.axes.length >= 4 && gamepad.buttons.length >= 16;
}
