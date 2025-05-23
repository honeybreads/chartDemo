import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성
const createData = (count) => {
  let value = 100;
  const data = [];
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const randomValue = () => {
    value = Math.round(Math.random() * 10 - 5 + value);
    return value;
  };

  for (let i = 0; i < count; ++i) {
    am5.time.add(date, "day", 1);
    data.push({ date: date.getTime(), value: randomValue() });
  }
  return data;
};

// LegendHoverLineChart
export default function LegendHoverLineChart() {
  const id = "legendhover-line";
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
        wheelX: "panX",
        wheelY: "zoomX",
        paddingRight: 0,
        pinchZoomX: true,
        maxTooltipDistance: 0,
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
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // series 생성
    for (let i = 0; i < 14; i++) {
      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis,
          yAxis,
          name: "Series " + i,
          valueXField: "date",
          valueYField: "value",
          legendValueText: "{valueY}",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
            pointerOrientation: "horizontal",
          }),
        })
      );
      series.strokes.template.setAll({ strokeWidth: 2 });
      series.data.setAll(createData(100));
      series.appear(1000);
    }

    // legend 생성
    const legend = chart.rightAxesContainer.children.push(
      am5.Legend.new(root, {
        width: 150,
        paddingLeft: 15,
        height: am5.percent(100),
      })
    );

    // legend 마우스 오버
    legend.itemContainers.template.events.on("pointerover", (e) => {
      const itemContainer = e.target;
      const series = itemContainer.dataItem.dataContext;

      chart.series.each((chartSeries) => {
        if (chartSeries != series) {
          chartSeries.strokes.template.setAll({
            strokeOpacity: 0.15,
            stroke: am5.color(0x000000),
          });
        } else {
          chartSeries.strokes.template.setAll({
            strokeWidth: 3,
          });
        }
      });
    });

    // legend 마우스 아웃
    legend.itemContainers.template.events.on("pointerout", (e) => {
      const itemContainer = e.target;
      itemContainer.dataItem.dataContext;
      chart.series.each((chartSeries) => {
        chartSeries.strokes.template.setAll({
          strokeWidth: 2,
          strokeOpacity: 1,
          stroke: chartSeries.get("fill"),
        });
      });
    });

    // legend 스타일 설정
    legend.itemContainers.template.set("width", am5.p100);
    legend.valueLabels.template.setAll({
      width: am5.p100,
      textAlign: "right",
    });
    legend.valueLabels.template.adapters.add(
      "fill",
      () => themes.chartVariables[theme].base
    );

    // 데이터 적용
    legend.data.setAll(chart.series.values);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock 
export const LegendHoverLineCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성
const createData = (count) => {
  let value = 100;
  const data = [];
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const randomValue = () => {
    value = Math.round(Math.random() * 10 - 5 + value);
    return value;
  };

  for (let i = 0; i < count; ++i) {
    am5.time.add(date, "day", 1);
    data.push({ date: date.getTime(), value: randomValue() });
  }
  return data;
};

// LegendHoverLineChart
export default function LegendHoverLineChart() {
  const id = "legendhover-line";
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
        wheelX: "panX",
        wheelY: "zoomX",
        paddingRight: 0,
        pinchZoomX: true,
        maxTooltipDistance: 0,
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
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // series 생성
    for (let i = 0; i < 14; i++) {
      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis,
          yAxis,
          name: "Series " + i,
          valueXField: "date",
          valueYField: "value",
          legendValueText: "{valueY}",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
            pointerOrientation: "horizontal",
          }),
        })
      );
      series.strokes.template.setAll({ strokeWidth: 2 });
      series.data.setAll(createData(100));
      series.appear(1000);
    }

    // legend 생성
    const legend = chart.rightAxesContainer.children.push(
      am5.Legend.new(root, {
        width: 150,
        paddingLeft: 15,
        height: am5.percent(100),
      })
    );

    // legend 마우스 오버
    legend.itemContainers.template.events.on("pointerover", (e) => {
      const itemContainer = e.target;
      const series = itemContainer.dataItem.dataContext;

      chart.series.each((chartSeries) => {
        if (chartSeries != series) {
          chartSeries.strokes.template.setAll({
            strokeOpacity: 0.15,
            stroke: am5.color(0x000000),
          });
        } else {
          chartSeries.strokes.template.setAll({
            strokeWidth: 3,
          });
        }
      });
    });

    // legend 마우스 아웃
    legend.itemContainers.template.events.on("pointerout", (e) => {
      const itemContainer = e.target;
      itemContainer.dataItem.dataContext;
      chart.series.each((chartSeries) => {
        chartSeries.strokes.template.setAll({
          strokeWidth: 2,
          strokeOpacity: 1,
          stroke: chartSeries.get("fill"),
        });
      });
    });

    // legend 스타일 설정
    legend.itemContainers.template.set("width", am5.p100);
    legend.valueLabels.template.setAll({
      width: am5.p100,
      textAlign: "right",
    });
    legend.valueLabels.template.adapters.add(
      "fill",
      () => themes.chartVariables[theme].base
    );

    // 데이터 적용
    legend.data.setAll(chart.series.values);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`