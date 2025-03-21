import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 초기 데이터 설정
const firstYear = 1950;
const lastYear = 2022;
let currentYear = firstYear;
const yearlyData = {};

// 연도별 데이터 생성
for (let year = firstYear; year <= lastYear; year++) {
  const yearEntries = [];

  for (let i = 0; i < 50; i++) {
    if (year === firstYear) {
      yearEntries.push({
        x: Math.round(Math.random() * 100 - 90),
        y: Math.round(Math.random() * 100 - 90),
        value: Math.round(Math.random() * 1000),
      });
    } else {
      const previous = yearlyData[year - 1][i];
      yearEntries.push({
        x: previous.x + Math.round(Math.random() * 5 - 2 + i / 50),
        y: previous.y + Math.round(Math.random() * 5 - 2 + i / 50),
        value: Math.abs(previous.value + Math.round(Math.random() * 100 - 45)),
      });
    }
  }
  yearlyData[year] = yearEntries;
}

// TimelineBubbleChart
export default function TimelineBubbleChart() {
  const id = "motion-bubble";
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
        wheelY: "zoomXY",
        pinchZoomX: true,
        pinchZoomY: true,
      })
    );
    chart.plotContainer.get("background").setAll({ stroke: 0 });

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        max: 100,
        min: -100,
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        max: 100,
        min: -100,
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    [xAxis, yAxis].map((axis) => {
      axis.get("renderer").grid.template.setAll({
        strokeOpacity:0.2,
        stroke: am5.color("#fff"),
      });
      axis.get("renderer").adapters.add("stroke", () => false);
    });

    // series(4개 영영역) 생성
    const areaData = [
      {
        color: colorList[1],
        pos: [
          { ax: -200, ay: 0 },
          { ax: 0, ay: 0 },
          { ax: 0, ay: 200 },
          { ax: -200, ay: 200 },
        ],
      },
      {
        color: colorList[2],
        pos: [
          { ax: -200, ay: 0 },
          { ax: 0, ay: 0 },
          { ax: 0, ay: -200 },
          { ax: -200, ay: -200 },
        ],
      },
      {
        color: colorList[3],
        pos: [
          { ax: 200, ay: 0 },
          { ax: 0, ay: 0 },
          { ax: 0, ay: -200 },
          { ax: 200, ay: -200 },
        ],
      },
      {
        color: colorList[4],
        pos: [
          { ax: 200, ay: 0 },
          { ax: 0, ay: 0 },
          { ax: 0, ay: 200 },
          { ax: 200, ay: 200 },
        ],
      },
    ];

    const createAreaSeries = (color, pos) => {
      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis,
          yAxis,
          valueXField: "ax",
          valueYField: "ay",
          fill: am5.color(color),
        })
      );

      series.fills.template.setAll({ fillOpacity: 0.9, visible: true });
      series.strokes.template.set("forceHidden", true);
      series.data.setAll(pos);
      return series;
    };

    areaData.map((item) => createAreaSeries(item.color, item.pos));

    chart.plotContainer.children.moveValue(
      chart.gridContainer,
      chart.plotContainer.children.length - 1
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
    series.strokes.template.set("visible", false);

    // bullet 생성
    const circleTemplate = am5.Template.new({});
    series.bullets.push(() => {
      const bulletCircle = am5.Circle.new(
        root,
        {
          layer: 2,
          radius: 5,
          fillOpacity: 0.7,
          fill: series.get("fill"),
          tooltipText: "x: {valueX} y:{valueY} value: {value}",
        },
        circleTemplate
      );
      return am5.Bullet.new(root, { sprite: bulletCircle });
    });

    series.set("heatRules", [
      {
        target: circleTemplate,
        min: 3,
        max: 35,
        key: "radius",
        maxValue: 2000,
        dataField: "value",
      },
    ]);

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { xAxis, yAxis })
    );
    cursor.lineX.setAll({ stroke: themes.chartVariables[theme].base });
    cursor.lineY.setAll({ stroke: themes.chartVariables[theme].base });

    // Label(연도) 생성
    const label = chart.plotContainer.children.push(
      am5.Label.new(root, {
        opacity: 0.3,
        fontSize: "5em",
        fill: am5.color(0x000000),
        text: currentYear.toString(),
      })
    );

    // controls 생성
    const container = chart.plotContainer.children.push(
      am5.Container.new(root, {
        x: am5.p50,
        y: am5.p100,
        centerX: am5.p50,
        centerY: am5.p100,
        paddingBottom: 8,
        width: am5.percent(90),
        layout: root.horizontalLayout,
      })
    );

    const playButton = container.children.push(
      am5.Button.new(root, {
        layer: 2,
        marginRight: 20,
        centerY: am5.p50,
        themeTags: ["play"],
        icon: am5.Graphics.new(root, { themeTags: ["icon"] }),
      })
    );

    const slider = container.children.push(
      am5.Slider.new(root, {
        start: 0,
        centerY: am5.p50,
        orientation: "horizontal",
      })
    );

    playButton.events.on("click", () => {
      if (playButton.get("active")) {
        slider.set("start", slider.get("start") + 0.0001);
      } else {
        slider.animate({
          key: "start",
          to: 1,
          duration: 15000 * (1 - slider.get("start")),
        });
      }
    });

    slider.on("start", (start) => {
      if (start === 1) playButton.set("active", false);
    });

    slider.events.on("rangechanged", () => {
      updateSeriesData(
        firstYear + Math.round(slider.get("start", 0) * (lastYear - firstYear))
      );
    });

    const updateSeriesData = (year) => {
      if (currentYear != year) {
        currentYear = year;
        const data = yearlyData[year];

        let i = 0;
        am5.array.each(data, (item) => {
          series.data.setIndex(i, item);
          i++;
        });

        label.set("text", year.toString());
      }
    };

    // 데이터 적용
    series.data.setAll(yearlyData[currentYear]);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
