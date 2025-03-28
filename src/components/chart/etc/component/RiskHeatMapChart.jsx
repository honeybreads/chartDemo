import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = {
  category: [
    { category: "Critical" },
    { category: "Bad" },
    { category: "Medium" },
    { category: "Good" },
    { category: "Very good" },
  ],
  list: [
    {
      y: "Critical",
      x: "Very good",
      value: 20,
    },
    {
      y: "Bad",
      x: "Very good",
      value: 15,
    },
    {
      y: "Medium",
      x: "Very good",
      value: 25,
    },
    {
      y: "Good",
      x: "Very good",
      value: 15,
    },
    {
      y: "Very good",
      x: "Very good",
      value: 12,
    },
    {
      y: "Critical",
      x: "Good",
      value: 30,
    },
    {
      y: "Bad",
      x: "Good",
      value: 24,
    },
    {
      y: "Medium",
      x: "Good",
      value: 25,
    },
    {
      y: "Good",
      x: "Good",
      value: 15,
    },
    {
      y: "Very good",
      x: "Good",
      value: 25,
    },
    {
      y: "Critical",
      x: "Medium",
      value: 33,
    },
    {
      y: "Bad",
      x: "Medium",
      value: 14,
    },
    {
      y: "Medium",
      x: "Medium",
      value: 20,
    },
    {
      y: "Good",
      x: "Medium",
      value: 19,
    },
    {
      y: "Very good",
      x: "Medium",
      value: 25,
    },
    {
      y: "Critical",
      x: "Bad",
      value: 31,
    },
    {
      y: "Bad",
      x: "Bad",
      value: 24,
    },
    {
      y: "Medium",
      x: "Bad",
      value: 25,
    },
    {
      y: "Good",
      x: "Bad",
      value: 15,
    },
    {
      y: "Very good",
      x: "Bad",
      value: 15,
    },
    {
      y: "Critical",
      x: "Critical",
      value: 12,
    },
    {
      y: "Bad",
      x: "Critical",
      value: 14,
    },
    {
      y: "Medium",
      x: "Critical",
      value: 15,
    },
    {
      y: "Good",
      x: "Critical",
      value: 25,
    },
    {
      y: "Very good",
      x: "Critical",
      value: 19,
    },
  ],
};

// RiskHeatMapChart
export default function RiskHeatMapChart() {
  const id = "risk-heatmap";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // 값 가져오기
    const { category, list } = data;

    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary, state } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);
    const bgColors = [
      state.critical,
      state.major,
      state.minor,
      state.warning,
      state.normal,
    ];

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        layout: root.verticalLayout,
      })
    );
    chart.plotContainer.get("background").set("visible", false);

    // X축 및 Y축 생성 함수
    const createAxes = (type) => {
      const axisOption = type === "x" ? chart.xAxes : chart.yAxes;
      const renderOption =
        type === "x" ? am5xy.AxisRendererX : am5xy.AxisRendererY;

      const renderer = renderOption.new(root, {
        visible: false,
        minGridDistance: 20,
        inversed: true,
        minorGridEnabled: true,
      });

      const axis = axisOption.push(
        am5xy.CategoryAxis.new(root, {
          renderer: renderer,
          categoryField: "category",
        })
      );

      renderer.grid.template.set("visible", false);
      return axis;
    };

    const yAxis = createAxes("y");
    const xAxis = createAxes("x");

    // series 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        clustered: false,
        valueField: "value",
        categoryXField: "x",
        categoryYField: "y",
        calculateAggregates: true,
        stroke: themes.chartVariables[theme].line,
      })
    );

    series.columns.template.setAll({
      strokeWidth: 2,
      strokeOpacity: 1,
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      cornerRadiusBL: 5,
      cornerRadiusBR: 5,
      tooltipY: 20,
      tooltipText: "{value}",
      width: am5.percent(100),
      height: am5.percent(100),
      templateField: "columnSettings",
    });

    const circleTemplate = am5.Template.new({});
    series.set("heatRules", [
      {
        target: circleTemplate,
        min: 10,
        max: 25,
        key: "radius",
        dataField: "value",
      },
    ]);

    series.bullets.push(() => {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(
          root,
          {
            fillOpacity: 0.5,
            strokeOpacity: 0,
            fill: am5.color(0x000000),
          },
          circleTemplate
        ),
      });
    });

    series.bullets.push(() => {
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          fontSize: 10,
          text: "{value}",
          centerX: am5.p50,
          centerY: am5.p50,
          populateText: true,
          fill: am5.color(0xffffff),
        }),
      });
    });

    // 카테고리
    const categoryList = category;
    const categorValues = [...categoryList.map((item) => item.category)];

    // 데이터 컬러 매칭
    const getColor = (x, y) => {
      const colorMapping = {
        Critical: [
          bgColors[0],
          bgColors[0],
          bgColors[0],
          bgColors[1],
          bgColors[1],
        ],
        Bad: [bgColors[0], bgColors[0], bgColors[1], bgColors[2], bgColors[3]],
        Medium: [
          bgColors[1],
          bgColors[1],
          bgColors[2],
          bgColors[3],
          bgColors[3],
        ],
        Good: [bgColors[1], bgColors[2], bgColors[3], bgColors[4], bgColors[4]],
        "Very good": [
          bgColors[2],
          bgColors[3],
          bgColors[4],
          bgColors[4],
          bgColors[4],
        ],
      };
      const yLevels = categorValues;
      const yIndex = yLevels.indexOf(y);

      return colorMapping[x]?.[yIndex] || bgColors[0];
    };

    // 데이터 매핑 및 컬럼 설정
    list.forEach((item) => {
      if (categorValues.includes(item.x)) {
        item.columnSettings = { fill: getColor(item.x, item.y) };
      }
    });

    // 데이터 적용
    series.data.setAll(list);
    yAxis.data.setAll(categoryList);
    xAxis.data.setAll(categoryList);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
