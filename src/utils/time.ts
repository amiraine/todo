export const momentFormat = "dddd Do MM YYYY";
export type Times = "PAST" | "FUTURE" | "NEAR_FUTURE" | "UNKNOWN";
const digitRegex = /(\d{1,3})/;
const pastRegex = /(\d{1,3})\s(day|week|month)(s\s|\s)ago/gi;
const futureRegex = /(in)\s(\d{1,3})\s(day|week|month)(s|\s)/gm;

export const evaluateTime = (fromNow: string): Times => {
  const isPast = fromNow.match(pastRegex);
  if (isPast !== null) {
    return "PAST";
  }
  const isFuture = fromNow.match(futureRegex);
  if (isFuture !== null) {
    // substring contains the "In {number} {units}"
    if (/(day)/.test(fromNow)) {
      // get the number in the string
      const digits = fromNow.match(digitRegex);
      if (digits !== null) {
        const digitAsNumber = parseInt(digits[0]);
        return digitAsNumber >= 3 ? "FUTURE" : "NEAR_FUTURE";
      }
    } else {
      return "FUTURE";
    }
  }
  return "UNKNOWN";
  // // todo refactor
  // if (fromNow.includes("ago")) {
  //   return "PAST";
  // }
  // if (fromNow.includes("in")) {
  //   if (fromNow.includes("days")) {
  //     const test = fromNow.match(regexp);
  //     if (!test) return "FUTURE";
  //     const days = parseInt(test[0]);
  //     if (days <= 3) return "NEAR_FUTURE";
  //   }
  //   return "FUTURE";
  // }
  // return "UNKNOWN";
};
