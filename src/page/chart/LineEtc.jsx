import { memo } from "react";
import {
  TrendLineChart,
  ErrorLineChart,
  VerticalLineChart,
  NoGapDateLineChart,
  DivergentLineChart,
  ThemeRiverLineChart,
  AddingDataLineChart,
  DurationValueLineChart,
  DrawingSeriesLineChart,
  ProcessControlLineChart,
  EndSeriesAnimatedBulletLineChart,
} from "@/components/chart/line/LineChart";
import { LineChart } from "lucide-react";

const LineEtc = memo(function LineEtc() {
  return (
    <>
      <h2 className="chart-title"><LineChart/>기타 / 혼합 라인 차트</h2>
      <div className="chart-layout">
        {/* 역방향 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Vertical Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <VerticalLineChart />
          </div>
        </div>
        {/* Series 그리는 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Drawing Series Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <DrawingSeriesLineChart />
          </div>
        </div>
        {/* 끝 라인 애니메이션 불렛 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">End Series Animated Bullet Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <EndSeriesAnimatedBulletLineChart />
          </div>
        </div>
        {/* 데이터 추가 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Adding Data Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <AddingDataLineChart />
          </div>
        </div>
        {/* 트렌드 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Trend Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <TrendLineChart />
          </div>
        </div>
        {/* 분기하는 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Divergent Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <DivergentLineChart />
          </div>
        </div>
        {/* 에러 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Error Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <ErrorLineChart />
          </div>
        </div>
        {/* 지속 값(?) 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Duration Value Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <DurationValueLineChart />
          </div>
        </div>
        {/* 날짜 간격이 동일한 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">No-Gap Date Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <NoGapDateLineChart />
          </div>
        </div>
        {/*  공정 제어 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Process Control Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <ProcessControlLineChart />
          </div>
        </div>
        {/*  테마강(?) 라인 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Theme River Line Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <ThemeRiverLineChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default LineEtc;
