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
    market1: 71,
    market2: 75,
    sales1: 5,
    sales2: 9,
  },
  {
    date: "2013-01-17",
    market1: 74,
    market2: 78,
    sales1: 4,
    sales2: 6,
  },
  {
    date: "2013-01-18",
    market1: 78,
    market2: 88,
    sales1: 5,
    sales2: 2,
  },
  {
    date: "2013-01-19",
    market1: 85,
    market2: 89,
    sales1: 8,
    sales2: 9,
  },
  {
    date: "2013-01-20",
    market1: 82,
    market2: 89,
    sales1: 9,
    sales2: 6,
  },
  {
    date: "2013-01-21",
    market1: 83,
    market2: 85,
    sales1: 3,
    sales2: 5,
  },
  {
    date: "2013-01-22",
    market1: 88,
    market2: 92,
    sales1: 5,
    sales2: 7,
  },
  {
    date: "2013-01-23",
    market1: 85,
    market2: 90,
    sales1: 7,
    sales2: 6,
  },
  {
    date: "2013-01-24",
    market1: 85,
    market2: 91,
    sales1: 9,
    sales2: 5,
  },
  {
    date: "2013-01-25",
    market1: 80,
    market2: 84,
    sales1: 5,
    sales2: 8,
  },
  {
    date: "2013-01-26",
    market1: 87,
    market2: 92,
    sales1: 4,
    sales2: 8,
  },
  {
    date: "2013-01-27",
    market1: 84,
    market2: 87,
    sales1: 3,
    sales2: 4,
  },
  {
    date: "2013-01-28",
    market1: 83,
    market2: 88,
    sales1: 5,
    sales2: 7,
  },
  {
    date: "2013-01-29",
    market1: 84,
    market2: 87,
    sales1: 5,
    sales2: 8,
  },
  {
    date: "2013-01-30",
    market1: 81,
    market2: 85,
    sales1: 4,
    sales2: 7,
  },
];

// CombineMultipleColumnChart
export default function CombineMultipleColumnChart() {
  const id = "combinemultiple-column";
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
        wheelX: false,
        wheelY: false,
        paddingLeft: 0,
        paddingRight: 0,
        layout: root.verticalLayout,
      })
    );

    // 커서 추가
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "zoomX" })
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke", themes.chartVariables[theme].base);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        tooltip: am5.Tooltip.new(root, {}),
        tooltipDateFormat: "yyyy-MM-dd",
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
      })
    );

    const yAxisBar = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }),
      })
    );

    const yAxisLine = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        syncWithAxis: yAxisBar,
        renderer: am5xy.AxisRendererY.new(root, { opposite: true }),
      })
    );
    yAxisLine.get("renderer").grid.template.set("forceHidden", true);

    // column(out) series
    const columnSeriesOuter = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis: yAxisBar,
        name: "sales1",
        clustered: false,
        valueXField: "date",
        valueYField: "sales1",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{name}: {valueY}",
          pointerOrientation: "horizontal",
        }),
      })
    );

    columnSeriesOuter.columns.template.setAll({
      fillOpacity: 0.8,
      width: am5.percent(60),
    });

    // column(in) series
    const columnSeriesInner = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis: yAxisBar,
        name: "sales2",
        clustered: false,
        valueXField: "date",
        valueYField: "sales2",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{name}: {valueY}",
          pointerOrientation: "horizontal",
        }),
      })
    );

    columnSeriesInner.data.processor = am5.DataProcessor.new(root, {
      dateFields: ["date"],
      dateFormat: "yyyy-MM-dd",
    });

    columnSeriesInner.columns.template.set("width", am5.percent(40));

    // line(market days all) series
    const lineSeires1 = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: "Market days all",
        xAxis: xAxis,
        yAxis: yAxisLine,
        valueYField: "market2",
        valueXField: "date",
      })
    );

    lineSeires1.strokes.template.setAll({
      strokeWidth: 2,
      strokeDasharray: [2, 2],
    });

    lineSeires1.bullets.push((root, series) => {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          strokeWidth: 2,
          stroke: series.get("fill"),
          fill: root.interfaceColors.get("background"),
        }),
      });
    });

    const tooltip = lineSeires1.set(
      "tooltip",
      am5.Tooltip.new(root, { pointerOrientation: "horizontal" })
    );

    tooltip.label.set("text", "{name}: {valueY}");

    // line(market days) series
    const lineSeries2 = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: "Market days",
        xAxis: xAxis,
        yAxis: yAxisLine,
        valueYField: "market1",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{name}: {valueY}",
        }),
      })
    );

    lineSeries2.strokes.template.setAll({ strokeWidth: 2 });
    lineSeries2.bullets.push((root, series) => {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          strokeWidth: 2,
          stroke: series.get("fill"),
          fill: root.interfaceColors.get("background"),
        }),
      });
    });

    // scrollbar
    const scrollbar = chart.set(
      "scrollbarX",
      am5xy.XYChartScrollbar.new(root, {
        height: 40,
        orientation: "horizontal",
      })
    );

    scrollbar.get("background").setAll({
      opacity: 0.5,
      fill: themes.chartVariables[theme].shadow,
    });

    // 스크롤(상단) 차트 x,y축 생성
    const scrollbarXAxis = scrollbar.chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    const scrollbarYAxisLine = scrollbar.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const scrollbarYAxisBar = scrollbar.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    scrollbarXAxis.get("renderer").setAll({ stroke: 0 });
    scrollbarYAxisLine.get("renderer").setAll({ stroke: 0 });

    // 스크롤 line series 생성
    const scrollbarSeriesLine = scrollbar.chart.series.push(
      am5xy.LineSeries.new(root, {
        valueYField: "sales1",
        valueXField: "date",
        xAxis: scrollbarXAxis,
        yAxis: scrollbarYAxisLine,
      })
    );

    // 스크롤 column series 생성
    const scrollbarSeriesBar = scrollbar.chart.series.push(
      am5xy.ColumnSeries.new(root, {
        valueYField: "sales2",
        valueXField: "date",
        xAxis: scrollbarXAxis,
        yAxis: scrollbarYAxisBar,
      })
    );

    scrollbarSeriesBar.columns.template.setAll({
      fillOpacity: 0.6,
    });

    // 범례 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        x: am5.p50,
        centerX: am5.p50,
      })
    );
    legend.valueLabels.template.setAll({width:0})
    legend.data.setAll(chart.series.values);

    // 데이터 적용
    columnSeriesInner.data.setAll(data);
    columnSeriesOuter.data.setAll(data);
    lineSeires1.data.setAll(data);
    lineSeries2.data.setAll(data);
    scrollbarSeriesLine.data.setAll(data);
    scrollbarSeriesBar.data.setAll(data);

    // 애니메이션 적용
    lineSeires1.appear(1000);
    lineSeries2.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
