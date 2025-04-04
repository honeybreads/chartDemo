import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    date: "2015-01-01",
    ay: 6.5,
    by: 2.2,
    aValue: 15,
    bValue: 10,
  },
  {
    date: "2015-01-02",
    ay: 12.3,
    by: 4.9,
    aValue: 8,
    bValue: 3,
  },
  {
    date: "2015-01-03",
    ay: 12.3,
    by: 5.1,
    aValue: 16,
    bValue: 4,
  },
  {
    date: "2015-01-04",
    ay: 2.8,
    by: 13.3,
    aValue: 9,
    bValue: 13,
  },
  {
    date: "2015-01-05",
    ay: 3.5,
    by: 6.1,
    aValue: 5,
    bValue: 2,
  },
  {
    date: "2015-01-06",
    ay: 5.1,
    by: 8.3,
    aValue: 10,
    bValue: 17,
  },
  {
    date: "2015-01-07",
    ay: 6.7,
    by: 10.5,
    aValue: 3,
    bValue: 10,
  },
  {
    date: "2015-01-08",
    ay: 8,
    by: 12.3,
    aValue: 5,
    bValue: 13,
  },
  {
    date: "2015-01-09",
    ay: 8.9,
    by: 4.5,
    aValue: 8,
    bValue: 11,
  },
  {
    date: "2015-01-10",
    ay: 9.7,
    by: 15,
    aValue: 15,
    bValue: 10,
  },
  {
    date: "2015-01-11",
    ay: 10.4,
    by: 10.8,
    aValue: 1,
    bValue: 11,
  },
  {
    date: "2015-01-12",
    ay: 1.7,
    by: 19,
    aValue: 12,
    bValue: 3,
  },
];

// DateBasedBubbleChart
export default function DateBasedBubbleChart() {
  const id = "datebase-bubble";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";

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
      })
    );

    root.dateFormatter.setAll({
      dateFormat: "yyyy-MM-dd",
      dateFields: ["valueX"],
    });

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        autoZoom: false,
        baseInterval: { timeUnit: "day", count: 1 },
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 50,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        autoZoom: false,
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
          valueXField: "date",
          valueField: value,
          calculateAggregates: true,
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueX}, y: {valueY}, value: {value}",
          }),
        })
      );

      const newTemp = am5.Template.new({});
      series.bullets.push(() => {
        let graphics;
        if (type === "circle") {
          graphics = am5.Circle.new(
            root,
            { fill: series.get("fill") },
            newTemp
          );
        } else if (type === "star") {
          graphics = am5.Star.new(
            root,
            {
              spikes: 4,
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
          min: 3,
          max: 35,
          key: "radius",
          dataField: "value",
          target: newTemp,
        },
      ]);

      series.strokes.template.set("strokeOpacity", 0);
      series.data.processor = am5.DataProcessor.new(root, {
        dateFields: ["date"],
        dateFormat: "yyyy-MM-dd",
      });

      series.data.setAll(data);
      series.appear(1000);

      return series;
    };

    // series(0) 생성
    const series0 = createSeries("ay", "aValue", "circle");
    const series1 = createSeries("by", "bValue", "star");

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis,
        yAxis,
        behavior: "zoomXY",
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

// codeblock 
export const DateBasedBubbleCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    date: "2015-01-01",
    ay: 6.5,
    by: 2.2,
    aValue: 15,
    bValue: 10,
  },
  {
    date: "2015-01-02",
    ay: 12.3,
    by: 4.9,
    aValue: 8,
    bValue: 3,
  },
  {
    date: "2015-01-03",
    ay: 12.3,
    by: 5.1,
    aValue: 16,
    bValue: 4,
  },
  {
    date: "2015-01-04",
    ay: 2.8,
    by: 13.3,
    aValue: 9,
    bValue: 13,
  },
  {
    date: "2015-01-05",
    ay: 3.5,
    by: 6.1,
    aValue: 5,
    bValue: 2,
  },
  {
    date: "2015-01-06",
    ay: 5.1,
    by: 8.3,
    aValue: 10,
    bValue: 17,
  },
  {
    date: "2015-01-07",
    ay: 6.7,
    by: 10.5,
    aValue: 3,
    bValue: 10,
  },
  {
    date: "2015-01-08",
    ay: 8,
    by: 12.3,
    aValue: 5,
    bValue: 13,
  },
  {
    date: "2015-01-09",
    ay: 8.9,
    by: 4.5,
    aValue: 8,
    bValue: 11,
  },
  {
    date: "2015-01-10",
    ay: 9.7,
    by: 15,
    aValue: 15,
    bValue: 10,
  },
  {
    date: "2015-01-11",
    ay: 10.4,
    by: 10.8,
    aValue: 1,
    bValue: 11,
  },
  {
    date: "2015-01-12",
    ay: 1.7,
    by: 19,
    aValue: 12,
    bValue: 3,
  },
];

// DateBasedBubbleChart
export default function DateBasedBubbleChart() {
  const id = "datebase-bubble";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";
  
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
      })
    );

    root.dateFormatter.setAll({
      dateFormat: "yyyy-MM-dd",
      dateFields: ["valueX"],
    });

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        autoZoom: false,
        baseInterval: { timeUnit: "day", count: 1 },
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 50,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        autoZoom: false,
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
          valueXField: "date",
          valueField: value,
          calculateAggregates: true,
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueX}, y: {valueY}, value: {value}",
          }),
        })
      );

      const newTemp = am5.Template.new({});
      series.bullets.push(() => {
        let graphics;
        if (type === "circle") {
          graphics = am5.Circle.new(
            root,
            { fill: series.get("fill") },
            newTemp
          );
        } else if (type === "star") {
          graphics = am5.Star.new(
            root,
            {
              spikes: 4,
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
          min: 3,
          max: 35,
          key: "radius",
          dataField: "value",
          target: newTemp,
        },
      ]);

      series.strokes.template.set("strokeOpacity", 0);
      series.data.processor = am5.DataProcessor.new(root, {
        dateFields: ["date"],
        dateFormat: "yyyy-MM-dd",
      });

      series.data.setAll(data);
      series.appear(1000);

      return series;
    };

    // series(0) 생성
    const series0 = createSeries("ay", "aValue", "circle");
    const series1 = createSeries("by", "bValue", "star");

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis,
        yAxis,
        behavior: "zoomXY",
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
}`