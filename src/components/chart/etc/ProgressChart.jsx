import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "",
    from: 0,
    to: 15,
    name: "Stage #1",
    achieved: true,
  },
  {
    category: "",
    from: 15,
    to: 75,
    name: "Stage #2",
    achieved: true,
  },
  {
    category: "",
    from: 75,
    to: 90,
    name: "Stage #3",
    achieved: false,
  },
  {
    category: "",
    from: 90,
    to: 95,
    name: "Stage #4",
    achieved: false,
  },
  {
    category: "",
    from: 95,
    to: 100,
    name: "Stage #5",
    achieved: false,
  },
];

// ProgressChart
export default function ProgressChart() {
  const id = "progress-chart";
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
        panX: false,
        panY: false,
        layout: root.verticalLayout,
      })
    );
    chart.plotContainer.get("background").set("opacity", 0);

    // x,y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        numberFormat: "#'%'",
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );
    xAxis.get("renderer").grid.template.set("forceHidden", true);
    yAxis.get("renderer").grid.template.set("forceHidden", true);
    xAxis.get("renderer").labels.template.set("forceHidden", true);

    // Series 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueXField: "to",
        categoryXField: "name",
        openValueXField: "from",
        categoryYField: "category",
      })
    );

    series.columns.template.setAll({
      strokeWidth: 0,
      strokeOpacity: 0,
      cornerRadiusBL: 0,
      cornerRadiusTL: 0,
      cornerRadiusBR: 0,
      cornerRadiusTR: 0,
      height: am5.percent(100),
      templateField: "columnSettings",
    });

    series.columns.template.adapters.add("fill", (_, target) => {
      const index = series.columns.indexOf(target);
      const color = !data[index].achieved
        ? themes.chartVariables[theme].disabled
        : chart.get("colors").getIndex(index);
      return color;
    });

    // 범위 라벨 생성
    data.map((_, index) => {
      const rangeDataItem = xAxis.makeDataItem({ value: data[index].from });
      xAxis.createAxisRange(rangeDataItem);
      rangeDataItem.get("grid").set("forceHidden", true);
      rangeDataItem.get("tick").setAll({
        length: 18,
        visible: true,
        strokeOpacity: 0.2,
      });

      const percent = (data[index].to - data[index].from) / 100;
      const maxWidth = xAxis.width() * percent;

      rangeDataItem.get("label").setAll({
        maxWidth,
        centerX: am5.p0,
        forceHidden: false,
        text: data[index].from + "%",
        oversizedBehavior: "hide",
        opacity: data[index].achieved ? 1:0.3
      });
    });

    // legend 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        marginTop: 8,
        x: am5.percent(50),
        centerX: am5.percent(50),
        clickTarget: "none",
        nameField: "categoryX",
      })
    );

    legend.labels.template.adapters.add("fill", (fill, target) => {
      if (target.dataItem) {
        const index = data.findIndex(
          (item) => item.name === target.dataItem?._settings.name
        );
        !data[index].achieved && target.setAll({ opacity: 0.4 });
      }
      return fill;
    });
    legend.valueLabels.template.adapters.add("width", () => 0);
    legend.markerRectangles.template.setAll({ strokeOpacity: 0 });

    // 데이터 적용
    yAxis.data.setAll([{ category: "" }]);
    series.data.setAll(data);
    legend.data.setAll(series.dataItems);

    // 애니메이션 적용
    series.appear();
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock 
export const ProgressCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "",
    from: 0,
    to: 15,
    name: "Stage #1",
    achieved: true,
  },
  {
    category: "",
    from: 15,
    to: 75,
    name: "Stage #2",
    achieved: true,
  },
  {
    category: "",
    from: 75,
    to: 90,
    name: "Stage #3",
    achieved: false,
  },
  {
    category: "",
    from: 90,
    to: 95,
    name: "Stage #4",
    achieved: false,
  },
  {
    category: "",
    from: 95,
    to: 100,
    name: "Stage #5",
    achieved: false,
  },
];

// ProgressChart
export default function ProgressChart() {
  const id = "progress-chart";
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
        panX: false,
        panY: false,
        layout: root.verticalLayout,
      })
    );
    chart.plotContainer.get("background").set("opacity", 0);

    // x,y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        numberFormat: "#'%'",
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );
    xAxis.get("renderer").grid.template.set("forceHidden", true);
    yAxis.get("renderer").grid.template.set("forceHidden", true);
    xAxis.get("renderer").labels.template.set("forceHidden", true);

    // Series 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueXField: "to",
        categoryXField: "name",
        openValueXField: "from",
        categoryYField: "category",
      })
    );

    series.columns.template.setAll({
      strokeWidth: 0,
      strokeOpacity: 0,
      cornerRadiusBL: 0,
      cornerRadiusTL: 0,
      cornerRadiusBR: 0,
      cornerRadiusTR: 0,
      height: am5.percent(100),
      templateField: "columnSettings",
    });

    series.columns.template.adapters.add("fill", (_, target) => {
      const index = series.columns.indexOf(target);
      const color = !data[index].achieved
        ? themes.chartVariables[theme].disabled
        : chart.get("colors").getIndex(index);
      return color;
    });

    // 범위 라벨 생성
    data.map((_, index) => {
      const rangeDataItem = xAxis.makeDataItem({ value: data[index].from });
      xAxis.createAxisRange(rangeDataItem);
      rangeDataItem.get("grid").set("forceHidden", true);
      rangeDataItem.get("tick").setAll({
        length: 18,
        visible: true,
        strokeOpacity: 0.2,
      });

      const percent = (data[index].to - data[index].from) / 100;
      const maxWidth = xAxis.width() * percent;

      rangeDataItem.get("label").setAll({
        maxWidth,
        centerX: am5.p0,
        forceHidden: false,
        text: data[index].from + "%",
        oversizedBehavior: "hide",
        opacity: data[index].achieved ? 1:0.3
      });
    });

    // legend 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        marginTop: 8,
        x: am5.percent(50),
        centerX: am5.percent(50),
        clickTarget: "none",
        nameField: "categoryX",
      })
    );

    legend.labels.template.adapters.add("fill", (fill, target) => {
      if (target.dataItem) {
        const index = data.findIndex(
          (item) => item.name === target.dataItem?._settings.name
        );
        !data[index].achieved && target.setAll({ opacity: 0.4 });
      }
      return fill;
    });
    legend.valueLabels.template.adapters.add("width", () => 0);
    legend.markerRectangles.template.setAll({ strokeOpacity: 0 });

    // 데이터 적용
    yAxis.data.setAll([{ category: "" }]);
    series.data.setAll(data);
    legend.data.setAll(series.dataItems);

    // 애니메이션 적용
    series.appear();
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`