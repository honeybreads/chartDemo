import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    year: "2021",
    europe: 2.5,
    namerica: 2.5,
    asia: 2.1,
    lamerica: 1,
    meast: 0.8,
    africa: 0.4,
  },
  {
    year: "2022",
    europe: 2.6,
    namerica: 2.7,
    asia: 2.2,
    lamerica: 0.5,
    meast: 0.4,
    africa: 0.3,
  },
  {
    year: "2023",
    europe: 2.8,
    namerica: 2.9,
    asia: 2.4,
    lamerica: 0.3,
    meast: 0.9,
    africa: 0.5,
  },
];

export default function ClusteredColumnChart() {
  const id = "clusted-column";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { colorSet } = themes[colorTheme];
    const colorList = colorSet(Object.keys(data).length);
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // 카테고리 필드 지정
    const categoryField = Object.keys(data[0])[0];

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
      })
    );

    // x,y축 생성
    const xRenderer = am5xy.AxisRendererX.new(root, {
      cellEndLocation: 0.9,
      cellStartLocation: 0.1,
      minorGridEnabled: true,
    });
    xRenderer.grid.template.setAll({ location: 1 });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField,
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    // legend 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        x: am5.p50,
        centerX: am5.p50,
      })
    );

    // series(막대 그래프) 생성 함수
    const makeSeries = (name) => {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: name,
          categoryXField: categoryField,
        })
      );

      series.columns.template.setAll({
        width: am5.percent(90),
        tooltipY: 0,
        strokeOpacity: 0,
        tooltipText: "{name}, {categoryX}:{valueY}",
      });

      series.appear();
      series.data.setAll(data);
      legend.data.push(series);
    };

    // 데이터의 각 필드로부터 series 생성 (첫 번째 필드는 카테고리 필드이므로 제외)
    Object.keys(data[0]).forEach((item, index) => {
      index > 0 && makeSeries(item);
    });

    // X축 데이터 적용
    xAxis.data.setAll(data);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: 340 }} />;
}
