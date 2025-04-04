import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    year: "2001",
    cars: 1298,
    motorcycles: 680,
    bicycles: 101,
  },
  {
    year: "2002",
    cars: 1275,
    motorcycles: 664,
    bicycles: 97,
  },
  {
    year: "2003",
    cars: 1246,
    motorcycles: 648,
    bicycles: 93,
  },
  {
    year: "2004",
    cars: 1318,
    motorcycles: 697,
    bicycles: 111,
  },
  {
    year: "2005",
    cars: 1213,
    motorcycles: 633,
    bicycles: 87,
  },
  {
    year: "2006",
    cars: 1199,
    motorcycles: 521,
    bicycles: 145,
  },
  {
    year: "2007",
    cars: 1110,
    motorcycles: 310,
    bicycles: 91,
  },
  {
    year: "2008",
    cars: 1165,
    motorcycles: 425,
    bicycles: 120,
  },
  {
    year: "2009",
    cars: 1145,
    motorcycles: 319,
    bicycles: 102,
  },
  {
    year: "2010",
    cars: 1163,
    motorcycles: 201,
    bicycles: 145,
  },
  {
    year: "2011",
    cars: 1180,
    motorcycles: 285,
    bicycles: 100,
  },
  {
    year: "2012",
    cars: 1159,
    motorcycles: 255,
    bicycles: 122,
  },
];

const category = [...new Set(data.flatMap(Object.keys))].splice(1);

// SmoothedStackedLineChart
export default function SmoothedStackedLineChart() {
  const id = "smoothedstacked-line";
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

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft:0
      })
    );

    // 커서 추가
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "none" })
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke",themes.chartVariables[theme].base);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation:0,
        endLocation: 0.5,
        startLocation: 0.5,
        categoryField: "year",
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 70,
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

    // series 생성 함수
    const createSeries = (field) => {
      const series = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          xAxis,
          yAxis,
          name: field,
          stacked: true,
          valueYField: field,
          categoryXField: "year",
          stroke: am5.color("#fff"),
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[bold]{name}[/]\n{categoryX}: {valueY}",
          }),
        })
      );

      series.strokes.template.setAll({
        strokeWidth: 4,
        strokeOpacity: 1,
        shadowBlur: 10,
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowOpacity: 0.1,
        shadowColor: am5.color(0x000000),
      });

      series.fills.template.setAll({
        visible: true,
        fillOpacity: 1,
        fillPattern: am5.GrainPattern.new(root, {
          density: 0.5,
          maxOpacity: 0.15,
          colors: [
            am5.color(0x000000),
            am5.color(0x000000),
            am5.color(0xffffff),
          ],
        }),
      });

      series.data.setAll(data);
      series.appear(1000);
    };

    // series 생성
    category.map((item) => createSeries(item));

    // 데이터 적용
    xAxis.data.setAll(data);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock 
export const SmoothedStackedLineCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    year: "2001",
    cars: 1298,
    motorcycles: 680,
    bicycles: 101,
  },
  {
    year: "2002",
    cars: 1275,
    motorcycles: 664,
    bicycles: 97,
  },
  {
    year: "2003",
    cars: 1246,
    motorcycles: 648,
    bicycles: 93,
  },
  {
    year: "2004",
    cars: 1318,
    motorcycles: 697,
    bicycles: 111,
  },
  {
    year: "2005",
    cars: 1213,
    motorcycles: 633,
    bicycles: 87,
  },
  {
    year: "2006",
    cars: 1199,
    motorcycles: 521,
    bicycles: 145,
  },
  {
    year: "2007",
    cars: 1110,
    motorcycles: 310,
    bicycles: 91,
  },
  {
    year: "2008",
    cars: 1165,
    motorcycles: 425,
    bicycles: 120,
  },
  {
    year: "2009",
    cars: 1145,
    motorcycles: 319,
    bicycles: 102,
  },
  {
    year: "2010",
    cars: 1163,
    motorcycles: 201,
    bicycles: 145,
  },
  {
    year: "2011",
    cars: 1180,
    motorcycles: 285,
    bicycles: 100,
  },
  {
    year: "2012",
    cars: 1159,
    motorcycles: 255,
    bicycles: 122,
  },
];

const category = [...new Set(data.flatMap(Object.keys))].splice(1);

// SmoothedStackedLineChart
export default function SmoothedStackedLineChart() {
  const id = "smoothedstacked-line";
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

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft:0
      })
    );

    // 커서 추가
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "none" })
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke",themes.chartVariables[theme].base);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation:0,
        endLocation: 0.5,
        startLocation: 0.5,
        categoryField: "year",
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 70,
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

    // series 생성 함수
    const createSeries = (field) => {
      const series = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          xAxis,
          yAxis,
          name: field,
          stacked: true,
          valueYField: field,
          categoryXField: "year",
          stroke: am5.color("#fff"),
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[bold]{name}[/]\\n{categoryX}: {valueY}",
          }),
        })
      );

      series.strokes.template.setAll({
        strokeWidth: 4,
        strokeOpacity: 1,
        shadowBlur: 10,
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowOpacity: 0.1,
        shadowColor: am5.color(0x000000),
      });

      series.fills.template.setAll({
        visible: true,
        fillOpacity: 1,
        fillPattern: am5.GrainPattern.new(root, {
          density: 0.5,
          maxOpacity: 0.15,
          colors: [
            am5.color(0x000000),
            am5.color(0x000000),
            am5.color(0xffffff),
          ],
        }),
      });

      series.data.setAll(data);
      series.appear(1000);
    };

    // series 생성
    category.map((item) => createSeries(item));

    // 데이터 적용
    xAxis.data.setAll(data);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`