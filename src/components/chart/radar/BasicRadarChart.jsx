import * as am5 from "@amcharts/amcharts5";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    country: "Czechia",
    litres: 301,
  },
  {
    country: "Ireland",
    litres: 266,
  },
  {
    country: "Germany",
    litres: 165,
  },
  {
    country: "Australia",
    litres: 139,
  },
  {
    country: "Austria",
    litres: 336,
  },
  {
    country: "The Netherlands",
    litres: 40,
  },
];

// BasicRadarChart
export default function BasicRadarChart() {
  const id = "basic-radar";
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

    // RadarChart 생성
    const chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        wheelX: false,
        wheelY: false,
        paddingTop:0,
        paddingLeft:0,
        paddingRight:0,
        paddingBottom:0,
      })
    );
    chart.plotContainer.get("background").set("visible", false);

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5radar.RadarCursor.new(root, {
        behavior: "zoomX",
      })
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("visible", false);

    // x,y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "country",
        renderer: am5radar.AxisRendererCircular.new(root, {
          minGridDistance: 10,
        }),
      })
    );
    xAxis.get("renderer").grid.template.set("location", 0.5);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5radar.AxisRendererRadial.new(root, {}),
      })
    );
    yAxis.get("renderer").set("stroke", 0);
    yAxis.get("renderer").grid.template.set("stroke", 0);
    yAxis.get("renderer").labels.template.set("opacity", 0);

    // series 생성
    const series = chart.series.push(
      am5radar.RadarLineSeries.new(root, {
        xAxis,
        yAxis,
        name: "Series",
        valueYField: "litres",
        categoryXField: "country",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    series.strokes.template.setAll({ strokeWidth: 2 });
    series.fills.template.setAll({
      visible: true,
      fillOpacity: 0.3,
    });

    series.bullets.push(() => {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: series.get("fill"),
        }),
      });
    });

    // 데이터 적용
    series.data.setAll(data);
    xAxis.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock 
export const BasicRadarCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    country: "Czechia",
    litres: 301,
  },
  {
    country: "Ireland",
    litres: 266,
  },
  {
    country: "Germany",
    litres: 165,
  },
  {
    country: "Australia",
    litres: 139,
  },
  {
    country: "Austria",
    litres: 336,
  },
  {
    country: "The Netherlands",
    litres: 40,
  },
];

// BasicRadarChart
export default function BasicRadarChart() {
  const id = "basic-radar";
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

    // RadarChart 생성
    const chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        wheelX: false,
        wheelY: false,
        paddingTop:0,
        paddingLeft:0,
        paddingRight:0,
        paddingBottom:0,
      })
    );
    chart.plotContainer.get("background").set("visible", false);

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5radar.RadarCursor.new(root, {
        behavior: "zoomX",
      })
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("visible", false);

    // x,y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "country",
        renderer: am5radar.AxisRendererCircular.new(root, {
          minGridDistance: 10,
        }),
      })
    );
    xAxis.get("renderer").grid.template.set("location", 0.5);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5radar.AxisRendererRadial.new(root, {}),
      })
    );
    yAxis.get("renderer").set("stroke", 0);
    yAxis.get("renderer").grid.template.set("stroke", 0);
    yAxis.get("renderer").labels.template.set("opacity", 0);

    // series 생성
    const series = chart.series.push(
      am5radar.RadarLineSeries.new(root, {
        xAxis,
        yAxis,
        name: "Series",
        valueYField: "litres",
        categoryXField: "country",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    series.strokes.template.setAll({ strokeWidth: 2 });
    series.fills.template.setAll({
      visible: true,
      fillOpacity: 0.3,
    });

    series.bullets.push(() => {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: series.get("fill"),
        }),
      });
    });

    // 데이터 적용
    series.data.setAll(data);
    xAxis.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`