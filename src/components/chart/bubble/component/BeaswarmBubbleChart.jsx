import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as d3 from "d3";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성 (500개의 랜덤 데이터)
const data = Array.from({ length: 100 }, () => ({
  x: am5.math.round(Math.random() * 50 - Math.random() * 50, 2),
  y: 0, // y는 초기값 0으로 설정
  value: Math.round(Math.random() * 10),
}));

// D3 물리 시뮬레이션 설정
const simulation = d3.forceSimulation().on("tick", updateNodePositions);
const collisionForce = d3
  .forceCollide()
  .radius((node) => node.circle.get("radius", 1) + 1);

// 시뮬레이션 업데이트 함수
function updateNodePositions() {
  nodes.forEach((node) => {
    const { circle } = node;
    circle.setAll({ dy: node.y - circle.y() });
    node.fx = circle.x();
  });
}

// 노드 데이터 저장 배열
const nodes = [];
function addNode(dataItem) {
  const bullet = dataItem.bullets?.[0]?.get("sprite");
  if (bullet) {
    nodes.push({ y: bullet.y(), fx: bullet.x(), circle: bullet });
  }
}

// 시뮬레이션 물리 적용
function updateForces() {
  simulation.force("collision", collisionForce);
}

export default function BeaswarmBubbleChart() {
  const id = "beaswarm-bubble";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { colorSet } = themes[colorTheme];
    const colorList = colorSet(2);
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelY: "zoomXY",
        pinchZoomX: true,
        pinchZoomY: true,
      })
    );

    // x,y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        extraMin: 0.01,
        extraMax: 0.01,
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        visible: false,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    yAxis.get("renderer").grid.template.set("forceHidden", true);

    // series 생성
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        calculateAggregates: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "y",
        valueXField: "x",
        valueField: "value",
      })
    );
    series.strokes.template.set("visible", false);

    // bullet 생성
    const circleTemplate = am5.Template.new({});

    series.bullets.push(() => {
      const bulletCircle = am5.Circle.new(
        root,
        {
          radius: 5,
          tooltipY: 0,
          fillOpacity: 1,
          tooltipText: "{x}",
          fill: series.get("fill"),
          stateAnimationDuration:0
        },
        circleTemplate
      );

      bulletCircle.states.create("hover", {
        fill: chart.get("colors").getIndex(3),
      });

      return am5.Bullet.new(root, { sprite: bulletCircle });
    });

    series.set("heatRules", [
      {
        target: circleTemplate,
        min: 5,
        max: 20,
        key: "radius",
        dataField: "value",
      },
    ]);

    // 데이터 적용
    series.data.setAll(data);

    // 데이터가 유효할 때 시뮬레이션 업데이트
    series.events.on("datavalidated", () => {
      setTimeout(() => {
        series.dataItems.forEach(addNode);
        simulation.nodes(nodes);
        updateForces();
      }, 500);
    });

    // 차트 크기 변경 감지 (시뮬레이션 재시작)
    chart.plotContainer.events.on("boundschanged", () => {
      updateForces();
      simulation.restart();
    });

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: 420 }} />;
}
