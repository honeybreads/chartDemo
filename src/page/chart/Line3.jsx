import { memo } from "react";
import {
  StepLineChart,
  DraggableRangeLineChart,
  LiveOrderBookLineChart,
  SmoothedLineChart,
  NoRisersStepLineChart,
  SmoothedStackedLineChart,
} from "@/components/chart/line/LineChart";

const Line3 = memo(function Line3() {
  return (
    <>
      <h2 className="chart-title">매끄러운 / 각진 라인 차트</h2>
      <div className="chart-layout">
        {/* 매끄러운 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Smoothed Line Chart</p>
          <div className="chart-con">
            <SmoothedLineChart />
          </div>
        </div>
        {/* 매끄러운 스택택 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Smoothed Stacked Line Chart</p>
          <div className="chart-con">
            <SmoothedStackedLineChart />
          </div>
        </div>
        {/* 드래그로 범위 조절 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Draggable Range Line Chart</p>
          <div className="chart-con">
            <DraggableRangeLineChart />
          </div>
        </div>
        {/* 주식(?) 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Live Order Book Line Chart</p>
          <div className="chart-con">
            <LiveOrderBookLineChart />
          </div>
        </div>
        {/* 계단형 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Step Line Chart</p>
          <div className="chart-con">
            <StepLineChart />
          </div>
        </div>
        {/* 옆이 없는 계단형 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Step Line Chart</p>
          <div className="chart-con">
            <NoRisersStepLineChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default Line3;
