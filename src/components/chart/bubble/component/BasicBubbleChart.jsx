import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    y: 10,
    x: 14,
    value: 59,
    y2: -5,
    x2: -3,
    value2: 44,
  },
  {
    y: 5,
    x: 3,
    value: 50,
    y2: -15,
    x2: -8,
    value2: 12,
  },
  {
    y: -10,
    x: 8,
    value: 19,
    y2: -4,
    x2: 6,
    value2: 35,
  },
  {
    y: -6,
    x: 5,
    value: 65,
    y2: -5,
    x2: -6,
    value2: 168,
  },
  {
    y: 15,
    x: -4,
    value: 92,
    y2: -10,
    x2: -8,
    value2: 102,
  },
  {
    y: 13,
    x: 1,
    value: 8,
    y2: -2,
    x2: 0,
    value2: 41,
  },
  {
    y: 1,
    x: 6,
    value: 35,
    y2: 0,
    x2: -3,
    value2: 16,
  },
];

export default function BasicBubbleChart() {
  const id = "basic-bubble";
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

    // X,Y축 생성
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

    // series0 생성
    const series0 = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        valueYField: "y",
        valueXField: "x",
        valueField: "value",
        calculateAggregates: true,
        tooltip: am5.Tooltip.new(root, {
          labelText: "x: {valueX}, y: {valueY}, value: {value}",
        }),
      })
    );

    series0.strokes.template.set("strokeOpacity", 0);

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

    // series1 생성
    const series1 = chart.series.push(
      am5xy.LineSeries.new(root, {
        calculateAggregates: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "y2",
        valueXField: "x2",
        valueField: "value2",
        tooltip: am5.Tooltip.new(root, {
          labelText: "x: {valueX}, y: {valueY}, value: {value}",
        }),
      })
    );

    series1.strokes.template.set("strokeOpacity", 0);

    // bullet 생성
    const starTemplate = am5.Template.new({});
    series1.bullets.push(() => {
      const graphics = am5.Star.new(
        root,
        {
          spikes: 12,
          fill: series1.get("fill"),
          innerRadius: am5.percent(70),
        },
        starTemplate
      );
      return am5.Bullet.new(root, { sprite: graphics });
    });

    series1.set("heatRules", [
      {
        target: starTemplate,
        min: 3,
        max: 35,
        key: "radius",
        dataField: "value",
      },
    ]);

    // cursor 생성
    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        snapToSeries: [series0, series1],
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

  return <div id={id} style={{ width: "100%", height: 420 }} />;
}
