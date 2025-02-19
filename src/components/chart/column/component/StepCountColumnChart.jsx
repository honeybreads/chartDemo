import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = {
  goal: [
    { text: "Goal", value: 6000 },
    { text: "2 x Goal", value: 12000 },
  ],
  list: [
    {
      date: "2021-01-01",
      steps: 4561,
    },
    {
      date: "2021-01-02",
      steps: 5687,
    },
    {
      date: "2021-01-03",
      steps: 6348,
    },
    {
      date: "2021-01-04",
      steps: 4878,
    },
    {
      date: "2021-01-05",
      steps: 9867,
    },
    {
      date: "2021-01-06",
      steps: 7561,
    },
    {
      date: "2021-01-07",
      steps: 1287,
    },
    {
      date: "2021-01-08",
      steps: 3298,
    },
    {
      date: "2021-01-09",
      steps: 5697,
    },
    {
      date: "2021-01-10",
      steps: 4878,
    },
    {
      date: "2021-01-11",
      steps: 8788,
    },
    {
      date: "2021-01-12",
      steps: 9560,
    },
    {
      date: "2021-01-13",
      steps: 11687,
    },
    {
      date: "2021-01-14",
      steps: 5878,
    },
    {
      date: "2021-01-15",
      steps: 9789,
    },
    {
      date: "2021-01-16",
      steps: 3987,
    },
    {
      date: "2021-01-17",
      steps: 5898,
    },
    {
      date: "2021-01-18",
      steps: 9878,
    },
    {
      date: "2021-01-19",
      steps: 13687,
    },
    {
      date: "2021-01-20",
      steps: 6789,
    },
    {
      date: "2021-01-21",
      steps: 4531,
    },
    {
      date: "2021-01-22",
      steps: 5856,
    },
    {
      date: "2021-01-23",
      steps: 5737,
    },
    {
      date: "2021-01-24",
      steps: 9987,
    },
    {
      date: "2021-01-25",
      steps: 16457,
    },
    {
      date: "2021-01-26",
      steps: 7878,
    },
    {
      date: "2021-01-27",
      steps: 26845,
    },
    {
      date: "2021-01-28",
      steps: 4659,
    },
    {
      date: "2021-01-29",
      steps: 7892,
    },
    {
      date: "2021-01-30",
      steps: 7362,
    },
    {
      date: "2021-01-31",
      steps: 3268,
    },
  ],
};

export default function StepCountColumnChart() {
  const id = "stepcount-column";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { colorSet } = themes[colorTheme];
    const colorList = colorSet(2);
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        pinchZoomY: false,
        pinchZoomX: false,
        focusable: true,
      })
    );
    chart.zoomOutButton.set("forceHidden", true);

    // x,y축 생성
    const xRenderer = am5xy.AxisRendererX.new(root, {});
    xRenderer.grid.template.set("forceHidden", true);

    const yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 30 });
    yRenderer.grid.template.set("forceHidden", true);

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        snapTooltip: false,
        renderer: xRenderer,
        baseInterval: { timeUnit: "day", count: 1 },
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, { renderer: yRenderer })
    );

    // goal range 생성
    const createGoal = (value, text) => {
      const goal = yAxis.createAxisRange(yAxis.makeDataItem({ value }));
      goal.get("grid").setAll({ forceHidden: false });

      const goalLabel = goal.get("label");
      goalLabel.setAll({
        text,
        inside: true,
        centerY: am5.p100,
      });

      goalLabel.adapters.add("x", () => {
        return chart.plotContainer.width();
      });

      chart.plotContainer.onPrivate("width", () => {
        goalLabel.markDirtyPosition();
      });

      return goalLabel;
    };

    data.goal.forEach((item) => {
      createGoal(item.value, item.text);
    });

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
        positionX: 0.5,
        alwaysShow: true,
      })
    );
    cursor.lineY.set("visible", false);

    // series(바 차트) 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "steps",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "vertical",
          labelText: "{valueY}",
        }),
      })
    );

    series.columns.template.adapters.add("fill", (fill, target) => {
      if (target.dataItem.get("valueY") < data.goal[0].value) {
        return am5.color(0xdadada);
      }
      return fill;
    });

    series.data.processor = am5.DataProcessor.new(root, {
      dateFormat: "yyyy-MM-dd",
      dateFields: ["date"],
    });

    // 마지막 기준 10일만 확대 (최소 10일 있어야 함)
    series.events.on("datavalidated", () => {
      const toTime =
        series.dataItems[series.dataItems.length - 1].get("valueX") +
        am5.time.getDuration("day", 1);
      const fromTime =
        series.dataItems[series.dataItems.length - 9].get("valueX");
      xAxis.zoomToValues(fromTime, toTime);
    });

    // 중심 이동 처리
    chart.plotContainer.events.on("globalpointerup", () => {
      const dayDuration = am5.time.getDuration("day", 1);

      const firstTime = am5.time
        .round(new Date(series.dataItems[0].get("valueX")), "day", 1)
        .getTime();
      const lastTime =
        series.dataItems[series.dataItems.length - 1].get("valueX") +
        dayDuration;
      const totalTime = lastTime - firstTime;
      const days = totalTime / dayDuration;

      const roundedStart =
        firstTime + Math.round(days * xAxis.get("start")) * dayDuration;
      const roundedEnd =
        firstTime + Math.round(days * xAxis.get("end")) * dayDuration;

      xAxis.zoomToValues(roundedStart, roundedEnd);
    });

    // 데이터 적용
    series.data.setAll(data.list);

    // 애니메이션 적용
    chart.appear(1000, 50);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
