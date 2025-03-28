import { memo, useRef } from "react";
import {
  ViolinChart,
  ScatterChart,
  FillToXyChart,
  PictorialChart,
  BasicMekkoChart,
  PopulationPyramidChart,
  IrregularInterverChart,
} from "@/components/chart/xy/XyChart";
import { LucideScatterChart } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";

const Xy = memo(function Xy() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic mekko",
      chart: <BasicMekkoChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "irregular interver",
      chart: <IrregularInterverChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "fills to the axis",
      chart: <FillToXyChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "scatter",
      chart: <ScatterChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "violin",
      chart: <ViolinChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "population pyramid",
      chart: <PopulationPyramidChart />,
      style: { width: "100%", height: 620 },
    },
    {
      name: "pictorial",
      chart: <PictorialChart />,
      style: { width: "100%", height: 420 },
    },
  ];
  list.map((item) => (listRef[item.name] = null));

  return (
    <BoardLayout
      list={list}
      listRef={listRef}
      title="XY 차트"
      name="Chart"
      icon={<LucideScatterChart />}
    />
  );
});

export default Xy;
