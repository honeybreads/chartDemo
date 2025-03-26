import { memo } from "react";
// 차트 컴포넌트
import {
  BasicDonutChart,
  LinkedDonutChart,
  NestedDonutChart,
  DraggingDonutChart,
  RadiusNestedDonutChart,
  GrainyGradientDonutChart,
  RadialGradientDonutChart,
} from "@/components/chart/pie/DonutChart";
import { DonutIcon } from "lucide-react";

const Donut = memo(function Donut() {
  return (
    <>
      <h2 className="chart-title">
        <DonutIcon />
        파이 - 도넛 차트
      </h2>
      <div className="chart-layout">
        {/* 기본 도넛 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Donut Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <BasicDonutChart />
          </div>
        </div>
        {/* 거친 그라디언트 도넛 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Grainy Gradient Donut Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <GrainyGradientDonutChart />
          </div>
        </div>
        {/* 중첩 도넛 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Nested Donut Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <NestedDonutChart />
          </div>
        </div>
        {/* 반지름 중첩 도넛 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Radius Nested Donut Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <RadiusNestedDonutChart />
          </div>
        </div>
        {/* 원형 그라데이션 도넛 차트 */}
        {/* 넓이에 따라 높이가 변경되는 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">RadialGradient Donut Chart</p>
          <div className="chart-con" style={{ width: "100%", minHeight: 340 }}>
            <RadialGradientDonutChart />
          </div>
        </div>
        {/* 링크 도넛 차트 */}
        {/* 넓이에 따라 높이가 변경되는 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Linked Donut Chart</p>
          <div className="chart-con" style={{ width: "100%", minHeight: 340 }}>
            <LinkedDonutChart />
          </div>
        </div>
        {/* 드래깅 도넛 차트 */}
        {/* 넓이에 따라 높이가 변경되는 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Draggin Donut Chart</p>
          <div className="chart-con" style={{ width: "100%", minHeight: 340 }}>
            <DraggingDonutChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default Donut;
