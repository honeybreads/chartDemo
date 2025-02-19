import { memo } from "react";
// 차트 컴포넌트
import {
  StackedColumnChart,
  ClusteredColumnChart,
  MovingBulletColumnChart,
  GroupedStacksColumnChart,
  StackedClusteredColumnChart,
  StackedWaterfallColumnChart,
  CombineMultipleColumnChart,
} from "@/components/chart/column/ColumnChart";

const Column2 = memo(function Column2() {
  return (
    <>
      <h2 className="chart-title">컬럼 차트2</h2>
      <div className="chart-layout">
        {/* 움직이는 불렛 컬럼 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Moving Bullet Column Chart</p>
          <div className="chart-con" style={{width:"100%", height:340 }}>
            <MovingBulletColumnChart />
          </div>
        </div>
        {/* 무리 컬럼 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Clustered Column Chart</p>
          <div className="chart-con" style={{width:"100%", height:340 }}>
            <ClusteredColumnChart />
          </div>
        </div>
        {/* 쌓는 컬럼 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Stacked Column Chart</p>
          <div className="chart-con" style={{width:"100%", height:340 }}>
            <StackedColumnChart />
          </div>
        </div>
        {/* 쌓는 무리 컬럼 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Stacked Clustered Column Chart</p>
          <div className="chart-con" style={{width:"100%", height:340 }}>
            <StackedClusteredColumnChart />
          </div>
        </div>
        {/* 그룹 스택 컬럼 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Grouped Stacks Column Chart</p>
          <div className="chart-con" style={{width:"100%", height:340 }}>
            <GroupedStacksColumnChart />
          </div>
        </div>
        {/* 스택 폭포 컬럼 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Stacked Waterfall Column Chart</p>
          <div className="chart-con" style={{width:"100%", height:340 }}>
            <StackedWaterfallColumnChart />
          </div>
        </div>
        {/* 합쳐진 다중? 컬럼 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Combine Multiple Column Chart</p>
          <div className="chart-con" style={{width:"100%", height:340 }}>
            <CombineMultipleColumnChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default Column2;
