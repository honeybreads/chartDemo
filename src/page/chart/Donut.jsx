import { memo } from "react";
// 차트 컴포넌트
import {
  BasicDonutChart,
  LinkedDonutChart,
  NestedDonutChart,
  DraggingDonutChart,
  TimeLineDonutChart,
  RadiusNestedDonutChart,
  GrainyGradientDonutChart,
  RadialGradientDonutChart,
} from "@/components/chart/pie/DonutChart";
// 차트 데모 데이터

const Donut = memo(function Donut() {
  return (
    <>
      <h2 className="chart-title"> 도넛 차트</h2>
      <div className="chart-layout">
        {/* 기본 도넛 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Donut Chart</p>
          <div className="chart-con">
            <BasicDonutChart />
          </div>
        </div>
        {/* 타임라인 도넛 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">TimeLine Donut Chart</p>
          <div className="chart-con">
            <TimeLineDonutChart />
          </div>
        </div>
        {/* 거친 그라디언트 도넛 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Grainy Gradient Donut Chart</p>
          <div className="chart-con">
            <GrainyGradientDonutChart />
          </div>
        </div>
        {/* 중첩 도넛 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Nested Donut Chart</p>
          <div className="chart-con">
            <NestedDonutChart />
          </div>
        </div>
        {/* 반지름 중첩 도넛 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Radius Nested Donut Chart</p>
          <div className="chart-con">
            <RadiusNestedDonutChart />
          </div>
        </div>
        {/* 원형 그라데이션 도넛 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">RadialGradient Donut Chart</p>
          <div className="chart-con">
            <RadialGradientDonutChart />
          </div>
        </div>
        {/* 링크 도넛 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Linked Donut Chart</p>
          <div className="chart-con">
            <LinkedDonutChart />
          </div>
        </div>
        {/* 드래깅 도넛 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Draggin Donut Chart</p>
          <div className="chart-con">
            <DraggingDonutChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default Donut;
