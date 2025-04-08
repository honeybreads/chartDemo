import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// HoneycombChart
export default function HoneycombChart() {
  const id = "honeycomb-chart";
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

    // 샘플 데이터
    const data = [
      {
        short: "AL",
        name: "Alabama",
        y: 6,
        x: 7,
        value: 4849300,
      },
      {
        short: "AK",
        name: "Alaska",
        y: 0,
        x: 0,
        value: 737700,
      },
      {
        short: "AZ",
        name: "Arizona",
        y: 5,
        x: 3,
        value: 6745400,
      },
      {
        short: "AR",
        name: "Arkansas",
        y: 5,
        x: 6,
        value: 2994000,
      },
      {
        short: "CA",
        name: "California",
        y: 5,
        x: 2,
        value: 39250000,
      },
      {
        short: "CO",
        name: "Colorado",
        y: 4,
        x: 3,
        value: 5540500,
      },
      {
        short: "CT",
        name: "Connecticut",
        y: 3,
        x: 11,
        value: 3596600,
      },
      {
        short: "DE",
        name: "Delaware",
        y: 4,
        x: 9,
        value: 935600,
      },
      {
        short: "DC",
        name: "District of Columbia",
        y: 4,
        x: 10,
        value: 7288000,
      },
      {
        short: "FL",
        name: "Florida",
        y: 8,
        x: 8,
        value: 20612400,
      },
      {
        short: "GA",
        name: "Georgia",
        y: 7,
        x: 8,
        value: 10310300,
      },
      {
        short: "HI",
        name: "Hawaii",
        y: 8,
        x: 0,
        value: 1419500,
      },
      {
        short: "ID",
        name: "Idaho",
        y: 3,
        x: 2,
        value: 1634400,
      },
      {
        short: "IL",
        name: "Illinois",
        y: 3,
        x: 6,
        value: 12801500,
      },
      {
        short: "IN",
        name: "Indiana",
        y: 3,
        x: 7,
        value: 6596800,
      },
      {
        short: "IA",
        name: "Iowa",
        y: 3,
        x: 5,
        value: 3107100,
      },
      {
        short: "KS",
        name: "Kansas",
        y: 5,
        x: 5,
        value: 2904000,
      },
      {
        short: "KY",
        name: "Kentucky",
        y: 4,
        x: 6,
        value: 4413400,
      },
      {
        short: "LA",
        name: "Louisiana",
        y: 6,
        x: 5,
        value: 4649600,
      },
      {
        short: "ME",
        name: "Maine",
        y: 0,
        x: 11,
        value: 1330000,
      },
      {
        short: "MD",
        name: "Maryland",
        y: 4,
        x: 8,
        value: 6016400,
      },
      {
        short: "MA",
        name: "Massachusetts",
        y: 2,
        x: 10,
        value: 6811700,
      },
      {
        short: "MI",
        name: "Michigan",
        y: 2,
        x: 7,
        value: 9928300,
      },
      {
        short: "MN",
        name: "Minnesota",
        y: 2,
        x: 4,
        value: 5519900,
      },
      {
        short: "MS",
        name: "Mississippi",
        y: 6,
        x: 6,
        value: 2984900,
      },
      {
        short: "MO",
        name: "Missouri",
        y: 4,
        x: 5,
        value: 6093000,
      },
      {
        short: "MT",
        name: "Montana",
        y: 2,
        x: 2,
        value: 1023500,
      },
      {
        short: "NE",
        name: "Nebraska",
        y: 4,
        x: 4,
        value: 1881500,
      },
      {
        short: "NV",
        name: "Nevada",
        y: 4,
        x: 2,
        value: 2839000,
      },
      {
        short: "NH",
        name: "New Hampshire",
        y: 1,
        x: 11,
        value: 1326800,
      },
      {
        short: "NJ",
        name: "New Jersey",
        y: 3,
        x: 10,
        value: 8944400,
      },
      {
        short: "NM",
        name: "New Mexico",
        y: 6,
        x: 3,
        value: 2085500,
      },
      {
        short: "NY",
        name: "New York",
        y: 2,
        x: 9,
        value: 19745200,
      },
      {
        short: "NC",
        name: "North Carolina",
        y: 5,
        x: 9,
        value: 10146700,
      },
      {
        short: "ND",
        name: "North Dakota",
        y: 2,
        x: 3,
        value: 739400,
      },
      {
        short: "OH",
        name: "Ohio",
        y: 3,
        x: 8,
        value: 11614370,
      },
      {
        short: "OK",
        name: "Oklahoma",
        y: 6,
        x: 4,
        value: 3878000,
      },
      {
        short: "OR",
        name: "Oregon",
        y: 4,
        x: 1,
        value: 3970200,
      },
      {
        short: "PA",
        name: "Pennsylvania",
        y: 3,
        x: 9,
        value: 12784200,
      },
      {
        short: "RI",
        name: "Rhode Island",
        y: 2,
        x: 11,
        value: 1055100,
      },
      {
        short: "SC",
        name: "South Carolina",
        y: 6,
        x: 8,
        value: 4832400,
      },
      {
        short: "SD",
        name: "South Dakota",
        y: 3,
        x: 4,
        value: 853100,
      },
      {
        short: "TN",
        name: "Tennessee",
        y: 5,
        x: 7,
        value: 6651100,
      },
      {
        short: "TX",
        name: "Texas",
        y: 7,
        x: 4,
        value: 27862500,
      },
      {
        short: "UT",
        name: "Utah",
        y: 5,
        x: 4,
        value: 2942900,
      },
      {
        short: "VT",
        name: "Vermont",
        y: 1,
        x: 10,
        value: 626010,
      },
      {
        short: "VA",
        name: "Virginia",
        y: 5,
        x: 8,
        value: 8411800,
      },
      {
        short: "WA",
        name: "Washington",
        y: 2,
        x: 1,
        value: 7288000,
      },
      {
        short: "WV",
        name: "West Virginia",
        y: 4,
        x: 7,
        value: 1850320,
      },
      {
        short: "WI",
        name: "Wisconsin",
        y: 2,
        x: 5,
        value: 5778700,
      },
      {
        short: "WY",
        name: "Wyoming",
        y: 3,
        x: 3,
        value: 584150,
      },
    ];

    // XYChart 생성
    const chart = root.container.children.push(am5xy.XYChart.new(root, {}));
    chart.gridContainer.set("opacity", 0);
    chart.plotContainer.get("background").set("opacity", 0);

    // x,y축 생성
    const axisOption = (min, max) => {
      return {
        min,
        max,
        opacity: 0,
        strictMinMax: true,
      };
    };

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        ...axisOption(0, 12),
        renderer: am5xy.AxisRendererX.new(root, {
          inside: true,
          minGridDistance: 50,
        }),
      })
    );

    xAxis.get("renderer").adapters.add("width", () => {
      root.dom.style.height = root.width() * 0.7 + "px";
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        ...axisOption(-1, 7),
        renderer: am5xy.AxisRendererY.new(root, {
          inside: true,
          inversed: true,
        }),
      })
    );

    // series 생성
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        valueYField: "y",
        valueXField: "x",
        valueField: "value",
        calculateAggregates: true,
      })
    );
    series.strokes.template.set("strokeOpacity", 0);

    // bullets(벌집) 생성
    const template = am5.Template.new({});
    series.bullets.push(() => {
      const container = am5.Container.new(root, {});
      const graphics = am5.Line.new(
        root,
        {
          strokeWidth: 2,
          tooltipY: -am5.p50,
          strokeDasharray: [0, 0],
          tooltipText: "{name} {value}",
          stroke: themes.chartVariables[theme].line,
        },
        template
      );

      graphics.adapters.add("x", (x, target) => {
        const w = Math.abs(xAxis.getX(0, 1, 0) - xAxis.getX(1, 1, 0)) / 2;
        const h = Math.abs(yAxis.getY(0, 1, 0) - yAxis.getY(1, 1, 0)) / 2;
        const p0 = { x: 0, y: -h };
        const p1 = { x: w, y: -h / 2 };
        const p2 = { x: w, y: h / 2 };
        const p3 = { x: 0, y: h };
        const p4 = { x: -w, y: h / 2 };
        const p5 = { x: -w, y: -h / 2 };
        const p6 = { x: 0, y: -h };

        target.set("segments", [[[p0, p1, p2, p3, p4, p5, p6]]]);
        return x;
      });

      const label = am5.Label.new(root, {
        layer: 10,
        text: "{short}",
        centerX: am5.p50,
        centerY: am5.p50,
        populateText: true,
        fill: am5.color("#fff"),
      });

      label.adapters.add("fill", () => {
        const color = am5.Color.alternative(
          graphics.get("fill"),
          am5.color("#fff"),
          am5.color("#000")
        );
        return color;
      });
      container.children.push(graphics);
      container.children.push(label);

      const bullet = am5.Bullet.new(root, { sprite: container });
      bullet.get("sprite").states.create("hover", { scale: 1.1, layer: 9 });
      bullet.get("sprite").events.on("pointerover", (ev) => {
        ev.target.toFront();
      });

      return bullet;
    });

    series.set("heatRules", [
      {
        key: "fill",
        target: template,
        dataField: "value",
        min: am5.color(colorList[0]),
        max: am5.color(colorList[primary.length - 1]),
      },
    ]);

    // 벌집 형태 위치 적용
    const vStep = (1 + am5.math.sin(30)) / 2;
    am5.array.each(data, (di) => {
      if (di.y / 2 == Math.round(di.y / 2)) di.x += 0.5;
      di.y = vStep * di.y;
    });

    // 데이터 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "auto" }} />;
}

// codeblock
export const HoneycombCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// HoneycombChart
export default function HoneycombChart() {
  const id = "honeycomb-chart";
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

    // 샘플 데이터
    const data = [
      {
        short: "AL",
        name: "Alabama",
        y: 6,
        x: 7,
        value: 4849300,
      },
      {
        short: "AK",
        name: "Alaska",
        y: 0,
        x: 0,
        value: 737700,
      },
      {
        short: "AZ",
        name: "Arizona",
        y: 5,
        x: 3,
        value: 6745400,
      },
      {
        short: "AR",
        name: "Arkansas",
        y: 5,
        x: 6,
        value: 2994000,
      },
      {
        short: "CA",
        name: "California",
        y: 5,
        x: 2,
        value: 39250000,
      },
      {
        short: "CO",
        name: "Colorado",
        y: 4,
        x: 3,
        value: 5540500,
      },
      {
        short: "CT",
        name: "Connecticut",
        y: 3,
        x: 11,
        value: 3596600,
      },
      {
        short: "DE",
        name: "Delaware",
        y: 4,
        x: 9,
        value: 935600,
      },
      {
        short: "DC",
        name: "District of Columbia",
        y: 4,
        x: 10,
        value: 7288000,
      },
      {
        short: "FL",
        name: "Florida",
        y: 8,
        x: 8,
        value: 20612400,
      },
      {
        short: "GA",
        name: "Georgia",
        y: 7,
        x: 8,
        value: 10310300,
      },
      {
        short: "HI",
        name: "Hawaii",
        y: 8,
        x: 0,
        value: 1419500,
      },
      {
        short: "ID",
        name: "Idaho",
        y: 3,
        x: 2,
        value: 1634400,
      },
      {
        short: "IL",
        name: "Illinois",
        y: 3,
        x: 6,
        value: 12801500,
      },
      {
        short: "IN",
        name: "Indiana",
        y: 3,
        x: 7,
        value: 6596800,
      },
      {
        short: "IA",
        name: "Iowa",
        y: 3,
        x: 5,
        value: 3107100,
      },
      {
        short: "KS",
        name: "Kansas",
        y: 5,
        x: 5,
        value: 2904000,
      },
      {
        short: "KY",
        name: "Kentucky",
        y: 4,
        x: 6,
        value: 4413400,
      },
      {
        short: "LA",
        name: "Louisiana",
        y: 6,
        x: 5,
        value: 4649600,
      },
      {
        short: "ME",
        name: "Maine",
        y: 0,
        x: 11,
        value: 1330000,
      },
      {
        short: "MD",
        name: "Maryland",
        y: 4,
        x: 8,
        value: 6016400,
      },
      {
        short: "MA",
        name: "Massachusetts",
        y: 2,
        x: 10,
        value: 6811700,
      },
      {
        short: "MI",
        name: "Michigan",
        y: 2,
        x: 7,
        value: 9928300,
      },
      {
        short: "MN",
        name: "Minnesota",
        y: 2,
        x: 4,
        value: 5519900,
      },
      {
        short: "MS",
        name: "Mississippi",
        y: 6,
        x: 6,
        value: 2984900,
      },
      {
        short: "MO",
        name: "Missouri",
        y: 4,
        x: 5,
        value: 6093000,
      },
      {
        short: "MT",
        name: "Montana",
        y: 2,
        x: 2,
        value: 1023500,
      },
      {
        short: "NE",
        name: "Nebraska",
        y: 4,
        x: 4,
        value: 1881500,
      },
      {
        short: "NV",
        name: "Nevada",
        y: 4,
        x: 2,
        value: 2839000,
      },
      {
        short: "NH",
        name: "New Hampshire",
        y: 1,
        x: 11,
        value: 1326800,
      },
      {
        short: "NJ",
        name: "New Jersey",
        y: 3,
        x: 10,
        value: 8944400,
      },
      {
        short: "NM",
        name: "New Mexico",
        y: 6,
        x: 3,
        value: 2085500,
      },
      {
        short: "NY",
        name: "New York",
        y: 2,
        x: 9,
        value: 19745200,
      },
      {
        short: "NC",
        name: "North Carolina",
        y: 5,
        x: 9,
        value: 10146700,
      },
      {
        short: "ND",
        name: "North Dakota",
        y: 2,
        x: 3,
        value: 739400,
      },
      {
        short: "OH",
        name: "Ohio",
        y: 3,
        x: 8,
        value: 11614370,
      },
      {
        short: "OK",
        name: "Oklahoma",
        y: 6,
        x: 4,
        value: 3878000,
      },
      {
        short: "OR",
        name: "Oregon",
        y: 4,
        x: 1,
        value: 3970200,
      },
      {
        short: "PA",
        name: "Pennsylvania",
        y: 3,
        x: 9,
        value: 12784200,
      },
      {
        short: "RI",
        name: "Rhode Island",
        y: 2,
        x: 11,
        value: 1055100,
      },
      {
        short: "SC",
        name: "South Carolina",
        y: 6,
        x: 8,
        value: 4832400,
      },
      {
        short: "SD",
        name: "South Dakota",
        y: 3,
        x: 4,
        value: 853100,
      },
      {
        short: "TN",
        name: "Tennessee",
        y: 5,
        x: 7,
        value: 6651100,
      },
      {
        short: "TX",
        name: "Texas",
        y: 7,
        x: 4,
        value: 27862500,
      },
      {
        short: "UT",
        name: "Utah",
        y: 5,
        x: 4,
        value: 2942900,
      },
      {
        short: "VT",
        name: "Vermont",
        y: 1,
        x: 10,
        value: 626010,
      },
      {
        short: "VA",
        name: "Virginia",
        y: 5,
        x: 8,
        value: 8411800,
      },
      {
        short: "WA",
        name: "Washington",
        y: 2,
        x: 1,
        value: 7288000,
      },
      {
        short: "WV",
        name: "West Virginia",
        y: 4,
        x: 7,
        value: 1850320,
      },
      {
        short: "WI",
        name: "Wisconsin",
        y: 2,
        x: 5,
        value: 5778700,
      },
      {
        short: "WY",
        name: "Wyoming",
        y: 3,
        x: 3,
        value: 584150,
      },
    ];

    // XYChart 생성
    const chart = root.container.children.push(am5xy.XYChart.new(root, {}));
    chart.gridContainer.set("opacity", 0);
    chart.plotContainer.get("background").set("opacity", 0);

    // x,y축 생성
    const axisOption = (min, max) => {
      return {
        min,
        max,
        opacity: 0,
        strictMinMax: true,
      };
    };

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        ...axisOption(0, 12),
        renderer: am5xy.AxisRendererX.new(root, {
          inside: true,
          minGridDistance: 50,
        }),
      })
    );

    xAxis.get("renderer").adapters.add("width", () => {
      root.dom.style.height = root.width() * 0.7 + "px";
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        ...axisOption(-1, 7),
        renderer: am5xy.AxisRendererY.new(root, {
          inside: true,
          inversed: true,
        }),
      })
    );

    // series 생성
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        valueYField: "y",
        valueXField: "x",
        valueField: "value",
        calculateAggregates: true,
      })
    );
    series.strokes.template.set("strokeOpacity", 0);

    // bullets(벌집) 생성
    const template = am5.Template.new({});
    series.bullets.push(() => {
      const container = am5.Container.new(root, {});
      const graphics = am5.Line.new(
        root,
        {
          strokeWidth: 2,
          tooltipY: -am5.p50,
          strokeDasharray: [0, 0],
          tooltipText: "{name} {value}",
          stroke: themes.chartVariables[theme].line,
        },
        template
      );

      graphics.adapters.add("x", (x, target) => {
        const w = Math.abs(xAxis.getX(0, 1, 0) - xAxis.getX(1, 1, 0)) / 2;
        const h = Math.abs(yAxis.getY(0, 1, 0) - yAxis.getY(1, 1, 0)) / 2;
        const p0 = { x: 0, y: -h };
        const p1 = { x: w, y: -h / 2 };
        const p2 = { x: w, y: h / 2 };
        const p3 = { x: 0, y: h };
        const p4 = { x: -w, y: h / 2 };
        const p5 = { x: -w, y: -h / 2 };
        const p6 = { x: 0, y: -h };

        target.set("segments", [[[p0, p1, p2, p3, p4, p5, p6]]]);
        return x;
      });

      const label = am5.Label.new(root, {
        layer: 10,
        text: "{short}",
        centerX: am5.p50,
        centerY: am5.p50,
        populateText: true,
        fill: am5.color("#fff"),
      });

      label.adapters.add("fill", () => {
        const color = am5.Color.alternative(
          graphics.get("fill"),
          am5.color("#fff"),
          am5.color("#000")
        );
        return color;
      });
      container.children.push(graphics);
      container.children.push(label);

      const bullet = am5.Bullet.new(root, { sprite: container });
      bullet.get("sprite").states.create("hover", { scale: 1.1, layer: 9 });
      bullet.get("sprite").events.on("pointerover", (ev) => {
        ev.target.toFront();
      });

      return bullet;
    });

    series.set("heatRules", [
      {
        key: "fill",
        target: template,
        dataField: "value",
        min: am5.color(colorList[0]),
        max: am5.color(colorList[primary.length - 1]),
      },
    ]);

    // 벌집 형태 위치 적용
    const vStep = (1 + am5.math.sin(30)) / 2;
    am5.array.each(data, (di) => {
      if (di.y / 2 == Math.round(di.y / 2)) di.x += 0.5;
      di.y = vStep * di.y;
    });

    // 데이터 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "auto" }} />;
}`;
