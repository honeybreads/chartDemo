import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    name: "Democratic",
    data: [
      { x: "1", y: "1" },
      { x: "1", y: "2" },
      { x: "1", y: "3" },
      { x: "1", y: "4" },
      { x: "1", y: "5" },
      { x: "1", y: "6" },
      { x: "1", y: "7" },
      { x: "1", y: "8" },
      { x: "1", y: "9" },
      { x: "1", y: "10" },
      { x: "2", y: "1" },
      { x: "2", y: "2" },
      { x: "2", y: "3" },
    ],
  },
  {
    name: "Republican",
    data: [
      { x: "2", y: "4" },
      { x: "2", y: "5" },
      { x: "2", y: "6" },
      { x: "2", y: "7" },
      { x: "2", y: "8" },
      { x: "2", y: "9" },
      { x: "2", y: "10" },
      { x: "3", y: "1" },
      { x: "3", y: "2" },
      { x: "3", y: "3" },
      { x: "3", y: "4" },
    ],
  },
  {
    name: "Libertarian",
    data: [
      { x: "3", y: "5" },
      { x: "3", y: "6" },
      { x: "3", y: "7" },
      { x: "3", y: "8" },
      { x: "3", y: "9" },
      { x: "3", y: "10" },
    ],
  },
];

//BasicWaffleChart
export default function BasicWaffleChart() {
  const id = "basic-waffle";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([myTheme]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        layout: root.verticalLayout,
      })
    );

    // 범례 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        stateAnimationDuration: 0,
      })
    );

    // X축 및 Y축 생성 함수
    const createAxes = (type) => {
      const axisOption = type === "x" ? chart.xAxes : chart.yAxes;
      const renderOption =
        type === "x" ? am5xy.AxisRendererX : am5xy.AxisRendererY;

      const renderer = renderOption.new(root, {
        minorGridEnabled: true,
        minGridDistance: 10,
      });
      renderer.labels.template.set("forceHidden", true);

      const axis = axisOption.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: type,
          renderer: renderer,
        })
      );
      return axis;
    };

    // X축 및 Y축 생성
    const xAxis = createAxes("x");
    const yAxis = createAxes("y");

    // Grid 데이터 생성 및 적용
    const createGridData = (count, field) =>
      Array.from({ length: count }, (_, i) => ({ [field]: i + 1 }));

    const gridData = {
      x: createGridData(10, "x"), // X축 그리드 데이터
      y: createGridData(10, "y"), // Y축 그리드 데이터
    };

    xAxis.data.setAll(gridData.x);
    yAxis.data.setAll(gridData.y);

    // series 생성 함수
    const makeSeries = (name, index) => {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          xAxis,
          yAxis,
          categoryYField: "y",
          openCategoryYField: "y",
          categoryXField: "x",
          openCategoryXField: "x",
          clustered: false,
        })
      );

      series.columns.template.setAll({
        width: am5.percent(100),
        height: am5.percent(100),
        stroke: am5.color("#fff"),
        strokeOpacity: 0.5,
        fill: colorList[index],
        cornerRadiusTL: 0,
        cornerRadiusTR: 0,
      });

      series.setAll({ stateAnimationDuration: 0 });
      legend.data.push(series);
      return series;
    };

    // series 생성
    data.forEach((item, index) => {
      const series = makeSeries(item.name, index);
      series.data.setAll(item.data);
    });

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
