import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5map from "@amcharts/amcharts5/map";
import am5Geodata_southKoreaLow from "@amcharts/amcharts5-geodata/southKoreaLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 전체 데이터
let data = [
  {
    age: "0 - 10",
    male: 10175713,
    female: 9736305,
  },
  {
    age: "11 - 20",
    male: 10470147,
    female: 10031835,
  },
  {
    age: "21 - 30",
    male: 10561873,
    female: 10117913,
  },
  {
    age: "31 - 40",
    male: 6447043,
    female: 6142996,
  },
  {
    age: "41 - 50",
    male: 9349745,
    female: 8874664,
  },
  {
    age: "51 - 60",
    male: 6722248,
    female: 6422017,
  },
  {
    age: "61 - 70",
    male: 10989596,
    female: 10708414,
  },
  {
    age: "71 - 80",
    male: 10625791,
    female: 10557848,
  },
  {
    age: "81 - 90",
    male: 9899569,
    female: 9956213,
  },
  {
    age: "91 - 100",
    male: 10330986,
    female: 10465142,
  },
  {
    age: "101 and over",
    male: 10571984,
    female: 10798384,
  },
];

// 샘플 지역 데이터
const stateData = {
  Gangwon: [
    {
      age: "0 - 10",
      male: 28346,
      female: 26607,
    },
    {
      age: "11 - 20",
      male: 28346,
      female: 26607,
    },
    {
      age: "21 - 30",
      male: 26350,
      female: 24821,
    },
    {
      age: "31 - 40",
      male: 15929,
      female: 14735,
    },
    {
      age: "41 - 50",
      male: 25360,
      female: 19030,
    },
    {
      age: "51 - 60",
      male: 20755,
      female: 15663,
    },
    {
      age: "61 - 70",
      male: 32415,
      female: 28259,
    },
    {
      age: "71 - 80",
      male: 28232,
      female: 25272,
    },
    {
      age: "81 - 90",
      male: 24217,
      female: 22002,
    },
    {
      age: "91 - 100",
      male: 23429,
      female: 21968,
    },
    {
      age: "101 and over",
      male: 24764,
      female: 22784,
    },
  ],
  North_Gyeongsang: [
    {
      age: "0 - 10",
      male: 150860,
      female: 144194,
    },
    {
      age: "11 - 20",
      male: 28346,
      female: 26607,
    },
    {
      age: "21 - 30",
      male: 161596,
      female: 156841,
    },
    {
      age: "31 - 40",
      male: 98307,
      female: 94462,
    },
    {
      age: "41 - 50",
      male: 142173,
      female: 136514,
    },
    {
      age: "51 - 60",
      male: 99164,
      female: 101444,
    },
    {
      age: "61 - 70",
      male: 154977,
      female: 159815,
    },
    {
      age: "71 - 80",
      male: 150036,
      female: 156764,
    },
    {
      age: "81 - 90",
      male: 141667,
      female: 152220,
    },
    {
      age: "91 - 100",
      male: 155693,
      female: 159835,
    },
    {
      age: "101 and over",
      male: 156413,
      female: 163909,
    },
  ],
  Daegu: [
    {
      age: "0 - 10",
      male: 98246,
      female: 93534,
    },
    {
      age: "11 - 20",
      male: 28346,
      female: 26607,
    },
    {
      age: "21 - 30",
      male: 99707,
      female: 96862,
    },
    {
      age: "31 - 40",
      male: 60521,
      female: 57735,
    },
    {
      age: "41 - 50",
      male: 87209,
      female: 81936,
    },
    {
      age: "51 - 60",
      male: 59114,
      female: 59387,
    },
    {
      age: "61 - 70",
      male: 96190,
      female: 96573,
    },
    {
      age: "71 - 80",
      male: 96273,
      female: 95632,
    },
    {
      age: "81 - 90",
      male: 90371,
      female: 90620,
    },
    {
      age: "91 - 100",
      male: 91881,
      female: 93777,
    },
    {
      age: "101 and over",
      male: 93238,
      female: 95476,
    },
  ],
  Ulsan: [
    {
      age: "0 - 10",
      male: 221511,
      female: 212324,
    },
    {
      age: "11 - 20",
      male: 28346,
      female: 26607,
    },
    {
      age: "21 - 30",
      male: 233530,
      female: 222965,
    },
    {
      age: "31 - 40",
      male: 138926,
      female: 132399,
    },
    {
      age: "41 - 50",
      male: 200240,
      female: 187786,
    },
    {
      age: "51 - 60",
      male: 142852,
      female: 132457,
    },
    {
      age: "61 - 70",
      male: 231488,
      female: 215985,
    },
    {
      age: "71 - 80",
      male: 223754,
      female: 214946,
    },
    {
      age: "81 - 90",
      male: 206718,
      female: 202482,
    },
    {
      age: "91 - 100",
      male: 213591,
      female: 210621,
    },
    {
      age: "101 and over",
      male: 205830,
      female: 206081,
    },
  ],
  Busan: [
    {
      age: "0 - 10",
      male: 1283763,
      female: 1228013,
    },
    {
      age: "11 - 20",
      male: 28346,
      female: 26607,
    },
    {
      age: "21 - 30",
      male: 1297819,
      female: 1245016,
    },
    {
      age: "31 - 40",
      male: 811114,
      female: 773387,
    },
    {
      age: "41 - 50",
      male: 1179739,
      female: 1100368,
    },
    {
      age: "51 - 60",
      male: 883323,
      female: 825833,
    },
    {
      age: "61 - 70",
      male: 1478557,
      female: 1387516,
    },
    {
      age: "71 - 80",
      male: 1399835,
      female: 1348430,
    },
    {
      age: "81 - 90",
      male: 1287803,
      female: 1271908,
    },
    {
      age: "91 - 100",
      male: 1308311,
      female: 1309907,
    },
    {
      age: "101 and over",
      male: 1306719,
      female: 1303528,
    },
  ],
  South_Gyeongsang: [
    {
      age: "0 - 10",
      male: 173245,
      female: 163629,
    },
    {
      age: "11 - 20",
      male: 28346,
      female: 26607,
    },
    {
      age: "21 - 30",
      male: 179579,
      female: 170930,
    },
    {
      age: "31 - 40",
      male: 102577,
      female: 98569,
    },
    {
      age: "41 - 50",
      male: 152713,
      female: 139268,
    },
    {
      age: "51 - 60",
      male: 116654,
      female: 108238,
    },
    {
      age: "61 - 70",
      male: 204625,
      female: 188680,
    },
    {
      age: "71 - 80",
      male: 200624,
      female: 188616,
    },
    {
      age: "81 - 90",
      male: 183386,
      female: 175326,
    },
    {
      age: "91 - 100",
      male: 184422,
      female: 173654,
    },
    {
      age: "101 and over",
      male: 174730,
      female: 172981,
    },
  ],
  Gyeonggi: [
    {
      age: "0 - 10",
      male: 97647,
      female: 93798,
    },
    {
      age: "11 - 20",
      male: 28346,
      female: 26607,
    },
    {
      age: "21 - 30",
      male: 118032,
      female: 113043,
    },
    {
      age: "31 - 40",
      male: 75546,
      female: 71687,
    },
    {
      age: "41 - 50",
      male: 106966,
      female: 102763,
    },
    {
      age: "51 - 60",
      male: 71125,
      female: 64777,
    },
    {
      age: "61 - 70",
      male: 112189,
      female: 108170,
    },
    {
      age: "71 - 80",
      male: 107223,
      female: 109096,
    },
    {
      age: "81 - 90",
      male: 102424,
      female: 106008,
    },
    {
      age: "91 - 100",
      male: 116664,
      female: 123744,
    },
    {
      age: "101 and over",
      male: 131872,
      female: 139406,
    },
  ],
  Seoul: [
    {
      age: "0 - 10",
      male: 20585,
      female: 19848,
    },
    {
      age: "11 - 20",
      male: 28346,
      female: 26607,
    },
    {
      age: "21 - 30",
      male: 12723,
      female: 11991,
    },
    {
      age: "31 - 40",
      male: 7740,
      female: 7901,
    },
    {
      age: "41 - 50",
      male: 22350,
      female: 25467,
    },
    {
      age: "51 - 60",
      male: 15325,
      female: 19085,
    },
    {
      age: "61 - 70",
      male: 35295,
      female: 41913,
    },
    {
      age: "71 - 80",
      male: 32716,
      female: 35553,
    },
    {
      age: "81 - 90",
      male: 23748,
      female: 24922,
    },
    {
      age: "91 - 100",
      male: 21158,
      female: 20113,
    },
    {
      age: "101 and over",
      male: 19279,
      female: 18956,
    },
  ],
  Incheon: [
    {
      age: "0 - 10",
      male: 28382,
      female: 27430,
    },
    {
      age: "11 - 20",
      male: 28346,
      female: 26607,
    },
    {
      age: "21 - 30",
      male: 29482,
      female: 27484,
    },
    {
      age: "31 - 40",
      male: 17589,
      female: 16828,
    },
    {
      age: "41 - 50",
      male: 26852,
      female: 26911,
    },
    {
      age: "51 - 60",
      male: 19006,
      female: 18413,
    },
    {
      age: "61 - 70",
      male: 30933,
      female: 31146,
    },
    {
      age: "71 - 80",
      male: 28602,
      female: 29431,
    },
    {
      age: "81 - 90",
      male: 26498,
      female: 28738,
    },
    {
      age: "91 - 100",
      male: 27674,
      female: 28519,
    },
    {
      age: "101 and over",
      male: 30582,
      female: 32924,
    },
  ],
  North_Chungcheong: [
    {
      age: "0 - 10",
      male: 552054,
      female: 529003,
    },
    {
      age: "11 - 20",
      male: 28346,
      female: 26607,
    },
    {
      age: "21 - 30",
      male: 582351,
      female: 558377,
    },
    {
      age: "31 - 40",
      male: 363538,
      female: 345048,
    },
    {
      age: "41 - 50",
      male: 528013,
      female: 498162,
    },
    {
      age: "51 - 60",
      male: 385515,
      female: 368754,
    },
    {
      age: "61 - 70",
      male: 641710,
      female: 622134,
    },
    {
      age: "71 - 80",
      male: 602467,
      female: 602634,
    },
    {
      age: "81 - 90",
      male: 579722,
      female: 585089,
    },
    {
      age: "91 - 100",
      male: 623074,
      female: 639410,
    },
    {
      age: "101 and over",
      male: 659376,
      female: 677305,
    },
  ],
  Sejong: [
    {
      age: "0 - 10",
      male: 338979,
      female: 326326,
    },
    {
      age: "11 - 20",
      male: 362147,
      female: 340071,
    },
    {
      age: "21 - 30",
      male: 356404,
      female: 351833,
    },
    {
      age: "31 - 40",
      male: 211908,
      female: 203412,
    },
    {
      age: "41 - 50",
      male: 305617,
      female: 289233,
    },
    {
      age: "51 - 60",
      male: 214032,
      female: 206526,
    },
    {
      age: "61 - 70",
      male: 342885,
      female: 343115,
    },
    {
      age: "71 - 80",
      male: 333159,
      female: 348125,
    },
    {
      age: "81 - 90",
      male: 325121,
      female: 345251,
    },
    {
      age: "91 - 100",
      male: 348120,
      female: 363703,
    },
    {
      age: "101 and over",
      male: 343559,
      female: 358754,
    },
  ],
  Daejeon: [
    {
      age: "0 - 10",
      male: 46668,
      female: 44389,
    },
    {
      age: "11 - 20",
      male: 44115,
      female: 40426,
    },
    {
      age: "21 - 30",
      male: 42590,
      female: 41289,
    },
    {
      age: "31 - 40",
      male: 24759,
      female: 23961,
    },
    {
      age: "41 - 50",
      male: 39937,
      female: 32348,
    },
    {
      age: "51 - 60",
      male: 35270,
      female: 28495,
    },
    {
      age: "61 - 70",
      male: 58033,
      female: 48700,
    },
    {
      age: "71 - 80",
      male: 51544,
      female: 47286,
    },
    {
      age: "81 - 90",
      male: 44144,
      female: 42208,
    },
    {
      age: "91 - 100",
      male: 45731,
      female: 43404,
    },
    {
      age: "101 and over",
      male: 44336,
      female: 44134,
    },
  ],
  South_Chungcheong: [
    {
      age: "0 - 10",
      male: 100400,
      female: 96170,
    },
    {
      age: "11 - 20",
      male: 104279,
      female: 100558,
    },
    {
      age: "21 - 30",
      male: 104674,
      female: 98485,
    },
    {
      age: "31 - 40",
      male: 62452,
      female: 59605,
    },
    {
      age: "41 - 50",
      male: 96966,
      female: 91782,
    },
    {
      age: "51 - 60",
      male: 66307,
      female: 62504,
    },
    {
      age: "61 - 70",
      male: 98079,
      female: 93653,
    },
    {
      age: "71 - 80",
      male: 100924,
      female: 97248,
    },
    {
      age: "81 - 90",
      male: 90980,
      female: 89632,
    },
    {
      age: "91 - 100",
      male: 92961,
      female: 90218,
    },
    {
      age: "101 and over",
      male: 98877,
      female: 96654,
    },
  ],
  North_Jeolla: [
    {
      age: "0 - 10",
      male: 58355,
      female: 56478,
    },
    {
      age: "11 - 20",
      male: 63107,
      female: 59237,
    },
    {
      age: "21 - 30",
      male: 62528,
      female: 59881,
    },
    {
      age: "31 - 40",
      male: 36373,
      female: 33687,
    },
    {
      age: "41 - 50",
      male: 45752,
      female: 45590,
    },
    {
      age: "51 - 60",
      male: 34595,
      female: 30216,
    },
    {
      age: "61 - 70",
      male: 53998,
      female: 52077,
    },
    {
      age: "71 - 80",
      male: 54217,
      female: 52091,
    },
    {
      age: "81 - 90",
      male: 51247,
      female: 47801,
    },
    {
      age: "91 - 100",
      male: 49113,
      female: 49853,
    },
    {
      age: "101 and over",
      male: 48392,
      female: 48288,
    },
  ],
  South_Jeolla: [
    {
      age: "0 - 10",
      male: 408295,
      female: 392900,
    },
    {
      age: "11 - 20",
      male: 427121,
      female: 412238,
    },
    {
      age: "21 - 30",
      male: 437688,
      female: 419077,
    },
    {
      age: "31 - 40",
      male: 269202,
      female: 257213,
    },
    {
      age: "41 - 50",
      male: 369219,
      female: 353570,
    },
    {
      age: "51 - 60",
      male: 268501,
      female: 258559,
    },
    {
      age: "61 - 70",
      male: 448001,
      female: 442418,
    },
    {
      age: "71 - 80",
      male: 445416,
      female: 445729,
    },
    {
      age: "81 - 90",
      male: 416265,
      female: 418999,
    },
    {
      age: "91 - 100",
      male: 425825,
      female: 427573,
    },
    {
      age: "101 and over",
      male: 433177,
      female: 441116,
    },
  ],
  Jeju: [
    {
      age: "0 - 10",
      male: 215697,
      female: 205242,
    },
    {
      age: "11 - 20",
      male: 226901,
      female: 214964,
    },
    {
      age: "21 - 30",
      male: 229911,
      female: 221563,
    },
    {
      age: "31 - 40",
      male: 139494,
      female: 132879,
    },
    {
      age: "41 - 50",
      male: 198763,
      female: 194206,
    },
    {
      age: "51 - 60",
      male: 140805,
      female: 131947,
    },
    {
      age: "61 - 70",
      male: 210315,
      female: 208593,
    },
    {
      age: "71 - 80",
      male: 211656,
      female: 210103,
    },
    {
      age: "81 - 90",
      male: 201979,
      female: 200693,
    },
    {
      age: "91 - 100",
      male: 212114,
      female: 212653,
    },
    {
      age: "101 and over",
      male: 216446,
      female: 219033,
    },
  ],
  Gwangju: [
    {
      age: "0 - 10",
      male: 102716,
      female: 98004,
    },
    {
      age: "11 - 20",
      male: 103861,
      female: 98642,
    },
    {
      age: "21 - 30",
      male: 102335,
      female: 99132,
    },
    {
      age: "31 - 40",
      male: 60870,
      female: 57957,
    },
    {
      age: "41 - 50",
      male: 90593,
      female: 83299,
    },
    {
      age: "51 - 60",
      male: 66512,
      female: 59368,
    },
    {
      age: "61 - 70",
      male: 99384,
      female: 93840,
    },
    {
      age: "71 - 80",
      male: 98020,
      female: 94075,
    },
    {
      age: "81 - 90",
      male: 87763,
      female: 85422,
    },
    {
      age: "91 - 100",
      male: 87647,
      female: 84970,
    },
    {
      age: "101 and over",
      male: 89233,
      female: 88877,
    },
  ],
};

// 데이터 변환 함수
const aggregateData = (list) => {
  const { maleTotal, femaleTotal } = list.reduce(
    (acc, { male, female }) => ({
      maleTotal: acc.maleTotal + male,
      femaleTotal: acc.femaleTotal + female,
    }),
    { maleTotal: 0, femaleTotal: 0 }
  );

  list.map((item) => {
    let row = item;
    row.malePercent = (-1 * Math.round((row.male / maleTotal) * 10000)) / 100;
    row.femalePercent = Math.round((row.female / femaleTotal) * 10000) / 100;
  });

  return list;
};

// 초기 데이터 적용
data = aggregateData(data);

// PopulationPyramidChart
export default function PopulationPyramidChart() {
  const id = "population-pyramid-xy";
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

    // Root 숫자 형식 설정
    root.numberFormatter.setAll({ numberFormat: "#.##as" });

    // Container 생성
    const container = root.container.children.push(
      am5.Container.new(root, {
        layout: root.horizontalLayout,
        width: am5.p100,
        height: am5.p100,
      })
    );

    // XYChart 생성
    const chart = container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        width: am5.percent(70),
      })
    );

    // X,Y축 생성
    const createYAxis = (opposite) => {
      const axis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "age",
          renderer: am5xy.AxisRendererY.new(root, {
            opposite,
            minGridDistance: 15,
            minorGridEnabled: true,
          }),
        })
      );
      axis.get("renderer").labels.template.set("fontSize", 12);
      axis.data.setAll(data);
      return axis;
    };

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        max: 20,
        min: -20,
        numberFormat: "#.s'%'",
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 40 }),
      })
    );

    const yAxis1 = createYAxis(false);
    const yAxis2 = createYAxis(true);

    // xy series 생성
    const createXySeries = (name, yAxis, valueXField) => {
      const color = name === "Males" ? "#1C8BFF" : "#FF2B67";
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          xAxis,
          yAxis,
          valueXField,
          clustered: false,
          categoryYField: "age",
        })
      );

      series.columns.template.setAll({
        tooltipText:
          "{name}, age {categoryY}: {male} ({valueX.formatNumber('#.0s')}%)",
        tooltipX: am5.p100,
        cornerRadiusBL: 0,
        cornerRadiusBR: 0,
        cornerRadiusTL: 0,
        cornerRadiusTR: 0,
      });

      series.bullets.push(() => {
        return am5.Bullet.new(root, {
          locationX: 1,
          sprite: am5.Label.new(root, {
            text: "{valueX}",
            populateText: true,
            centerY: am5.p50,
            centerX: name === "Males" ? am5.p100 : -am5.p100,
          }),
        });
      });

      series.columns.template.adapters.add("fill", () => am5.color(color));
      series.data.setAll(data);

      return series;
    };

    const maleSeries = createXySeries("Males", yAxis1, "malePercent");
    const femaleSeries = createXySeries("FeMales", yAxis2, "femalePercent");

    // map Chart 생성
    const map = container.children.push(
      am5map.MapChart.new(root, {
        panX: "none",
        panY: "none",
        wheelY: "none",
        minWidth: 280,
        width: am5.percent(30),
        projection: am5map.geoMercator(),
      })
    );

    // Title 생성
    const title = map.children.push(
      am5.Label.new(root, {
        text: "South Korea",
        fontSize: 20,
        y: 20,
        x: am5.percent(50),
        centerX: am5.percent(50),
      })
    );

    // map series size 설정
    map.seriesContainer.setAll({
      scale: 0.8,
      x: am5.percent(10),
      y: am5.percent(15),
      centerX: am5.percent(10),
      centerY: am5.percent(15),
    });

    // map Series 생성
    const polygonSeries = map.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5Geodata_southKoreaLow,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color("#ccc"),
      stroke: am5.color("#fff"),
      strokeWidth: 2,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: chart.get("colors").getIndex(1),
    });

    polygonSeries.mapPolygons.template.states.create("active", {
      fill: chart.get("colors").getIndex(2),
    });

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
    });

    // active 이벤트
    let activePolygon;
    polygonSeries.mapPolygons.template.events.on("click", (ev) => {
      if (activePolygon) activePolygon.set("active", false);
      activePolygon = ev.target;
      activePolygon.set("active", true);
      const name = ev.target.dataItem.dataContext.name;
      const state = name.replace(" ", "_");
      const data = aggregateData(stateData[state]);

      for (let i = 0; i < data.length; i++) {
        maleSeries.data.setIndex(i, data[i]);
        femaleSeries.data.setIndex(i, data[i]);
      }

      title.set("text", name);
    });

    // 애니메이션 적용
    container.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return (
    <div id={id} style={{ width: "100%", height: "100%", minWidth: 720 }} />
  );
}

// codeblock 
export const PopulationPyramidCodeblock = `// geodata 추가 설치 필요
// npm i @amcharts/amcharts5-geodata 
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5map from "@amcharts/amcharts5/map";
import am5Geodata_southKoreaLow from "@amcharts/amcharts5-geodata/southKoreaLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 전체 데이터
let data = [
  {
    age: "0 - 10",
    male: 10175713,
    female: 9736305,
  },
  {
    age: "11 - 20",
    male: 10470147,
    female: 10031835,
  },
  {
    age: "21 - 30",
    male: 10561873,
    female: 10117913,
  },
  {
    age: "31 - 40",
    male: 6447043,
    female: 6142996,
  },
  {
    age: "41 - 50",
    male: 9349745,
    female: 8874664,
  },
  {
    age: "51 - 60",
    male: 6722248,
    female: 6422017,
  },
  {
    age: "61 - 70",
    male: 10989596,
    female: 10708414,
  },
  {
    age: "71 - 80",
    male: 10625791,
    female: 10557848,
  },
  {
    age: "81 - 90",
    male: 9899569,
    female: 9956213,
  },
  {
    age: "91 - 100",
    male: 10330986,
    female: 10465142,
  },
  {
    age: "101 and over",
    male: 10571984,
    female: 10798384,
  },
];

// 샘플 지역 데이터
const stateData = {
  Gangwon: [
    {
      age: "0 - 10",
      male: 28346,
      female: 26607,
    },
    {
      age: "11 - 20",
      male: 28346,
      female: 26607,
    },
    {
      age: "21 - 30",
      male: 26350,
      female: 24821,
    },
    {
      age: "31 - 40",
      male: 15929,
      female: 14735,
    },
    {
      age: "41 - 50",
      male: 25360,
      female: 19030,
    },
    {
      age: "51 - 60",
      male: 20755,
      female: 15663,
    },
    {
      age: "61 - 70",
      male: 32415,
      female: 28259,
    },
    {
      age: "71 - 80",
      male: 28232,
      female: 25272,
    },
    {
      age: "81 - 90",
      male: 24217,
      female: 22002,
    },
    {
      age: "91 - 100",
      male: 23429,
      female: 21968,
    },
    {
      age: "101 and over",
      male: 24764,
      female: 22784,
    },
  ],
  North_Gyeongsang: [
    {
      age: "0 - 10",
      male: 150860,
      female: 144194,
    },
    {
      age: "11 - 20",
      male: 28346,
      female: 26607,
    },
    {
      age: "21 - 30",
      male: 161596,
      female: 156841,
    },
    {
      age: "31 - 40",
      male: 98307,
      female: 94462,
    },
    {
      age: "41 - 50",
      male: 142173,
      female: 136514,
    },
    {
      age: "51 - 60",
      male: 99164,
      female: 101444,
    },
    {
      age: "61 - 70",
      male: 154977,
      female: 159815,
    },
    {
      age: "71 - 80",
      male: 150036,
      female: 156764,
    },
    {
      age: "81 - 90",
      male: 141667,
      female: 152220,
    },
    {
      age: "91 - 100",
      male: 155693,
      female: 159835,
    },
    {
      age: "101 and over",
      male: 156413,
      female: 163909,
    },
  ],
  Daegu: [
    {
      age: "0 - 10",
      male: 98246,
      female: 93534,
    },
    {
      age: "11 - 20",
      male: 28346,
      female: 26607,
    },
    {
      age: "21 - 30",
      male: 99707,
      female: 96862,
    },
    {
      age: "31 - 40",
      male: 60521,
      female: 57735,
    },
    {
      age: "41 - 50",
      male: 87209,
      female: 81936,
    },
    {
      age: "51 - 60",
      male: 59114,
      female: 59387,
    },
    {
      age: "61 - 70",
      male: 96190,
      female: 96573,
    },
    {
      age: "71 - 80",
      male: 96273,
      female: 95632,
    },
    {
      age: "81 - 90",
      male: 90371,
      female: 90620,
    },
    {
      age: "91 - 100",
      male: 91881,
      female: 93777,
    },
    {
      age: "101 and over",
      male: 93238,
      female: 95476,
    },
  ],
  Ulsan: [
    {
      age: "0 - 10",
      male: 221511,
      female: 212324,
    },
    {
      age: "11 - 20",
      male: 28346,
      female: 26607,
    },
    {
      age: "21 - 30",
      male: 233530,
      female: 222965,
    },
    {
      age: "31 - 40",
      male: 138926,
      female: 132399,
    },
    {
      age: "41 - 50",
      male: 200240,
      female: 187786,
    },
    {
      age: "51 - 60",
      male: 142852,
      female: 132457,
    },
    {
      age: "61 - 70",
      male: 231488,
      female: 215985,
    },
    {
      age: "71 - 80",
      male: 223754,
      female: 214946,
    },
    {
      age: "81 - 90",
      male: 206718,
      female: 202482,
    },
    {
      age: "91 - 100",
      male: 213591,
      female: 210621,
    },
    {
      age: "101 and over",
      male: 205830,
      female: 206081,
    },
  ],
  Busan: [
    {
      age: "0 - 10",
      male: 1283763,
      female: 1228013,
    },
    {
      age: "11 - 20",
      male: 28346,
      female: 26607,
    },
    {
      age: "21 - 30",
      male: 1297819,
      female: 1245016,
    },
    {
      age: "31 - 40",
      male: 811114,
      female: 773387,
    },
    {
      age: "41 - 50",
      male: 1179739,
      female: 1100368,
    },
    {
      age: "51 - 60",
      male: 883323,
      female: 825833,
    },
    {
      age: "61 - 70",
      male: 1478557,
      female: 1387516,
    },
    {
      age: "71 - 80",
      male: 1399835,
      female: 1348430,
    },
    {
      age: "81 - 90",
      male: 1287803,
      female: 1271908,
    },
    {
      age: "91 - 100",
      male: 1308311,
      female: 1309907,
    },
    {
      age: "101 and over",
      male: 1306719,
      female: 1303528,
    },
  ],
  South_Gyeongsang: [
    {
      age: "0 - 10",
      male: 173245,
      female: 163629,
    },
    {
      age: "11 - 20",
      male: 28346,
      female: 26607,
    },
    {
      age: "21 - 30",
      male: 179579,
      female: 170930,
    },
    {
      age: "31 - 40",
      male: 102577,
      female: 98569,
    },
    {
      age: "41 - 50",
      male: 152713,
      female: 139268,
    },
    {
      age: "51 - 60",
      male: 116654,
      female: 108238,
    },
    {
      age: "61 - 70",
      male: 204625,
      female: 188680,
    },
    {
      age: "71 - 80",
      male: 200624,
      female: 188616,
    },
    {
      age: "81 - 90",
      male: 183386,
      female: 175326,
    },
    {
      age: "91 - 100",
      male: 184422,
      female: 173654,
    },
    {
      age: "101 and over",
      male: 174730,
      female: 172981,
    },
  ],
  Gyeonggi: [
    {
      age: "0 - 10",
      male: 97647,
      female: 93798,
    },
    {
      age: "11 - 20",
      male: 28346,
      female: 26607,
    },
    {
      age: "21 - 30",
      male: 118032,
      female: 113043,
    },
    {
      age: "31 - 40",
      male: 75546,
      female: 71687,
    },
    {
      age: "41 - 50",
      male: 106966,
      female: 102763,
    },
    {
      age: "51 - 60",
      male: 71125,
      female: 64777,
    },
    {
      age: "61 - 70",
      male: 112189,
      female: 108170,
    },
    {
      age: "71 - 80",
      male: 107223,
      female: 109096,
    },
    {
      age: "81 - 90",
      male: 102424,
      female: 106008,
    },
    {
      age: "91 - 100",
      male: 116664,
      female: 123744,
    },
    {
      age: "101 and over",
      male: 131872,
      female: 139406,
    },
  ],
  Seoul: [
    {
      age: "0 - 10",
      male: 20585,
      female: 19848,
    },
    {
      age: "11 - 20",
      male: 28346,
      female: 26607,
    },
    {
      age: "21 - 30",
      male: 12723,
      female: 11991,
    },
    {
      age: "31 - 40",
      male: 7740,
      female: 7901,
    },
    {
      age: "41 - 50",
      male: 22350,
      female: 25467,
    },
    {
      age: "51 - 60",
      male: 15325,
      female: 19085,
    },
    {
      age: "61 - 70",
      male: 35295,
      female: 41913,
    },
    {
      age: "71 - 80",
      male: 32716,
      female: 35553,
    },
    {
      age: "81 - 90",
      male: 23748,
      female: 24922,
    },
    {
      age: "91 - 100",
      male: 21158,
      female: 20113,
    },
    {
      age: "101 and over",
      male: 19279,
      female: 18956,
    },
  ],
  Incheon: [
    {
      age: "0 - 10",
      male: 28382,
      female: 27430,
    },
    {
      age: "11 - 20",
      male: 28346,
      female: 26607,
    },
    {
      age: "21 - 30",
      male: 29482,
      female: 27484,
    },
    {
      age: "31 - 40",
      male: 17589,
      female: 16828,
    },
    {
      age: "41 - 50",
      male: 26852,
      female: 26911,
    },
    {
      age: "51 - 60",
      male: 19006,
      female: 18413,
    },
    {
      age: "61 - 70",
      male: 30933,
      female: 31146,
    },
    {
      age: "71 - 80",
      male: 28602,
      female: 29431,
    },
    {
      age: "81 - 90",
      male: 26498,
      female: 28738,
    },
    {
      age: "91 - 100",
      male: 27674,
      female: 28519,
    },
    {
      age: "101 and over",
      male: 30582,
      female: 32924,
    },
  ],
  North_Chungcheong: [
    {
      age: "0 - 10",
      male: 552054,
      female: 529003,
    },
    {
      age: "11 - 20",
      male: 28346,
      female: 26607,
    },
    {
      age: "21 - 30",
      male: 582351,
      female: 558377,
    },
    {
      age: "31 - 40",
      male: 363538,
      female: 345048,
    },
    {
      age: "41 - 50",
      male: 528013,
      female: 498162,
    },
    {
      age: "51 - 60",
      male: 385515,
      female: 368754,
    },
    {
      age: "61 - 70",
      male: 641710,
      female: 622134,
    },
    {
      age: "71 - 80",
      male: 602467,
      female: 602634,
    },
    {
      age: "81 - 90",
      male: 579722,
      female: 585089,
    },
    {
      age: "91 - 100",
      male: 623074,
      female: 639410,
    },
    {
      age: "101 and over",
      male: 659376,
      female: 677305,
    },
  ],
  Sejong: [
    {
      age: "0 - 10",
      male: 338979,
      female: 326326,
    },
    {
      age: "11 - 20",
      male: 362147,
      female: 340071,
    },
    {
      age: "21 - 30",
      male: 356404,
      female: 351833,
    },
    {
      age: "31 - 40",
      male: 211908,
      female: 203412,
    },
    {
      age: "41 - 50",
      male: 305617,
      female: 289233,
    },
    {
      age: "51 - 60",
      male: 214032,
      female: 206526,
    },
    {
      age: "61 - 70",
      male: 342885,
      female: 343115,
    },
    {
      age: "71 - 80",
      male: 333159,
      female: 348125,
    },
    {
      age: "81 - 90",
      male: 325121,
      female: 345251,
    },
    {
      age: "91 - 100",
      male: 348120,
      female: 363703,
    },
    {
      age: "101 and over",
      male: 343559,
      female: 358754,
    },
  ],
  Daejeon: [
    {
      age: "0 - 10",
      male: 46668,
      female: 44389,
    },
    {
      age: "11 - 20",
      male: 44115,
      female: 40426,
    },
    {
      age: "21 - 30",
      male: 42590,
      female: 41289,
    },
    {
      age: "31 - 40",
      male: 24759,
      female: 23961,
    },
    {
      age: "41 - 50",
      male: 39937,
      female: 32348,
    },
    {
      age: "51 - 60",
      male: 35270,
      female: 28495,
    },
    {
      age: "61 - 70",
      male: 58033,
      female: 48700,
    },
    {
      age: "71 - 80",
      male: 51544,
      female: 47286,
    },
    {
      age: "81 - 90",
      male: 44144,
      female: 42208,
    },
    {
      age: "91 - 100",
      male: 45731,
      female: 43404,
    },
    {
      age: "101 and over",
      male: 44336,
      female: 44134,
    },
  ],
  South_Chungcheong: [
    {
      age: "0 - 10",
      male: 100400,
      female: 96170,
    },
    {
      age: "11 - 20",
      male: 104279,
      female: 100558,
    },
    {
      age: "21 - 30",
      male: 104674,
      female: 98485,
    },
    {
      age: "31 - 40",
      male: 62452,
      female: 59605,
    },
    {
      age: "41 - 50",
      male: 96966,
      female: 91782,
    },
    {
      age: "51 - 60",
      male: 66307,
      female: 62504,
    },
    {
      age: "61 - 70",
      male: 98079,
      female: 93653,
    },
    {
      age: "71 - 80",
      male: 100924,
      female: 97248,
    },
    {
      age: "81 - 90",
      male: 90980,
      female: 89632,
    },
    {
      age: "91 - 100",
      male: 92961,
      female: 90218,
    },
    {
      age: "101 and over",
      male: 98877,
      female: 96654,
    },
  ],
  North_Jeolla: [
    {
      age: "0 - 10",
      male: 58355,
      female: 56478,
    },
    {
      age: "11 - 20",
      male: 63107,
      female: 59237,
    },
    {
      age: "21 - 30",
      male: 62528,
      female: 59881,
    },
    {
      age: "31 - 40",
      male: 36373,
      female: 33687,
    },
    {
      age: "41 - 50",
      male: 45752,
      female: 45590,
    },
    {
      age: "51 - 60",
      male: 34595,
      female: 30216,
    },
    {
      age: "61 - 70",
      male: 53998,
      female: 52077,
    },
    {
      age: "71 - 80",
      male: 54217,
      female: 52091,
    },
    {
      age: "81 - 90",
      male: 51247,
      female: 47801,
    },
    {
      age: "91 - 100",
      male: 49113,
      female: 49853,
    },
    {
      age: "101 and over",
      male: 48392,
      female: 48288,
    },
  ],
  South_Jeolla: [
    {
      age: "0 - 10",
      male: 408295,
      female: 392900,
    },
    {
      age: "11 - 20",
      male: 427121,
      female: 412238,
    },
    {
      age: "21 - 30",
      male: 437688,
      female: 419077,
    },
    {
      age: "31 - 40",
      male: 269202,
      female: 257213,
    },
    {
      age: "41 - 50",
      male: 369219,
      female: 353570,
    },
    {
      age: "51 - 60",
      male: 268501,
      female: 258559,
    },
    {
      age: "61 - 70",
      male: 448001,
      female: 442418,
    },
    {
      age: "71 - 80",
      male: 445416,
      female: 445729,
    },
    {
      age: "81 - 90",
      male: 416265,
      female: 418999,
    },
    {
      age: "91 - 100",
      male: 425825,
      female: 427573,
    },
    {
      age: "101 and over",
      male: 433177,
      female: 441116,
    },
  ],
  Jeju: [
    {
      age: "0 - 10",
      male: 215697,
      female: 205242,
    },
    {
      age: "11 - 20",
      male: 226901,
      female: 214964,
    },
    {
      age: "21 - 30",
      male: 229911,
      female: 221563,
    },
    {
      age: "31 - 40",
      male: 139494,
      female: 132879,
    },
    {
      age: "41 - 50",
      male: 198763,
      female: 194206,
    },
    {
      age: "51 - 60",
      male: 140805,
      female: 131947,
    },
    {
      age: "61 - 70",
      male: 210315,
      female: 208593,
    },
    {
      age: "71 - 80",
      male: 211656,
      female: 210103,
    },
    {
      age: "81 - 90",
      male: 201979,
      female: 200693,
    },
    {
      age: "91 - 100",
      male: 212114,
      female: 212653,
    },
    {
      age: "101 and over",
      male: 216446,
      female: 219033,
    },
  ],
  Gwangju: [
    {
      age: "0 - 10",
      male: 102716,
      female: 98004,
    },
    {
      age: "11 - 20",
      male: 103861,
      female: 98642,
    },
    {
      age: "21 - 30",
      male: 102335,
      female: 99132,
    },
    {
      age: "31 - 40",
      male: 60870,
      female: 57957,
    },
    {
      age: "41 - 50",
      male: 90593,
      female: 83299,
    },
    {
      age: "51 - 60",
      male: 66512,
      female: 59368,
    },
    {
      age: "61 - 70",
      male: 99384,
      female: 93840,
    },
    {
      age: "71 - 80",
      male: 98020,
      female: 94075,
    },
    {
      age: "81 - 90",
      male: 87763,
      female: 85422,
    },
    {
      age: "91 - 100",
      male: 87647,
      female: 84970,
    },
    {
      age: "101 and over",
      male: 89233,
      female: 88877,
    },
  ],
};

// 데이터 변환 함수
const aggregateData = (list) => {
  const { maleTotal, femaleTotal } = list.reduce(
    (acc, { male, female }) => ({
      maleTotal: acc.maleTotal + male,
      femaleTotal: acc.femaleTotal + female,
    }),
    { maleTotal: 0, femaleTotal: 0 }
  );

  list.map((item) => {
    let row = item;
    row.malePercent = (-1 * Math.round((row.male / maleTotal) * 10000)) / 100;
    row.femalePercent = Math.round((row.female / femaleTotal) * 10000) / 100;
  });

  return list;
};

// 초기 데이터 적용
data = aggregateData(data);

// PopulationPyramidChart
export default function PopulationPyramidChart() {
  const id = "population-pyramid-xy";
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

    // Root 숫자 형식 설정
    root.numberFormatter.setAll({ numberFormat: "#.##as" });

    // Container 생성
    const container = root.container.children.push(
      am5.Container.new(root, {
        layout: root.horizontalLayout,
        width: am5.p100,
        height: am5.p100,
      })
    );

    // XYChart 생성
    const chart = container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        width: am5.percent(70),
      })
    );

    // X,Y축 생성
    const createYAxis = (opposite) => {
      const axis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "age",
          renderer: am5xy.AxisRendererY.new(root, {
            opposite,
            minGridDistance: 15,
            minorGridEnabled: true,
          }),
        })
      );
      axis.get("renderer").labels.template.set("fontSize", 12);
      axis.data.setAll(data);
      return axis;
    };

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        max: 20,
        min: -20,
        numberFormat: "#.s'%'",
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 40 }),
      })
    );

    const yAxis1 = createYAxis(false);
    const yAxis2 = createYAxis(true);

    // xy series 생성
    const createXySeries = (name, yAxis, valueXField) => {
      const color = name === "Males" ? "#1C8BFF" : "#FF2B67";
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          xAxis,
          yAxis,
          valueXField,
          clustered: false,
          categoryYField: "age",
        })
      );

      series.columns.template.setAll({
        tooltipText:
          "{name}, age {categoryY}: {male} ({valueX.formatNumber('#.0s')}%)",
        tooltipX: am5.p100,
        cornerRadiusBL: 0,
        cornerRadiusBR: 0,
        cornerRadiusTL: 0,
        cornerRadiusTR: 0,
      });

      series.bullets.push(() => {
        return am5.Bullet.new(root, {
          locationX: 1,
          sprite: am5.Label.new(root, {
            text: "{valueX}",
            populateText: true,
            centerY: am5.p50,
            centerX: name === "Males" ? am5.p100 : -am5.p100,
          }),
        });
      });

      series.columns.template.adapters.add("fill", () => am5.color(color));
      series.data.setAll(data);

      return series;
    };

    const maleSeries = createXySeries("Males", yAxis1, "malePercent");
    const femaleSeries = createXySeries("FeMales", yAxis2, "femalePercent");

    // map Chart 생성
    const map = container.children.push(
      am5map.MapChart.new(root, {
        panX: "none",
        panY: "none",
        wheelY: "none",
        minWidth: 280,
        width: am5.percent(30),
        projection: am5map.geoMercator(),
      })
    );

    // Title 생성
    const title = map.children.push(
      am5.Label.new(root, {
        text: "South Korea",
        fontSize: 20,
        y: 20,
        x: am5.percent(50),
        centerX: am5.percent(50),
      })
    );

    // map series size 설정
    map.seriesContainer.setAll({
      scale: 0.8,
      x: am5.percent(10),
      y: am5.percent(15),
      centerX: am5.percent(10),
      centerY: am5.percent(15),
    });

    // map Series 생성
    const polygonSeries = map.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5Geodata_southKoreaLow,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color("#ccc"),
      stroke: am5.color("#fff"),
      strokeWidth: 2,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: chart.get("colors").getIndex(1),
    });

    polygonSeries.mapPolygons.template.states.create("active", {
      fill: chart.get("colors").getIndex(2),
    });

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
    });

    // active 이벤트
    let activePolygon;
    polygonSeries.mapPolygons.template.events.on("click", (ev) => {
      if (activePolygon) activePolygon.set("active", false);
      activePolygon = ev.target;
      activePolygon.set("active", true);
      const name = ev.target.dataItem.dataContext.name;
      const state = name.replace(" ", "_");
      const data = aggregateData(stateData[state]);

      for (let i = 0; i < data.length; i++) {
        maleSeries.data.setIndex(i, data[i]);
        femaleSeries.data.setIndex(i, data[i]);
      }

      title.set("text", name);
    });

    // 애니메이션 적용
    container.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return (
    <div id={id} style={{ width: "100%", height: "100%", minWidth: 720 }} />
  );
}`