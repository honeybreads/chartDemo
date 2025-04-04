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
];

// DataSortingBarChart
export default function DataSortingBarChart() {
  const id = "datasorting-bar";
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

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
      })
    );
    chart.zoomOutButton.set("forceHidden", true);

    // x,y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 40 }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        min: 0,
        maxDeviation: 0.3,
        categoryField: "category",
        renderer: am5xy.AxisRendererY.new(root, { minGridDistance: 30 }),
      })
    );

    // series 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueXField: "value",
        categoryYField: "category",
      })
    );

    series.columns.template.setAll({
      cornerRadiusBL: 0,
      cornerRadiusTL: 0,
      cornerRadiusTR: themes.chartVariables.default.barRadius,
      cornerRadiusBR: themes.chartVariables.default.barRadius,
    });

    series.columns.template.adapters.add("fill", (_, target) =>
      chart.get("colors").getIndex(series.columns.indexOf(target))
    );

    // 특정 카테고리에 대한 Series 데이터 아이템 가져오기
    const getSeriesItem = (category) => {
      return series.dataItems.find(
        (item) => item.get("categoryY") === category
      );
    };

    // 축 데이터 정렬 함수
    const sortCategoryAxis = () => {
      series.dataItems.sort((a, b) => a.get("valueX") - b.get("valueX"));
      am5.array.each(yAxis.dataItems, (dataItem) => {
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
      yAxis.dataItems.sort((a, b) => a.get("index") - b.get("index"));
    };

    // 데이터 업데이트 함수
    const updateData = () => {
      am5.array.each(series.dataItems, (dataItem) => {
        let value =
          dataItem.get("valueX") + Math.round(Math.random() * 300 - 150);
        if (value < 0) value = 10;

        dataItem.set("valueX", value);
        dataItem.animate({
          key: "valueXWorking",
          to: value,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
        });
      });
      sortCategoryAxis();
    };
    const DataSort = () => data.sort((a, b) => a.value - b.value);

    // 데이터 적용
    DataSort();
    yAxis.data.setAll(data);
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

// codeblock
export const DataSortingBarCodeblock = `import * as am5 from "@amcharts/amcharts5";
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
];

// DataSortingBarChart
export default function DataSortingBarChart() {
  const id = "datasorting-bar";
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

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
      })
    );
    chart.zoomOutButton.set("forceHidden", true);

    // x,y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 40 }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        min: 0,
        maxDeviation: 0.3,
        categoryField: "category",
        renderer: am5xy.AxisRendererY.new(root, { minGridDistance: 30 }),
      })
    );

    // series 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueXField: "value",
        categoryYField: "category",
      })
    );

    series.columns.template.setAll({
      cornerRadiusBL: 0,
      cornerRadiusTL: 0,
      cornerRadiusTR: themes.chartVariables.default.barRadius,
      cornerRadiusBR: themes.chartVariables.default.barRadius,
    });

    series.columns.template.adapters.add("fill", (_, target) =>
      chart.get("colors").getIndex(series.columns.indexOf(target))
    );

    // 특정 카테고리에 대한 Series 데이터 아이템 가져오기
    const getSeriesItem = (category) => {
      return series.dataItems.find(
        (item) => item.get("categoryY") === category
      );
    };

    // 축 데이터 정렬 함수
    const sortCategoryAxis = () => {
      series.dataItems.sort((a, b) => a.get("valueX") - b.get("valueX"));
      am5.array.each(yAxis.dataItems, (dataItem) => {
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
      yAxis.dataItems.sort((a, b) => a.get("index") - b.get("index"));
    };

    // 데이터 업데이트 함수
    const updateData = () => {
      am5.array.each(series.dataItems, (dataItem) => {
        let value =
          dataItem.get("valueX") + Math.round(Math.random() * 300 - 150);
        if (value < 0) value = 10;

        dataItem.set("valueX", value);
        dataItem.animate({
          key: "valueXWorking",
          to: value,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
        });
      });
      sortCategoryAxis();
    };
    const DataSort = () => data.sort((a, b) => a.value - b.value);

    // 데이터 적용
    DataSort();
    yAxis.data.setAll(data);
    series.data.setAll(data);

    // 데이터 업데이트 반복 실행
    setInterval(updateData, 1500);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`