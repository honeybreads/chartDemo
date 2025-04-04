import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "USA",
    value: 2025,
  },
  {
    category: "China",
    value: 1882,
  },
  {
    category: "Japan",
    value: 1809,
  },
  {
    category: "Germany",
    value: 1322,
  },
  {
    category: "UK",
    value: 1122,
  },
  {
    category: "France",
    value: 1114,
  },
  {
    category: "India",
    value: 984,
  },
  {
    category: "Spain",
    value: 711,
  },
];

// ParetoColumnChart
export default function ParetoColumnChart() {
  const id = "pareto-column";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary, lineColors } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // 누적 값 생성
    const calculateParetoData = () => {
      let total = data.reduce((sum, item) => sum + item.value, 0);
      let cumulative = 0;
      data.forEach((item) => {
        cumulative += item.value;
        item.pareto = (cumulative / total) * 100;
      });
    };
    calculateParetoData();

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        paddingRight: 0,
        layout: root.verticalLayout,
      })
    );

    // x,y,pareto축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        maxDeviation:0,
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 20 }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, { minGridDistance: 40 }),
      })
    );

    const paretoAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        strictMinMax: true,
        renderer: am5xy.AxisRendererY.new(root, {
          opposite: true,
          minGridDistance: 100,
        }),
      })
    );

    xAxis.get("renderer").grid.template.setAll({ location: 1 });
    xAxis.get("renderer").labels.template.setAll({ textAlign: "center" });
    xAxis.get("renderer").labels.template.adapters.add("width", (_, target) => {
      return themes.axisLabelSetWidth(xAxis, target);
    });

    paretoAxis.set("numberFormat", "#'%");
    paretoAxis.get("renderer").grid.template.set("forceHidden", true);

    // series(바 그래프) 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueYField: "value",
        categoryXField: "category",
      })
    );

    series.columns.template.setAll({
      tooltipY: 0,
      tooltipText: "{categoryX}: {valueY}",
    });

    series.columns.template.adapters.add("fill", (_, target) =>
      chart.get("colors").getIndex(series.columns.indexOf(target))
    );

    // pareto series(라인 그래프) 생성
    const paretoSeries = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis: paretoAxis,
        maskBullets: true,
        valueYField: "pareto",
        categoryXField: "category",
        stroke: lineColors.lineStroke,
      })
    );

    paretoSeries.bullets.push(() => {
      return themes.createBulletSpriet(
        root,
        lineColors.bulletFill,
        lineColors.lineStroke
      );
    });

    // 데이터 적용
    xAxis.data.setAll(data);
    series.data.setAll(data);
    paretoSeries.data.setAll(data);

    // 애니메이션 적용
    series.appear();
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock 
export const ParetoColumnCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "USA",
    value: 2025,
  },
  {
    category: "China",
    value: 1882,
  },
  {
    category: "Japan",
    value: 1809,
  },
  {
    category: "Germany",
    value: 1322,
  },
  {
    category: "UK",
    value: 1122,
  },
  {
    category: "France",
    value: 1114,
  },
  {
    category: "India",
    value: 984,
  },
  {
    category: "Spain",
    value: 711,
  },
];

// ParetoColumnChart
export default function ParetoColumnChart() {
  const id = "pareto-column";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";
  
  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary, lineColors } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // 누적 값 생성
    const calculateParetoData = () => {
      let total = data.reduce((sum, item) => sum + item.value, 0);
      let cumulative = 0;
      data.forEach((item) => {
        cumulative += item.value;
        item.pareto = (cumulative / total) * 100;
      });
    };
    calculateParetoData();

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        paddingRight: 0,
        layout: root.verticalLayout,
      })
    );

    // x,y,pareto축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        maxDeviation:0,
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 20 }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, { minGridDistance: 40 }),
      })
    );

    const paretoAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        strictMinMax: true,
        renderer: am5xy.AxisRendererY.new(root, {
          opposite: true,
          minGridDistance: 100,
        }),
      })
    );

    xAxis.get("renderer").grid.template.setAll({ location: 1 });
    xAxis.get("renderer").labels.template.setAll({ textAlign: "center" });
    xAxis.get("renderer").labels.template.adapters.add("width", (_, target) => {
      return themes.axisLabelSetWidth(xAxis, target);
    });

    paretoAxis.set("numberFormat", "#'%");
    paretoAxis.get("renderer").grid.template.set("forceHidden", true);

    // series(바 그래프) 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueYField: "value",
        categoryXField: "category",
      })
    );

    series.columns.template.setAll({
      tooltipY: 0,
      tooltipText: "{categoryX}: {valueY}",
    });

    series.columns.template.adapters.add("fill", (_, target) =>
      chart.get("colors").getIndex(series.columns.indexOf(target))
    );

    // pareto series(라인 그래프) 생성
    const paretoSeries = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis: paretoAxis,
        maskBullets: true,
        valueYField: "pareto",
        categoryXField: "category",
        stroke: lineColors.lineStroke,
      })
    );

    paretoSeries.bullets.push(() => {
      return themes.createBulletSpriet(
        root,
        lineColors.bulletFill,
        lineColors.lineStroke
      );
    });

    // 데이터 적용
    xAxis.data.setAll(data);
    series.data.setAll(data);
    paretoSeries.data.setAll(data);

    // 애니메이션 적용
    series.appear();
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`