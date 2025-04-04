import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    year: "2016",
    income: 23.5,
    expenses: 21.1,
  },
  {
    year: "2017",
    income: 26.2,
    expenses: 30.5,
  },
  {
    year: "2018",
    income: 30.1,
    expenses: 34.9,
  },
  {
    year: "2019",
    income: 29.5,
    expenses: 31.1,
  },
  {
    year: "2020",
    income: 30.6,
    expenses: 28.2,
  },
  {
    year: "2021",
    income: 34.1,
    expenses: 32.9,
    info: "(projection)",
  },
];

// LineMixColumnChart
export default function LineMixColumnChart() {
  const id = "linemix-column";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary, lineColors } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // info 스타일 적용
    data.forEach((item, index) => {
      if (item.info) {
        if (index > 0) {
          data[index - 1].strokeSettings = {
            strokeWidth: 3,
            strokeDasharray: [5, 5],
          };
        }

        data[index].columnSettings = {
          strokeWidth: 1,
          fillOpacity: 0.2,
          strokeOpacity: 1,
          strokeDasharray: [5],
        };
      }
    });

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        paddingBottom:0,
        layout: root.verticalLayout,
      })
    );

    // x,y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        maxDeviation:0,
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        maxDeviation:0,
        extraMax: 0.1,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    xAxis.get("renderer").grid.template.setAll({ location: 1 });

    // series(바 차트) 생성
    const series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        name: "income",
        valueYField: "income",
        categoryXField: "year",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{name} in {categoryX}: {valueY} {info}",
        }),
      })
    );

    series1.columns.template.setAll({
      tooltipY: am5.percent(10),
      templateField: "columnSettings",
    });

    // series(라인 차트) 생성
    const series2 = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        name: "expenses",
        valueYField: "expenses",
        categoryXField: "year",
        stroke: lineColors.lineStroke,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{name} in {categoryX}: {valueY} {info}",
        }),
      })
    );

    series2
      .get("tooltip")
      .get("background")
      .adapters.add("fill", () => {
        return lineColors.lineStroke;
      });

    series2.get("tooltip").label.adapters.add("fill", () => "#fff");

    series2.strokes.template.setAll({
      strokeWidth: 3,
      templateField: "strokeSettings",
    });

    series2.bullets.push(() => {
      return themes.createBulletSpriet(
        root,
        lineColors.bulletFill,
        lineColors.lineStroke
      );
    });

    // cursor 생성
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("stroke", themes.chartVariables[theme].base);
    cursor.lineY.set("stroke", themes.chartVariables[theme].base);

    // legend 생성
    const legend = chart.children.push(
      am5.Legend.new(root, { centerX: am5.p50, x: am5.p50, marginTop: 8 })
    );
    legend.valueLabels.template.setAll({ width: 0 });

    // 데이터 적용
    xAxis.data.setAll(data);
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

// codeblock 
export const LineMixColumnCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    year: "2016",
    income: 23.5,
    expenses: 21.1,
  },
  {
    year: "2017",
    income: 26.2,
    expenses: 30.5,
  },
  {
    year: "2018",
    income: 30.1,
    expenses: 34.9,
  },
  {
    year: "2019",
    income: 29.5,
    expenses: 31.1,
  },
  {
    year: "2020",
    income: 30.6,
    expenses: 28.2,
  },
  {
    year: "2021",
    income: 34.1,
    expenses: 32.9,
    info: "(projection)",
  },
];

// LineMixColumnChart
export default function LineMixColumnChart() {
  const id = "linemix-column";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary, lineColors } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // info 스타일 적용
    data.forEach((item, index) => {
      if (item.info) {
        if (index > 0) {
          data[index - 1].strokeSettings = {
            strokeWidth: 3,
            strokeDasharray: [5, 5],
          };
        }

        data[index].columnSettings = {
          strokeWidth: 1,
          fillOpacity: 0.2,
          strokeOpacity: 1,
          strokeDasharray: [5],
        };
      }
    });

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        paddingBottom:0,
        layout: root.verticalLayout,
      })
    );

    // x,y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        maxDeviation:0,
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        extraMax: 0.1,
        maxDeviation:0,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    xAxis.get("renderer").grid.template.setAll({ location: 1 });

    // series(바 차트) 생성
    const series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        name: "income",
        valueYField: "income",
        categoryXField: "year",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{name} in {categoryX}: {valueY} {info}",
        }),
      })
    );

    series1.columns.template.setAll({
      tooltipY: am5.percent(10),
      templateField: "columnSettings",
    });

    // series(라인 차트) 생성
    const series2 = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        name: "expenses",
        valueYField: "expenses",
        categoryXField: "year",
        stroke: lineColors.lineStroke,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{name} in {categoryX}: {valueY} {info}",
        }),
      })
    );

    series2
      .get("tooltip")
      .get("background")
      .adapters.add("fill", () => {
        return lineColors.lineStroke;
      });

    series2.get("tooltip").label.adapters.add("fill", () => "#fff");

    series2.strokes.template.setAll({
      strokeWidth: 3,
      templateField: "strokeSettings",
    });

    series2.bullets.push(() => {
      return themes.createBulletSpriet(
        root,
        lineColors.bulletFill,
        lineColors.lineStroke
      );
    });

    // cursor 생성
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("stroke", themes.chartVariables[theme].base);
    cursor.lineY.set("stroke", themes.chartVariables[theme].base);

    // legend 생성
    const legend = chart.children.push(
      am5.Legend.new(root, { centerX: am5.p50, x: am5.p50, marginTop: 8 })
    );
    legend.valueLabels.template.setAll({ width: 0 });

    // 데이터 적용
    xAxis.data.setAll(data);
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
}`