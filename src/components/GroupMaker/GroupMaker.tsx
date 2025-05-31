import { useState } from "react";
import {
  Button,
  MantineProvider,
  TableData,
  Table,
  Flex,
  ColorSwatch,
} from "@mantine/core";
import { SeatmapPainter } from "../SeatmapPainter/SeatmapPainter";
import "./GroupMaker.scss";
import { GroupMakerProps } from "./GroupMaker.types";
import { GroupedSeats } from "../../types";
import { getNiceColor } from "../../utils/getNiceColor";

export const GroupMaker = ({ svg }: GroupMakerProps) => {
  const [tableData, setTableData] = useState<TableData["body"]>([]);
  const tableConfig: TableData = {
    head: ["Id", "Color"],
    body: tableData,
  };

  const handleAddGroup = () => {
    setTableData((prev) => {
      const groupId = prev ? prev.length + 1 : 0;
      const color = getNiceColor(groupId);
      return prev?.concat([[groupId, <ColorSwatch color={color} />, color]]);
    });
  };

  const [groupedSeats, setGroupedSeats] = useState<GroupedSeats>({});

  return (
    <MantineProvider>
      <Flex
        justify="space-between"
        align="center"
        gap="2rem"
        className="group-maker"
      >
        <SeatmapPainter
          svg={svg}
          value={groupedSeats}
          onChange={setGroupedSeats}
          groups={tableData?.map((item) => ({
            value: item && item[0] ? item[0].toString() : "ERROR",
            label: `Group ${item[0]}`,
            color: item[2]?.toString() || "#000000",
          }))}
        />
        <div className="group-table">
          <Button onClick={handleAddGroup}>Add Group</Button>
          <Table data={tableConfig} />
        </div>
      </Flex>
    </MantineProvider>
  );
};
