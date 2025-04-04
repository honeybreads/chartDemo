import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    country: "USA",
    value: 2025,
  },
  {
    country: "China",
    value: 1882,
  },
  {
    country: "Japan",
    value: 1809,
  },
  {
    country: "Germany",
    value: 1322,
  },
  {
    country: "UK",
    value: 1122,
  },
];

// DragOrderingBarChart
export default function DragOrderingBarChart() {
  const id = "dragordering-bar";
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
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
      })
    );

    // x,y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "country",
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 30,
          minorGridEnabled: true,
        }),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        maxDeviation: 0,
        renderer: am5xy.AxisRendererX.new(root, {
          visible: true,
          strokeOpacity: 0.1,
          minGridDistance: 80,
        }),
      })
    );

    yAxis.get("renderer").grid.template.set("location", 1);

    // series 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        name: "Series",
        valueXField: "value",
        categoryYField: "country",
        sequencedInterpolation: true,
      })
    );

    series.columns.template.setAll({
      draggable: true,
      strokeOpacity: 0,
      cornerRadiusBL: 0,
      cornerRadiusTL: 0,
      cursorOverStyle: "grab",
      tooltipText: "drag to rearrange",
      cornerRadiusTR: themes.chartVariables.default.barRadius,
      cornerRadiusBR: themes.chartVariables.default.barRadius,
    });

    series.columns.template.adapters.add("fill", (_, target) =>
      chart.get("colors").getIndex(series.columns.indexOf(target))
    );

    // 특정 카테고리 찾기 함수
    const getSeriesItem = (category) =>
      series.dataItems.find((item) => item.get("categoryY") === category);

    // Y축 데이터를 드래그된 순서대로 정렬
    const sortCategoryAxis = () => {
      const easing = am5.ease.out(am5.ease.cubic);
      series.dataItems.sort(
        (a, b) => b.get("graphics").y() - a.get("graphics").y()
      );

      // 정렬된 데이터 기반으로 Y축 업데이트
      am5.array.each(yAxis.dataItems, (dataItem) => {
        const seriesDataItem = getSeriesItem(dataItem.get("category"));
        if (seriesDataItem) {
          const index = series.dataItems.indexOf(seriesDataItem);
          const column = seriesDataItem.get("graphics");
          const fy =
            yAxis
              .get("renderer")
              .positionToCoordinate(yAxis.indexToPosition(index)) -
            column.height() / 2;
          if (index != dataItem.get("index")) {
            // 위치가 다를 경우
            dataItem.set("index", index);
            const x = column.x();
            const y = column.y();
            column.set("dy", -(fy - y));
            column.set("dx", x);
            column.animate({ key: "dy", to: 0, duration: 600, easing: easing });
            column.animate({ key: "dx", to: 0, duration: 600, easing: easing });
          } else {
            // 같은 위치일 경우
            column.animate({ key: "y", to: fy, duration: 600, easing: easing });
            column.animate({ key: "x", to: 0, duration: 600, easing: easing });
          }
        }
      });

      yAxis.dataItems.sort((x, y) => {
        return x.get("index") - y.get("index");
      });
    };

    // series 드래그 시작, 끝 이벤트 실행
    series.columns.template.events.on("dragstart", (e) => {
      e.target.toFront();
    });

    series.columns.template.events.on("dragstop", () => {
      sortCategoryAxis();
    });

    // 데이터 적용
    yAxis.data.setAll(data);
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock
export const DragOrderingBarCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    country: "USA",
    value: 2025,
  },
  {
    country: "China",
    value: 1882,
  },
  {
    country: "Japan",
    value: 1809,
  },
  {
    country: "Germany",
    value: 1322,
  },
  {
    country: "UK",
    value: 1122,
  },
];

// DragOrderingBarChart
export default function DragOrderingBarChart() {
  const id = "dragordering-bar";
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
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
      })
    );

    // x,y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "country",
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 30,
          minorGridEnabled: true,
        }),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        maxDeviation: 0,
        renderer: am5xy.AxisRendererX.new(root, {
          visible: true,
          strokeOpacity: 0.1,
          minGridDistance: 80,
        }),
      })
    );

    yAxis.get("renderer").grid.template.set("location", 1);

    // series 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        name: "Series",
        valueXField: "value",
        categoryYField: "country",
        sequencedInterpolation: true,
      })
    );

    series.columns.template.setAll({
      draggable: true,
      strokeOpacity: 0,
      cornerRadiusBL: 0,
      cornerRadiusTL: 0,
      cursorOverStyle: "grab",
      tooltipText: "drag to rearrange",
      cornerRadiusTR: themes.chartVariables.default.barRadius,
      cornerRadiusBR: themes.chartVariables.default.barRadius,
    });

    series.columns.template.adapters.add("fill", (_, target) =>
      chart.get("colors").getIndex(series.columns.indexOf(target))
    );

    // 특정 카테고리 찾기 함수
    const getSeriesItem = (category) =>
      series.dataItems.find((item) => item.get("categoryY") === category);

    // Y축 데이터를 드래그된 순서대로 정렬
    const sortCategoryAxis = () => {
      const easing = am5.ease.out(am5.ease.cubic);
      series.dataItems.sort(
        (a, b) => b.get("graphics").y() - a.get("graphics").y()
      );

      // 정렬된 데이터 기반으로 Y축 업데이트
      am5.array.each(yAxis.dataItems, (dataItem) => {
        const seriesDataItem = getSeriesItem(dataItem.get("category"));
        if (seriesDataItem) {
          const index = series.dataItems.indexOf(seriesDataItem);
          const column = seriesDataItem.get("graphics");
          const fy =
            yAxis
              .get("renderer")
              .positionToCoordinate(yAxis.indexToPosition(index)) -
            column.height() / 2;
          if (index != dataItem.get("index")) {
            // 위치가 다를 경우
            dataItem.set("index", index);
            const x = column.x();
            const y = column.y();
            column.set("dy", -(fy - y));
            column.set("dx", x);
            column.animate({ key: "dy", to: 0, duration: 600, easing: easing });
            column.animate({ key: "dx", to: 0, duration: 600, easing: easing });
          } else {
            // 같은 위치일 경우
            column.animate({ key: "y", to: fy, duration: 600, easing: easing });
            column.animate({ key: "x", to: 0, duration: 600, easing: easing });
          }
        }
      });

      yAxis.dataItems.sort((x, y) => {
        return x.get("index") - y.get("index");
      });
    };

    // series 드래그 시작, 끝 이벤트 실행
    series.columns.template.events.on("dragstart", (e) => {
      e.target.toFront();
    });

    series.columns.template.events.on("dragstop", () => {
      sortCategoryAxis();
    });

    // 데이터 적용
    yAxis.data.setAll(data);
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
`;
