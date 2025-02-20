import { memo } from "react";
import {
  BasicBarChart,
  StackedBarChart,
  FloatingBarChart,
  ClusteredBarChart,
  GanttDateBarChart,
  DataSortingBarChart,
  DragOrderingBarChart,
  NegativeStackBarChart,
  DivergentStackedBarChart,
  RaceBarChart,
  MovingBulletBarChart,
  PartitionedBarChart,
} from "@/components/chart/bar/BarChart";
import { BarChartHorizontal } from "lucide-react";

const Bar = memo(function Bar() {
  return (
    <>
      <h2 className="chart-title"><BarChartHorizontal/> 바 차트</h2>
      <div className="chart-layout">
        {/* 기본 바 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic bar Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <BasicBarChart />
          </div>
        </div>
        {/* 데이터 정렬 바 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Data Sorting bar Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <DataSortingBarChart />
          </div>
        </div>
        {/* 드래그 조정 바 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Drag Ordering bar Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <DragOrderingBarChart />
          </div>
        </div>
        {/* 간트(?) 날짜 바 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Gantt Date bar Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <GanttDateBarChart />
          </div>
        </div>
        {/*  다발성(?) 바 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Clustered bar Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <ClusteredBarChart />
          </div>
        </div>
        {/*  스택 바 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Stacked bar Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <StackedBarChart />
          </div>
        </div>
        {/*  상반되는 바 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Negative Stacked bar Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <NegativeStackBarChart />
          </div>
        </div>
        {/*  떠 있는 바 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Floating bar Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <FloatingBarChart />
          </div>
        </div>
        {/*  분기 스택 바 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Divergent Stacked bar Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <DivergentStackedBarChart />
          </div>
        </div>
        {/*  경주 바 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Race bar Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <RaceBarChart />
          </div>
        </div>
        {/* 움직이는 불렛 바 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Moving Bullet bar Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 540 }}>
            <MovingBulletBarChart />
          </div>
        </div>
        {/* 구분 바 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Partitione bar Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 640 }}>
            <PartitionedBarChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default Bar;
