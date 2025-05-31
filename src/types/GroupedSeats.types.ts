import { Seat } from "react-svg-seatmap";

export type GroupedSeats = Record<string, Seat[]>; // The string key is the group id, and the value is the seats in that group

export type { Seat }; // Re-exporting Seat type for convenience
