import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    year: "1930",
    italy: 1,
    germany: 5,
    uk: 3,
  },
  {
    year: "1934",
    italy: 1,
    germany: 2,
    uk: 6,
  },
  {
    year: "1938",
    italy: 2,
    germany: 3,
    uk: 1,
  },
  {
    year: "1950",
    italy: 3,
    germany: 4,
    uk: 1,
  },
  {
    year: "1954",
    italy: 5,
    germany: 1,
    uk: 2,
  },
  {
    year: "1958",
    italy: 3,
    germany: 2,
    uk: 1,
  },
  {
    year: "1962",
    italy: 1,
    germany: 2,
    uk: 3,
  },
  {
    year: "1966",
    italy: 2,
    germany: 1,
    uk: 5,
  },
  {
    year: "1970",
    italy: 3,
    germany: 5,
    uk: 2,
  },
  {
    year: "1974",
    italy: 4,
    germany: 3,
    uk: 6,
  },
  {
    year: "1978",
    italy: 1,
    germany: 2,
    uk: 4,
  },
];

const valueCategory = Object.keys(data[0]).splice(1);

// ReversedValueLineChart
export default function ReversedValueLineChart() {
  const id = "reversed-line";
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
        pinchZoomX: true,
        paddingBottom: 0,
        layout: root.verticalLayout,
      })
    );

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        snapTooltip: true,
        categoryField: "year",
        maxDeviation: 0,
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxPrecision: 0,
        maxDeviation: 0,
        renderer: am5xy.AxisRendererY.new(root, { inversed: true }),
      })
    );

    xAxis.get("renderer").grid.template.set("location", 0.5);
    xAxis.get("renderer").labels.template.setAll({
      location: 0.5,
      multiLocation: 0.5,
    });

    // series 생성 함수
    const createSeries = (value) => {
      const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      };

      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis,
          yAxis,
          valueYField: value,
          categoryXField: "year",
          name: capitalize(value),
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[bold]{name}[/]\n{categoryX}: {valueY}",
          }),
        })
      );

      series.bullets.push(() => {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill"),
          }),
        });
      });

      series.data.setAll(data);
    };

    // series 생성
    valueCategory.forEach((value) => createSeries(value));

    // legend 생성
    const legend = chart.children.push(
      am5.Legend.new(root, { marginTop: 8, x: am5.p50, centerX: am5.p50 })
    );
    legend.valueLabels.template.set("width", 0);

    // cursor 생성
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, { xAxis }));
    cursor.lineY.set("visible", false);
    cursor.lineX.setAll({ stroke: themes.chartVariables[theme].base });

    // data 적용
    xAxis.data.setAll(data);
    legend.data.setAll(chart.series.values);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock
export const ReversedValueLineCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    year: "1930",
    italy: 1,
    germany: 5,
    uk: 3,
  },
  {
    year: "1934",
    italy: 1,
    germany: 2,
    uk: 6,
  },
  {
    year: "1938",
    italy: 2,
    germany: 3,
    uk: 1,
  },
  {
    year: "1950",
    italy: 3,
    germany: 4,
    uk: 1,
  },
  {
    year: "1954",
    italy: 5,
    germany: 1,
    uk: 2,
  },
  {
    year: "1958",
    italy: 3,
    germany: 2,
    uk: 1,
  },
  {
    year: "1962",
    italy: 1,
    germany: 2,
    uk: 3,
  },
  {
    year: "1966",
    italy: 2,
    germany: 1,
    uk: 5,
  },
  {
    year: "1970",
    italy: 3,
    germany: 5,
    uk: 2,
  },
  {
    year: "1974",
    italy: 4,
    germany: 3,
    uk: 6,
  },
  {
    year: "1978",
    italy: 1,
    germany: 2,
    uk: 4,
  },
];

const valueCategory = Object.keys(data[0]).splice(1);

// ReversedValueLineChart
export default function ReversedValueLineChart() {
  const id = "reversed-line";
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
        pinchZoomX: true,
        paddingBottom: 0,
        layout: root.verticalLayout,
      })
    );

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        snapTooltip: true,
        categoryField: "year",
        maxDeviation: 0,
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxPrecision: 0,
        maxDeviation: 0,
        renderer: am5xy.AxisRendererY.new(root, { inversed: true }),
      })
    );

    xAxis.get("renderer").grid.template.set("location", 0.5);
    xAxis.get("renderer").labels.template.setAll({
      location: 0.5,
      multiLocation: 0.5,
    });

    // series 생성 함수
    const createSeries = (value) => {
      const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      };

      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis,
          yAxis,
          valueYField: value,
          categoryXField: "year",
          name: capitalize(value),
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[bold]{name}[/]\\n{categoryX}: {valueY}",
          }),
        })
      );

      series.bullets.push(() => {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill"),
          }),
        });
      });

      series.data.setAll(data);
    };

    // series 생성
    valueCategory.forEach((value) => createSeries(value));

    // legend 생성
    const legend = chart.children.push(
      am5.Legend.new(root, { marginTop: 8, x: am5.p50, centerX: am5.p50 })
    );
    legend.valueLabels.template.set("width", 0);

    // cursor 생성
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, { xAxis }));
    cursor.lineY.set("visible", false);
    cursor.lineX.setAll({ stroke: themes.chartVariables[theme].base });

    // data 적용
    xAxis.data.setAll(data);
    legend.data.setAll(chart.series.values);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`;
