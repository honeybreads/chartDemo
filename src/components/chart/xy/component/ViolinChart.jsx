import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const sourceData = {
  Americas: [
    75, 69, 76, 85, 68, 68, 86, 78, 65, 75, 65, 80, 72, 81, 69, 68, 88, 65, 74,
    63, 83, 74, 83, 76, 67, 73, 77, 65, 70, 64, 66, 74, 68, 68, 75, 80, 79, 67,
    79, 77, 78, 67, 67, 74, 70, 68, 76, 72, 70, 79, 72, 72, 70, 70, 83, 77, 67,
    81, 69, 80, 64, 63, 68, 80, 68, 73, 79, 82, 62, 68, 66, 65, 74, 83, 71, 68,
    69, 69, 83, 72, 75, 71, 71, 82, 64, 73, 61, 61, 61, 64, 66, 67, 82, 79, 78,
    65, 79, 71, 74, 63, 66, 80, 70, 70, 76, 66, 70, 68, 71, 75, 81, 71, 69, 81,
    71, 66, 66, 64, 65, 70, 66, 83, 72, 73, 60, 83, 82, 61, 70, 74, 66, 61, 67,
    70, 72, 68, 62, 79, 72, 69, 64, 69, 69, 79, 69, 74, 70, 67, 73, 74, 78, 60,
    72, 70, 66, 63, 65, 73, 65, 64, 69, 59, 77, 76, 61, 74, 65, 83, 79, 80, 69,
    59, 66, 59, 60, 79, 67, 69, 71, 69, 69, 69, 64, 73, 83, 73, 68, 70, 70, 78,
    72, 75, 65, 78, 73, 74, 80, 62, 82, 81, 62, 71, 80, 69, 60, 79, 67, 74,
  ],
  Europe: [
    70, 53, 59, 73, 76, 78, 65, 59, 82, 65, 77, 84, 61, 62, 80, 63, 58, 64, 52,
    50, 76, 65, 48, 47, 73, 64, 68, 60, 75, 84, 60, 50, 48, 67, 84, 67, 74, 82,
    67, 63, 71, 49, 83, 82, 56, 61, 76, 87, 52, 57, 73, 65, 66, 48, 66, 66, 66,
    46, 64, 55, 63, 63, 55, 57, 60, 67, 53, 63, 48, 58, 72, 69, 49, 52, 55, 49,
    48, 61, 84, 56, 80, 79, 49, 58, 58, 73, 48, 63, 79, 84, 79, 58, 67, 64, 47,
    74, 66, 54, 46, 67, 71, 62, 69, 61, 47, 73, 66, 56, 82, 50, 52, 63, 68, 71,
    74, 64, 74, 67, 46, 60, 72, 58, 56, 59, 56, 79, 74, 49, 47, 58, 69, 63, 56,
    73, 76, 65, 57, 77, 76, 64, 69, 76, 63, 68, 72, 63, 65, 73, 52, 66, 46, 49,
    84, 47, 67, 70, 67, 70, 54, 60, 78, 49, 73, 73, 47, 60, 66, 65, 65, 59, 66,
    72, 61, 50, 57, 77, 77, 49, 54, 54, 76, 58, 59, 80, 64, 61, 84, 56, 63, 68,
  ],
  Asia: [
    80, 76, 79, 83, 81, 85, 76, 82, 78, 83, 83, 84, 87, 77, 77, 76, 78, 84, 81,
    85, 81, 80, 81, 86, 81, 77, 82, 85, 84, 80, 79, 81, 84, 84, 82, 78, 83, 85,
    80, 83, 84, 79, 79, 80, 82, 84, 83, 80, 83, 80, 85, 84, 77, 81, 78, 84, 84,
    83, 83, 80, 85, 85, 83, 82, 81, 85, 82, 81, 85, 77, 81, 79, 83, 85, 86, 80,
    81, 84, 84, 81, 80, 83, 84, 83, 83, 77, 80, 80, 81, 82, 82, 82, 80, 84, 80,
    84, 80, 83, 85, 81, 84, 83, 82, 82, 86, 82, 80, 82, 82, 80, 79, 84, 79, 83,
    79, 80, 80, 84, 80, 81, 84, 85, 83, 84, 83, 79, 80, 82, 82, 82, 83, 85, 84,
    85, 79, 80, 81, 83, 85, 80, 79, 79, 84, 83, 83, 85, 83, 79, 85, 78, 82, 85,
    79, 81, 85, 86, 84, 85, 81, 83, 80, 84, 83, 79, 82, 78, 79, 85, 82, 83, 85,
    81, 82, 80, 79, 83, 82, 82, 78, 85, 80, 85, 85, 79, 83, 83, 80, 83, 84, 85,
    80, 81,
  ],
  Africa: [
    78, 76, 84, 79, 81, 72, 78, 76, 79, 74, 69, 73, 76, 78, 77, 82, 74, 75, 77,
    77, 75, 78, 74, 75, 77, 70, 77, 72, 79, 70, 79, 74, 73, 78, 77, 73, 81, 74,
    69, 69, 71, 76, 72, 69, 75, 68, 68, 74, 83, 76, 77, 78, 70, 71, 74, 76, 73,
    74, 76, 76, 79, 79, 72, 81, 73, 81, 78, 74, 71, 73, 69, 80, 74, 75, 81, 76,
    78, 73, 72, 73, 77, 77, 74, 71, 81, 80, 71, 82, 72, 77, 79, 75, 69, 76, 80,
    69, 77, 82, 75, 76, 82, 71, 78, 71, 77, 83, 81, 75, 81, 69, 78, 76, 71, 75,
    71, 72, 83, 78, 75, 75, 79, 71, 75, 69, 75, 80, 81, 76, 80, 73, 72, 79, 72,
    69, 70, 74, 71, 73, 69, 72, 75, 81, 72, 69, 82, 71, 72, 74, 76, 75, 72, 80,
    77, 74, 79, 78, 73, 72, 71, 82, 81, 72, 77, 75, 80, 79, 75, 80, 73, 73, 71,
    77, 79, 71, 75, 72, 74, 75, 80, 77, 77, 81, 71, 71, 77, 77, 70, 75, 82, 78,
  ],
};

// 데이터 가공 함수
const calculateData = (values, incrementSize) => {
  values.sort((a, b) => a - b);
  const increments = new Map();

  values.forEach((value) => {
    const range = Math.floor(value / incrementSize) * incrementSize;
    const rangeLabel = `${range}-${range + incrementSize - 1}`;
    increments.set(rangeLabel, (increments.get(rangeLabel) || 0) + 1);
  });

  return Array.from(increments, ([range, count]) => ({
    range,
    low: count / -2,
    high: count / 2,
    count,
  }));
};

// ViolinChart
export default function ViolinChart() {
  const id = "violin-xy";
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
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
      })
    );

    chart.plotContainer.get("background").setAll({ opacity: 0 });

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "range",
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      rotation: -45,
      location: 0.5,
      centerY: am5.p50,
      centerX: am5.p100,
      multiLocation: 0.5,
    });

    xAxis.get("renderer").grid.template.setAll({
      location: 0.5,
      multiLocation: 0.5,
    });

    // categories 설정
    let combinedValues = [];
    Object.keys(sourceData).map((category) => {
      combinedValues = combinedValues.concat(sourceData[category]);
    });
    chart.leftAxesContainer.setAll({ layout: root.verticalLayout });

    // series 생성 함수
    const createSeries = (category) => {
      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          extraMin: 0.05,
          extraMax: 0.05,
          maxDeviation: 0,
          strictMinMax: true,
          renderer: am5xy.AxisRendererY.new(root, {}),
        })
      );
      yAxis.get("renderer").adapters.add("stroke", () => false);
      yAxis.get("renderer").labels.template.setAll({ forceHidden: true });

      const series = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          xAxis,
          yAxis,
          valueYField: "high",
          openValueYField: "low",
          categoryXField: "range",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "{categoryX}: [bold]{count}[/]",
          }),
        })
      );

      series.fills.template.setAll({ fillOpacity: 1, visible: true });
      series.data.setAll(calculateData(sourceData[category], 2));

      yAxis.children.unshift(
        am5.Label.new(root, {
          height: 34,
          y: am5.p50,
          rotation: -90,
          text: category,
          centerX: am5.p50,
          fontWeight: "500",
          fill: themes.createAlternative(series.get("fill")),
          background: am5.RoundedRectangle.new(root, {
            fill: series.get("fill"),
          }),
        })
      );
    };

    // series 생성
    createSeries("Americas");
    createSeries("Europe");
    createSeries("Asia");
    createSeries("Africa");

    // cursor 생성
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, { xAxis }));
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke", themes.chartVariables[theme].base);

    // 데이터 적용
    xAxis.data.setAll(calculateData(combinedValues, 2));

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
