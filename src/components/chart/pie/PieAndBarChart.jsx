import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "normal",
    value: 89,
    breakdown: [
      {
        category: "Sales inquiries",
        value: 29,
      },
      {
        category: "Support requests",
        value: 40,
      },
      {
        category: "Bug reports",
        value: 11,
      },
      {
        category: "Other",
        value: 9,
      },
    ],
  },
  {
    category: "warning",
    value: 55,
    breakdown: [
      {
        category: "Sales inquiries",
        value: 5,
      },
      {
        category: "Support requests",
        value: 11,
      },
      {
        category: "Bug reports",
        value: 20,
      },
      {
        category: "Other",
        value: 19,
      },
    ],
  },
  {
    category: "minor",
    value: 58,
    breakdown: [
      {
        category: "Sales inquiries",
        value: 30,
      },
      {
        category: "Support requests",
        value: 15,
      },
      {
        category: "Bug reports",
        value: 5,
      },
      {
        category: "Other",
        value: 8,
      },
    ],
  },
  {
    category: "major",
    value: 71,
    breakdown: [
      {
        category: "Sales inquiries",
        value: 12,
      },
      {
        category: "Support requests",
        value: 38,
      },
      {
        category: "Bug reports",
        value: 11,
      },
      {
        category: "Other",
        value: 10,
      },
    ],
  },
  {
    category: "critical",
    value: 120,
    breakdown: [
      {
        category: "Sales inquiries",
        value: 60,
      },
      {
        category: "Support requests",
        value: 35,
      },
      {
        category: "Bug reports",
        value: 15,
      },
      {
        category: "Other",
        value: 10,
      },
    ],
  },
];

// PieAndBarChart
export default function PieAndBarChart() {
  const id = "pie-bar";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary, state } = themes[colorTheme];
    const colorList = [...data.map((item) => state[item.category])];
    const myTheme = themes.myThemeRule(root, primary, theme);
    const responsive = am5themes_Responsive.newEmpty(root);
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    // height 설정
    const minHeight = root.dom.parentElement.style.minHeight;
    const baseHeight = Number(minHeight.split("px")[0]);
    root.dom.style.height = baseHeight + "px";

    // container 생성
    const container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.p100,
        height: am5.p100,
        layout: root.horizontalLayout,
      })
    );

    // PieChart 생성
    const pieChart = container.children.push(
      am5percent.PieChart.new(root, {
        width: am5.p50,
        innerRadius: am5.percent(50),
      })
    );

    const pieSeries = pieChart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
      })
    );

    pieSeries.slices.template.adapters.add("fill", (_, target) => {
      const index = data.findIndex(
        (item) => item.category === target.dataItem.dataContext.category
      );
      return colorList[index];
    });

    pieSeries.labels.template.set("forceHidden", true);
    pieSeries.ticks.template.set("forceHidden", true);
    pieSeries.slices.template.setAll({ strokeOpacity: 0 });

    // XYChart 생성
    const columnChart = container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        width: am5.p50,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
        layout: root.verticalLayout,
      })
    );

    // x,y축 생성
    const yAxis = columnChart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const xAxis = columnChart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );
    yAxis.get("renderer").grid.template.setAll({ location: 1 });

    // series 생성성
    const columnSeries = columnChart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueXField: "value",
        categoryYField: "category",
      })
    );

    columnSeries.columns.template.setAll({
      tooltipText: "{categoryY}: {valueX}",
      cornerRadiusBL: 0,
      cornerRadiusTL: 0,
      cornerRadiusBR: themes.chartVariables.default.barRadius,
      cornerRadiusTR: themes.chartVariables.default.barRadius,
    });

    // label 추가
    const label1 = pieChart.seriesContainer.children.push(
      am5.Label.new(root, {
        text: "",
        fontSize: 32,
        centerX: am5.p50,
        centerY: am5.p50,
      })
    );
    label1.adapters.add("fontWeight", () => "bold");

    const label2 = pieChart.seriesContainer.children.push(
      am5.Label.new(root, {
        dy: 24,
        text: "",
        fontSize: 12,
        centerX: am5.p50,
        centerY: am5.p50,
      })
    );

    // pieSeries active 이벤트
    let currentSlice;
    pieSeries.slices.template.on("active", (active, slice) => {
      const fill = slice.get("fill");
      if (currentSlice && currentSlice != slice && active) {
        currentSlice.set("active", false);
      }

      label1.setAll({
        fill,
        text: root.numberFormatter.format(
          slice.dataItem.get("valuePercentTotal"),
          "#.'%'"
        ),
      });
      label2.set("text", slice.dataItem.get("category"));

      columnSeries.columns.template.setAll({
        fill: slice.get("fill"),
        stroke: slice.get("fill"),
      });

      columnSeries.data.setAll(slice.dataItem.dataContext.breakdown);
      yAxis.data.setAll(slice.dataItem.dataContext.breakdown);

      currentSlice = slice;
    });

    // 초기 active 설정
    pieSeries.events.on("datavalidated", () => {
      pieSeries.slices.getIndex(0).set("active", true);
    });

    // 데이터 적용
    pieSeries.data.setAll(data);

    // 애니메이션 적용
    container.appear(1000, 100);

    // 반응형
    responsive.addRule({
      relevant: (width) => width < baseHeight * 2,
      applying: () => {
        const nowSize = Math.min(root.width(), baseHeight);
        root.dom.style.height = nowSize * 1.5 + "px";
        container.setAll({ layout: root.verticalLayout });
        pieChart.setAll({ width: am5.p100 });
        columnChart.setAll({ width: am5.p100 });
      },
      removing: () => {
        root.dom.style.height = baseHeight + "px";
        container.setAll({ layout: root.horizontalLayout });
        pieChart.setAll({ width: am5.p50 });
        columnChart.setAll({ width: am5.p50 });
      },
    });

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", minHeight: "100%" }} />;
}

// codeblock
export const PieAndBarCodeblock = `// * 해당 차트는 컨테이너의 minHeight 값을 기준으로 생성
// * 컨테이너의 height는 auto로 작성
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "normal",
    value: 89,
    breakdown: [
      {
        category: "Sales inquiries",
        value: 29,
      },
      {
        category: "Support requests",
        value: 40,
      },
      {
        category: "Bug reports",
        value: 11,
      },
      {
        category: "Other",
        value: 9,
      },
    ],
  },
  {
    category: "warning",
    value: 55,
    breakdown: [
      {
        category: "Sales inquiries",
        value: 5,
      },
      {
        category: "Support requests",
        value: 11,
      },
      {
        category: "Bug reports",
        value: 20,
      },
      {
        category: "Other",
        value: 19,
      },
    ],
  },
  {
    category: "minor",
    value: 58,
    breakdown: [
      {
        category: "Sales inquiries",
        value: 30,
      },
      {
        category: "Support requests",
        value: 15,
      },
      {
        category: "Bug reports",
        value: 5,
      },
      {
        category: "Other",
        value: 8,
      },
    ],
  },
  {
    category: "major",
    value: 71,
    breakdown: [
      {
        category: "Sales inquiries",
        value: 12,
      },
      {
        category: "Support requests",
        value: 38,
      },
      {
        category: "Bug reports",
        value: 11,
      },
      {
        category: "Other",
        value: 10,
      },
    ],
  },
  {
    category: "critical",
    value: 120,
    breakdown: [
      {
        category: "Sales inquiries",
        value: 60,
      },
      {
        category: "Support requests",
        value: 35,
      },
      {
        category: "Bug reports",
        value: 15,
      },
      {
        category: "Other",
        value: 10,
      },
    ],
  },
];

// PieAndBarChart
export default function PieAndBarChart() {
  const id = "pie-bar";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";
  
  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary, state } = themes[colorTheme];
    const colorList = [...data.map((item) => state[item.category])];
    const myTheme = themes.myThemeRule(root, primary, theme);
    const responsive = am5themes_Responsive.newEmpty(root);
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    // height 설정
    const minHeight = root.dom.parentElement.style.minHeight;
    const baseHeight = Number(minHeight.split("px")[0]);
    root.dom.style.height = baseHeight + "px";

    // container 생성
    const container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.p100,
        height: am5.p100,
        layout: root.horizontalLayout,
      })
    );

    // PieChart 생성
    const pieChart = container.children.push(
      am5percent.PieChart.new(root, {
        width: am5.p50,
        innerRadius: am5.percent(50),
      })
    );

    const pieSeries = pieChart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
      })
    );

    pieSeries.slices.template.adapters.add("fill", (_, target) => {
      const index = data.findIndex(
        (item) => item.category === target.dataItem.dataContext.category
      );
      return colorList[index];
    });

    pieSeries.labels.template.set("forceHidden", true);
    pieSeries.ticks.template.set("forceHidden", true);
    pieSeries.slices.template.setAll({ strokeOpacity: 0 });

    // XYChart 생성
    const columnChart = container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        width: am5.p50,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
        layout: root.verticalLayout,
      })
    );

    // x,y축 생성
    const yAxis = columnChart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const xAxis = columnChart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    yAxis.get("renderer").grid.template.setAll({ location: 1 });

    // series 생성성
    const columnSeries = columnChart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueXField: "value",
        categoryYField: "category",
      })
    );

    columnSeries.columns.template.setAll({
      tooltipText: "{categoryY}: {valueX}",
      cornerRadiusBL: 0,
      cornerRadiusTL: 0,
      cornerRadiusBR: themes.chartVariables.default.barRadius,
      cornerRadiusTR: themes.chartVariables.default.barRadius,
    });

    // label 추가
    const label1 = pieChart.seriesContainer.children.push(
      am5.Label.new(root, {
        text: "",
        fontSize: 32,
        centerX: am5.p50,
        centerY: am5.p50,
      })
    );
    label1.adapters.add("fontWeight", () => "bold");

    const label2 = pieChart.seriesContainer.children.push(
      am5.Label.new(root, {
        dy: 24,
        text: "",
        fontSize: 12,
        centerX: am5.p50,
        centerY: am5.p50,
      })
    );

    // pieSeries active 이벤트
    let currentSlice;
    pieSeries.slices.template.on("active", (active, slice) => {
      const fill = slice.get("fill");
      if (currentSlice && currentSlice != slice && active) {
        currentSlice.set("active", false);
      }

      label1.setAll({
        fill,
        text: root.numberFormatter.format(
          slice.dataItem.get("valuePercentTotal"),
          "#.'%'"
        ),
      });
      label2.set("text", slice.dataItem.get("category"));

      columnSeries.columns.template.setAll({
        fill: slice.get("fill"),
        stroke: slice.get("fill"),
      });

      columnSeries.data.setAll(slice.dataItem.dataContext.breakdown);
      yAxis.data.setAll(slice.dataItem.dataContext.breakdown);

      currentSlice = slice;
    });

    // 초기 active 설정
    pieSeries.events.on("datavalidated", () => {
      pieSeries.slices.getIndex(0).set("active", true);
    });

    // 데이터 적용
    pieSeries.data.setAll(data);

    // 애니메이션 적용
    container.appear(1000, 100);

    // 반응형
    responsive.addRule({
      relevant: (width) => width < baseHeight * 2,
      applying: () => {
        const nowSize = Math.min(root.width(), baseHeight);
        root.dom.style.height = nowSize * 1.5 + "px";
        container.setAll({ layout: root.verticalLayout });
        pieChart.setAll({ width: am5.p100 });
        columnChart.setAll({ width: am5.p100 });
      },
      removing: () => {
        root.dom.style.height = baseHeight + "px";
        container.setAll({ layout: root.horizontalLayout });
        pieChart.setAll({ width: am5.p50 });
        columnChart.setAll({ width: am5.p50 });
      },
    });

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", minHeight: "100%" }} />;
}`;
