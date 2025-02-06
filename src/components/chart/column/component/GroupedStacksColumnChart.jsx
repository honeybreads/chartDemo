import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = (() => {
  const list = [
    {
      category: "",
    },
    {
      category: "g1-2021",
      s10: 20,
      s11: 12,
    },
    {
      category: "g1-2022",
      s10: 15,
      s11: 8,
    },
    {
      category: "g1-2023",
      s10: 12,
      s11: 16,
    },
    {
      category: "g1-2024",
      s10: 9,
      s11: 12,
    },
    {
      category: "",
    },
    {
      category: "g2-2021",
      s20: 15,
      s21: 16,
    },
    {
      category: "g2-2022",
      s20: 20,
      s21: 6,
    },
    {
      category: "g2-2023",
      s20: 14,
      s21: 11,
    },
    {
      category: "g2-2024",
      s20: 19,
      s21: 12,
    },
    {
      category: "",
    },
    {
      category: "g3-2021",
      s30: 5,
      s31: 10,
    },
    {
      category: "g3-2022",
      s30: 7,
      s31: 12,
    },
    {
      category: "g3-2023",
      s30: 15,
      s31: 10,
    },
    {
      category: "g3-2024",
      s30: 13,
      s31: 14,
    },
  ];

  return {
    list,
    grouped: Array.from(new Set(list.flatMap(Object.keys))),
  };
})();

export default function GroupedStacksColumnChart() {
  const id = "groupedstacks-column";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // 카테고리 필드 지정
    const categoryField = Object.keys(data.list[0])[0];

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

    // legend 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        x: am5.p50,
        centerX: am5.p50,
      })
    );

    // x,y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField,
        renderer: am5xy.AxisRendererX.new(root, {
          cellStartLocation: 0.1,
          cellEndLocation: 0.9,
          minGridDistance: 10,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis
      .get("renderer")
      .labels.template.adapters.add("text", (text, target) => {
        if (target.dataItem) {
          return target.dataItem.get("category").split("-")[1];
        }
        return text;
      });

    xAxis.get("renderer").grid.template.set("forceHidden", true);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // series(바 차트) 생성
    const makeSeries = (name) => {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          stacked: true,
          valueYField: name,
          categoryXField: categoryField,
        })
      );

      series.columns.template.setAll({
        width: am5.percent(90),
        tooltipY: 0,
        cornerRadiusTL: 0,
        cornerRadiusTR: 0,
        tooltipText: "{name}, {categoryX}:{valueY}",
      });

      series.appear();
      series.data.setAll(data.list);
      legend.data.push(series);
    };

    // series 생성 (첫 번째 필드는 카테고리 필드이므로 제외)
    data.grouped.forEach((item, index) => {
      index > 0 && makeSeries(item);
    });

    // X축 데이터 적용
    xAxis.data.setAll(data.list);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: 340, minWidth: 520 }} />;
}
