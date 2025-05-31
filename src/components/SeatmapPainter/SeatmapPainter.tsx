import { SeatmapPainterProps } from "./SeatmapPainter.types";
import { useEffect, useMemo, useState } from "react";
import { SeatmapInput } from "react-svg-seatmap";
import { useGetSeatsFromSvg } from "../../utils/useGetSeatsFromSvg";
import "react-svg-seatmap/style.css";
import "./SeatmapPainter.scss";
import "@mantine/core/styles.css";
import { Button, MantineProvider, Select } from "@mantine/core";

export const SeatmapPainter = ({
  svg,
  value,
  onChange,
  groups,
}: SeatmapPainterProps) => {
  const { loading, data: seatData } = useGetSeatsFromSvg(svg);

  const [selectedSeatIds, setSelectedSeatIds] = useState<number[]>([]);

  const [currentGroup, setCurrentGroup] = useState<string>("1");

  // Hydrate value with the seat data from the SVG
  useEffect(() => {
    if (!loading && onChange) {
      onChange({ "-1": seatData });
    }
  }, [loading, onChange, seatData]);

  const handleSave = () => {
    const newSeatsValue = { ...value };
    for (const selectedSeatId of selectedSeatIds) {
      for (const group in newSeatsValue) {
        const seatIndex = newSeatsValue[group].findIndex(
          (seat) => seat.id === selectedSeatId
        );
        if (seatIndex !== -1) {
          const seat = newSeatsValue[group][seatIndex];

          // Update the seat display and selection groups
          seat.displayGroup = currentGroup;
          seat.selectionGroups = {
            ...seat.selectionGroups,
            section: currentGroup,
          };

          // Move the seat to the new group
          newSeatsValue[group].splice(seatIndex, 1);
          if (!newSeatsValue[currentGroup]) {
            newSeatsValue[currentGroup] = [];
          }
          newSeatsValue[currentGroup] = [
            ...(newSeatsValue[currentGroup] || []),
            seat,
          ];
          break;
        }
      }
    }
    if (onChange) {
      onChange(newSeatsValue);
    }
    setSelectedSeatIds([]);
  };

  const handleChange = (selectedSeats: number[]) => {
    setSelectedSeatIds(selectedSeats);
  };

  const groupPicker = (
    <Select
      size="xs"
      data={groups?.map((group) => ({
        value: group.value,
        label: group.label,
      }))}
      value={currentGroup}
      onChange={(_value, option) => setCurrentGroup(option.value)}
    />
  );

  const saveButton = (
    <Button size="xs" onClick={handleSave}>
      Save
    </Button>
  );

  const groupSelection = (
    <div className="seatmap-painter__group-selection">
      {groupPicker}
      {saveButton}
    </div>
  );

  const seatDisplayValues = useMemo(() => {
    const seatValues = [];
    for (const group in value) {
      const seats = value[group].map((seat) => ({
        ...seat,
      }));
      seatValues.push(...seats);
    }
    return seatValues;
  }, [value]);

  return (
    <MantineProvider>
      <SeatmapInput
        svg={svg}
        seats={seatDisplayValues}
        value={selectedSeatIds}
        onChange={handleChange}
        rightControls={[groupSelection]}
        displayGroupMapping={groups?.reduce(
          (acc, group) => ({
            ...acc,
            [group.value]: group.color,
          }),
          {}
        )}
      />
    </MantineProvider>
  );
};
