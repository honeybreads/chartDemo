import { memo } from "react";
// 차트 컴포넌트
import {
  BasicGaugeChart,
  MultiGaugeChart,
  SolidGaugeChart,
  TwoAxesGaugeChart,
  GradientGaugeChart,
  AnimatedGaugeChart,
} from "@/components/chart/radar/GaugeChart";

const Gauge = memo(function Gauge() {
  return (
    <>
      <h2 className="chart-title">게이지 차트</h2>
      <div className="chart-layout">
        {/* 기본 게이지 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Gauge Chart</p>
          <div className="chart-con" style={{width:"100%", height:340}}>
            <BasicGaugeChart />
          </div>
        </div>
        {/* 그라디언트 게이지 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Gradient Gauge Chart</p>
          <div className="chart-con" style={{width:"100%", height:340}}>
            <GradientGaugeChart />
          </div>
        </div>
        {/* 애니메이션 게이지 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Animated Gauge Chart</p>
          <div className="chart-con" style={{width:"100%", height:340}}>
            <AnimatedGaugeChart />
          </div>
        </div>
        {/* 다중 게이지 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Multi Gauge Chart</p>
          <div className="chart-con" style={{width:"100%", height:340}}>
            <MultiGaugeChart />
          </div>
        </div>
        {/* 솔리드 게이지 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Solid Gauge Chart</p>
          <div className="chart-con" style={{width:"100%", height:340}}>
            <SolidGaugeChart />
          </div>
        </div>
        {/* 2축 게이지 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Two Axes Gauge Chart</p>
          <div className="chart-con" style={{width:"100%", height:340}}>
            <TwoAxesGaugeChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default Gauge;
