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

// StackedBarChart
export default function StackedBarChart() {
  const id = "stacked-bar";
  const { theme, colorTheme } = useTheme();

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
        wheelX: "panY",
        wheelY: "zoomY",
        paddingLeft: 0,
        layout: root.verticalLayout,
      })
    );

    // X,Y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        maxPrecision: 0,
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.1,
          minGridDistance: 40,
        }),
      })
    );
    
    yAxis.get("renderer").grid.template.setAll({ location: 1 });

    // legend 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        x: am5.p50,
        centerX: am5.p50,
      })
    );
    legend.valueLabels.template.setAll({width:0})

    // series 생성 함수
    const makeSeries = (name, fieldName) => {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          xAxis,
          yAxis,
          stacked: true,
          baseAxis: yAxis,
          valueXField: fieldName,
          categoryYField: "year",
        })
      );

      series.columns.template.setAll({
        strokeOpacity:1,
        cornerRadiusBL: 0,
        cornerRadiusBR: 0,
        cornerRadiusTL: 0,
        cornerRadiusTR: 0,
        tooltipY: am5.percent(90),
        tooltipText: "{name}, {categoryY}: {valueX}",
      });

      series.bullets.push((_, cols) => {
        const fill = themes.createAlternative(cols.get("fill"));
        return am5.Bullet.new(root, {
          sprite: am5.Label.new(root, {
            fill,
            text: "{valueX}",
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true,
          }),
        });
      });

      series.data.setAll(data);
      legend.data.push(series);
      series.appear();
    };

    // series 생성
    // 첫번째 항목은 카테고리로 제외
    Object.keys(data[0]).map((item, index) => {
      index !== 0 && makeSeries(item, item);
    });

    // 데이터 적용
    yAxis.data.setAll(data);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
