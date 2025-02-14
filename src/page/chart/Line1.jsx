import { memo } from "react";
import {
  BasicLineChart,
  DifferentStrokeLineChart,
  EvenlySpacedAxesLineChart,
  LegendHoverLineChart,
  MultipleDateAxesLineChart,
  MultipleValueAxesLineChart,
  PercentageChangeLineChart,
  MouseManipulateLineChart,
  MarkingMultipleLineChart,
} from "@/components/chart/line/LineChart";

const Line1 = memo(function Line1() {
  return (
    <>
      <h2 className="chart-title">라인 차트</h2>
      <div className="chart-layout">
        {/* 기본 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Line Chart</p>
          <div className="chart-con">
            <BasicLineChart />
          </div>
        </div>
        {/* 상,하 다른 컬러의 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Different Stroke Line Chart</p>
          <div className="chart-con">
            <DifferentStrokeLineChart />
          </div>
        </div>
        {/* 값 조정 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Mouse Manipulate Line Chart</p>
          <div className="chart-con">
            <MouseManipulateLineChart />
          </div>
        </div>
        {/* 날짜가 다른 두 값의 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Multiple Date Axes Line Chart</p>
          <div className="chart-con">
            <MultipleDateAxesLineChart />
          </div>
        </div>
        {/* 퍼센테이지..? 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Percentage Change Line Chart</p>
          <div className="chart-con">
            <PercentageChangeLineChart />
          </div>
        </div>
        {/* 다중 값 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Multiple Value Axes Line Chart</p>
          <div className="chart-con">
            <MultipleValueAxesLineChart />
          </div>
        </div>
        {/* 균등한 간격 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Evenly Spaced Axes Line Chart</p>
          <div className="chart-con">
            <EvenlySpacedAxesLineChart />
          </div>
        </div>
        {/* 범례 호거 액션 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Legend Hover Line Chart</p>
          <div className="chart-con">
            <LegendHoverLineChart />
          </div>
        </div>
        {/* 다중 마킹 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Marking Multiple Line Chart</p>
          <div className="chart-con">
            <MarkingMultipleLineChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default Line1;
