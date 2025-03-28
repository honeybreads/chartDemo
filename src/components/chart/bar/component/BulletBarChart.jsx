import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// BulletBarChart
export default function BulletBarChart() {
  const id = "bullet-bar";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary, state } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);
    const bgColors = [
      state.critical,
      state.major,
      state.minor,
      state.warning,
      state.normal,
    ];

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        arrangeTooltips: false,
      })
    );
    chart.plotContainer.get("background").set("visible", false);

    // X,Y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        numberFormat: "#.'%'",
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );
    yAxis.data.setAll([{ category: "Evaluation" }]);
    xAxis.get("renderer").grid.template.set("forceHidden", true);

    // xAxis 구분 생성
    const count = bgColors.length;
    for (let i = 0; i < count; i++) {
      const rangeDataItem = xAxis.makeDataItem({
        value: (i / count) * 100,
        endValue: ((i + 1) / count) * 100,
      });

      xAxis.createAxisRange(rangeDataItem);
      rangeDataItem.get("axisFill").setAll({
        visible: true,
        fillOpacity: 1,
        fill: bgColors[i],
        stroke: bgColors[i],
      });
    }

    // series(그래프) 생성 및 데이터 적용
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueXField: "value",
        categoryYField: "category",
        fill: am5.color("#333"),
        stroke: am5.color("#333"),
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueX}%",
          pointerOrientation: "left",
        }),
      })
    );

    series.columns.template.setAll({
      cornerRadiusBL: 0,
      cornerRadiusTL: 0,
      cornerRadiusTR: themes.chartVariables.default.barRadius,
      cornerRadiusBR: themes.chartVariables.default.barRadius,
      height: am5.percent(60),
    });
    series.data.setAll([{ category: "Evaluation", value: 87 }]);

    // Series(단계) 생성 및 데이터 적용
    const stepSeries = chart.series.push(
      am5xy.StepLineSeries.new(root, {
        xAxis,
        yAxis,
        noRisers: true,
        valueXField: "value",
        categoryYField: "category",
        fill: am5.color("#fff"),
        stroke: am5.color("#fff"),
        stepWidth: am5.percent(80),
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueX}%",
          pointerOrientation: "left",
        }),
      })
    );

    stepSeries.strokes.template.set("strokeWidth", 4);
    stepSeries.data.setAll([{ category: "Evaluation", value: 75 }]);

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
      })
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("visible", false);

    // 애니메이션 적용
    chart.appear(1000, 100);
    series.appear();

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
