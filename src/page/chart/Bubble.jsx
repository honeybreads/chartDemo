import { memo } from "react";
// 차트 컴포넌트
import {
  BasicBubbleChart,
  CustomBubbleChart,
  HeatmapBubbleChart,
  BeaswarmBubbleChart,
  TimelineBubbleChart,
  ZoomableBubbleChart,
  StripPlotBubbleChart,
  ValueLineBubbleChart,
  DateBasedBubbleChart,
} from "@/components/chart/bubble/BubbleChart";

const Bubble = memo(function Bubble() {
  return (
    <>
      <h2 className="chart-title">버블 차트</h2>
      <div className="chart-layout">
        {/* 기본본 버블 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Bubble Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <BasicBubbleChart />
          </div>
        </div>
        {/* 히트맵 버블 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Heatmap Bubble Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <HeatmapBubbleChart />
          </div>
        </div>
        {/* 베스웜? 버블 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Beaswarm Bubble Chart * with D3</p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <BeaswarmBubbleChart />
          </div>
        </div>
        {/* 스트립 플롯 버블 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Strip Plot Bubble Chart </p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <StripPlotBubbleChart />
          </div>
        </div>
        {/* 값 라인 버블 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Value Line Bubble Chart </p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <ValueLineBubbleChart />
          </div>
        </div>
        {/* 날짜 기준 버블 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Date Based Bubble Chart </p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <DateBasedBubbleChart />
          </div>
        </div>
        {/* 타임라인 버블 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Timeline Bubble Chart </p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <TimelineBubbleChart />
          </div>
        </div>
        {/* 확대축소형 버블 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Zoomable Bubble Chart </p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <ZoomableBubbleChart />
          </div>
        </div>
        {/* 커스텀 버블 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Custom Bubble Chart </p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <CustomBubbleChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default Bubble;
