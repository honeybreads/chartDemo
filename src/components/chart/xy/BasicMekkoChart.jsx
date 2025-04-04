import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

const data = [
  {
    name: "Trucks",
    list: [
      { ax: 0, ay: 20 },
      { ax: 30, ay: 10 },
      { ax: 40, ay: 35 },
      { ax: 55, ay: 43 },
      { ax: 80, ay: 33 },
      { ax: 100, ay: 33 },
    ],
  },
  {
    name: "SUVs",
    list: [
      { ax: 0, ay: 10 },
      { ax: 30, ay: 39 },
      { ax: 40, ay: 22 },
      { ax: 55, ay: 26 },
      { ax: 80, ay: 15 },
      { ax: 100, ay: 15 },
    ],
  },
  {
    name: "Cars",
    list: [
      { ax: 0, ay: 25 },
      { ax: 30, ay: 25 },
      { ax: 40, ay: 22 },
      { ax: 55, ay: 19 },
      { ax: 80, ay: 30 },
      { ax: 100, ay: 30 },
    ],
  },
];

// BasicMekkoChart
export default function BasicMekkoChart() {
  const id = "mekko-xy";
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
        wheelX: false,
        wheelY: false,
        paddingLeft: 0,
        paddingBottom:0,
        layout: root.verticalLayout,
      })
    );

    // 범례 생성
    const legend = chart.children.push(
      am5.Legend.new(root, { centerX: am5.p50, x: am5.p50,marginTop:8 })
    );

    legend.valueLabels.template.set("width",0)

    // X축 및 Y축 생성 함수
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // series 생성 함수
    const createSeries = (name, data) => {
      const series = chart.series.push(
        am5xy.StepLineSeries.new(root, {
          name,
          xAxis,
          yAxis,
          stacked: true,
          baseAxis: xAxis,
          valueYField: "ay",
          valueXField: "ax",
        })
      );

      series.strokes.template.setAll({ strokeWidth: 3 });
      series.fills.template.setAll({
        fillOpacity: 0.2,
        visible: true,
      });

      // 불렛(value) 생성
      const bulletSeries = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          xAxis,
          yAxis,
          stacked: true,
          baseAxis: xAxis,
          valueYField: "ay",
          valueXField: "ax",
        })
      );

      bulletSeries.columns.template.setAll({ forceHidden: true });

      const bulletSeriesData = [];
      data.map((item, i) => {
        if (i > 0) {
          const prev = data[i - 1];
          bulletSeriesData.push({
            ay: prev.ay,
            ax: item.ax - (item.ax - prev.ax) / 2,
          });
        }
      });

      bulletSeries.data.setAll(bulletSeriesData);
      bulletSeries.bullets.push(() => {
        return am5.Bullet.new(root, {
          locationX: 0.5,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            text: "{valueY}",
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true,
            paddingTop:4,
            paddingLeft:8,
            paddingRight:8,
            paddingBottom:4,
            background: am5.RoundedRectangle.new(root, {
              fill: themes.chartVariables[theme].bg,
            }),
          }),
        });
      });

      series.on("visible", (visible) => {
        visible ? bulletSeries.show() : bulletSeries.hide();
      });

      series.data.setAll(data);
      legend.data.push(series);
      series.appear();
    };

    // series 생성
    data.map((item) => createSeries(item.name, item.list));

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock 
export const BasicMekkoCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

const data = [
  {
    name: "Trucks",
    list: [
      { ax: 0, ay: 20 },
      { ax: 30, ay: 10 },
      { ax: 40, ay: 35 },
      { ax: 55, ay: 43 },
      { ax: 80, ay: 33 },
      { ax: 100, ay: 33 },
    ],
  },
  {
    name: "SUVs",
    list: [
      { ax: 0, ay: 10 },
      { ax: 30, ay: 39 },
      { ax: 40, ay: 22 },
      { ax: 55, ay: 26 },
      { ax: 80, ay: 15 },
      { ax: 100, ay: 15 },
    ],
  },
  {
    name: "Cars",
    list: [
      { ax: 0, ay: 25 },
      { ax: 30, ay: 25 },
      { ax: 40, ay: 22 },
      { ax: 55, ay: 19 },
      { ax: 80, ay: 30 },
      { ax: 100, ay: 30 },
    ],
  },
];

// BasicMekkoChart
export default function BasicMekkoChart() {
  const id = "mekko-xy";
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
        wheelX: false,
        wheelY: false,
        paddingLeft: 0,
        paddingBottom:0,
        layout: root.verticalLayout,
      })
    );

    // 범례 생성
    const legend = chart.children.push(
      am5.Legend.new(root, { centerX: am5.p50, x: am5.p50,marginTop:8 })
    );

    legend.valueLabels.template.set("width",0)

    // X축 및 Y축 생성 함수
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // series 생성 함수
    const createSeries = (name, data) => {
      const series = chart.series.push(
        am5xy.StepLineSeries.new(root, {
          name,
          xAxis,
          yAxis,
          stacked: true,
          baseAxis: xAxis,
          valueYField: "ay",
          valueXField: "ax",
        })
      );

      series.strokes.template.setAll({ strokeWidth: 3 });
      series.fills.template.setAll({
        fillOpacity: 0.2,
        visible: true,
      });

      // 불렛(value) 생성
      const bulletSeries = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          xAxis,
          yAxis,
          stacked: true,
          baseAxis: xAxis,
          valueYField: "ay",
          valueXField: "ax",
        })
      );

      bulletSeries.columns.template.setAll({ forceHidden: true });

      const bulletSeriesData = [];
      data.map((item, i) => {
        if (i > 0) {
          const prev = data[i - 1];
          bulletSeriesData.push({
            ay: prev.ay,
            ax: item.ax - (item.ax - prev.ax) / 2,
          });
        }
      });

      bulletSeries.data.setAll(bulletSeriesData);
      bulletSeries.bullets.push(() => {
        return am5.Bullet.new(root, {
          locationX: 0.5,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            text: "{valueY}",
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true,
            paddingTop:4,
            paddingLeft:8,
            paddingRight:8,
            paddingBottom:4,
            background: am5.RoundedRectangle.new(root, {
              fill: themes.chartVariables[theme].bg,
            }),
          }),
        });
      });

      series.on("visible", (visible) => {
        visible ? bulletSeries.show() : bulletSeries.hide();
      });

      series.data.setAll(data);
      legend.data.push(series);
      series.appear();
    };

    // series 생성
    data.map((item) => createSeries(item.name, item.list));

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`