import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// IrregularInterverChart
export default function IrregularInterverChart() {
  const id = "irregular-xy";
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

    // 샘플 데이터 (컬러 지정 )
    const data = [
      {
        x: 0,
        y: 400,
        fillSettings: {
          fill: colorList[0],
          stroke: colorList[0],
        },
      },
      {
        x: 14,
        y: 500,
        fillSettings: {
          fill: colorList[1],
          stroke: colorList[1],
        },
      },
      {
        x: 22,
        y: 550,
        fillSettings: {
          fill: colorList[0],
          stroke: colorList[0],
        },
      },
      {
        x: 26,
        y: 750,
        fillSettings: {
          fill: colorList[0],
          stroke: colorList[0],
        },
      },
      {
        x: 29,
        y: 930,
        fillSettings: {
          fill: colorList[2],
          stroke: colorList[2],
        },
      },
      {
        x: 43,
        y: 1020,
        fillSettings: {
          fill: colorList[2],
          stroke: colorList[2],
        },
      },
      {
        x: 50,
        y: 1200,
        fillSettings: {
          fill: colorList[1],
          stroke: colorList[1],
        },
      },
    ];

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: false,
        wheelY: false,
        paddingBottom: 8,
        layout: root.verticalLayout,
      })
    );

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 50,
        numberFormat: "#,###'km'",
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    xAxis.get("renderer").grid.template.set("forceHidden", true);
    xAxis.get("renderer").labels.template.set("forceHidden", true);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        numberFormat: "#,###'m'",
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // series 생성
    const series = chart.series.push(
      am5xy.StepLineSeries.new(root, {
        xAxis,
        yAxis,
        baseAxis: xAxis,
        valueXField: "x",
        valueYField: "y",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueX}km: [bold]{valueY}m[/]",
        }),
      })
    );

    series.strokes.template.setAll({ visible: false });
    series.fills.template.setAll({
      visible: true,
      fillOpacity: 1,
      templateField: "fillSettings",
    });

    series.get("tooltip").label.adapters.add("fill", () => am5.color("#fff"));
    series
      .get("tooltip")
      .get("background")
      .adapters.add("fill", () => am5.color("#000"));

    // x axis 간격별 그리드, 라벨 생성
    const maxValue = Math.max(...data.map((item) => item.x));
    for (let i = 0; i < data.length; i++) {
      const value = data[i].x;
      const nextValue = data[i + 1] ? data[i + 1].x : 0;
      const rangeDataItem = xAxis.makeDataItem({ value: value });
      const range = nextValue ? nextValue - value : value;
      const percent = range / maxValue;
      const maxWidth = xAxis.width() * percent;

      xAxis.createAxisRange(rangeDataItem);

      rangeDataItem.get("label").setAll({
        maxWidth,
        text: value + "km",
        forceHidden: false,
        oversizedBehavior: "hide",
      });

      rangeDataItem.get("grid").setAll({
        location: 1,
        forceHidden: false,
        strokeOpacity: 0.2,
      });
    }

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { xAxis, yAxis, snapToSeries: [series] })
    );
    cursor.lineX.set("stroke",themes.chartVariables[theme].base);
    cursor.lineY.set("stroke",themes.chartVariables[theme].base);

    // 데이터 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear();
    chart.appear(1000, 10);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock 
export const IrregularInterverCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// IrregularInterverChart
export default function IrregularInterverChart() {
  const id = "irregular-xy";
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

    // 샘플 데이터 (컬러 지정 )
    const data = [
      {
        x: 0,
        y: 400,
        fillSettings: {
          fill: colorList[0],
          stroke: colorList[0],
        },
      },
      {
        x: 14,
        y: 500,
        fillSettings: {
          fill: colorList[1],
          stroke: colorList[1],
        },
      },
      {
        x: 22,
        y: 550,
        fillSettings: {
          fill: colorList[0],
          stroke: colorList[0],
        },
      },
      {
        x: 26,
        y: 750,
        fillSettings: {
          fill: colorList[0],
          stroke: colorList[0],
        },
      },
      {
        x: 29,
        y: 930,
        fillSettings: {
          fill: colorList[2],
          stroke: colorList[2],
        },
      },
      {
        x: 43,
        y: 1020,
        fillSettings: {
          fill: colorList[2],
          stroke: colorList[2],
        },
      },
      {
        x: 50,
        y: 1200,
        fillSettings: {
          fill: colorList[1],
          stroke: colorList[1],
        },
      },
    ];

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: false,
        wheelY: false,
        paddingBottom: 8,
        layout: root.verticalLayout,
      })
    );

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 50,
        numberFormat: "#,###'km'",
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    xAxis.get("renderer").grid.template.set("forceHidden", true);
    xAxis.get("renderer").labels.template.set("forceHidden", true);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        numberFormat: "#,###'m'",
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // series 생성
    const series = chart.series.push(
      am5xy.StepLineSeries.new(root, {
        xAxis,
        yAxis,
        baseAxis: xAxis,
        valueXField: "x",
        valueYField: "y",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueX}km: [bold]{valueY}m[/]",
        }),
      })
    );

    series.strokes.template.setAll({ visible: false });
    series.fills.template.setAll({
      visible: true,
      fillOpacity: 1,
      templateField: "fillSettings",
    });

    series.get("tooltip").label.adapters.add("fill", () => am5.color("#fff"));
    series
      .get("tooltip")
      .get("background")
      .adapters.add("fill", () => am5.color("#000"));

    // x axis 간격별 그리드, 라벨 생성
    const maxValue = Math.max(...data.map((item) => item.x));
    for (let i = 0; i < data.length; i++) {
      const value = data[i].x;
      const nextValue = data[i + 1] ? data[i + 1].x : 0;
      const rangeDataItem = xAxis.makeDataItem({ value: value });
      const range = nextValue ? nextValue - value : value;
      const percent = range / maxValue;
      const maxWidth = xAxis.width() * percent;

      xAxis.createAxisRange(rangeDataItem);

      rangeDataItem.get("label").setAll({
        maxWidth,
        text: value + "km",
        forceHidden: false,
        oversizedBehavior: "hide",
      });

      rangeDataItem.get("grid").setAll({
        location: 1,
        forceHidden: false,
        strokeOpacity: 0.2,
      });
    }

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { xAxis, yAxis, snapToSeries: [series] })
    );
    cursor.lineX.set("stroke",themes.chartVariables[theme].base);
    cursor.lineY.set("stroke",themes.chartVariables[theme].base);

    // 데이터 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear();
    chart.appear(1000, 10);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`