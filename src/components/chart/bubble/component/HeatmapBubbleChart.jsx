import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    hour: "12pm",
    weekday: "Sunday",
    value: 2990,
  },
  {
    hour: "1am",
    weekday: "Sunday",
    value: 2520,
  },
  {
    hour: "2am",
    weekday: "Sunday",
    value: 2334,
  },
  {
    hour: "3am",
    weekday: "Sunday",
    value: 2230,
  },
  {
    hour: "4am",
    weekday: "Sunday",
    value: 2325,
  },
  {
    hour: "5am",
    weekday: "Sunday",
    value: 2019,
  },
  {
    hour: "6am",
    weekday: "Sunday",
    value: 2128,
  },
  {
    hour: "7am",
    weekday: "Sunday",
    value: 2246,
  },
  {
    hour: "8am",
    weekday: "Sunday",
    value: 2421,
  },
  {
    hour: "9am",
    weekday: "Sunday",
    value: 2788,
  },
  {
    hour: "10am",
    weekday: "Sunday",
    value: 2959,
  },
  {
    hour: "11am",
    weekday: "Sunday",
    value: 3018,
  },
  {
    hour: "12am",
    weekday: "Sunday",
    value: 3154,
  },
  {
    hour: "1pm",
    weekday: "Sunday",
    value: 3172,
  },
  {
    hour: "2pm",
    weekday: "Sunday",
    value: 3368,
  },
  {
    hour: "3pm",
    weekday: "Sunday",
    value: 3464,
  },
  {
    hour: "4pm",
    weekday: "Sunday",
    value: 3746,
  },
  {
    hour: "5pm",
    weekday: "Sunday",
    value: 3656,
  },
  {
    hour: "6pm",
    weekday: "Sunday",
    value: 3336,
  },
  {
    hour: "7pm",
    weekday: "Sunday",
    value: 3292,
  },
  {
    hour: "8pm",
    weekday: "Sunday",
    value: 3269,
  },
  {
    hour: "9pm",
    weekday: "Sunday",
    value: 3300,
  },
  {
    hour: "10pm",
    weekday: "Sunday",
    value: 3403,
  },
  {
    hour: "11pm",
    weekday: "Sunday",
    value: 3323,
  },
  {
    hour: "12pm",
    weekday: "Monday",
    value: 3346,
  },
  {
    hour: "1am",
    weekday: "Monday",
    value: 2725,
  },
  {
    hour: "2am",
    weekday: "Monday",
    value: 3052,
  },
  {
    hour: "3am",
    weekday: "Monday",
    value: 3876,
  },
  {
    hour: "4am",
    weekday: "Monday",
    value: 4453,
  },
  {
    hour: "5am",
    weekday: "Monday",
    value: 3972,
  },
  {
    hour: "6am",
    weekday: "Monday",
    value: 4644,
  },
  {
    hour: "7am",
    weekday: "Monday",
    value: 5715,
  },
  {
    hour: "8am",
    weekday: "Monday",
    value: 7080,
  },
  {
    hour: "9am",
    weekday: "Monday",
    value: 8022,
  },
  {
    hour: "10am",
    weekday: "Monday",
    value: 8446,
  },
  {
    hour: "11am",
    weekday: "Monday",
    value: 9313,
  },
  {
    hour: "12am",
    weekday: "Monday",
    value: 9011,
  },
  {
    hour: "1pm",
    weekday: "Monday",
    value: 8508,
  },
  {
    hour: "2pm",
    weekday: "Monday",
    value: 8515,
  },
  {
    hour: "3pm",
    weekday: "Monday",
    value: 8399,
  },
  {
    hour: "4pm",
    weekday: "Monday",
    value: 8649,
  },
  {
    hour: "5pm",
    weekday: "Monday",
    value: 7869,
  },
  {
    hour: "6pm",
    weekday: "Monday",
    value: 6933,
  },
  {
    hour: "7pm",
    weekday: "Monday",
    value: 5969,
  },
  {
    hour: "8pm",
    weekday: "Monday",
    value: 5552,
  },
  {
    hour: "9pm",
    weekday: "Monday",
    value: 5434,
  },
  {
    hour: "10pm",
    weekday: "Monday",
    value: 5070,
  },
  {
    hour: "11pm",
    weekday: "Monday",
    value: 4851,
  },
  {
    hour: "12pm",
    weekday: "Tuesday",
    value: 4468,
  },
  {
    hour: "1am",
    weekday: "Tuesday",
    value: 3306,
  },
  {
    hour: "2am",
    weekday: "Tuesday",
    value: 3906,
  },
  {
    hour: "3am",
    weekday: "Tuesday",
    value: 4413,
  },
  {
    hour: "4am",
    weekday: "Tuesday",
    value: 4726,
  },
  {
    hour: "5am",
    weekday: "Tuesday",
    value: 4584,
  },
  {
    hour: "6am",
    weekday: "Tuesday",
    value: 5717,
  },
  {
    hour: "7am",
    weekday: "Tuesday",
    value: 6504,
  },
  {
    hour: "8am",
    weekday: "Tuesday",
    value: 8104,
  },
  {
    hour: "9am",
    weekday: "Tuesday",
    value: 8813,
  },
  {
    hour: "10am",
    weekday: "Tuesday",
    value: 9278,
  },
  {
    hour: "11am",
    weekday: "Tuesday",
    value: 10425,
  },
  {
    hour: "12am",
    weekday: "Tuesday",
    value: 10137,
  },
  {
    hour: "1pm",
    weekday: "Tuesday",
    value: 9290,
  },
  {
    hour: "2pm",
    weekday: "Tuesday",
    value: 9255,
  },
  {
    hour: "3pm",
    weekday: "Tuesday",
    value: 9614,
  },
  {
    hour: "4pm",
    weekday: "Tuesday",
    value: 9713,
  },
  {
    hour: "5pm",
    weekday: "Tuesday",
    value: 9667,
  },
  {
    hour: "6pm",
    weekday: "Tuesday",
    value: 8774,
  },
  {
    hour: "7pm",
    weekday: "Tuesday",
    value: 8649,
  },
  {
    hour: "8pm",
    weekday: "Tuesday",
    value: 9937,
  },
  {
    hour: "9pm",
    weekday: "Tuesday",
    value: 10286,
  },
  {
    hour: "10pm",
    weekday: "Tuesday",
    value: 9175,
  },
  {
    hour: "11pm",
    weekday: "Tuesday",
    value: 8581,
  },
  {
    hour: "12pm",
    weekday: "Wednesday",
    value: 8145,
  },
  {
    hour: "1am",
    weekday: "Wednesday",
    value: 7177,
  },
  {
    hour: "2am",
    weekday: "Wednesday",
    value: 5657,
  },
  {
    hour: "3am",
    weekday: "Wednesday",
    value: 6802,
  },
  {
    hour: "4am",
    weekday: "Wednesday",
    value: 8159,
  },
  {
    hour: "5am",
    weekday: "Wednesday",
    value: 8449,
  },
  {
    hour: "6am",
    weekday: "Wednesday",
    value: 9453,
  },
  {
    hour: "7am",
    weekday: "Wednesday",
    value: 9947,
  },
  {
    hour: "8am",
    weekday: "Wednesday",
    value: 11471,
  },
  {
    hour: "9am",
    weekday: "Wednesday",
    value: 12492,
  },
  {
    hour: "10am",
    weekday: "Wednesday",
    value: 9388,
  },
  {
    hour: "11am",
    weekday: "Wednesday",
    value: 9928,
  },
  {
    hour: "12am",
    weekday: "Wednesday",
    value: 9644,
  },
  {
    hour: "1pm",
    weekday: "Wednesday",
    value: 9034,
  },
  {
    hour: "2pm",
    weekday: "Wednesday",
    value: 8964,
  },
  {
    hour: "3pm",
    weekday: "Wednesday",
    value: 9069,
  },
  {
    hour: "4pm",
    weekday: "Wednesday",
    value: 8898,
  },
  {
    hour: "5pm",
    weekday: "Wednesday",
    value: 8322,
  },
  {
    hour: "6pm",
    weekday: "Wednesday",
    value: 6909,
  },
  {
    hour: "7pm",
    weekday: "Wednesday",
    value: 5810,
  },
  {
    hour: "8pm",
    weekday: "Wednesday",
    value: 5151,
  },
  {
    hour: "9pm",
    weekday: "Wednesday",
    value: 4911,
  },
  {
    hour: "10pm",
    weekday: "Wednesday",
    value: 4487,
  },
  {
    hour: "11pm",
    weekday: "Wednesday",
    value: 4118,
  },
  {
    hour: "12pm",
    weekday: "Thursday",
    value: 3689,
  },
  {
    hour: "1am",
    weekday: "Thursday",
    value: 3081,
  },
  {
    hour: "2am",
    weekday: "Thursday",
    value: 6525,
  },
  {
    hour: "3am",
    weekday: "Thursday",
    value: 6228,
  },
  {
    hour: "4am",
    weekday: "Thursday",
    value: 6917,
  },
  {
    hour: "5am",
    weekday: "Thursday",
    value: 6568,
  },
  {
    hour: "6am",
    weekday: "Thursday",
    value: 6405,
  },
  {
    hour: "7am",
    weekday: "Thursday",
    value: 8106,
  },
  {
    hour: "8am",
    weekday: "Thursday",
    value: 8542,
  },
  {
    hour: "9am",
    weekday: "Thursday",
    value: 8501,
  },
  {
    hour: "10am",
    weekday: "Thursday",
    value: 8802,
  },
  {
    hour: "11am",
    weekday: "Thursday",
    value: 9420,
  },
  {
    hour: "12am",
    weekday: "Thursday",
    value: 8966,
  },
  {
    hour: "1pm",
    weekday: "Thursday",
    value: 8135,
  },
  {
    hour: "2pm",
    weekday: "Thursday",
    value: 8224,
  },
  {
    hour: "3pm",
    weekday: "Thursday",
    value: 8387,
  },
  {
    hour: "4pm",
    weekday: "Thursday",
    value: 8218,
  },
  {
    hour: "5pm",
    weekday: "Thursday",
    value: 7641,
  },
  {
    hour: "6pm",
    weekday: "Thursday",
    value: 6469,
  },
  {
    hour: "7pm",
    weekday: "Thursday",
    value: 5441,
  },
  {
    hour: "8pm",
    weekday: "Thursday",
    value: 4952,
  },
  {
    hour: "9pm",
    weekday: "Thursday",
    value: 4643,
  },
  {
    hour: "10pm",
    weekday: "Thursday",
    value: 4393,
  },
  {
    hour: "11pm",
    weekday: "Thursday",
    value: 4017,
  },
  {
    hour: "12pm",
    weekday: "Friday",
    value: 4022,
  },
  {
    hour: "1am",
    weekday: "Friday",
    value: 3063,
  },
  {
    hour: "2am",
    weekday: "Friday",
    value: 3638,
  },
  {
    hour: "3am",
    weekday: "Friday",
    value: 3968,
  },
  {
    hour: "4am",
    weekday: "Friday",
    value: 4070,
  },
  {
    hour: "5am",
    weekday: "Friday",
    value: 4019,
  },
  {
    hour: "6am",
    weekday: "Friday",
    value: 4548,
  },
  {
    hour: "7am",
    weekday: "Friday",
    value: 5465,
  },
  {
    hour: "8am",
    weekday: "Friday",
    value: 6909,
  },
  {
    hour: "9am",
    weekday: "Friday",
    value: 7706,
  },
  {
    hour: "10am",
    weekday: "Friday",
    value: 7867,
  },
  {
    hour: "11am",
    weekday: "Friday",
    value: 8615,
  },
  {
    hour: "12am",
    weekday: "Friday",
    value: 8218,
  },
  {
    hour: "1pm",
    weekday: "Friday",
    value: 7604,
  },
  {
    hour: "2pm",
    weekday: "Friday",
    value: 7429,
  },
  {
    hour: "3pm",
    weekday: "Friday",
    value: 7488,
  },
  {
    hour: "4pm",
    weekday: "Friday",
    value: 7493,
  },
  {
    hour: "5pm",
    weekday: "Friday",
    value: 6998,
  },
  {
    hour: "6pm",
    weekday: "Friday",
    value: 5941,
  },
  {
    hour: "7pm",
    weekday: "Friday",
    value: 5068,
  },
  {
    hour: "8pm",
    weekday: "Friday",
    value: 4636,
  },
  {
    hour: "9pm",
    weekday: "Friday",
    value: 4241,
  },
  {
    hour: "10pm",
    weekday: "Friday",
    value: 3858,
  },
  {
    hour: "11pm",
    weekday: "Friday",
    value: 3833,
  },
  {
    hour: "12pm",
    weekday: "Saturday",
    value: 3503,
  },
  {
    hour: "1am",
    weekday: "Saturday",
    value: 2842,
  },
  {
    hour: "2am",
    weekday: "Saturday",
    value: 2808,
  },
  {
    hour: "3am",
    weekday: "Saturday",
    value: 2399,
  },
  {
    hour: "4am",
    weekday: "Saturday",
    value: 2280,
  },
  {
    hour: "5am",
    weekday: "Saturday",
    value: 2139,
  },
  {
    hour: "6am",
    weekday: "Saturday",
    value: 2527,
  },
  {
    hour: "7am",
    weekday: "Saturday",
    value: 2940,
  },
  {
    hour: "8am",
    weekday: "Saturday",
    value: 3066,
  },
  {
    hour: "9am",
    weekday: "Saturday",
    value: 3494,
  },
  {
    hour: "10am",
    weekday: "Saturday",
    value: 3287,
  },
  {
    hour: "11am",
    weekday: "Saturday",
    value: 3416,
  },
  {
    hour: "12am",
    weekday: "Saturday",
    value: 3432,
  },
  {
    hour: "1pm",
    weekday: "Saturday",
    value: 3523,
  },
  {
    hour: "2pm",
    weekday: "Saturday",
    value: 3542,
  },
  {
    hour: "3pm",
    weekday: "Saturday",
    value: 3347,
  },
  {
    hour: "4pm",
    weekday: "Saturday",
    value: 3292,
  },
  {
    hour: "5pm",
    weekday: "Saturday",
    value: 3416,
  },
  {
    hour: "6pm",
    weekday: "Saturday",
    value: 3131,
  },
  {
    hour: "7pm",
    weekday: "Saturday",
    value: 3057,
  },
  {
    hour: "8pm",
    weekday: "Saturday",
    value: 3227,
  },
  {
    hour: "9pm",
    weekday: "Saturday",
    value: 3060,
  },
  {
    hour: "10pm",
    weekday: "Saturday",
    value: 2855,
  },
  {
    hour: "11pm",
    weekday: "Saturday",
    value: 2625,
  },
];

// 데이터에서 카테고리 생성
const createCategory = (name) =>
  [...new Set(data.map((item) => item[name]))].map((value) => ({
    [name]: value,
  }));

const xAxisData = createCategory("hour");
const yAxisData = createCategory("weekday");

// HeatmapBubbleChart
export default function HeatmapBubbleChart() {
  const id = "heatmap-bubble";
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
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
        layout: root.verticalLayout,
      })
    );
    chart.plotContainer.get("background").setAll({ stroke: 0 });

    // X,Y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "weekday",
        renderer: am5xy.AxisRendererY.new(root, {
          visible: false,
          inversed: true,
          minGridDistance: 20,
        }),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "hour",
        renderer: am5xy.AxisRendererX.new(root, {
          visible: false,
          opposite: true,
          minGridDistance: 30,
        }),
      })
    );
    xAxis.get("renderer").grid.template.set("visible", false);

    // series 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        clustered: false,
        valueField: "value",
        categoryXField: "hour",
        categoryYField: "weekday",
        calculateAggregates: true,
        stroke: themes.chartVariables[theme].line,
        maskBullets:false
      })
    );

    series.columns.template.setAll({ forceHidden: true });
    const circleTemplate = am5.Template.new({ radius: 5 });

    // bullet 생성
    series.bullets.push(() => {
      const graphics = am5.Circle.new(
        root,
        {
          fill: series.get("fill"),
          stroke: series.get("stroke"),
        },
        circleTemplate
      );
      return am5.Bullet.new(root, { sprite: graphics });
    });

    series.set("heatRules", [
      {
        min: 5,
        max: 20,
        key: "radius",
        dataField: "value",
        target: circleTemplate,
      },
    ]);

    // data 적용
    series.data.setAll(data);
    yAxis.data.setAll(yAxisData);
    xAxis.data.setAll(xAxisData);

    // 애니메이션 적용
    chart.appear(1000, 100);
    setInterval(() => {
      let i = 0;
      series.data.each((d) => {
        let n = {
          value: d.value + d.value * Math.random() * 0.5,
          hour: d.hour,
          weekday: d.weekday,
        };
        series.data.setIndex(i, n);
        i++;
      });
    }, 1000);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
