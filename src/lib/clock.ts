const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Stockholm", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

/** Wall-clock time in Stockholm as "HH:MM", whatever the visitor's own time zone. */
export const stockholmTime = (d: Date) => fmt.format(d);
