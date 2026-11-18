import { aiLogChannels, onClientCallback } from "@aicore8/lib/server";
import { readId } from "@aicore8/lib/shared";
import { EVENTS, type Action } from "common/police";
import { act } from "./act";

aiLogChannels({ actions: {}, fines: {} });

const ACTIONS: readonly string[] = [
  "cuff",
  "escort",
  "seat",
  "unseat",
  "search",
  "fine",
  "jail",
  "impound",
] satisfies Action[];

onClientCallback(
  EVENTS.act,
  {
    args: ([action, target, extra]) =>
      ACTIONS.includes(String(action)) && readId(target) !== null
        ? [action as Action, target as number, extra]
        : null,
    lock: true,
  },
  act,
);
