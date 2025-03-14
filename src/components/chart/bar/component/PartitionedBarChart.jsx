import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    region: "Central",
    state: "North Dakota",
    sales: 920,
  },
  {
    region: "Central",
    state: "Oklahoma",
    sales: 19686,
  },
  {
    region: "Central",
    state: "Missouri",
    sales: 22207,
  },
  {
    region: "Central",
    state: "Minnesota",
    sales: 29865,
  },
  {
    region: "Central",
    state: "Wisconsin",
    sales: 32125,
  },
  {
    region: "Central",
    state: "Indiana",
    sales: 53549,
  },
  {
    region: "Central",
    state: "Texas",
    sales: 170187,
  },
  {
    region: "East",
    state: "West Virginia",
    sales: 1209,
  },
  {
    region: "East",
    state: "Vermont",
    sales: 8929,
  },
  {
    region: "East",
    state: "Connecticut",
    sales: 13386,
  },
  {
    region: "East",
    state: "Rhode Island",
    sales: 22629,
  },
  {
    region: "East",
    state: "Maryland",
    sales: 23707,
  },
  {
    region: "East",
    state: "Delaware",
    sales: 27453,
  },
  {
    region: "East",
    state: "Massachusetts",
    sales: 28639,
  },
  {
    region: "East",
    state: "New Jersey",
    sales: 35763,
  },
  {
    region: "East",
    state: "Ohio",
    sales: 78253,
  },
  {
    region: "East",
    state: "Pennsylvania",
    sales: 116522,
  },
  {
    region: "East",
    state: "New York",
    sales: 310914,
  },
  {
    region: "South",
    state: "South Carolina",
    sales: 8483,
  },
  {
    region: "South",
    state: "Louisiana",
    sales: 9219,
  },
  {
    region: "South",
    state: "Mississippi",
    sales: 10772,
  },
  {
    region: "South",
    state: "Arkansas",
    sales: 11678,
  },
  {
    region: "South",
    state: "Alabama",
    sales: 19511,
  },
  {
    region: "South",
    state: "Tennessee",
    sales: 30662,
  },
  {
    region: "South",
    state: "Kentucky",
    sales: 36598,
  },
  {
    region: "South",
    state: "Georgia",
    sales: 49103,
  },
  {
    region: "South",
    state: "North Carolina",
    sales: 55604,
  },
  {
    region: "South",
    state: "Virginia",
    sales: 70641,
  },
  {
    region: "South",
    state: "Florida",
    sales: 89479,
  },
  {
    region: "West",
    state: "Wyoming",
    sales: 1603,
  },
  {
    region: "West",
    state: "Idaho",
    sales: 4380,
  },
  {
    region: "West",
    state: "New Mexico",
    sales: 4779,
  },
  {
    region: "West",
    state: "Montana",
    sales: 5589,
  },
  {
    region: "West",
    state: "Utah",
    sales: 11223,
  },
  {
    region: "West",
    state: "Nevada",
    sales: 16729,
  },
  {
    region: "West",
    state: "Oregon",
    sales: 17431,
  },
  {
    region: "West",
    state: "Colorado",
    sales: 32110,
  },
  {
    region: "West",
    state: "Arizona",
    sales: 35283,
  },
  {
    region: "West",
    state: "Washington",
    sales: 138656,
  },
  {
    region: "West",
    state: "California",
    sales: 457731,
  },
];

// 데이터에서 카테고리 생성
const category = [...new Set(data.map((item) => item.region))];

// PartitionedBarChart
export default function PartitionedBarChart() {
  const id = "partitione-bar";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    // 개별 반응형 설정
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
        layout: root.horizontalLayout,
      })
    );

    // legend 생성
    const legendData = [];
    const legend = chart.children.push(
      am5.Legend.new(root, {
        width: 100,
        nameField: "name",
        fillField: "color",
        strokeField: "color",
        clickTarget: "none",
        layout: root.verticalLayout,
      })
    );

    // X,Y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "state",
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 10,
          minorGridEnabled: true,
        }),
      })
    );

    yAxis.get("renderer").labels.template.setAll({
      fontSize: 11,
      location: 0.5,
    });

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { xAxis, yAxis })
    );
    cursor.lineX.setAll({ stroke: themes.chartVariables[theme].base });
    cursor.lineY.setAll({ stroke: themes.chartVariables[theme].base });

    // series 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueXField: "sales",
        categoryYField: "state",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
        }),
      })
    );

    series.columns.template.setAll({
      cornerRadiusBL: 0,
      cornerRadiusBR: 0,
      cornerRadiusTL: 0,
      cornerRadiusTR: 0,
      width: am5.percent(90),
      tooltipText: "{categoryY}: [bold]{valueX}[/]",
    });

    series.columns.template.adapters.add("fill", (fill, target) => {
      if (target.dataItem) {
        const targetEl = target.dataItem.dataContext.region;
        const targetIndex = category.indexOf(targetEl);
        if (category.find((element) => element === targetEl)) {
          return chart.get("colors").getIndex(targetIndex);
        }
      }
      return fill;
    });

    // 구분 생성 함수
    const createRange = (label, category, color) => {
      const rangeDataItem = yAxis.makeDataItem({ category: category });
      yAxis.createAxisRange(rangeDataItem);

      rangeDataItem.get("label").setAll({
        dx: -130,
        fill: color,
        text: label,
        location: 1,
        fontWeight: "bold",
      });

      rangeDataItem.get("grid").setAll({
        layer: 2,
        location: 1,
        stroke: color,
        strokeWidth: 2,
        strokeOpacity: 1,
      });

      rangeDataItem.get("tick").setAll({
        length: 130,
        location: 1,
        visible: true,
        stroke: color,
        strokeOpacity: 1,
      });

      legendData.push({ name: label, color: color });
    };

    // 각 항목의 마지막 값(예제 texas,new york...등) 배열로 생성
    const lastStates = Object.values(
      data.reduce((acc, item) => ((acc[item.region] = item), acc), {})
    ).map((item) => item.state);

    // 구분 생성
    category.forEach((item, index) => {
      createRange(item, lastStates[index], chart.get("colors").getIndex(index));
    });

    // 데이터 적용
    series.data.setAll(data);
    yAxis.data.setAll(data);
    legend.data.setAll(legendData);

    // 애니메이션 적용
    series.appear();
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
