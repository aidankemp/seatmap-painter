# seatmap-painter

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://main--683a6f438848f038de181b2b.chromatic.com) [![NPM Version](https://img.shields.io/npm/v/seatmap-painter)](https://www.npmjs.com/package/seatmap-painter)

React-based UI tools for creating and painting groups on a provided SVG seatmap.

This package includes:

- `SeatmapPainter`: Divide an SVG seatmap into groups based on a provided array of name/color pairs

![SeatmapPainter-demo](https://github.com/user-attachments/assets/e5cf145a-13b3-4ebf-9ead-708fb2638183)

- `GroupMaker`: An extension of `SeatmapPainter` with an interface for creating groups alongside the seatmap

![GroupMaker-demo](https://github.com/user-attachments/assets/623b7947-ad19-4ab5-909f-3a42715bd1c2)

Check it out here: [Storybook](https://main--683a6f438848f038de181b2b.chromatic.com)

## Installation

Install the package via NPM:

```
npm install --save seatmap-painter
```

## Usage

**SeatmapPainter**

```tsx
import { useState } from "react";
import { SeatmapPainter, GroupedSeats } from "seatmap-painter";

export function default () {
  const [groupedSeats, setGroupedSeats] = useState<GroupedSeats>({});

  const groups = [
    {
      value: "stalls", // Used as the key for this group in the groupedSeats object
      label: "Stalls", // Displayed as the name of this group in the UI
      color: "#ef857d", // Used to highlight this group on the seatmap
    },
  ];

  return (
    <SeatmapPainter
      svg="https://www.test.com/svg" // The URL of the SVG to use as the basis for the seatmap
      value={groupedSeats}
      onChange={setGroupedSeats}
      groups={groups}
    />
  );
};
```

**GroupMaker**

```jsx
import { GroupMaker } from "seatmap-painter";

export default () => (
  <GroupMaker
    svg="https://www.test.com/svg" // The URL of the SVG to use as the basis for the seatmap
  />
);
```

## Props

**Grouped Seats**
| Name | Type | Description |
| --------- | ------------------- | ------------------------------- |
| value | string | The unique key of the group. All seats selected for this group will be listed under this key in the object returned from `onChange` in `SeatmapPainter` |
| label | string | The name for this group that should be shown in the UI |
| color | string | The color that will be used to represent seats in this group on the seatmap |

**SeatmapPainter**

| Name     | Type                   | Description                                                                                                                                                                                                                  |
| -------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| svg      | string                 | URL for an svg to render as the seatmap                                                                                                                                                                                      |
| value    | GroupedSeats           | The `GroupedSeats` object representing the current combination of groups and seats. Since this is a controlled component, this prop controls which group each seat is considered to be in, and so should be stored in state. |
| onChange | (GroupedSeats) => void | Function that is run when the user changes the seat grouping. Since this is a controlled component, the function argument is the new "value" for the component.                                                              |

**GroupMaker**

| Name | Type   | Description                             |
| ---- | ------ | --------------------------------------- |
| svg  | string | URL for an svg to render as the seatmap |

## License

[MIT Licence](LICENSE.md)
