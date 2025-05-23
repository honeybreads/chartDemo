import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    age: "91-100",
    male: -0.8,
    female: 0.8,
  },
  {
    age: "81-90",
    male: -3.4,
    female: 3.6,
  },
  {
    age: "71-80",
    male: -4.2,
    female: 4.1,
  },
  {
    age: "61-70",
    male: -5.2,
    female: 4.8,
  },
  {
    age: "51-60",
    male: -5.6,
    female: 5.1,
  },
  {
    age: "41-50",
    male: -5.1,
    female: 5.1,
  },
  {
    age: "31-40",
    male: -3.8,
    female: 3.8,
  },
  {
    age: "21-30",
    male: -3.2,
    female: 3.4,
  },
  {
    age: "11-20",
    male: -4.4,
    female: 4.1,
  },
  {
    age: "0-10",
    male: -5.0,
    female: 4.8,
  },
];

// data 컬러 샘플
const color = ["#1C8BFF", "#FF2B67"];

// NegativeStackBarChart
export default function NegativeStackBarChart() {
  const id = "negativestack-bar";
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
    const colorSet = am5.ColorSet.new(root, {
      colors: color.map((color) => am5.color(color)),
    });

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        arrangeTooltips: false,
        layout: root.verticalLayout,
      })
    );

    chart.set("colors", colorSet);
    chart.getNumberFormatter().set("numberFormat", "#.#s");

    // legend 생성
    chart.children.push(am5.Legend.new(root, { x: am5.p50, centerX: am5.p50 }));

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "zoomY" })
    );
    cursor.lineY.set("forceHidden", true);
    cursor.lineX.set("forceHidden", true);

    // X,Y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "age",
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: true,
          minGridDistance: 20,
          cellEndLocation: 0.9,
          cellStartLocation: 0.1,
          minorGridEnabled: true,
        }),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.1,
          minGridDistance: 60,
        }),
      })
    );

    // series 생성 함수
    const createSeries = (field, labelCenterX, orientation, rangeValue) => {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          xAxis,
          yAxis,
          clustered: false,
          valueXField: field,
          categoryYField: "age",
          sequencedInterpolation: true,
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: orientation,
            labelText: "{categoryY}: {valueX}",
          }),
        })
      );

      series.columns.template.setAll({
        opacity: 0.8,
        height: am5.p100,
        strokeWidth:1,
        strokeOpacity:1,
        cornerRadiusBL: 0,
        cornerRadiusBR: 0,
        cornerRadiusTL: 0,
        cornerRadiusTR: 0,
      });

      series.bullets.push(() => {
        return am5.Bullet.new(root, {
          locationX: 1,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            layer: 2,
            text: "{valueX}",
            centerY: am5.p50,
            populateText: true,
            centerX: labelCenterX,
          }),
        });
      });

      const rangeDataItem = xAxis.makeDataItem({ value: rangeValue });
      xAxis.createAxisRange(rangeDataItem);
      rangeDataItem.get("grid").setAll({
        layer: 2,
        strokeOpacity: 1,
        stroke: series.get("fill"),
      });

      const label = rangeDataItem.get("label");
      label.setAll({
        centerY:-3,
        fontSize: "1em",
        fontWeight: 600,
        maxWidth: "auto",
        isMeasured: false,
        fill: series.get("fill"),
        text: field.toUpperCase(),
      });

      label.adapters.add("dy", () => -chart.plotContainer.height());
      series.data.setAll(data);
      return series;
    };

    // series 생성
    createSeries("male", am5.p100, "right", -4);
    createSeries("female", 0, "left", 4);

    // 데이터 적용
    yAxis.data.setAll(data);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock
export const NegativeStackBarCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    age: "91-100",
    male: -0.8,
    female: 0.8,
  },
  {
    age: "81-90",
    male: -3.4,
    female: 3.6,
  },
  {
    age: "71-80",
    male: -4.2,
    female: 4.1,
  },
  {
    age: "61-70",
    male: -5.2,
    female: 4.8,
  },
  {
    age: "51-60",
    male: -5.6,
    female: 5.1,
  },
  {
    age: "41-50",
    male: -5.1,
    female: 5.1,
  },
  {
    age: "31-40",
    male: -3.8,
    female: 3.8,
  },
  {
    age: "21-30",
    male: -3.2,
    female: 3.4,
  },
  {
    age: "11-20",
    male: -4.4,
    female: 4.1,
  },
  {
    age: "0-10",
    male: -5.0,
    female: 4.8,
  },
];

// data 컬러 샘플
const color = ["#1C8BFF", "#FF2B67"];

// NegativeStackBarChart
export default function NegativeStackBarChart() {
  const id = "negativestack-bar";
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
    const colorSet = am5.ColorSet.new(root, {
      colors: color.map((color) => am5.color(color)),
    });

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        arrangeTooltips: false,
        layout: root.verticalLayout,
      })
    );

    chart.set("colors", colorSet);
    chart.getNumberFormatter().set("numberFormat", "#.#s");

    // legend 생성
    chart.children.push(am5.Legend.new(root, { x: am5.p50, centerX: am5.p50 }));

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "zoomY" })
    );
    cursor.lineY.set("forceHidden", true);
    cursor.lineX.set("forceHidden", true);

    // X,Y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "age",
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: true,
          minGridDistance: 20,
          cellEndLocation: 0.9,
          cellStartLocation: 0.1,
          minorGridEnabled: true,
        }),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.1,
          minGridDistance: 60,
        }),
      })
    );

    // series 생성 함수
    const createSeries = (field, labelCenterX, orientation, rangeValue) => {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          xAxis,
          yAxis,
          clustered: false,
          valueXField: field,
          categoryYField: "age",
          sequencedInterpolation: true,
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: orientation,
            labelText: "{categoryY}: {valueX}",
          }),
        })
      );

      series.columns.template.setAll({
        opacity: 0.8,
        height: am5.p100,
        strokeWidth:1,
        strokeOpacity:1,
        cornerRadiusBL: 0,
        cornerRadiusBR: 0,
        cornerRadiusTL: 0,
        cornerRadiusTR: 0,
      });

      series.bullets.push(() => {
        return am5.Bullet.new(root, {
          locationX: 1,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            layer: 2,
            text: "{valueX}",
            centerY: am5.p50,
            populateText: true,
            centerX: labelCenterX,
          }),
        });
      });

      const rangeDataItem = xAxis.makeDataItem({ value: rangeValue });
      xAxis.createAxisRange(rangeDataItem);
      rangeDataItem.get("grid").setAll({
        layer: 2,
        strokeOpacity: 1,
        stroke: series.get("fill"),
      });

      const label = rangeDataItem.get("label");
      label.setAll({
        centerY:-3,
        fontSize: "1em",
        fontWeight: 600,
        maxWidth: "auto",
        isMeasured: false,
        fill: series.get("fill"),
        text: field.toUpperCase(),
      });

      label.adapters.add("dy", () => -chart.plotContainer.height());
      series.data.setAll(data);
      return series;
    };

    // series 생성
    createSeries("male", am5.p100, "right", -4);
    createSeries("female", 0, "left", 4);

    // 데이터 적용
    yAxis.data.setAll(data);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`