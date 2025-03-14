import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "Net revenue",
    start: 8786,
    end: 0,
  },
  {
    category: "Cost of sales",
    start: 6000,
    end: 8786,
  },
  {
    category: "Operating expenses",
    start: 4214,
    end: 6000,
  },
  {
    category: "Amortisation",
    start: 3761,
    end: 4214,
  },
  {
    category: "Income from equity",
    start: 5226,
    end: 3761,
  },
  {
    category: "Operating income",
    start: 5226,
    end: 0,
  },
];

// WaterfallColumnChart
export default function WaterfallColumnChart() {
  const id = "waterfall-column";
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
        paddingLeft: 12,
        paddingBottom: 12,
      })
    );

    // cursor 생성
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke",themes.chartVariables[theme].base);

    // x,y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "category",
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 20,
          minorGridEnabled: true,
        }),
      })
    );

    xAxis.get("renderer").grid.template.setAll({ location: 1 });
    xAxis.get("renderer").labels.template.setAll({ textAlign: "center" });
    xAxis.get("renderer").labels.template.adapters.add("width", (_, target) => {
      return themes.axisLabelSetWidth(xAxis, target);
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        maxDeviation: 0,
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // series 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueYField: "start",
        openValueYField: "end",
        categoryXField: "category",
      })
    );

    series.columns.template.setAll({
      cornerRadiusTL: 0,
      cornerRadiusTR: 0,
    });

    series.columns.template.adapters.add("fill", (_, target) =>
      chart.get("colors").getIndex(series.columns.indexOf(target))
    );

    series.bullets.push((_, series, dataItem) => {
      const values = dataItem.dataContext;
      const text = Math.abs(values.start - values.end);
      const index = series.dataItems.indexOf(dataItem);
      const fill = am5.Color.alternative(
        am5.color(colorList[index]),
        am5.color("#FFF"),
        am5.color("#000")
      );

      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          text,
          fill,
          centerY: am5.p50,
          centerX: am5.p50,
          populateText: true,
        }),
      });
    });

    // 점선 series 생성
    const stepSeries = chart.series.push(
      am5xy.StepLineSeries.new(root, {
        xAxis,
        yAxis,
        noRisers: true,
        locationX: 0.65,
        valueYField: "start",
        categoryXField: "category",
        stroke: am5.color(theme === "light" ? "#222" : "#ccc"),
      })
    );

    stepSeries.strokes.template.setAll({
      strokeWidth: 1,
      strokeDasharray: [3, 3],
    });

    // 데이터 적용
    xAxis.data.setAll(data);
    series.data.setAll(data);
    stepSeries.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);
    stepSeries.appear(1000);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
