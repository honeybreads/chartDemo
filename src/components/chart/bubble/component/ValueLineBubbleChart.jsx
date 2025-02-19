import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    x: 1,
    ay: 6.5,
    by: 2.2,
    aValue: 15,
    bValue: 10,
  },
  {
    x: 2,
    ay: 12.3,
    by: 4.9,
    aValue: 8,
    bValue: 3,
  },
  {
    x: 3,
    ay: 12.3,
    by: 5.1,
    aValue: 16,
    bValue: 4,
  },
  {
    x: 5,
    ay: 2.9,
    aValue: 9,
  },
  {
    x: 7,
    by: 8.3,
    bValue: 13,
  },
  {
    x: 10,
    ay: 2.8,
    by: 13.3,
    aValue: 9,
    bValue: 13,
  },
  {
    x: 12,
    ay: 3.5,
    by: 6.1,
    aValue: 5,
    bValue: 2,
  },
  {
    x: 13,
    ay: 5.1,
    aValue: 10,
  },
  {
    x: 15,
    ay: 6.7,
    by: 10.5,
    aValue: 3,
    bValue: 10,
  },
  {
    x: 16,
    ay: 8,
    by: 12.3,
    aValue: 5,
    bValue: 13,
  },
  {
    x: 20,
    by: 4.5,
    bValue: 11,
  },
  {
    x: 22,
    ay: 9.7,
    by: 15,
    aValue: 15,
    bValue: 10,
  },
  {
    x: 23,
    ay: 10.4,
    by: 10.8,
    aValue: 1,
    bValue: 11,
  },
  {
    x: 24,
    ay: 1.7,
    by: 19,
    aValue: 12,
    bValue: 3,
  },
];

export default function ValueLineBubbleChart() {
  const id = "valueline-bubble";
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
        panX: false,
        panY: false,
        wheelY: "zoomXY",
        pinchZoomX: true,
        pinchZoomY: true,
      })
    );

    // x,y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // series(0) 생성
    const series0 = chart.series.push(
      am5xy.LineSeries.new(root, {
        calculateAggregates: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "ay",
        valueXField: "x",
        valueField: "aValue",
        tooltip: am5.Tooltip.new(root, {
          labelText: "x: {valueX}, y: {valueY}, value: {value}",
        }),
      })
    );

    // bullet 생성
    const circleTemplate = am5.Template.new({});
    series0.bullets.push(() => {
      const graphics = am5.Circle.new(
        root,
        { fill: series0.get("fill") },
        circleTemplate
      );
      return am5.Bullet.new(root, { sprite: graphics });
    });

    series0.set("heatRules", [
      {
        target: circleTemplate,
        min: 3,
        max: 35,
        key: "radius",
        dataField: "value",
      },
    ]);

    // series(1) 생성
    const starTemplate = am5.Template.new({});
    var series1 = chart.series.push(
      am5xy.LineSeries.new(root, {
        calculateAggregates: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "by",
        valueXField: "x",
        valueField: "bValue",
        tooltip: am5.Tooltip.new(root, {
          labelText: "x: {valueX}, y: {valueY}, value: {value}",
        }),
      })
    );

    // bullet 생성
    series1.bullets.push(() => {
      var graphics = am5.Star.new(
        root,
        {
          spikes: 12,
          fill: series1.get("fill"),
          innerRadius: am5.percent(90),
        },
        starTemplate
      );
      return am5.Bullet.new(root, {sprite: graphics});
    });

    series1.set("heatRules", [
      {
        target: starTemplate,
        min: 3,
        max: 50,
        key: "radius",
        dataField: "value",
      },
    ]);

    // series0.strokes.template.set("opacity",0)
    // series1.strokes.template.set("opacity",0)

    // cursor 생성
    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        behavior: "zoomXY",
      })
    );

    // 데이터 적용
    series0.data.setAll(data);
    series1.data.setAll(data);

    // 애니메이션 적용
    series0.appear(1000);
    series1.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
