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

// BasicBubbleChart
export default function BasicBubbleChart() {
  const id = "basic-bubble";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
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

    // series 생성 함수
    const createSeries = (x, y, value, template) => {
      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis,
          yAxis,
          valueYField: y,
          valueXField: x,
          valueField: value,
          calculateAggregates: true,
          tooltip: am5.Tooltip.new(root, {
            labelText: "x: {valueX}, y: {valueY}, value: {value}",
          }),
        })
      );
      series.strokes.template.set("strokeOpacity", 0);

      // bullet 생성
      const newTemp = am5.Template.new({});
      series.bullets.push(() => {
        let graphics;
        if (template === "circle") {
          graphics = am5.Circle.new(
            root,
            { fill: series.get("fill") },
            newTemp
          );
        } else if (template === "star") {
          graphics = am5.Star.new(
            root,
            {
              spikes: 12,
              fill: series.get("fill"),
              innerRadius: am5.percent(70),
            },
            newTemp
          );
        }
        return am5.Bullet.new(root, { sprite: graphics });
      });

      series.set("heatRules", [
        {
          min: 5,
          max: 20,
          key: "radius",
          target: newTemp,
          dataField: "value",
        },
      ]);

      series.appear(1000);
      series.data.setAll(data);
      return series;
    };

    // series 생성
    const series0 = createSeries("y", "x", "value", "circle");
    const series1 = createSeries("y2", "x2", "value2", "star");

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis,
        yAxis,
        snapToSeries: [series0, series1],
      })
    );
    cursor.lineX.setAll({ stroke: themes.chartVariables[theme].base });
    cursor.lineY.setAll({ stroke: themes.chartVariables[theme].base });

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
