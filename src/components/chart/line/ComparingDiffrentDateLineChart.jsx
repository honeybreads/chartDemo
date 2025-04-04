import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    date: new Date(2019, 5, 12).getTime(),
    previousDate: new Date(2019, 5, 5),
    value1: 50,
    value2: 48,
  },
  {
    date: new Date(2019, 5, 13).getTime(),
    previousDate: "2019-05-06",
    value1: 53,
    value2: 51,
  },
  {
    date: new Date(2019, 5, 14).getTime(),
    previousDate: "2019-05-07",
    value1: 56,
    value2: 58,
  },
  {
    date: new Date(2019, 5, 15).getTime(),
    previousDate: "2019-05-08",
    value1: 52,
    value2: 53,
  },
  {
    date: new Date(2019, 5, 16).getTime(),
    previousDate: "2019-05-09",
    value1: 48,
    value2: 44,
  },
  {
    date: new Date(2019, 5, 17).getTime(),
    previousDate: "2019-05-10",
    value1: 47,
    value2: 42,
  },
  {
    date: new Date(2019, 5, 18).getTime(),
    previousDate: "2019-05-11",
    value1: 59,
    value2: 55,
  },
];

// ComparingDiffrentDateLineChart
export default function ComparingDiffrentDateLineChart() {
  const id = "comparingdiffrentdate-line";
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
    root.dateFormatter.setAll({
      dateFormat: "yyyy-MM-dd",
      dateFields: ["valueX"],
    });

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingTop:32,
        paddingLeft: 0,
      })
    );

    // 커서 추가
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "none" })
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke", themes.chartVariables[theme].base);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0,
        tooltip: am5.Tooltip.new(root, {}),
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // series 생성
    const seriesOptions = {
      xAxis,
      yAxis,
      valueXField: "date",
    };
    
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        ...seriesOptions,
        name: "Series 1",
        valueYField: "value1",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueX}: {valueY}\n{previousDate}: {value2}",
        }),
      })
    );

    const series2 = chart.series.push(
      am5xy.LineSeries.new(root, {
        ...seriesOptions,
        name: "Series 2",
        valueYField: "value2",
      })
    );

    series2.strokes.template.setAll({
      strokeDasharray: [2, 2],
    });

    // data 적용
    series.data.setAll(data);
    series2.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock 
export const ComparingDiffrentDateLineCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    date: new Date(2019, 5, 12).getTime(),
    previousDate: new Date(2019, 5, 5),
    value1: 50,
    value2: 48,
  },
  {
    date: new Date(2019, 5, 13).getTime(),
    previousDate: "2019-05-06",
    value1: 53,
    value2: 51,
  },
  {
    date: new Date(2019, 5, 14).getTime(),
    previousDate: "2019-05-07",
    value1: 56,
    value2: 58,
  },
  {
    date: new Date(2019, 5, 15).getTime(),
    previousDate: "2019-05-08",
    value1: 52,
    value2: 53,
  },
  {
    date: new Date(2019, 5, 16).getTime(),
    previousDate: "2019-05-09",
    value1: 48,
    value2: 44,
  },
  {
    date: new Date(2019, 5, 17).getTime(),
    previousDate: "2019-05-10",
    value1: 47,
    value2: 42,
  },
  {
    date: new Date(2019, 5, 18).getTime(),
    previousDate: "2019-05-11",
    value1: 59,
    value2: 55,
  },
];

// ComparingDiffrentDateLineChart
export default function ComparingDiffrentDateLineChart() {
  const id = "comparingdiffrentdate-line";
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
    root.dateFormatter.setAll({
      dateFormat: "yyyy-MM-dd",
      dateFields: ["valueX"],
    });

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingTop:32,
        paddingLeft: 0,
      })
    );

    // 커서 추가
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "none" })
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke", themes.chartVariables[theme].base);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0,
        tooltip: am5.Tooltip.new(root, {}),
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // series 생성
    const seriesOptions = {
      xAxis,
      yAxis,
      valueXField: "date",
    };
    
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        ...seriesOptions,
        name: "Series 1",
        valueYField: "value1",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueX}: {valueY}\\n{previousDate}: {value2}",
        }),
      })
    );

    const series2 = chart.series.push(
      am5xy.LineSeries.new(root, {
        ...seriesOptions,
        name: "Series 2",
        valueYField: "value2",
      })
    );

    series2.strokes.template.setAll({
      strokeDasharray: [2, 2],
    });

    // data 적용
    series.data.setAll(data);
    series2.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`