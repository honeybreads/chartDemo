import { memo } from "react";
import {
  BasicFillLineChart,
  RangeAreaLineChart,
  StackedAreaLineChart,
  RangeSliderLineChart,
  ZoomableValueLineChart,
  DifferentFillLineChart,
  ChartWithGapsLineChart,
  FullStackedAreaLineChart,
  HorizontalTargetLineChart,
  DifferentNegativeLineChart,
} from "@/components/chart/line/LineChart";
import AreaWithTimeBasedLineChart from "@/components/chart/line/component/AreaWithTimeBasedLineChart";
import { AreaChart } from "lucide-react";

const Line2 = memo(function Line2() {
  return (
    <>
      <h2 className="chart-title"><AreaChart/>채움 라인 차트</h2>
      <div className="chart-layout">
        {/* 기본 채움 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Fill Line Chart</p>
          <div className="chart-con" style={{width:"100%", height:340}}>
            <BasicFillLineChart />
          </div>
        </div>
        {/* 줌 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Zoomable Value Line Chart</p>
          <div className="chart-con" style={{width:"100%", height:340}}>
            <ZoomableValueLineChart />
          </div>
        </div>
        {/* 겹친 색상의 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Diffrent Fill Line Chart</p>
          <div className="chart-con" style={{width:"100%", height:340}}>
            <DifferentFillLineChart />
          </div>
        </div>
        {/* 범위 슬라이더 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Range Slider Line Chart</p>
          <div className="chart-con" style={{width:"100%", height:340}}>
            <RangeSliderLineChart />
          </div>
        </div>
        {/* 범위 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Range Area Line Chart</p>
          <div className="chart-con" style={{width:"100%", height:340}}>
            <RangeAreaLineChart />
          </div>
        </div>
        {/* 시간 기반의 영역 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Area With Time Based Line Chart</p>
          <div className="chart-con" style={{width:"100%", height:340}}>
            <AreaWithTimeBasedLineChart />
          </div>
        </div>
        {/* 데이터 간격이 있는 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Chart With Gaps Line Chart</p>
          <div className="chart-con" style={{width:"100%", height:340}}>
            <ChartWithGapsLineChart />
          </div>
        </div>
        {/* 음수, 양수 다른 색상의 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Diffrent Negative Line Chart</p>
          <div className="chart-con" style={{width:"100%", height:340}}>
            <DifferentNegativeLineChart />
          </div>
        </div>
        {/* 가득차게 영역이 나눠진 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Full Stacked Area Line Chart</p>
          <div className="chart-con" style={{width:"100%", height:340}}>
            <FullStackedAreaLineChart />
          </div>
        </div>
        {/* 영역이 나눠진 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Stacked Area Line Chart</p>
          <div className="chart-con" style={{width:"100%", height:340}}>
            <StackedAreaLineChart />
          </div>
        </div>
        {/* 세로형 타겟 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Horizontal Target Line Chart</p>
          <div className="chart-con" style={{width:"100%", height:340}}>
            <HorizontalTargetLineChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default Line2;
