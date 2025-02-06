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

    // 카테고리 필드 지정
    const categoryField = Object.keys(data[0])[0];

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 16,
      })
    );

    // cursor 생성
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // x,y축 생성
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 100,
      minorGridEnabled: true,
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: xRenderer,
        categoryField,
        maxDeviation: 0,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xRenderer.grid.template.setAll({ location: 1 });
    xRenderer.labels.template.setAll({ maxWidth: "auto" });

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
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "start",
        openValueYField: "end",
        categoryXField: categoryField,
      })
    );

    series.columns.template.setAll({
      cornerRadiusTL: 0,
      cornerRadiusTR: 0,
    });

    series.columns.template.adapters.add("fill", function (_, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.bullets.push((_, series, dataItem) => {
      const values = dataItem.dataContext;
      const textValue = Math.abs(values.start - values.end);

      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          text: textValue,
          centerY: am5.p50,
          centerX: am5.p50,
          populateText: true,
          fill: root.interfaceColors.get("alternativeText"),
        }),
      });
    });

    // 점선 series 생성
    const stepSeries = chart.series.push(
      am5xy.StepLineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        noRisers: true,
        locationX: 0.65,
        valueYField: "start",
        categoryXField: categoryField,
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

  return <div id={id} style={{ width: "100%", height: 340 }} />;
}

