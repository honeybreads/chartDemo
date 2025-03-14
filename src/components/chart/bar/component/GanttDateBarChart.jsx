import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "Module #1",
    start: new Date(2016, 0, 1).getTime(),
    end: new Date(2016, 0, 14).getTime(),
    task: "Gathering requirements",
  },
  {
    category: "Module #1",
    start: new Date(2016, 0, 16).getTime(),
    end: new Date(2016, 0, 27).getTime(),
    task: "Producing specifications",
  },
  {
    category: "Module #1",
    start: new Date(2016, 1, 5).getTime(),
    end: new Date(2016, 3, 18).getTime(),
    task: "Development",
  },
  {
    category: "Module #1",
    start: new Date(2016, 3, 18).getTime(),
    end: new Date(2016, 5, 1).getTime(),
    task: "Testing and QA",
  },
  {
    category: "Module #2",
    start: new Date(2016, 0, 8).getTime(),
    end: new Date(2016, 0, 10).getTime(),
    task: "Gathering requirements",
  },
  {
    category: "Module #2",
    start: new Date(2016, 0, 12).getTime(),
    end: new Date(2016, 0, 15).getTime(),
    task: "Producing specifications",
  },
  {
    category: "Module #2",
    start: new Date(2016, 0, 16).getTime(),
    end: new Date(2016, 1, 5).getTime(),
    task: "Development",
  },
  {
    category: "Module #2",
    start: new Date(2016, 1, 10).getTime(),
    end: new Date(2016, 1, 18).getTime(),
    task: "Testing and QA",
  },
  {
    category: "Module #3",
    start: new Date(2016, 0, 2).getTime(),
    end: new Date(2016, 0, 8).getTime(),
    task: "Gathering requirements",
  },
  {
    category: "Module #3",
    start: new Date(2016, 0, 8).getTime(),
    end: new Date(2016, 0, 16).getTime(),
    task: "Producing specifications",
  },
  {
    category: "Module #3",
    start: new Date(2016, 0, 19).getTime(),
    end: new Date(2016, 2, 1).getTime(),
    task: "Development",
  },
  {
    category: "Module #3",
    start: new Date(2016, 2, 12).getTime(),
    end: new Date(2016, 3, 5).getTime(),
    task: "Testing and QA",
  },
  {
    category: "Module #4",
    start: new Date(2016, 0, 1).getTime(),
    end: new Date(2016, 0, 19).getTime(),
    task: "Gathering requirements",
  },
  {
    category: "Module #4",
    start: new Date(2016, 0, 19).getTime(),
    end: new Date(2016, 1, 3).getTime(),
    task: "Producing specifications",
  },
  {
    category: "Module #4",
    start: new Date(2016, 2, 20).getTime(),
    end: new Date(2016, 3, 25).getTime(),
    task: "Development",
  },
  {
    category: "Module #4",
    start: new Date(2016, 3, 27).getTime(),
    end: new Date(2016, 4, 15).getTime(),
    task: "Testing and QA",
  },
  {
    category: "Module #5",
    start: new Date(2016, 0, 1).getTime(),
    end: new Date(2016, 0, 12).getTime(),
    task: "Gathering requirements",
  },
  {
    category: "Module #5",
    start: new Date(2016, 0, 12).getTime(),
    end: new Date(2016, 0, 19).getTime(),
    task: "Producing specifications",
  },
  {
    category: "Module #5",
    start: new Date(2016, 0, 19).getTime(),
    end: new Date(2016, 2, 1).getTime(),
    task: "Development",
  },
  {
    category: "Module #5",
    start: new Date(2016, 2, 8).getTime(),
    end: new Date(2016, 2, 30).getTime(),
    task: "Testing and QA",
  },
];

// 샘플 데이터에서 카테고리 분류
const createCategory = () => {
  const categorySet = new Set(data.map((item) => item.category));
  const categoryList = [...categorySet].map((category) => ({ category }));
  return categoryList;
};
const category = createCategory();

// GanttDateBarChart
export default function GanttDateBarChart() {
  const id = "ganttdate-bar";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // 날짜 데이터 형식
    root.dateFormatter.setAll({
      dateFormat: "yyyy-MM-dd",
      dateFields: ["valueX", "openValueX"],
    });

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        layout: root.verticalLayout,
      })
    );

    // x,y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererY.new(root, {
          minorGridEnabled: true,
        }),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "minute", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 80,
          minorGridEnabled: true,
        }),
      })
    );
    
    yAxis.get("renderer").grid.template.set("location", 1);

    // series 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueXField: "end",
        openValueXField: "start",
        categoryYField: "category",
        sequencedInterpolation: true,
      })
    );

    series.columns.template.setAll({
      strokeOpacity:1,
      cornerRadiusBL: 0,
      cornerRadiusTL: 0,
      cornerRadiusBR: 0,
      cornerRadiusTR: 0,
      tooltipText: "{task}:\n[bold]{openValueX}[/] - [bold]{valueX}[/]",
    });

    series.columns.template.adapters.add("fill", (_, target) => {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", (_, target) => {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    // 데이터 적용
    yAxis.data.setAll(category);
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear();
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
