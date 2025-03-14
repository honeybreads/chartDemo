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
    data.push({ date: date.getTime(), value: randomValue() });
  }
  return data;
};

// PercentageChangeLineChart
export default function PercentageChangeLineChart() {
  const id = "percentagechange-line";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary, state } = themes[colorTheme];
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

    // 범례 생성
    const legend = chart.plotContainer.children.push(
      am5.Legend.new(root, {
        y: am5.p100,
        centerY: am5.p100,
      })
    );
    legend.valueLabels.template.set("width", 120);

    // 커서 추가
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "none" })
    );
    cursor.lineY.set("visible", false);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        tooltip: am5.Tooltip.new(root, {}),
        baseInterval: { count: 1, timeUnit: "day" },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 70,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        numberFormat: "#'%'",
        renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }),
      })
    );
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // series 생성
    const createSeries = (name) => {
      const tooltip = am5.Tooltip.new(root, {
        getFillFromSprite: false,
        getStrokeFromSprite: true,
        labelText:
          "[#000]${valueY} {valueYChangeSelectionPercent.formatNumber('[" +
          state.positive +
          "]+0.00|[" +
          state.negative +
          "]0.00|[#000]0.00')}%",
      });

      tooltip.get("background").setAll({ fill: am5.color(0xffffff) });

      // series 생성
      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name,
          xAxis,
          yAxis,
          valueXField: "date",
          valueYField: "value",
          calculateAggregates: true,
          valueYShow: "valueYChangeSelectionPercent",
          legendValueText:
            "[#000]${valueY} {valueYChangeSelectionPercent.formatNumber('[" +
            state.positive +
            "]+0.00|[" +
            state.negative +
            "]0.00|[#000]0.00')}%",
          tooltip: tooltip,
        })
      );

      // Set data
      const data = createData(90);
      series.data.setAll(data);
      legend.data.push(series);
      series.appear(1000);
    };

    // series 생성
    createSeries("Series one");
    createSeries("Series two");

    // switch button
    const cont = chart.plotContainer.children.push(
      am5.Container.new(root, {
        x: 0,
        y: 20,
        layout: root.horizontalLayout,
      })
    );

    cont.children.push(
      am5.Label.new(root, { centerY: am5.p50, text: "선택영역" })
    );

    const switchButton = cont.children.push(
      am5.Button.new(root, {
        centerY: am5.p50,
        themeTags: ["switch"],
        icon: am5.Circle.new(root, { themeTags: ["icon"] }),
      })
    );

    // 토글버튼 이벤트
    switchButton.on("active", () => {
      let valueYShow, valueText;
      if (!switchButton.get("active")) {
        valueYShow = "valueYChangeSelectionPercent";
        valueText =
          "[#000]${valueY} {valueYChangeSelectionPercent.formatNumber('[" +
          state.positive +
          "]+0.00|[" +
          state.negative +
          "]0.00|[#000]0.00')}%";
      } else {
        valueYShow = "valueYChangePercent";
        valueText =
          "[#000]${valueY} {valueYChangePercent.formatNumber('[" +
          state.positive +
          "]+0.00|[" +
          state.negative +
          "]0.00|[#000]0.00')}%";
      }

      chart.series.each((series) => {
        series.set("valueYShow", valueYShow);
        series.set("legendValueText", valueText);
        series.get("tooltip").set("labelText", valueText);
      });
    });

    cont.children.push(
      am5.Label.new(root, { centerY: am5.p50, text: "시작부터" })
    );

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
