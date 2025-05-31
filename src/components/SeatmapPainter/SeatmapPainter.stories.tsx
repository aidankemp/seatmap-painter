import type { Meta, StoryObj } from "@storybook/react";
import { SeatmapPainter } from "./SeatmapPainter";
import { useState } from "react";
import { GroupedSeats } from "../../types";

const meta = {
  title: "SeatmapPainter",
  component: SeatmapPainter,
} satisfies Meta<typeof SeatmapPainter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SeatmapPainterStory: Story = {
  name: "SeatmapPainter",
  args: {
    svg: "amazing-venue.svg",
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<GroupedSeats>({});

    return (
      <SeatmapPainter
        {...args}
        value={value}
        onChange={setValue}
        groups={[
          { value: "stalls", label: "Stalls", color: "#ef857d" },
          { value: "standingRoom", label: "Standing Room", color: "#f8d376" },
          { value: "premiumA", label: "Premium A", color: "#61d4a4" },
          { value: "premiumB", label: "Premium B", color: "#5a8ef7" },
        ]}
      />
    );
  },
};
