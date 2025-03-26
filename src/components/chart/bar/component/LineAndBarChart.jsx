import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    year: "2005",
    income: 23.5,
    expenses: 18.1,
  },
  {
    year: "2006",
    income: 26.2,
    expenses: 22.8,
  },
  {
    year: "2007",
    income: 30.1,
    expenses: 23.9,
  },
  {
    year: "2008",
    income: 29.5,
    expenses: 25.1,
  },
  {
    year: "2009",
    income: 24.6,
    expenses: 25,
  },
];

// LineAndBarChart
export default function LineAndBarChart() {
  const id = "lineand-bar";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary, lineColors } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingBottom: 0,
        layout: root.verticalLayout,
      })
    );

    // legend 생성
    const legend = chart.children.push(
      am5.Legend.new(root, { marginTop: 8, centerX: am5.p50, x: am5.p50 })
    );
    legend.valueLabels.template.set("width", 0);

    // X,Y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererY.new(root, {
          cellEndLocation: 0.9,
          cellStartLocation: 0.1,
          minorGridEnabled: true,
        }),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.1,
          minGridDistance: 70,
        }),
      })
    );
    yAxis.get("renderer").grid.template.set("location", 1);

    // series(그래프) 생성
    const series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        name: "Income",
        valueXField: "income",
        categoryYField: "year",
        sequencedInterpolation: true,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "[bold]{name}[/]\n{categoryY}: {valueX}",
        }),
      })
    );
    series1.columns.template.setAll({
      height: am5.percent(70),
      cornerRadiusBL: 0,
      cornerRadiusTL: 0,
      cornerRadiusTR: themes.chartVariables.default.barRadius,
      cornerRadiusBR: themes.chartVariables.default.barRadius,
    });

    const series2 = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        name: "Expenses",
        valueXField: "expenses",
        categoryYField: "year",
        sequencedInterpolation: true,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "[bold]{name}[/]\n{categoryY}: {valueX}",
        }),
      })
    );

    series2.strokes.template.setAll({ strokeWidth: 2 });
    series2.strokes.template.adapters.add(
      "stroke",
      () => lineColors.lineStroke
    );
    series2
      .get("tooltip")
      .get("background")
      .adapters.add("fill", () => lineColors.lineStroke);
    series2
      .get("tooltip")
      .label.adapters.add("fill", () =>
        themes.createAlternative(lineColors.lineStroke)
      );

    series2.bullets.push(() => {
      return am5.Bullet.new(root, {
        locationY: 0.5,
        sprite: am5.Circle.new(root, {
          radius: 5,
          strokeWidth: 2,
          fill: lineColors.bulletFill,
          stroke: lineColors.lineStroke,
        }),
      });
    });

    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomY",
      })
    );
    cursor.lineX.set("visible", false);

    // 데이터 적용
    yAxis.data.setAll(data);
    series1.data.setAll(data);
    series2.data.setAll(data);
    legend.data.setAll(chart.series.values);

    // 애니메이션 적용
    series1.appear();
    series2.appear();
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
