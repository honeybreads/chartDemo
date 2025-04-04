import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성
const createData = (count) => {
  let value = 100;
  const data = [];
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const randomValue = () => {
    value = Math.round(Math.random() * 10 - 5 + value);
    return value;
  };

  for (let i = 0; i < count; ++i) {
    am5.time.add(date, "day", 1);
    data.push({
      date: date.getTime(),
      open: randomValue() + Math.random() * 50,
      close: randomValue() + Math.random() * 50,
    });
  }
  return data;
};

const data = createData(90);

// DifferentFillLineChart
export default function DifferentFillLineChart() {
  const id = "differentfill-line";
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
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
      })
    );

    // 커서 추가
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "none" })
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke", themes.chartVariables[theme].base);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0,
        endLocation: 0.5,
        startLocation: 0.5,
        tooltip: am5.Tooltip.new(root, {}),
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 80,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, { renderer: am5xy.AxisRendererY.new(root, {}) })
    );

    // series 생성 함수
    const createSeries = (valueYField, openValueYField) => {
      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis,
          yAxis,
          valueYField,
          openValueYField,
          name: "Series",
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" }),
        })
      );
      series.fills.template.setAll({ fillOpacity: 0.6 });

      return series;
    };

    const series1 = createSeries("open", "close");
    const series2 = createSeries("close", false);
    series1.fills.template.setAll({ visible: true });

    // 데이터 적용
    series1.data.setAll(data);
    series2.data.setAll(data);

    // 두 선의 교차점 계산 함수
    const getLineIntersection = (p1, p2, p3, p4) => {
      const det = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
      if (det === 0) return null; // 평행한 경우 교차점 없음

      const x =
        ((p1.x * p2.y - p1.y * p2.x) * (p3.x - p4.x) -
          (p1.x - p2.x) * (p3.x * p4.y - p3.y * p4.x)) /
        det;
      const y =
        ((p1.x * p2.y - p1.y * p2.x) * (p3.y - p4.y) -
          (p1.y - p2.y) * (p3.x * p4.y - p3.y * p4.x)) /
        det;
      return { x, y };
    };

    // 교차 영역 설정
    let i = 0;
    const baseInterval = xAxis.get("baseInterval");
    const baseDuration = xAxis.baseDuration();
    let rangeDataItem;

    am5.array.each(series1.dataItems, (s1DataItem) => {
      let s1PreviousDataItem;
      let s2PreviousDataItem;
      const s2DataItem = series2.dataItems[i];

      if (i > 0) {
        s1PreviousDataItem = series1.dataItems[i - 1];
        s2PreviousDataItem = series2.dataItems[i - 1];
      }

      let startTime = am5.time
        .round(
          new Date(s1DataItem.get("valueX")),
          baseInterval.timeUnit,
          baseInterval.count
        )
        .getTime();

      if (s1PreviousDataItem && s2PreviousDataItem) {
        const x0 =
          am5.time
            .round(
              new Date(s1PreviousDataItem.get("valueX")),
              baseInterval.timeUnit,
              baseInterval.count
            )
            .getTime() +
          baseDuration / 2;
        const y01 = s1PreviousDataItem.get("valueY");
        const y02 = s2PreviousDataItem.get("valueY");

        const x1 = startTime + baseDuration / 2;
        const y11 = s1DataItem.get("valueY");
        const y12 = s2DataItem.get("valueY");

        const intersection = getLineIntersection(
          { x: x0, y: y01 },
          { x: x1, y: y11 },
          { x: x0, y: y02 },
          { x: x1, y: y12 }
        );

        startTime = Math.round(intersection.x);
      }

      // start range here
      if (s2DataItem.get("valueY") > s1DataItem.get("valueY")) {
        if (!rangeDataItem) {
          rangeDataItem = xAxis.makeDataItem({});
          const range = series1.createAxisRange(rangeDataItem);
          rangeDataItem.set("value", startTime);
          range.fills.template.setAll({
            fill: series2.get("fill"),
            fillOpacity: 0.6,
            visible: true,
          });
          range.strokes.template.setAll({
            stroke: series1.get("stroke"),
            strokeWidth: 1,
          });
        }
      } else {
        // if negative range started
        if (rangeDataItem) {
          rangeDataItem.set("endValue", startTime);
        }

        rangeDataItem = undefined;
      }
      // end if last
      if (i == series1.dataItems.length - 1) {
        if (rangeDataItem) {
          rangeDataItem.set(
            "endValue",
            s1DataItem.get("valueX") + baseDuration / 2
          );
          rangeDataItem = undefined;
        }
      }
      i++;
    });

    // 애니메이션 적용
    series1.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock
export const DifferentFillLineCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성
const createData = (count) => {
  let value = 100;
  const data = [];
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const randomValue = () => {
    value = Math.round(Math.random() * 10 - 5 + value);
    return value;
  };

  for (let i = 0; i < count; ++i) {
    am5.time.add(date, "day", 1);
    data.push({
      date: date.getTime(),
      open: randomValue() + Math.random() * 50,
      close: randomValue() + Math.random() * 50,
    });
  }
  return data;
};

const data = createData(90);

// DifferentFillLineChart
export default function DifferentFillLineChart() {
  const id = "differentfill-line";
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
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
      })
    );

    // 커서 추가
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "none" })
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke", themes.chartVariables[theme].base);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation:0,
        endLocation:0.5,
        startLocation:0.5,
        tooltip: am5.Tooltip.new(root, {}),
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 80,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, { renderer: am5xy.AxisRendererY.new(root, {}) })
    );

    // series 생성 함수
    const createSeries = (valueYField, openValueYField) => {
      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis,
          yAxis,
          valueYField,
          openValueYField,
          name: "Series",
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" }),
        })
      );
      series.fills.template.setAll({ fillOpacity: 0.6 });

      return series;
    };

    const series1 = createSeries("open", "close");
    const series2 = createSeries("close", false);
    series1.fills.template.setAll({ visible: true });

    // 데이터 적용
    series1.data.setAll(data);
    series2.data.setAll(data);

    // 두 선의 교차점 계산 함수
    const getLineIntersection = (p1, p2, p3, p4) => {
      const det = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
      if (det === 0) return null; // 평행한 경우 교차점 없음

      const x =
        ((p1.x * p2.y - p1.y * p2.x) * (p3.x - p4.x) -
          (p1.x - p2.x) * (p3.x * p4.y - p3.y * p4.x)) /
        det;
      const y =
        ((p1.x * p2.y - p1.y * p2.x) * (p3.y - p4.y) -
          (p1.y - p2.y) * (p3.x * p4.y - p3.y * p4.x)) /
        det;
      return { x, y };
    };

    // 교차 영역 설정
    let i = 0;
    const baseInterval = xAxis.get("baseInterval");
    const baseDuration = xAxis.baseDuration();
    let rangeDataItem;

    am5.array.each(series1.dataItems, (s1DataItem) => {
      let s1PreviousDataItem;
      let s2PreviousDataItem;
      const s2DataItem = series2.dataItems[i];

      if (i > 0) {
        s1PreviousDataItem = series1.dataItems[i - 1];
        s2PreviousDataItem = series2.dataItems[i - 1];
      }

      let startTime = am5.time
        .round(
          new Date(s1DataItem.get("valueX")),
          baseInterval.timeUnit,
          baseInterval.count
        )
        .getTime();

      if (s1PreviousDataItem && s2PreviousDataItem) {
        const x0 =
          am5.time
            .round(
              new Date(s1PreviousDataItem.get("valueX")),
              baseInterval.timeUnit,
              baseInterval.count
            )
            .getTime() +
          baseDuration / 2;
        const y01 = s1PreviousDataItem.get("valueY");
        const y02 = s2PreviousDataItem.get("valueY");

        const x1 = startTime + baseDuration / 2;
        const y11 = s1DataItem.get("valueY");
        const y12 = s2DataItem.get("valueY");

        const intersection = getLineIntersection(
          { x: x0, y: y01 },
          { x: x1, y: y11 },
          { x: x0, y: y02 },
          { x: x1, y: y12 }
        );

        startTime = Math.round(intersection.x);
      }

      // start range here
      if (s2DataItem.get("valueY") > s1DataItem.get("valueY")) {
        if (!rangeDataItem) {
          rangeDataItem = xAxis.makeDataItem({});
          const range = series1.createAxisRange(rangeDataItem);
          rangeDataItem.set("value", startTime);
          range.fills.template.setAll({
            fill: series2.get("fill"),
            fillOpacity: 0.6,
            visible: true,
          });
          range.strokes.template.setAll({
            stroke: series1.get("stroke"),
            strokeWidth: 1,
          });
        }
      } else {
        // if negative range started
        if (rangeDataItem) {
          rangeDataItem.set("endValue", startTime);
        }

        rangeDataItem = undefined;
      }
      // end if last
      if (i == series1.dataItems.length - 1) {
        if (rangeDataItem) {
          rangeDataItem.set(
            "endValue",
            s1DataItem.get("valueX") + baseDuration / 2
          );
          rangeDataItem = undefined;
        }
      }
      i++;
    });

    // 애니메이션 적용
    series1.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`;
