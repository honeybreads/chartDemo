import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = {
  2002: {
    Friendster: 0,
    Facebook: 0,
    Flickr: 0,
    "Google Buzz": 0,
    "Google+": 0,
    Hi5: 0,
    Instagram: 0,
    MySpace: 0,
    Orkut: 0,
    Pinterest: 0,
    Reddit: 0,
    Snapchat: 0,
    TikTok: 0,
    Tumblr: 0,
    Twitter: 0,
    WeChat: 0,
    Weibo: 0,
    Whatsapp: 0,
    YouTube: 0,
  },
  2003: {
    Friendster: 4470000,
    Facebook: 0,
    Flickr: 0,
    "Google Buzz": 0,
    "Google+": 0,
    Hi5: 0,
    Instagram: 0,
    MySpace: 0,
    Orkut: 0,
    Pinterest: 0,
    Reddit: 0,
    Snapchat: 0,
    TikTok: 0,
    Tumblr: 0,
    Twitter: 0,
    WeChat: 0,
    Weibo: 0,
    Whatsapp: 0,
    YouTube: 0,
  },
  2004: {
    Friendster: 5970054,
    Facebook: 0,
    Flickr: 3675135,
    "Google Buzz": 0,
    "Google+": 0,
    Hi5: 0,
    Instagram: 0,
    MySpace: 980036,
    Orkut: 4900180,
    Pinterest: 0,
    Reddit: 0,
    Snapchat: 0,
    TikTok: 0,
    Tumblr: 0,
    Twitter: 0,
    WeChat: 0,
    Weibo: 0,
    Whatsapp: 0,
    YouTube: 0,
  },
  2005: {
    Friendster: 7459742,
    Facebook: 0,
    Flickr: 7399354,
    "Google Buzz": 0,
    "Google+": 0,
    Hi5: 9731610,
    Instagram: 0,
    MySpace: 19490059,
    Orkut: 9865805,
    Pinterest: 0,
    Reddit: 0,
    Snapchat: 0,
    TikTok: 0,
    Tumblr: 0,
    Twitter: 0,
    WeChat: 0,
    Weibo: 0,
    Whatsapp: 0,
    YouTube: 1946322,
  },
  2006: {
    Friendster: 8989854,
    Facebook: 0,
    Flickr: 14949270,
    "Google Buzz": 0,
    "Google+": 0,
    Hi5: 19932360,
    Instagram: 0,
    MySpace: 54763260,
    Orkut: 14966180,
    Pinterest: 0,
    Reddit: 248309,
    Snapchat: 0,
    TikTok: 0,
    Tumblr: 0,
    Twitter: 0,
    WeChat: 0,
    Weibo: 0,
    Whatsapp: 0,
    YouTube: 19878248,
  },
  2007: {
    Friendster: 24253200,
    Facebook: 0,
    Flickr: 29299875,
    "Google Buzz": 0,
    "Google+": 0,
    Hi5: 29533250,
    Instagram: 0,
    MySpace: 69299875,
    Orkut: 26916562,
    Pinterest: 0,
    Reddit: 488331,
    Snapchat: 0,
    TikTok: 0,
    Tumblr: 0,
    Twitter: 0,
    WeChat: 0,
    Weibo: 0,
    Whatsapp: 0,
    YouTube: 143932250,
  },
  2008: {
    Friendster: 51008911,
    Facebook: 100000000,
    Flickr: 30000000,
    "Google Buzz": 0,
    "Google+": 0,
    Hi5: 55045618,
    Instagram: 0,
    MySpace: 72408233,
    Orkut: 44357628,
    Pinterest: 0,
    Reddit: 1944940,
    Snapchat: 0,
    TikTok: 0,
    Tumblr: 0,
    Twitter: 0,
    WeChat: 0,
    Weibo: 0,
    Whatsapp: 0,
    YouTube: 294493950,
  },
  2009: {
    Friendster: 28804331,
    Facebook: 276000000,
    Flickr: 41834525,
    "Google Buzz": 0,
    "Google+": 0,
    Hi5: 57893524,
    Instagram: 0,
    MySpace: 70133095,
    Orkut: 47366905,
    Pinterest: 0,
    Reddit: 3893524,
    Snapchat: 0,
    TikTok: 0,
    Tumblr: 0,
    Twitter: 0,
    WeChat: 0,
    Weibo: 0,
    Whatsapp: 0,
    YouTube: 413611440,
  },
  2010: {
    Friendster: 0,
    Facebook: 517750000,
    Flickr: 54708063,
    "Google Buzz": 166029650,
    "Google+": 0,
    Hi5: 59953290,
    Instagram: 0,
    MySpace: 68046710,
    Orkut: 49941613,
    Pinterest: 0,
    Reddit: 0,
    Snapchat: 0,
    TikTok: 0,
    Tumblr: 0,
    Twitter: 43250000,
    WeChat: 0,
    Weibo: 19532900,
    Whatsapp: 0,
    YouTube: 480551990,
  },
  2011: {
    Friendster: 0,
    Facebook: 766000000,
    Flickr: 66954600,
    "Google Buzz": 170000000,
    "Google+": 0,
    Hi5: 46610848,
    Instagram: 0,
    MySpace: 46003536,
    Orkut: 47609080,
    Pinterest: 0,
    Reddit: 0,
    Snapchat: 0,
    TikTok: 0,
    Tumblr: 0,
    Twitter: 92750000,
    WeChat: 47818400,
    Weibo: 48691040,
    Whatsapp: 0,
    YouTube: 642669824,
  },
  2012: {
    Friendster: 0,
    Facebook: 979750000,
    Flickr: 79664888,
    "Google Buzz": 170000000,
    "Google+": 107319100,
    Hi5: 0,
    Instagram: 0,
    MySpace: 0,
    Orkut: 45067022,
    Pinterest: 0,
    Reddit: 0,
    Snapchat: 0,
    TikTok: 0,
    Tumblr: 146890156,
    Twitter: 160250000,
    WeChat: 118123370,
    Weibo: 79195730,
    Whatsapp: 0,
    YouTube: 844638200,
  },
  2013: {
    Friendster: 0,
    Facebook: 1170500000,
    Flickr: 80000000,
    "Google Buzz": 170000000,
    "Google+": 205654700,
    Hi5: 0,
    Instagram: 117500000,
    MySpace: 0,
    Orkut: 0,
    Pinterest: 0,
    Reddit: 0,
    Snapchat: 0,
    TikTok: 0,
    Tumblr: 293482050,
    Twitter: 223675000,
    WeChat: 196523760,
    Weibo: 118261880,
    Whatsapp: 300000000,
    YouTube: 1065223075,
  },
  2014: {
    Friendster: 0,
    Facebook: 1334000000,
    Flickr: 0,
    "Google Buzz": 170000000,
    "Google+": 254859015,
    Hi5: 0,
    Instagram: 250000000,
    MySpace: 0,
    Orkut: 0,
    Pinterest: 0,
    Reddit: 135786956,
    Snapchat: 0,
    TikTok: 0,
    Tumblr: 388721163,
    Twitter: 223675000,
    WeChat: 444232415,
    Weibo: 154890345,
    Whatsapp: 498750000,
    YouTube: 1249451725,
  },
  2015: {
    Friendster: 0,
    Facebook: 1516750000,
    Flickr: 0,
    "Google Buzz": 170000000,
    "Google+": 298950015,
    Hi5: 0,
    Instagram: 400000000,
    MySpace: 0,
    Orkut: 0,
    Pinterest: 0,
    Reddit: 163346676,
    Snapchat: 0,
    TikTok: 0,
    Tumblr: 475923363,
    Twitter: 304500000,
    WeChat: 660843407,
    Weibo: 208716685,
    Whatsapp: 800000000,
    YouTube: 1328133360,
  },
  2016: {
    Friendster: 0,
    Facebook: 1753500000,
    Flickr: 0,
    "Google Buzz": 0,
    "Google+": 398648000,
    Hi5: 0,
    Instagram: 550000000,
    MySpace: 0,
    Orkut: 0,
    Pinterest: 143250000,
    Reddit: 238972480,
    Snapchat: 238648000,
    TikTok: 0,
    Tumblr: 565796720,
    Twitter: 314500000,
    WeChat: 847512320,
    Weibo: 281026560,
    Whatsapp: 1000000000,
    YouTube: 1399053600,
  },
  2017: {
    Friendster: 0,
    Facebook: 2035750000,
    Flickr: 0,
    "Google Buzz": 0,
    "Google+": 495657000,
    Hi5: 0,
    Instagram: 750000000,
    MySpace: 0,
    Orkut: 0,
    Pinterest: 195000000,
    Reddit: 297394200,
    Snapchat: 0,
    TikTok: 239142500,
    Tumblr: 593783960,
    Twitter: 328250000,
    WeChat: 921742750,
    Weibo: 357569030,
    Whatsapp: 1333333333,
    YouTube: 1495657000,
  },
  2018: {
    Friendster: 0,
    Facebook: 2255250000,
    Flickr: 0,
    "Google Buzz": 0,
    "Google+": 430000000,
    Hi5: 0,
    Instagram: 1000000000,
    MySpace: 0,
    Orkut: 0,
    Pinterest: 246500000,
    Reddit: 355000000,
    Snapchat: 0,
    TikTok: 500000000,
    Tumblr: 624000000,
    Twitter: 329500000,
    WeChat: 1000000000,
    Weibo: 431000000,
    Whatsapp: 1433333333,
    YouTube: 1900000000,
  },
};

// RaceBarChart
export default function RaceBarChart() {
  const id = "race-bar";
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

    // 줌아웃 버튼 숨기기
    chart.zoomOutButton.set("forceHidden", true);

    // 숫자 데이터 형식 지정
    root.numberFormatter.setAll({
      numberFormat: "#a",
      smallNumberPrefixes: [],
      bigNumberPrefixes: [
        { number: 1e6, suffix: "M" },
        { number: 1e9, suffix: "B" },
      ],
    });

    // step 속도 지정
    const stepDuration = 2000;

    // X,Y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "network",
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: true,
          minGridDistance: 20,
          minorGridEnabled: true,
        }),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        extraMax: 0.1,
        maxDeviation: 0,
        strictMinMax: true,
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    yAxis.get("renderer").grid.template.set("visible", false);
    xAxis.setAll({
      interpolationEasing: am5.ease.linear,
      interpolationDuration: stepDuration / 10,
    });

    // series 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueXField: "value",
        categoryYField: "network",
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

    series.bullets.push(() => {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          centerY: am5.p50,
          centerX: am5.p100,
          populateText: true,
          fill: am5.color("#fff"),
          text: "{valueXWorking.formatNumber('#.# a')}",
        }),
      });
    });

    const label = chart.plotContainer.children.push(
      am5.Label.new(root, {
        text: "2002",
        opacity: 0.2,
        fontSize: "8em",
        x: am5.p100,
        y: am5.p100,
        centerY: am5.p100,
        centerX: am5.p100,
      })
    );

    // 특정 카테고리 찾기 함수
    const getSeriesItem = (category) =>
      series.dataItems.find((item) => item.get("categoryY") === category);

    // Axis 정렬 함수
    const sortCategoryAxis = () => {
      series.dataItems.sort((x, y) => y.get("valueX") - x.get("valueX"));

      am5.array.each(yAxis.dataItems, (dataItem) => {
        const seriesDataItem = getSeriesItem(dataItem.get("category"));

        if (seriesDataItem) {
          const index = series.dataItems.indexOf(seriesDataItem);
          const deltaPosition =
            (index - dataItem.get("index", 0)) / series.dataItems.length;
          if (dataItem.get("index") != index) {
            dataItem.set("index", index);
            dataItem.set("deltaPosition", -deltaPosition);
            dataItem.animate({
              key: "deltaPosition",
              to: 0,
              duration: stepDuration / 2,
              easing: am5.ease.out(am5.ease.cubic),
            });
          }
        }
      });

      yAxis.dataItems.sort((x, y) => x.get("index") - y.get("index"));
    };

    // 데이터 연도 가져오기
    const fullYear = Object.keys(data);
    let year = fullYear[0];

    // 날짜 업데이트 함수
    const updateData = () => {
      let itemsWithNonZero = 0;

      if (data[year]) {
        label.set("text", year.toString());

        am5.array.each(series.dataItems, (dataItem) => {
          const category = dataItem.get("categoryY");
          const value = data[year][category];
          value > 0 && itemsWithNonZero++;

          dataItem.animate({
            key: "valueX",
            to: value,
            duration: stepDuration,
            easing: am5.ease.linear,
          });

          dataItem.animate({
            key: "valueXWorking",
            to: value,
            duration: stepDuration,
            easing: am5.ease.linear,
          });
        });

        yAxis.zoom(0, itemsWithNonZero / yAxis.dataItems.length);
      }
    };

    // Axis 정렬 인터벌
    const sortInterval = setInterval(sortCategoryAxis, 100);

    // 전체 인터벌
    const interval = setInterval(() => {
      year++;
      if (year > fullYear[fullYear.length]) {
        clearInterval(interval);
        clearInterval(sortInterval);
      }
      updateData();
    }, stepDuration);

    // 데이터 적용
    const setInitialData = () => {
      let d = data[year];
      for (let n in d) {
        yAxis.data.push({ network: n });
        series.data.push({ network: n, value: d[n] });
      }
    };
    setInitialData();

    // 초기 애니메이션 적용
    year++;
    updateData();
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
