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

  for (var i = 0; i < count; ++i) {
    am5.time.add(date, "day", 1);
    data.push({ date: date.getTime(), value: randomValue() });
  }
  return data;
};

const data = createData(90);

// MarkingMultipleLineChart
export default function MarkingMultipleLineChart() {
  const id = "markingmultiple-line";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { lineColors } = themes[colorTheme];
    const colorList = lineColors.lineStroke;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
      })
    );

    // 커서 추가
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "selectX",
      })
    );
    cursor.lineY.set("visible", false);

    // 커서 이벤트
    let selectStatedX;

    // start > end일 경우 값 교환 함수
    const flipCheck = (start, end) => {
      if (start > end) [start, end] = [end, start];
    };

    // 드래그 시작
    cursor.events.on("selectstarted", () => {
      selectStatedX = cursor.getPrivate("positionX");
    });

    // 드래그 종료
    cursor.events.on("selectended", () => {
      const selectEndedX = cursor.getPrivate("positionX");
      let endValue = xAxis.positionToValue(xAxis.toAxisPosition(selectEndedX));
      let startValue = xAxis.positionToValue(
        xAxis.toAxisPosition(selectStatedX)
      );

      // flip if start > end
      flipCheck(startValue, endValue);

      let skip = false;
      const len = xAxis.axisRanges.length;
      for (let i = len - 1; i >= 0; i--) {
        const axisRange = xAxis.axisRanges.getIndex(i);
        let axisRangeStartValue = axisRange.get("value");
        let axisRangeEndValue = axisRange.get("endValue");
        flipCheck(axisRangeStartValue, axisRangeEndValue);

        if (
          startValue >= axisRangeStartValue &&
          startValue <= axisRangeEndValue &&
          endValue >= axisRangeStartValue &&
          endValue <= axisRangeEndValue
        ) {
          skip = true;
        } else {
          if (
            startValue >= axisRangeStartValue &&
            startValue <= axisRangeEndValue
          ) {
            startValue = axisRangeEndValue;
          }

          if (
            endValue >= axisRangeStartValue &&
            endValue <= axisRangeEndValue
          ) {
            endValue = axisRangeStartValue;
          }
        }

        if (
          startValue <= axisRangeStartValue &&
          endValue >= axisRangeEndValue
        ) {
          xAxis.axisRanges.removeValue(axisRange);
        }
      }

      if (!skip) {
        const dataItem = xAxis.makeDataItem({});
        dataItem.set("value", startValue);
        dataItem.set("endValue", endValue);

        xAxis.createAxisRange(dataItem);
        dataItem.get("axisFill").setAll({
          visible: true,
          opacity: 0.2,
          fill: colorList[0],
        });
        dataItem.get("grid").set("forceHidden", true);
      }

      cursor.selection.hide();
    });

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        tooltip: am5.Tooltip.new(root, {}),
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 80,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // series 생성
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    // data 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
