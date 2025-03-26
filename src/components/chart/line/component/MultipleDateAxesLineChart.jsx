import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성
const data0 = [];
const data1 = [];
const createData = (data, priceValue, date) => {
  let price = priceValue;
  for (let i = 0; i < 90; i++) {
    price += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
    data.push({ date: new Date(2024, date, i).getTime(), price: price });
  }
};
createData(data0, 1000, 0);
createData(data1, 1000, 1);

// MultipleDateAxesLineChart
export default function MultipleDateAxesLineChart() {
  const id = "multipledateaxes-line";
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
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingTop: 0,
        paddingLeft: 0,
      })
    );

    // 커서 추가
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "zoomX" })
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke", themes.chartVariables[theme].base);

    // X,Y축 생성
    const createXaxis = () => {
      const xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          tooltip: am5.Tooltip.new(root, {}),
          tooltipDateFormat: "yyyy-MM-dd",
          renderer: am5xy.AxisRendererX.new(root, {}),
          baseInterval: { timeUnit: "day", count: 1 },
        })
      );

      xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });
      return xAxis;
    };

    const xAxis0 = createXaxis();
    const xAxis1 = createXaxis();
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // series 생성
    const createSeries = (xAxis) => {
      return chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis,
          yAxis,
          name: "Series",
          valueYField: "price",
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
          }),
        })
      );
    };

    const series0 = createSeries(xAxis0);
    const series1 = createSeries(xAxis1);

    // scrollbar 생성
    const scrollbar = chart.set(
      "scrollbarX",
      am5xy.XYChartScrollbar.new(root, {
        height: 50,
        orientation: "horizontal",
      })
    );

    scrollbar.get("background").setAll({
      fill: themes.chartVariables[theme].scrollbar,
    });

    // scrollbar x,y축 생성
    const sbDateAxis = scrollbar.chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    const sbValueAxis = scrollbar.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    sbDateAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // scrollbar series 생성
    const sbSeries = scrollbar.chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: sbDateAxis,
        yAxis: sbValueAxis,
        valueXField: "date",
        valueYField: "price",
        stroke: themes.chartVariables[theme].scrollChart,
      })
    );

    // 데이터 적용
    series0.data.setAll(data0);
    series1.data.setAll(data1);
    sbSeries.data.setAll(data0);

    // 애니메이션 적용
    series0.appear(1000);
    series1.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
