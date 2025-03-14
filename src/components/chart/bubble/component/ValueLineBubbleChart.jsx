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

// ValueLineBubbleChart
export default function ValueLineBubbleChart() {
  const id = "valueline-bubble";
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

    // series 생성 함수
    const createSeries = (y, value, type) => {
      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis,
          yAxis,
          valueYField: y,
          valueXField: "x",
          valueField: value,
          calculateAggregates: true,
          tooltip: am5.Tooltip.new(root, {
            labelText: "x: {valueX}, y: {valueY}, value: {value}",
          }),
        })
      );

      // bullets 생성
      const newTemp = am5.Template.new({});
      series.bullets.push(() => {
        let graphics;
        if (type === "circle") {
          // 구 타입
          graphics = am5.Circle.new(
            root,
            { fill: series.get("fill") },
            newTemp
          );
        } else if (type === "star") {
          // 별 타입
          graphics = am5.Star.new(
            root,
            {
              spikes: 12,
              fill: series.get("fill"),
              innerRadius: am5.percent(75),
            },
            newTemp
          );
        }
        return am5.Bullet.new(root, { sprite: graphics });
      });

      series.set("heatRules", [
        {
          target: newTemp,
          min: 5,
          max: 30,
          key: "radius",
          dataField: "value",
        },
      ]);

      series.appear(1000);
      series.data.setAll(data);
      return series;
    };

    // series 생성
    createSeries("ay", "aValue", "circle");
    createSeries("by", "bValue", "star");

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis,
        yAxis,
        behavior: "zoomXY",
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
