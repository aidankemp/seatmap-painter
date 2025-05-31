import { GroupedSeats } from "../../types";

export interface SeatmapPainterProps {
  svg: string;
  value?: GroupedSeats;
  onChange?: (value: GroupedSeats) => void;
  groups?: { value: string; label: string; color: string }[];
}
