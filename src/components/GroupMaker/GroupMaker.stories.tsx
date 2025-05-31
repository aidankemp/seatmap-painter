import type { Meta, StoryObj } from "@storybook/react";
import { GroupMaker } from "./GroupMaker";

const meta = {
  title: "GroupMaker",
  component: GroupMaker,
} satisfies Meta<typeof GroupMaker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GroupMakerStory: Story = {
  name: "GroupMaker",
  args: {
    svg: "amazing-venue.svg",
  },
};
