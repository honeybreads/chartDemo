import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "Quality",
    good: -36,
    goodMax: -100,
    bad: 64,
    badMax: 100,
  },
  {
    category: "Shipping",
    good: -58,
    goodMax: -100,
    bad: 42,
    badMax: 100,
  },
  {
    category: "Support",
    good: -59,
    goodMax: -100,
    bad: 41,
    badMax: 100,
  },
  {
    category: "Price",
    good: -41,
    goodMax: -100,
    bad: 59,
    badMax: 100,
  },
  {
    category: "Convenience",
    good: -50,
    goodMax: -100,
    bad: 50,
    badMax: 100,
  },
];

// 고유 컬러, 아이콘(svg path)
const badColor = am5.color(0xf25f5c);
const goodColor = am5.color(0x247ba0);
const placeholderColor = am5.color(0xcccccc);
const iconSize = { w: 34, h: 24 };
const goodIcon =
  "M9.49958 9.27618C11.2113 8.76073 14.5559 6.33814 14.2398 0.771333C16.3466 -0.130696 19.9282 -0.00183481 17.4 7.72984C21.0869 7.21434 27.9866 7.42041 26.0905 12.3687C26.6172 14.6882 26.3275 19.7138 20.9552 21.2601C15.5829 22.8064 11.0797 20.1004 9.49958 18.554H8.31451V9.27618H9.49958Z";
const badIcon =
  "M9.49958 12.7238C11.2113 13.2393 14.5559 15.6619 14.2398 21.2287C16.3466 22.1307 19.9282 22.0018 17.4 14.2702C21.0869 14.7857 27.9866 14.5796 26.0905 9.63132C26.6172 7.31182 26.3275 2.28622 20.9552 0.739889C15.5829 -0.806446 11.0797 1.89964 9.49958 3.44598H8.31451V12.7238H9.49958Z";

//InfograpicChart
export default function InfograpicChart() {
  const id = "infograpic-xy";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    const responsive = am5themes_Responsive.newEmpty(root);
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingTop:0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom:0,
        arrangeTooltips: false,
        layout: root.horizontalLayout,
      })
    );
    chart.plotContainer.get("background").set("opacity", 0);
    root.numberFormatter.set("numberFormat", "#.#s'%");

    // legend 생성
    const legendOptions = {
      ...themes.legendBackground(root,theme),
      x: false,
      y: 20,
      centerX: false,
      centerY: 0,
      marginTop:0,
      marginLeft: 12,
      paddingLeft:0,
      paddingRight:10,
      layout: root.verticalLayout,
    }
    const legend = chart.children.push(
      am5.Legend.new(root, {...legendOptions})
    );

    legend.markers.template.setAll({
      width: iconSize.w,
      height: iconSize.h,
      paddingRight: 20,
    });

    legend.markerRectangles.template.setAll({
      width: iconSize.w,
      height: iconSize.h,
    });

    legend.valueLabels.template.set("width", 0);

    // X,Y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: true,
          cellStartLocation: 0.1,
          cellEndLocation: 0.9,
        }),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        max: 100,
        min: -100,
        calculateTotals: true,
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 80 }),
      })
    );

    xAxis.get("renderer").adapters.add("stroke", () => false);
    yAxis.get("renderer").adapters.add("stroke", () => false);
    yAxis.get("renderer").labels.template.setAll({ location: 0.5 });
    yAxis.get("renderer").grid.template.setAll({ visible: false });
    xAxis.get("renderer").grid.template.setAll({ visible: false });

    const rangeDataItem = xAxis.makeDataItem({ value: 0 });
    const range = xAxis.createAxisRange(rangeDataItem);

    range.get("grid").setAll({
      location: 1,
      visible: true,
      strokeOpacity: 1,
      stroke: themes.chartVariables[theme].grid,
    });

    // series 생성 함수
    const createSeries = (field, name, color, icon, inlegend) => {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          xAxis,
          yAxis,
          fill: color,
          stroke: color,
          valueXField: field,
          categoryYField: "category",
          sequencedInterpolation: true,
          clustered: false,
        })
      );

      series.columns.template.setAll({
        fillOpacity: 0,
        strokeOpacity: 0,
        height: iconSize.h,
      });

      if (icon) {
        series.columns.template.set(
          "fillPattern",
          am5.PathPattern.new(root, {
            color,
            width: iconSize.w,
            height: iconSize.h,
            svgPath: icon,
            fillOpacity: 0,
            repetition: "repeat-x",
          })
        );
      }

      series.data.setAll(data);
      series.appear();
      if (inlegend) legend.data.push(series);

      return series;
    };

    // series 생성
    createSeries("goodMax", "Good", placeholderColor, goodIcon, false);
    createSeries("good", "Good", goodColor, goodIcon, true);
    createSeries("badMax", "bad", placeholderColor, badIcon, false);
    createSeries("bad", "bad", badColor, badIcon, true);

    // 데이터 적용
    yAxis.data.setAll(data);

    // 애니메이션 실행
    chart.appear(1000, 100);

    // 반응형 적용
    responsive.addRule({
      relevant: am5themes_Responsive.widthL,
      applying: () => {
        chart.setAll({ layout: root.verticalLayout });
        legend.setAll({
          x: am5.p100,
          y: am5.p100,
          marginLeft:0,
          marginTop:12,
          centerX: am5.p100,
          centerY: am5.p100,
          layout: root.horizontalLayout,
        });
      },
      removing: () => {
        chart.setAll({ layout: root.horizontalLayout });
        legend.setAll({...legendOptions});
      },
    });

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock 
export const InfograpicCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "Quality",
    good: -36,
    goodMax: -100,
    bad: 64,
    badMax: 100,
  },
  {
    category: "Shipping",
    good: -58,
    goodMax: -100,
    bad: 42,
    badMax: 100,
  },
  {
    category: "Support",
    good: -59,
    goodMax: -100,
    bad: 41,
    badMax: 100,
  },
  {
    category: "Price",
    good: -41,
    goodMax: -100,
    bad: 59,
    badMax: 100,
  },
  {
    category: "Convenience",
    good: -50,
    goodMax: -100,
    bad: 50,
    badMax: 100,
  },
];

// 고유 컬러, 아이콘(svg path)
const badColor = am5.color(0xf25f5c);
const goodColor = am5.color(0x247ba0);
const placeholderColor = am5.color(0xcccccc);
const iconSize = { w: 34, h: 24 };
const goodIcon =
  "M9.49958 9.27618C11.2113 8.76073 14.5559 6.33814 14.2398 0.771333C16.3466 -0.130696 19.9282 -0.00183481 17.4 7.72984C21.0869 7.21434 27.9866 7.42041 26.0905 12.3687C26.6172 14.6882 26.3275 19.7138 20.9552 21.2601C15.5829 22.8064 11.0797 20.1004 9.49958 18.554H8.31451V9.27618H9.49958Z";
const badIcon =
  "M9.49958 12.7238C11.2113 13.2393 14.5559 15.6619 14.2398 21.2287C16.3466 22.1307 19.9282 22.0018 17.4 14.2702C21.0869 14.7857 27.9866 14.5796 26.0905 9.63132C26.6172 7.31182 26.3275 2.28622 20.9552 0.739889C15.5829 -0.806446 11.0797 1.89964 9.49958 3.44598H8.31451V12.7238H9.49958Z";

//InfograpicChart
export default function InfograpicChart() {
  const id = "infograpic-xy";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    const responsive = am5themes_Responsive.newEmpty(root);
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingTop:0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom:0,
        arrangeTooltips: false,
        layout: root.horizontalLayout,
      })
    );
    chart.plotContainer.get("background").set("opacity", 0);
    root.numberFormatter.set("numberFormat", "#.#s'%");

    // legend 생성
    const legendOptions = {
      ...themes.legendBackground(root,theme),
      y: 20,
      x: false,
      centerY: 0,
      centerX: false,
      marginTop:0,
      marginLeft: 12,
      paddingLeft:0,
      paddingRight:10,
      layout: root.verticalLayout,
    }
    const legend = chart.children.push(
      am5.Legend.new(root, {...legendOptions})
    );

    legend.markers.template.setAll({
      width: iconSize.w,
      height: iconSize.h,
      paddingRight: 20,
    });

    legend.markerRectangles.template.setAll({
      width: iconSize.w,
      height: iconSize.h,
    });

    legend.valueLabels.template.set("width", 0);

    // X,Y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: true,
          cellStartLocation: 0.1,
          cellEndLocation: 0.9,
        }),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        max: 100,
        min: -100,
        calculateTotals: true,
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 80 }),
      })
    );

    xAxis.get("renderer").adapters.add("stroke", () => false);
    yAxis.get("renderer").adapters.add("stroke", () => false);
    yAxis.get("renderer").labels.template.setAll({ location: 0.5 });
    yAxis.get("renderer").grid.template.setAll({ visible: false });
    xAxis.get("renderer").grid.template.setAll({ visible: false });

    const rangeDataItem = xAxis.makeDataItem({ value: 0 });
    const range = xAxis.createAxisRange(rangeDataItem);

    range.get("grid").setAll({
      location: 1,
      visible: true,
      strokeOpacity: 1,
      stroke: themes.chartVariables[theme].grid,
    });

    // series 생성 함수
    const createSeries = (field, name, color, icon, inlegend) => {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          xAxis,
          yAxis,
          fill: color,
          stroke: color,
          valueXField: field,
          categoryYField: "category",
          sequencedInterpolation: true,
          clustered: false,
        })
      );

      series.columns.template.setAll({
        fillOpacity: 0,
        strokeOpacity: 0,
        height: iconSize.h,
      });

      if (icon) {
        series.columns.template.set(
          "fillPattern",
          am5.PathPattern.new(root, {
            color,
            width: iconSize.w,
            height: iconSize.h,
            svgPath: icon,
            fillOpacity: 0,
            repetition: "repeat-x",
          })
        );
      }

      series.data.setAll(data);
      series.appear();
      if (inlegend) legend.data.push(series);

      return series;
    };

    // series 생성
    createSeries("goodMax", "Good", placeholderColor, goodIcon, false);
    createSeries("good", "Good", goodColor, goodIcon, true);
    createSeries("badMax", "bad", placeholderColor, badIcon, false);
    createSeries("bad", "bad", badColor, badIcon, true);

    // 데이터 적용
    yAxis.data.setAll(data);

    // 애니메이션 실행
    chart.appear(1000, 100);

    // 반응형 적용
    responsive.addRule({
      relevant: am5themes_Responsive.widthL,
      applying: () => {
        chart.setAll({ layout: root.verticalLayout });
        legend.setAll({
          x: am5.p100,
          y: am5.p100,
          marginLeft:0,
          marginTop:12,
          centerX: am5.p100,
          centerY: am5.p100,
          layout: root.horizontalLayout,
        });
      },
      removing: () => {
        chart.setAll({ layout: root.horizontalLayout });
        legend.setAll({...legendOptions});
      },
    });

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`