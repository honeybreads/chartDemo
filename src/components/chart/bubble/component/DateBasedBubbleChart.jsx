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

export default function DateBasedBubbleChart() {
  const id = "datebase-bubble";
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
      })
    );

    root.dateFormatter.setAll({
      dateFormat: "yyyy-MM-dd",
      dateFields: ["valueX"]
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

    // series(0) 생성
    const series0 = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "ay",
        valueXField: "date",
        valueField: "aValue",
        calculateAggregates: true,
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueX}, y: {valueY}, value: {value}",
        }),
      })
    );

    // bullet 생성
    const circleTemplate = am5.Template.new({});
    series0.bullets.push(() => {
      var graphics = am5.Circle.new(
        root,
        { fill: series0.get("fill") },
        circleTemplate
      );
      return am5.Bullet.new(root, { sprite: graphics });
    });

    series0.set("heatRules", [
      {
        min: 3,
        max: 35,
        key: "radius",
        dataField: "value",
        target: circleTemplate,
      },
    ]);

    // series(1) 생성
    const starTemplate = am5.Template.new({});
    const series1 = chart.series.push(
      am5xy.LineSeries.new(root, {
        calculateAggregates: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "by",
        valueXField: "date",
        valueField: "bValue",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueX}, y: {valueY}, value: {value}",
        }),
      })
    );

    // bullet 생성
    series1.bullets.push(() => {
      var graphics = am5.Star.new(
        root,
        {
          spikes: 4,
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
        max: 50,
        dataField: "value",
        key: "radius",
      },
    ]);

    series0.strokes.template.set("strokeOpacity", 0);
    series1.strokes.template.set("strokeOpacity", 0);
    series0.data.processor = am5.DataProcessor.new(root, {
      dateFields: ["date"],
      dateFormat: "yyyy-MM-dd",
    });
    series1.data.processor = am5.DataProcessor.new(root, {
      dateFields: ["date"],
      dateFormat: "yyyy-MM-dd",
    });

    // cursor 생성
    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        behavior: "zoomXY",
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
