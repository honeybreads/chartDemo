import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    date: "2013-01-16",
    market0: 71,
    market1: 75,
    sales0: 5,
    sales1: 9,
  },
  {
    date: "2013-01-17",
    market0: 74,
    market1: 78,
    sales0: 4,
    sales1: 6,
  },
  {
    date: "2013-01-18",
    market0: 78,
    market1: 88,
    sales0: 5,
    sales1: 2,
  },
  {
    date: "2013-01-19",
    market0: 85,
    market1: 89,
    sales0: 8,
    sales1: 9,
  },
  {
    date: "2013-01-20",
    market0: 82,
    market1: 89,
    sales0: 9,
    sales1: 6,
  },
  {
    date: "2013-01-21",
    market0: 83,
    market1: 85,
    sales0: 3,
    sales1: 5,
  },
  {
    date: "2013-01-22",
    market0: 88,
    market1: 92,
    sales0: 5,
    sales1: 7,
  },
  {
    date: "2013-01-23",
    market0: 85,
    market1: 90,
    sales0: 7,
    sales1: 6,
  },
  {
    date: "2013-01-24",
    market0: 85,
    market1: 91,
    sales0: 9,
    sales1: 5,
  },
  {
    date: "2013-01-25",
    market0: 80,
    market1: 84,
    sales0: 5,
    sales1: 8,
  },
  {
    date: "2013-01-26",
    market0: 87,
    market1: 92,
    sales0: 4,
    sales1: 8,
  },
  {
    date: "2013-01-27",
    market0: 84,
    market1: 87,
    sales0: 3,
    sales1: 4,
  },
  {
    date: "2013-01-28",
    market0: 83,
    market1: 88,
    sales0: 5,
    sales1: 7,
  },
  {
    date: "2013-01-29",
    market0: 84,
    market1: 87,
    sales0: 5,
    sales1: 8,
  },
  {
    date: "2013-01-30",
    market0: 81,
    market1: 85,
    sales0: 4,
    sales1: 7,
  },
];

export default function CombineMultipleColumnChart() {
  const id = "combinemultiple-column";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { colorSet } = themes[colorTheme];
    const colorList = colorSet(4);
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: false,
        wheelY: false,
        layout: root.verticalLayout,
      })
    );

    // 커서 추가
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "zoomX" })
    );
    cursor.lineY.set("visible", false);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
        tooltip: am5.Tooltip.new(root, {}),
        tooltipDateFormat: "yyyy-MM-dd",
      })
    );

    const yRenderer1 = am5xy.AxisRendererY.new(root, { opposite: true });
    yRenderer1.grid.template.set("forceHidden", true);

    const yAxis0 = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }),
      })
    );

    const yAxis1 = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: yRenderer1,
        syncWithAxis: yAxis0,
      })
    );

    // column(sales0) series
    const columnSeries0 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "sales0",
        xAxis: xAxis,
        yAxis: yAxis0,
        valueYField: "sales0",
        valueXField: "date",
        clustered: false,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{name}: {valueY}",
        }),
      })
    );
    columnSeries0.data.processor = am5.DataProcessor.new(root, {
      dateFields: ["date"],
      dateFormat: "yyyy-MM-dd",
    });
    columnSeries0.columns.template.set("width", am5.percent(40));

    // column(sales1) series
    const columnSeries1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "sales1",
        xAxis: xAxis,
        yAxis: yAxis0,
        valueYField: "sales1",
        valueXField: "date",
        clustered: false,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{name}: {valueY}",
        }),
      })
    );

    columnSeries1.columns.template.setAll({
      width: am5.percent(60),
      fillOpacity: 0.5,
      strokeOpacity: 0,
    });

    // line(market days all) series
    const series0 = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: "Market days all",
        xAxis: xAxis,
        yAxis: yAxis1,
        valueYField: "market1",
        valueXField: "date",
      })
    );

    series0.strokes.template.setAll({
      strokeWidth: 2,
      strokeDasharray: [2, 2],
    });

    const tooltip = series0.set(
      "tooltip",
      am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",
      })
    );
    tooltip.label.set("text", "{name}: {valueY}");

    series0.bullets.push(() => {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          strokeWidth: 2,
          stroke: series0.get("fill"),
          fill: root.interfaceColors.get("background"),
        }),
      });
    });

    // line(market days) series
    const series1 = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: "Market days",
        xAxis: xAxis,
        yAxis: yAxis1,
        valueYField: "market0",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{name}: {valueY}",
        }),
      })
    );

    series1.strokes.template.setAll({
      strokeWidth: 2,
    });

    // Add bullet
    series1.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          stroke: series1.get("fill"),
          strokeWidth: 2,
          fill: root.interfaceColors.get("background"),
          radius: 5,
        }),
      });
    });

    // scrollbar
    const scrollbar = chart.set(
      "scrollbarX",
      am5xy.XYChartScrollbar.new(root, {
        orientation: "horizontal",
        height: 40,
      })
    );

    // 스크롤(상단) 차트 x,y축 생성
    const sbDateAxis = scrollbar.chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    const sbValueAxis0 = scrollbar.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const sbValueAxis1 = scrollbar.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // line series 생성 
    const sbSeries0 = scrollbar.chart.series.push(
      am5xy.LineSeries.new(root, {
        valueYField: "sales0",
        valueXField: "date",
        xAxis: sbDateAxis,
        yAxis: sbValueAxis1,
      })
    );
    
    // column series 생성 
    const sbSeries1 = scrollbar.chart.series.push(
      am5xy.ColumnSeries.new(root, {
        valueYField: "sales1",
        valueXField: "date",
        xAxis: sbDateAxis,
        yAxis: sbValueAxis0,
      })
    );

    sbSeries1.columns.template.setAll({ fillOpacity: 0.5, strokeOpacity: 0 });

    // 범례 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        x: am5.p50,
        centerX: am5.p50,
      })
    );
    legend.data.setAll(chart.series.values);

    // 데이터 적용
    columnSeries0.data.setAll(data);
    columnSeries1.data.setAll(data);
    series1.data.setAll(data);
    series0.data.setAll(data);
    sbSeries1.data.setAll(data);
    sbSeries0.data.setAll(data);

    // 애니메이션 적용
    series1.appear(1000);
    series0.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
