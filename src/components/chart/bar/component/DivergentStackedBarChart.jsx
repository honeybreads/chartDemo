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
    category: "Search engines",
    negative1: -0.1,
    negative2: -0.9,
    positive1: 5,
    positive2: 94,
  },
  {
    category: "Online encyclopedias",
    negative1: -2,
    negative2: -4,
    positive1: 19,
    positive2: 75,
  },
  {
    category: "Peers",
    negative1: -2,
    negative2: -10,
    positive1: 46,
    positive2: 42,
  },
  {
    category: "Social media",
    negative1: -2,
    negative2: -13,
    positive1: 33,
    positive2: 52,
  },
  {
    category: "Study guides",
    negative1: -6,
    negative2: -19,
    positive1: 34,
    positive2: 41,
  },
  {
    category: "News websites",
    negative1: -3,
    negative2: -23,
    positive1: 49,
    positive2: 25,
  },
  {
    category: "Textbooks",
    negative1: -5,
    negative2: -28,
    positive1: 49,
    positive2: 18,
  },
  {
    category: "Librarian",
    negative1: -14,
    negative2: -34,
    positive1: 37,
    positive2: 16,
  },
  {
    category: "Printed books",
    negative1: -9,
    negative2: -41,
    positive1: 38,
    positive2: 12,
  },
  {
    category: "Databases",
    negative1: -18,
    negative2: -36,
    positive1: 29,
    positive2: 17,
  },
  {
    category: "Student search engines",
    negative1: -17,
    negative2: -39,
    positive1: 34,
    positive2: 10,
  },
];

// DivergentStackedBarChart
export default function DivergentStackedBarChart() {
  const id = "divergent-bar";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);

    // 개별 반응형 설정 
    const responsive = am5themes_Responsive.newEmpty(root);
    responsive.addRule({
      relevant: am5themes_Responsive.widthL,
      applying: () => {
        chart.setAll({ layout: root.verticalLayout });
        legend.setAll({
          y: am5.p100,
          centerY: am5.p100,
          marginLeft: 0,
          layout: root.horizontalLayout,
        });
      },
      removing: () => {
        chart.setAll({ layout: root.horizontalLayout });
        legend.setAll({
          y: am5.p50,
          centerY: am5.p50,
          marginLeft: 20,
          layout: root.verticalLayout,
        });
      },
    });
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        paddingRight: 0,
        arrangeTooltips: false,
        layout: root.horizontalLayout,
      })
    );
    root.numberFormatter.set("numberFormat", "#.#s'%");

    // legend 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        y: am5.p50,
        centerY: am5.p50,
        marginLeft: 20,
        layout: root.verticalLayout,
      })
    );

    // X,Y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: true,
          cellEndLocation: 0.9,
          cellStartLocation: 0.1,
          minGridDistance: 20,
          minorGridEnabled: true,
        }),
      })
    );

    yAxis.get("renderer").axisFills.template.setAll({
      visible: true,
      fillOpacity: 0.05,
      fill: am5.color(0x000000),
    });

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        calculateTotals: true,
        max: 100,
        min: -100,
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 50,
        }),
      })
    );

    // series 생성 함수
    const createSeries = (field, name, color) => {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          xAxis,
          yAxis,
          name: name,
          fill: color,
          stroke: color,
          stacked: true,
          valueXField: field,
          categoryYField: "category",
          calculateAggregates: true,
          sequencedInterpolation: true,
        })
      );

      series.columns.template.setAll({
        height: am5.p100,
        cornerRadiusBL: 0,
        cornerRadiusBR: 0,
        cornerRadiusTL: 0,
        cornerRadiusTR: 0,
      });

      series.data.setAll(data);
      series.appear();

      return series;
    };

    //color
    const colNegative = themes[colorTheme].state.negative;
    const colPositive = themes[colorTheme].state.positive;

    // series 생성
    createSeries(
      "negative2",
      "Unlikely",
      am5.Color.lighten(am5.color(colNegative), 0.2)
    );
    createSeries("negative1", "Never", colNegative);
    createSeries(
      "positive1",
      "Sometimes",
      am5.Color.lighten(am5.color(colPositive), 0.2)
    );
    createSeries("positive2", "Very often", colPositive);

    // 데이터터 적용
    legend.data.setAll(chart.series.values);
    yAxis.data.setAll(data);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
