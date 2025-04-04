import { memo, useRef } from "react";
import { LucideScatterChart } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";
// 차트 컴포넌트
import BasicMekkoChart, {
  BasicMekkoCodeblock,
} from "@/components/chart/xy/BasicMekkoChart";
import IrregularInterverChart, {
  IrregularInterverCodeblock,
} from "@/components/chart/xy/IrregularInterverChart";
import FillToXyChart, {
  FillToXyCodeblock,
} from "@/components/chart/xy/FillToXyChart";
import ScatterChart, {
  ScatterCodeblock,
} from "@/components/chart/xy/ScatterChart";
import ViolinChart, {
  ViolinCodeblock,
} from "@/components/chart/xy/ViolinChart";
import PopulationPyramidChart, {
  PopulationPyramidCodeblock,
} from "@/components/chart/xy/PopulationPyramidChart";
import PictorialChart, {
  PictorialCodeblock,
} from "@/components/chart/xy/PictorialChart";

// Xy
const Xy = memo(function Xy() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic mekko",
      chart: <BasicMekkoChart />,
      style: { width: "100%", height: 420 },
      codeblock: BasicMekkoCodeblock,
    },
    {
      name: "irregular interver",
      chart: <IrregularInterverChart />,
      style: { width: "100%", height: 420 },
      codeblock: IrregularInterverCodeblock,
    },
    {
      name: "fills to the axis",
      chart: <FillToXyChart />,
      style: { width: "100%", height: 420 },
      codeblock: FillToXyCodeblock,
    },
    {
      name: "scatter",
      chart: <ScatterChart />,
      style: { width: "100%", height: 420 },
      codeblock: ScatterCodeblock,
    },
    {
      name: "violin",
      chart: <ViolinChart />,
      style: { width: "100%", height: 420 },
      codeblock: ViolinCodeblock,
    },
    {
      name: "population pyramid",
      chart: <PopulationPyramidChart />,
      style: { width: "100%", height: 620 },
      codeblock: PopulationPyramidCodeblock,
    },
    {
      name: "pictorial",
      chart: <PictorialChart />,
      style: { width: "100%", height: 420 },
      codeblock: PictorialCodeblock,
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
