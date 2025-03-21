import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 데이터 샘플
const data = {
  asks: [
    ["0.07070", 1.0],
    ["0.07071", 1.654],
    ["0.07076", 0.61],
    ["0.07077", 1.2],
    ["0.07093", 0.584],
    ["0.07095", 0.005],
    ["0.07098", 0.01],
    ["0.07100", 0.653],
    ["0.07105", 6.0],
    ["0.07107", 0.002],
    ["0.07110", 0.022],
    ["0.07113", 0.001],
    ["0.07115", 0.001],
    ["0.07117", 0.001],
    ["0.07119", 0.001],
    ["0.07123", 0.001],
    ["0.07124", 0.002],
    ["0.07125", 0.001],
    ["0.07127", 0.001],
    ["0.07129", 0.001],
    ["0.07130", 0.001],
    ["0.07131", 0.001],
    ["0.07133", 0.001],
    ["0.07135", 0.002],
    ["0.07137", 0.001],
    ["0.07139", 0.001],
    ["0.07141", 0.001],
    ["0.07143", 0.001],
    ["0.07145", 0.001],
    ["0.07147", 0.004],
    ["0.07148", 6.311],
    ["0.07149", 0.001],
    ["0.07150", 10.03],
    ["0.07151", 0.001],
    ["0.07153", 0.001],
    ["0.07155", 0.001],
    ["0.07157", 0.001],
    ["0.07159", 0.001],
    ["0.07161", 0.001],
    ["0.07162", 0.238],
    ["0.07163", 0.001],
    ["0.07164", 0.584],
    ["0.07165", 0.541],
    ["0.07167", 0.001],
    ["0.07169", 0.001],
    ["0.07171", 0.001],
    ["0.07173", 0.001],
    ["0.07175", 0.017],
    ["0.07177", 0.001],
    ["0.07179", 0.001],
  ],
  bids: [
    ["0.07060", 1.001],
    ["0.07059", 1.544],
    ["0.07056", 0.61],
    ["0.07053", 0.002],
    ["0.07048", 1.2],
    ["0.07040", 0.05],
    ["0.07031", 0.663],
    ["0.07024", 0.005],
    ["0.07020", 5.99],
    ["0.07010", 0.022],
    ["0.07006", 0.001],
    ["0.07005", 0.003],
    ["0.07000", 1.0],
    ["0.06993", 0.002],
    ["0.06990", 6.15],
    ["0.06989", 0.519],
    ["0.06986", 0.001],
    ["0.06983", 0.024],
    ["0.06980", 0.031],
    ["0.06978", 0.01],
    ["0.06977", 0.81],
    ["0.06975", 0.053],
    ["0.06970", 0.022],
    ["0.06967", 0.531],
    ["0.06962", 0.017],
    ["0.06955", 0.004],
    ["0.06953", 0.002],
    ["0.06951", 0.031],
    ["0.06950", 10.0],
    ["0.06933", 0.301],
    ["0.06932", 0.606],
    ["0.06931", 0.022],
    ["0.06929", 0.015],
    ["0.06924", 2.48],
    ["0.06923", 0.5],
    ["0.06922", 0.2],
    ["0.06921", 0.5],
    ["0.06918", 0.03],
    ["0.06915", 0.001],
    ["0.06912", 0.069],
    ["0.06911", 0.002],
    ["0.06905", 0.003],
    ["0.06900", 20.39],
    ["0.06899", 0.002],
    ["0.06897", 0.242],
    ["0.06886", 0.808],
    ["0.06880", 0.026],
    ["0.06872", 1.0],
    ["0.06868", 0.005],
    ["0.06862", 0.584],
  ],
  isFrozen: "0",
  postOnly: "0",
  seq: 67767369,
};

// LiveOrderBookLineChart
export default function LiveOrderBookLineChart() {
  const id = "liveorderbook-line";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { state } = themes[colorTheme];
    const colorList = [state.positive, state.negative];
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        focusable: true,
        paddingLeft:0,
      })
    );

    chart.plotContainer.children.push(
      am5.Label.new(root, {
        x: am5.p50,
        centerX: am5.p50,
        fontSize: 20,
        fontWeight: "400",
        text: "Price (BTC/ETH)",
      })
    );

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "value",
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 70,
        }),
      })
    );

    xAxis
      .get("renderer")
      .labels.template.adapters.add("text", (text, target) => {
        if (target.dataItem) {
          return root.numberFormatter.format(
            Number(target.dataItem.get("category")),
            "#.####"
          );
        }
        return text;
      });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.1,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // series 생성 함수
    const createSeries = (valueYField, text) => {
      const series = chart.series.push(
        am5xy.StepLineSeries.new(root, {
          xAxis,
          yAxis,
          valueYField,
          minBulletDistance: 10,
          categoryXField: "value",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: `[width: 120px]Ask:[/][bold]{categoryX}[/]\n[width: 120px]Total volume:[/][bold]{valueY}[/]\n[width: 120px]Volume:[/][bold]{${text}}[/]`,
          }),
        })
      );
      series.strokes.template.set("strokeWidth", 2);
      series.fills.template.setAll({
        visible: true,
        fillOpacity: 0.2,
      });

      return series;
    };

    // volume series 생성 함수
    const createVolumeSeries = (valueYField) => {
      const volumeSeries = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          xAxis,
          yAxis,
          valueYField,
          minBulletDistance: 10,
          categoryXField: "value",
          fill: themes.chartVariables[theme].base,
        })
      );

      volumeSeries.columns.template.set("opacity", 0.2);
      return volumeSeries;
    };

    // series 생성
    const bidsTotalVolume = createSeries("bidstotalvolume", "bidsvolume");
    const asksTotalVolume = createSeries("askstotalvolume", "asksvolume");

    // volume series 생성
    const bidVolume = createVolumeSeries("bidsvolume");
    const asksVolume = createVolumeSeries("asksvolume");

    // cursor 생성
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, { xAxis }));
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke",themes.chartVariables[theme].base);

    // Data 변환
    const processData = (list, type, desc, res) => {
      // 데이터를 숫자로 변환하면서 새로운 배열 반환
      let processedList = list.map(([value, volume]) => ({
        value: Number(value),
        volume: Number(volume),
      }));

      // value 기준으로 정렬
      processedList.sort((a, b) => a.value - b.value);

      // 누적 거래량 계산
      if (desc) {
        processedList.reduceRight((total, item) => {
          item.totalvolume = total + item.volume;
          res.unshift({
            value: item.value,
            [`${type}volume`]: item.volume,
            [`${type}totalvolume`]: item.totalvolume,
          });
          return item.totalvolume;
        }, 0);
      } else {
        processedList.reduce((total, item) => {
          item.totalvolume = total + item.volume;
          res.push({
            value: item.value,
            [`${type}volume`]: item.volume,
            [`${type}totalvolume`]: item.totalvolume,
          });
          return item.totalvolume;
        }, 0);
      }
    };

    // 데이터 파싱 함수
    const parseData = (data) => {
      let res = [];
      processData(data.bids, "bids", true, res); // 매수
      processData(data.asks, "asks", false, res); // 매도

      //결과 데이터를 차트에 반영
      xAxis.data.setAll(res);
      bidsTotalVolume.data.setAll(res);
      asksTotalVolume.data.setAll(res);
      bidVolume.data.setAll(res);
      asksVolume.data.setAll(res);
    };

    // 데이터 적용
    parseData(data);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
