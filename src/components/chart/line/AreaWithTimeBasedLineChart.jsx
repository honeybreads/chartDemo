import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성
const createData = (count) => {
  let value = 500;
  const data = [];
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const randomValue = () => {
    value += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    return value;
  };

  for (let i = 0; i < count; ++i) {
    date.setMinutes(date.getMinutes() + i);
    data.push({ date: date.getTime(), value: randomValue() });
  }
  return data;
};

const data = createData(500);

// AreaWithTimeBasedLineChart
export default function AreaWithTimeBasedLineChart() {
  const id = "areawithtimebased-line";
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
        panX: true,
        panY: true,
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 16,
        layout: root.verticalLayout,
      })
    );

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        groupData: true,
        maxDeviation: 0,
        endLocation:0.5,
        startLocation:0.5,
        baseInterval: { timeUnit: "minute", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          pan: "zoom",
          minGridDistance: 60,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }),
      })
    );

    xAxis.set("tooltip", am5.Tooltip.new(root, {}));
    yAxis.set("tooltip", am5.Tooltip.new(root, {}));
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // series 생성
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        name: "Series",
        valueXField: "date",
        valueYField: "value",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}",
        }),
      })
    );
    series.fills.template.setAll({ visible: true, fillOpacity: 0.3 });

    // xAxis 범위 지정 이벤트
    series.events.once("datavalidated", () => {
      const lastDate = new Date(data[data.length - 1].date);
      const firstDate = new Date(data[data.length - 100].date);
      xAxis.zoomToDates(firstDate, lastDate);
    });

    // scrollbar 생성
    const scrollbarX = am5xy.XYChartScrollbar.new(root, {
      height: 50,
      orientation: "horizontal",
    });
    scrollbarX
      .get("background")
      .setAll({ fill: themes.chartVariables[theme].scrollbar });
    chart.set("scrollbarX", scrollbarX);

    // x,y축(scrollbar) 생성
    const sbxAxis = scrollbarX.chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "minute", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          opposite: false,
          strokeOpacity: 0,
          minGridDistance: 60,
          minorGridEnabled: true,
        }),
      })
    );

    const sbyAxis = scrollbarX.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // series(scrollbar) 생성
    const sbseries = scrollbarX.chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: sbxAxis,
        yAxis: sbyAxis,
        valueXField: "date",
        valueYField: "value",
      })
    );

    // 커서 추가
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "none", xAxis })
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke", themes.chartVariables[theme].scrollChart);

    // data 적용
    series.data.setAll(data);
    sbseries.data.setAll(data);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock
export const AreaWithTimeBasedLineCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성
const createData = (count) => {
  let value = 500;
  const data = [];
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const randomValue = () => {
    value += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    return value;
  };

  for (let i = 0; i < count; ++i) {
    date.setMinutes(date.getMinutes() + i);
    data.push({ date: date.getTime(), value: randomValue() });
  }
  return data;
};

const data = createData(500);

// AreaWithTimeBasedLineChart
export default function AreaWithTimeBasedLineChart() {
  const id = "areawithtimebased-line";
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
        panX: true,
        panY: true,
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 16,
        layout: root.verticalLayout,
      })
    );

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        groupData: true,
        maxDeviation: 0,
        endLocation:0.5,
        startLocation:0.5,
        baseInterval: { timeUnit: "minute", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          pan: "zoom",
          minGridDistance: 60,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }),
      })
    );

    xAxis.set("tooltip", am5.Tooltip.new(root, {}));
    yAxis.set("tooltip", am5.Tooltip.new(root, {}));
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // series 생성
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        name: "Series",
        valueXField: "date",
        valueYField: "value",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "[bold]{name}[/]\\n{valueX.formatDate()}: {valueY}",
        }),
      })
    );
    series.fills.template.setAll({ visible: true, fillOpacity: 0.3 });

    // xAxis 범위 지정 이벤트
    series.events.once("datavalidated", () => {
      const lastDate = new Date(data[data.length - 1].date);
      const firstDate = new Date(data[data.length - 100].date);
      xAxis.zoomToDates(firstDate, lastDate);
    });

    // scrollbar 생성
    const scrollbarX = am5xy.XYChartScrollbar.new(root, {
      height: 50,
      orientation: "horizontal",
    });
    scrollbarX
      .get("background")
      .setAll({ fill: themes.chartVariables[theme].scrollbar });
    chart.set("scrollbarX", scrollbarX);

    // x,y축(scrollbar) 생성
    const sbxAxis = scrollbarX.chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "minute", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          opposite: false,
          strokeOpacity: 0,
          minGridDistance: 60,
          minorGridEnabled: true,
        }),
      })
    );

    const sbyAxis = scrollbarX.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // series(scrollbar) 생성
    const sbseries = scrollbarX.chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: sbxAxis,
        yAxis: sbyAxis,
        valueXField: "date",
        valueYField: "value",
      })
    );

    // 커서 추가
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "none", xAxis })
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke", themes.chartVariables[theme].scrollChart);

    // data 적용
    series.data.setAll(data);
    sbseries.data.setAll(data);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`