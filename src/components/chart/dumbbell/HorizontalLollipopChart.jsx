import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { category: "Raina", value: 101 },
  { category: "Demarcus", value: 96 },
  { category: "Carlo", value: 95 },
  { category: "Jacinda", value: 91 },
  { category: "Richie", value: 89 },
  { category: "Antony", value: 92 },
  { category: "Amada", value: 90 },
  { category: "Idalia", value: 89 },
  { category: "Janella", value: 89 },
  { category: "Marla", value: 86 },
  { category: "Curtis", value: 84 },
  { category: "Shellie", value: 83 },
];

export default function HorizontalLollipopChart() {
  const id = "horizontal-lollipop";
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
        paddingTop:20,
        paddingLeft: 0,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );

    // 커서 추가
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("visible", false);
    cursor.lineY.set("stroke",themes.chartVariables[theme].base);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 50,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0 ,
        categoryField: "category",
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 20,
        }),
      })
    );

    xAxis.get("renderer").grid.template.setAll({
      visible: false,
    });

    // series 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueXField: "value",
        categoryYField: "category",
        adjustBulletPosition: false,
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueX}",
        }),
      })
    );

    series.get("tooltip").adapters.add("stateAnimationDuration", () => 0);
    series.columns.template.setAll({ height: 2 });
    series.columns.template.adapters.add("fill", (_, target) => {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.bullets.push((_, datas, target) => {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: chart.get("colors").getIndex(datas.dataItems.indexOf(target)),
        }),
      });
    });

    // 데이터 적용
    yAxis.data.setAll(data);
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock 
export const HorizontalLollipopCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { category: "Raina", value: 101 },
  { category: "Demarcus", value: 96 },
  { category: "Carlo", value: 95 },
  { category: "Jacinda", value: 91 },
  { category: "Richie", value: 89 },
  { category: "Antony", value: 92 },
  { category: "Amada", value: 90 },
  { category: "Idalia", value: 89 },
  { category: "Janella", value: 89 },
  { category: "Marla", value: 86 },
  { category: "Curtis", value: 84 },
  { category: "Shellie", value: 83 },
];

export default function HorizontalLollipopChart() {
  const id = "horizontal-lollipop";
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
        paddingTop:20,
        paddingLeft: 0,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );

    // 커서 추가
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("visible", false);
    cursor.lineY.set("stroke",themes.chartVariables[theme].base);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 50,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0 ,
        categoryField: "category",
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 20,
        }),
      })
    );

    xAxis.get("renderer").grid.template.setAll({
      visible: false,
    });

    // series 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueXField: "value",
        categoryYField: "category",
        adjustBulletPosition: false,
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueX}",
        }),
      })
    );

    series.get("tooltip").adapters.add("stateAnimationDuration", () => 0);
    series.columns.template.setAll({ height: 2 });
    series.columns.template.adapters.add("fill", (_, target) => {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.bullets.push((_, datas, target) => {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: chart.get("colors").getIndex(datas.dataItems.indexOf(target)),
        }),
      });
    });

    // 데이터 적용
    yAxis.data.setAll(data);
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`