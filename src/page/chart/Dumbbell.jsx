import { memo, useRef } from "react";
// 차트 컴포넌트
import {
  BasicDumbbellChart,
  HorizontalDumbbellChart,
} from "@/components/chart/dumbbell/DumbbellChart";
import {
  BasicLollipopChart,
  HorizontalLollipopChart,
} from "@/components/chart/dumbbell/LollipopChart";
import { DumbbellIcon } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";

const Dumbbell = memo(function Dumbbell() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic dumbbell",
      chart: <BasicDumbbellChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "horizontal dumbbell",
      chart: <HorizontalDumbbellChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "basic Lollipop",
      chart: <BasicLollipopChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "horizontal Lollipop",
      chart: <HorizontalLollipopChart />,
      style: { width: "100%", height: 420 },
    },
  ];
  list.map((item) => (listRef[item.name] = null));

  return (
    <BoardLayout
      list={list}
      listRef={listRef}
      title="덤벨 & 롤리팝 차트"
      name="Chart"
      icon={<DumbbellIcon />}
    />
  );
});

export default Dumbbell;
