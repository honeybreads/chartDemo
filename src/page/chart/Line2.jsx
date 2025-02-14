import { memo } from "react";
import {
  BasicFillLineChart,
  RangeAreaLineChart,
  RangeSliderLineChart,
  ZoomableValueLineChart,
  DifferentFillLineChart,
  FullStackedAreaLineChart,
  StackedAreaLineChart,
  DifferentNegativeLineChart,
  HorizontalTargetLineChart
} from "@/components/chart/line/LineChart";

const Line2 = memo(function Line2() {
  return (
    <>
      <h2 className="chart-title">채움 라인 차트</h2>
      <div className="chart-layout">
        {/* 기본 채움 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Fill Line Chart</p>
          <div className="chart-con">
            <BasicFillLineChart />
          </div>
        </div>
        {/* 줌 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Zoomable Value Line Chart</p>
          <div className="chart-con">
            <ZoomableValueLineChart />
          </div>
        </div>
        {/* 겹친 색상의 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Diffrent Fill Line Chart</p>
          <div className="chart-con">
            <DifferentFillLineChart />
          </div>
        </div>
        {/* 범위 슬라이더 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Range Slider Line Chart</p>
          <div className="chart-con">
            <RangeSliderLineChart />
          </div>
        </div>
        {/* 범위 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Range Area Line Chart</p>
          <div className="chart-con">
            <RangeAreaLineChart />
          </div>
        </div>
        {/* 음수, 양수 다른 색상의 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Diffrent Negative Line Chart</p>
          <div className="chart-con">
            <DifferentNegativeLineChart />
          </div>
        </div>
        {/* 가득차게 영역이 나눠진 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Full Stacked Area Line Chart</p>
          <div className="chart-con">
            <FullStackedAreaLineChart />
          </div>
        </div>
        {/* 영역이 나눠진 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Stacked Area Line Chart</p>
          <div className="chart-con">
            <StackedAreaLineChart />
          </div>
        </div>
        {/* 세로형 타겟 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Horizontal Target Line Chart</p>
          <div className="chart-con">
            <HorizontalTargetLineChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default Line2;
