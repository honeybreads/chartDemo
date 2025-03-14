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
  DateLabelsNearGridLineChart,
  ComparingDiffrentDateLineChart,
} from "@/components/chart/line/LineChart";
import { LineChart } from "lucide-react";

const Line1 = memo(function Line1() {
  return (
    <>
      <h2 className="chart-title"><LineChart/>라인 차트</h2>
      <div className="chart-layout">
        {/* 기본 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <BasicLineChart />
          </div>
        </div>
        {/* 상,하 다른 컬러의 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Different Stroke Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <DifferentStrokeLineChart />
          </div>
        </div>
        {/* 격자선 근처 레이블 날짜 축 라인 차트(?) */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Date Labels Near Grid Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <DateLabelsNearGridLineChart />
          </div>
        </div>
        {/* 값 조정 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Mouse Manipulate Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <MouseManipulateLineChart />
          </div>
        </div>
        {/* 합쳐진 날짜가 다른 두 값의 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">
            Comparing Diffrent Date Line Chart
          </p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <ComparingDiffrentDateLineChart />
          </div>
        </div>

        {/* 날짜가 다른 두 값의 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Multiple Date Axes Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <MultipleDateAxesLineChart />
          </div>
        </div>
        {/* 퍼센테이지..? 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Percentage Change Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <PercentageChangeLineChart />
          </div>
        </div>
        {/* 다중 값 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Multiple Value Axes Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <MultipleValueAxesLineChart />
          </div>
        </div>
        {/* 균등한 간격 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Evenly Spaced Axes Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <EvenlySpacedAxesLineChart />
          </div>
        </div>
        {/* 범례 호거 액션 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Legend Hover Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 500 }}>
            <LegendHoverLineChart />
          </div>
        </div>
        {/* 다중 마킹 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Marking Multiple Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <MarkingMultipleLineChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default Line1;
