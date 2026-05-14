import type { Locale } from "./locale";
import type messagesTr from "../messages/tr.json";

export type Messages = typeof messagesTr;

export async function getDictionary(locale: Locale): Promise<Messages> {
  switch (locale) {
    case "tr":
      return (await import("../messages/tr.json")).default;
    case "en":
      return (await import("../messages/en.json")).default;
    default: {
      const _exhaustive: never = locale;
      return _exhaustive;
    }
  }
}
