import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    ax: 1,
    ay: 0.5,
    bx: 1,
    by: 2.2,
  },
  {
    ax: 2,
    ay: 1.3,
    bx: 2,
    by: 4.9,
  },
  {
    ax: 3,
    ay: 2.3,
    bx: 3,
    by: 5.1,
  },
  {
    ax: 4,
    ay: 2.8,
    bx: 4,
    by: 5.3,
  },
  {
    ax: 5,
    ay: 3.5,
    bx: 5,
    by: 6.1,
  },
  {
    ax: 6,
    ay: 5.1,
    bx: 6,
    by: 8.3,
  },
  {
    ax: 7,
    ay: 6.7,
    bx: 7,
    by: 10.5,
  },
  {
    ax: 8,
    ay: 8,
    bx: 8,
    by: 12.3,
  },
  {
    ax: 9,
    ay: 8.9,
    bx: 9,
    by: 14.5,
  },
  {
    ax: 10,
    ay: 9.7,
    bx: 10,
    by: 15,
  },
  {
    ax: 11,
    ay: 10.4,
    bx: 11,
    by: 18.8,
  },
  {
    ax: 12,
    ay: 11.7,
    bx: 12,
    by: 25,
  },
];

// FillToXyChart
export default function FillToXyChart() {
  const id = "fill-xy";
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

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelY: "none",
        paddingBottom: 8,
      })
    );

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        strictMinMax: true,
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
        tooltip: am5.Tooltip.new(root, {
          themeTags: ["axis"],
          animationDuration: 300,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        strictMinMax: true,
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {
          themeTags: ["axis"],
          animationDuration: 300,
        }),
      })
    );

    // series 생성 함수
    const createSeries = (x, y, axis) => {
      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis,
          yAxis,
          baseAxis: axis,
          valueYField: y,
          valueXField: x,
          tooltip: am5.Tooltip.new(root, {
            labelText: "x: {valueX}, y: {valueY}",
          }),
        })
      );

      series.fills.template.setAll({
        visible: true,
        fillOpacity: 0.5,
      });

      return series;
    };

    // series 생성
    const series0 = createSeries("ax", "ay", xAxis);
    const series1 = createSeries("bx", "by", yAxis);

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis,
        yAxis,
        snapToSeries: [series0, series1],
      })
    );

    cursor.lineX.set("stroke", themes.chartVariables[theme].base);
    cursor.lineY.set("stroke", themes.chartVariables[theme].base);

    // 데이터 적용
    series0.data.setAll(data);
    series1.data.setAll(data);

    // 애니메이션 적용
    series0.appear(1000);
    series1.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock 
export const FillToXyCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    ax: 1,
    ay: 0.5,
    bx: 1,
    by: 2.2,
  },
  {
    ax: 2,
    ay: 1.3,
    bx: 2,
    by: 4.9,
  },
  {
    ax: 3,
    ay: 2.3,
    bx: 3,
    by: 5.1,
  },
  {
    ax: 4,
    ay: 2.8,
    bx: 4,
    by: 5.3,
  },
  {
    ax: 5,
    ay: 3.5,
    bx: 5,
    by: 6.1,
  },
  {
    ax: 6,
    ay: 5.1,
    bx: 6,
    by: 8.3,
  },
  {
    ax: 7,
    ay: 6.7,
    bx: 7,
    by: 10.5,
  },
  {
    ax: 8,
    ay: 8,
    bx: 8,
    by: 12.3,
  },
  {
    ax: 9,
    ay: 8.9,
    bx: 9,
    by: 14.5,
  },
  {
    ax: 10,
    ay: 9.7,
    bx: 10,
    by: 15,
  },
  {
    ax: 11,
    ay: 10.4,
    bx: 11,
    by: 18.8,
  },
  {
    ax: 12,
    ay: 11.7,
    bx: 12,
    by: 25,
  },
];

// FillToXyChart
export default function FillToXyChart() {
  const id = "fill-xy";
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

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelY: "none",
        paddingBottom: 8,
      })
    );

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        strictMinMax: true,
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
        tooltip: am5.Tooltip.new(root, {
          themeTags: ["axis"],
          animationDuration: 300,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        strictMinMax: true,
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {
          themeTags: ["axis"],
          animationDuration: 300,
        }),
      })
    );

    // series 생성 함수
    const createSeries = (x, y, axis) => {
      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis,
          yAxis,
          baseAxis: axis,
          valueYField: y,
          valueXField: x,
          tooltip: am5.Tooltip.new(root, {
            labelText: "x: {valueX}, y: {valueY}",
          }),
        })
      );

      series.fills.template.setAll({
        visible: true,
        fillOpacity: 0.5,
      });

      return series;
    };

    // series 생성
    const series0 = createSeries("ax", "ay", xAxis);
    const series1 = createSeries("bx", "by", yAxis);

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis,
        yAxis,
        snapToSeries: [series0, series1],
      })
    );

    cursor.lineX.set("stroke", themes.chartVariables[theme].base);
    cursor.lineY.set("stroke", themes.chartVariables[theme].base);

    // 데이터 적용
    series0.data.setAll(data);
    series1.data.setAll(data);

    // 애니메이션 적용
    series0.appear(1000);
    series1.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`