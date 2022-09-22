// React
import { useEffect, useState, useMemo } from "react";

type UseKeyboardSignature = () => string | null;

export const useKeyboard: UseKeyboardSignature = () => {
  // Local state
  const [key, setKey] = useState<string | null>(null);

  const handleEvent = (ev: KeyboardEvent) => {
    setKey(ev.key);
  };

  const clearKey = () => {
    setKey(null);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEvent);
    window.addEventListener("keyup", clearKey);

    return () => {
      window.removeEventListener("keydown", handleEvent);
      window.removeEventListener("keyup", clearKey);
    };
  }, []);

  return key;
};

type Shortcut = {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
};

type UseKeyboardShortcutSignature = (
  shortcut: Shortcut,
  callback: () => void
) => void;

const defaultShortcut = {
  key: "",
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
  metaKey: false,
};

// array of key values where we don't want to prevent the default
const EVENTS_NOT_PREVENTED = ["Backspace"];

export const useKeyboardShortcut: UseKeyboardShortcutSignature = (
  shortcut,
  callback
) => {
  const os = useMemo(() => getOS(), []);

  switch (os) {
    case "Windows":
      shortcut = { ...defaultShortcut, ...shortcut };
      break;
    case "Mac":
      shortcut = { ...defaultShortcut, ...shortcut };

      // eslint-disable-next-line no-case-declarations
      const copy = { ...shortcut };
      shortcut = {
        ...shortcut,
        metaKey: copy.ctrlKey,
        ctrlKey: copy.metaKey,
      };
      break;
    default:
      shortcut = { ...defaultShortcut, ...shortcut };
  }

  useEffect(() => {
    const handleEvent = (ev: KeyboardEvent) => {
      if (
        ev.key === shortcut.key &&
        ev.ctrlKey === shortcut.ctrlKey &&
        ev.shiftKey === shortcut.shiftKey &&
        ev.altKey === shortcut.altKey &&
        ev.metaKey === shortcut.metaKey
      ) {
        if (!EVENTS_NOT_PREVENTED.includes(ev.key)) {
          ev.preventDefault();
        }
        callback();
      }
    };
    window.addEventListener("keydown", handleEvent);

    return () => {
      window.removeEventListener("keydown", handleEvent);
    };
  }, [callback, shortcut]);
};

const getOS = () => {
  if (window.navigator.userAgent.indexOf("Windows") > -1) {
    return "Windows";
  } else if (window.navigator.userAgent.indexOf("Mac") > -1) {
    return "Mac";
  }
  return "Windows";
};
