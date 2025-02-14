import { memo } from "react";
import {
  DrawingSeriesLineChart,
  VerticalLineChart,
  AddingDataLineChart,
  TrendLineChart,
  DivergentLineChart,
  ErrorLineChart,
  DurationValueLineChart,
  NoGapDateLineChart,
  ProcessControlLineChart,
} from "@/components/chart/line/LineChart";

const LineEtc = memo(function LineEtc() {
  return (
    <>
      <h2 className="chart-title">기타 / 혼합 라인 차트</h2>
      <div className="chart-layout">
        {/* 역방향 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Vertical Line Chart</p>
          <div className="chart-con">
            <VerticalLineChart />
          </div>
        </div>
        {/* Series 그리는 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Drawing Series Line Chart</p>
          <div className="chart-con">
            <DrawingSeriesLineChart />
          </div>
        </div>
        {/* 데이터 추가 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Adding Data Line Chart</p>
          <div className="chart-con">
            <AddingDataLineChart />
          </div>
        </div>
        {/* 트렌드 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Trend Line Chart</p>
          <div className="chart-con">
            <TrendLineChart />
          </div>
        </div>
        {/* 분기하는 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Divergent Line Chart</p>
          <div className="chart-con">
            <DivergentLineChart />
          </div>
        </div>
        {/* 에러 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Error Line Chart</p>
          <div className="chart-con">
            <ErrorLineChart />
          </div>
        </div>
        {/* 지속 값(?) 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Duration Value Line Chart</p>
          <div className="chart-con">
            <DurationValueLineChart />
          </div>
        </div>
        {/* 날짜 간격이 동일한 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">No-Gap Date Line Chart</p>
          <div className="chart-con">
            <NoGapDateLineChart />
          </div>
        </div>
        {/*  공정 제어 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Process Control Line Chart</p>
          <div className="chart-con">
            <ProcessControlLineChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default LineEtc;
