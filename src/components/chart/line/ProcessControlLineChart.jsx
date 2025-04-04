import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { x: 1, value: 14 },
  { x: 2, value: 11 },
  { x: 3, value: 12 },
  { x: 4, value: 14 },
  { x: 5, value: 11 },
  { x: 6, value: 11 },
  { x: 7, value: 12 },
  { x: 8, value: 12 },
  { x: 9, value: 13 },
  { x: 10, value: 15 },
  { x: 11, value: 19 },
  { x: 12, value: 21 },
  { x: 13, value: 22 },
  { x: 14, value: 20 },
  { x: 15, value: 18 },
  { x: 16, value: 14 },
  { x: 17, value: 16 },
  { x: 18, value: 18 },
  { x: 19, value: 17 },
  { x: 20, value: 15 },
  { x: 21, value: 12 },
  { x: 22, value: 8 },
  { x: 23, value: 11 },
];

// ProcessControlLineChart
export default function ProcessControlLineChart() {
  const id = "processcontrol-line";
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

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
      })
    );

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 60,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // series 생성
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        layer: 2,
        name: "Series",
        valueXField: "x",
        valueYField: "value",
        minBulletDistance: 10,
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
          pointerOrientation: "horizontal",
        }),
      })
    );

    series.strokes.template.setAll({ strokeWidth: 3 });
    series.bullets.push(() => {
      return themes.createBulletSpriet(
        root,
        lineColors.bulletFill,
        series.get("fill"),
        { layer: 3 }
      );
    });

    // 범위 영역 생성 함수
    const createRange = (value, endValue, label, dashed) => {
      const color = endValue ? colorList[0] : colorList[1];
      const rangeDataItem = yAxis.makeDataItem({ value, endValue });
      const range = yAxis.createAxisRange(rangeDataItem);
      if (endValue) {
        range.get("axisFill").setAll({
          fill: color,
          visible: true,
          opacity: 0.1,
        });
      } else {
        range.get("grid").setAll({
          layer: 2,
          stroke: color,
          strokeWidth: 2,
          strokeOpacity: 1,
        });

        dashed && range.get("grid").set("strokeDasharray", [5, 3]);
      }

      if (label) {
        range.get("label").setAll({
          text: label,
          location: 1,
          fontSize: 14,
          inside: true,
          centerX: am5.p0,
          centerY: am5.p100,
          layer:999
        });
      }
    };

    // 제어 라인 표시
    const addLimits = (lower, upper) => {
      createRange(lower, upper, undefined);
      createRange(lower, undefined, "제어 하한 한계");
      createRange(upper, undefined, "제어 상한 한계");
      createRange(lower + (upper - lower) / 2, undefined, "평균", true);
    };
    addLimits(10, 20);

    // 커서 추가
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("forceHidden", true);
    cursor.lineX.set("stroke", themes.chartVariables[theme].base);

    // data 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock 
export const ProcessControlLineCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { x: 1, value: 14 },
  { x: 2, value: 11 },
  { x: 3, value: 12 },
  { x: 4, value: 14 },
  { x: 5, value: 11 },
  { x: 6, value: 11 },
  { x: 7, value: 12 },
  { x: 8, value: 12 },
  { x: 9, value: 13 },
  { x: 10, value: 15 },
  { x: 11, value: 19 },
  { x: 12, value: 21 },
  { x: 13, value: 22 },
  { x: 14, value: 20 },
  { x: 15, value: 18 },
  { x: 16, value: 14 },
  { x: 17, value: 16 },
  { x: 18, value: 18 },
  { x: 19, value: 17 },
  { x: 20, value: 15 },
  { x: 21, value: 12 },
  { x: 22, value: 8 },
  { x: 23, value: 11 },
];

// ProcessControlLineChart
export default function ProcessControlLineChart() {
  const id = "processcontrol-line";
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

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
      })
    );

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 60,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // series 생성
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        layer: 2,
        name: "Series",
        valueXField: "x",
        valueYField: "value",
        minBulletDistance: 10,
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
          pointerOrientation: "horizontal",
        }),
      })
    );

    series.strokes.template.setAll({ strokeWidth: 3 });
    series.bullets.push(() => {
      return themes.createBulletSpriet(
        root,
        lineColors.bulletFill,
        series.get("fill"),
        { layer: 3 }
      );
    });

    // 범위 영역 생성 함수
    const createRange = (value, endValue, label, dashed) => {
      const color = endValue ? colorList[0] : colorList[1];
      const rangeDataItem = yAxis.makeDataItem({ value, endValue });
      const range = yAxis.createAxisRange(rangeDataItem);
      if (endValue) {
        range.get("axisFill").setAll({
          fill: color,
          visible: true,
          opacity: 0.1,
        });
      } else {
        range.get("grid").setAll({
          layer: 2,
          stroke: color,
          strokeWidth: 2,
          strokeOpacity: 1,
        });

        dashed && range.get("grid").set("strokeDasharray", [5, 3]);
      }

      if (label) {
        range.get("label").setAll({
          text: label,
          location: 1,
          fontSize: 14,
          inside: true,
          centerX: am5.p0,
          centerY: am5.p100,
          layer:999
        });
      }
    };

    // 제어 라인 표시
    const addLimits = (lower, upper) => {
      createRange(lower, upper, undefined);
      createRange(lower, undefined, "제어 하한 한계");
      createRange(upper, undefined, "제어 상한 한계");
      createRange(lower + (upper - lower) / 2, undefined, "평균", true);
    };
    addLimits(10, 20);

    // 커서 추가
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("forceHidden", true);
    cursor.lineX.set("stroke", themes.chartVariables[theme].base);

    // data 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`