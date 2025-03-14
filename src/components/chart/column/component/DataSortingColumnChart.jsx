import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "USA",
    value: 2025,
  },
  {
    category: "China",
    value: 1882,
  },
  {
    category: "Japan",
    value: 1809,
  },
  {
    category: "Germany",
    value: 1322,
  },
  {
    category: "UK",
    value: 1122,
  },
  {
    category: "France",
    value: 1114,
  },
  {
    category: "India",
    value: 984,
  },
  {
    category: "Spain",
    value: 711,
  },
  {
    category: "Netherlands",
    value: 665,
  },
  {
    category: "South Korea",
    value: 443,
  },
  {
    category: "Canada",
    value: 441,
  },
];

// DataSortingColumnChart
export default function DataSortingColumnChart() {
  const id = "datasorting-column";
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
        panX: true,
        panY: true,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
      })
    );
    chart.zoomOutButton.set("forceHidden", true);

    // x,y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "category",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 20,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      centerX: 0,
      rotation: -90,
      centerY: am5.p50,
      paddingRight: 10,
    });

    xAxis.get("renderer").grid.template.set("visible", false);

    // series 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueYField: "value",
        categoryXField: "category",
      })
    );

    series.columns.template.adapters.add("fill", (_, target) =>
      chart.get("colors").getIndex(series.columns.indexOf(target))
    );

    // 컬럼 내부 텍스트 레이블 추가
    series.bullets.push((_, series, dataItem) => {
      const index = series.dataItems.indexOf(dataItem);
      const fill = am5.Color.alternative(
        am5.color(colorList[index]),
        am5.color("#FFF"),
        am5.color("#000")
      );

      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: am5.Label.new(root, {
          centerY: 0,
          centerX: am5.p50,
          populateText: true,
          text: "{valueYWorking.formatNumber('#.')}",
          fill,
        }),
      });
    });

    // 특정 카테고리에 대한 Series 데이터 아이템 가져오기
    const getSeriesItem = (category) => {
      return series.dataItems.find(
        (item) => item.get("categoryX") === category
      );
    };

    // x축 데이터 정렬 함수
    const sortCategoryAxis = () => {
      series.dataItems.sort((a, b) => b.get("valueY") - a.get("valueY"));

      am5.array.each(xAxis.dataItems, (dataItem) => {
        const seriesDataItem = getSeriesItem(dataItem.get("category"));
        if (seriesDataItem) {
          const index = series.dataItems.indexOf(seriesDataItem);
          const deltaPosition =
            (index - dataItem.get("index", 0)) / series.dataItems.length;

          dataItem.set("index", index);
          dataItem.set("deltaPosition", -deltaPosition);
          dataItem.animate({
            to: 0,
            duration: 1000,
            key: "deltaPosition",
            easing: am5.ease.out(am5.ease.cubic),
          });
        }
      });

      xAxis.dataItems.sort((a, b) => a.get("index") - b.get("index"));
    };

    // 데이터 업데이트 함수
    const updateData = () => {
      am5.array.each(series.dataItems, (dataItem) => {
        let value =
          dataItem.get("valueY") + Math.round(Math.random() * 300 - 150);
        if (value < 0) value = 10;

        dataItem.set("valueY", value);
        dataItem.animate({
          key: "valueYWorking",
          to: value,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
        });
      });

      sortCategoryAxis();
    };

    // 데이터 적용
    xAxis.data.setAll(data);
    series.data.setAll(data);

    // 데이터 업데이트 반복 실행
    setInterval(updateData, 1500);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
