import { memo, useRef } from "react";
import { DumbbellIcon } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";
// 차트 컴포넌트
import BasicDumbbellChart,{BasicDumbbellCodeblock} from "@/components/chart/dumbbell/BasicDumbbellChart";
import HorizontalDumbbellChart,{HorizontalDumbbellCodeblock} from "@/components/chart/dumbbell/HorizontalDumbbellChart";
import BasicLollipopChart,{BasicLollipopCodeblock} from "@/components/chart/dumbbell/BasicLollipopChart";
import HorizontalLollipopChart,{HorizontalLollipopCodeblock} from "@/components/chart/dumbbell/HorizontalLollipopChart";

// Dumbbell
const Dumbbell = memo(function Dumbbell() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic dumbbell",
      chart: <BasicDumbbellChart />,
      style: { width: "100%", height: 420 },
      codeblock:BasicDumbbellCodeblock
    },
    {
      name: "horizontal dumbbell",
      chart: <HorizontalDumbbellChart />,
      style: { width: "100%", height: 420 },
      codeblock:HorizontalDumbbellCodeblock
    },
    {
      name: "basic Lollipop",
      chart: <BasicLollipopChart />,
      style: { width: "100%", height: 420 },
      codeblock:BasicLollipopCodeblock
    },
    {
      name: "horizontal Lollipop",
      chart: <HorizontalLollipopChart />,
      style: { width: "100%", height: 420 },
      codeblock:HorizontalLollipopCodeblock
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
