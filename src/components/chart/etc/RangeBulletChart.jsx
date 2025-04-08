import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "Reduce",
    open: 0.05,
    close: 2.8,
    average: 1.4,
  },
  {
    category: "Increase",
    open: 0.4,
    close: 3,
    average: 1.6,
  },
];

//RangeBulletChart
export default function RangeBulletChart() {
  const id = "range-bullet";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([myTheme]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout,
      })
    );
    chart.plotContainer.get("background").adapters.add("stroke", () => false);

    // x,y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );
    yAxis.data.setAll(data);

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        max: 4,
        min: -1,
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 40,
        }),
      })
    );

    yAxis.get("renderer").adapters.add("stroke", () => false);
    xAxis.get("renderer").adapters.add("stroke", () => false);
    xAxis.get("renderer").grid.template.set("visible", false);
    yAxis.get("renderer").labels.template.setAll({ paddingRight: 12 });

    // rangeSeries 생성
    const rangeSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueXField: "close",
        openValueXField: "open",
        categoryYField: "category",
        fill: colorList[0],
      })
    );
    rangeSeries.columns.template.setAll({ height: 5 });

    const createRangeBullets = (locationX) => {
      rangeSeries.bullets.push(() => {
        return am5.Bullet.new(root, {
          locationX,
          sprite: am5.Circle.new(root, {
            radius: 10,
            fill: colorList[1],
          }),
        });
      });
    };
    createRangeBullets(0);
    createRangeBullets(1);

    // averageSeries 생성
    const averageSeries = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        name: "Average Score",
        valueXField: "average",
        categoryYField: "category",
      })
    );

    averageSeries.strokes.template.setAll({ visible: false });
    averageSeries.bullets.push(() => {
      return am5.Bullet.new(root, {
        sprite: am5.Triangle.new(root, {
          width: 24,
          height: 24,
          rotation: 180,
          fill: colorList[2],
        }),
      });
    });

    // dummySeries
    const dummySeries = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        name: "Min Score / Max Score",
      })
    );

    dummySeries.strokes.template.setAll({ visible: false });
    dummySeries.bullets.push(() => {
      return am5.Bullet.new(root, {
        locationX: 0,
        sprite: am5.Circle.new(root, {
          radius: 10,
          fill: colorList[1],
        }),
      });
    });

    // Add legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        x: am5.p50,
        centerX: am5.p50,
        clickTarget: "none",
        layout: root.horizontalLayout,
        ...themes.legendBackground(root, theme),
        marginTop: 12,
      })
    );
    legend.valueLabels.template.set("width", 0);
    legend.markers.template.setAll({ scale: 0.5 });

    // 데이터 적용
    rangeSeries.data.setAll(data);
    averageSeries.data.setAll(data);
    dummySeries.data.setAll(data);
    legend.data.setAll([dummySeries, averageSeries]);

    // 애니메이션 적용
    rangeSeries.appear();
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock
export const RangeBulletCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "Reduce",
    open: 0.05,
    close: 2.8,
    average: 1.6,
  },
  {
    category: "Increase",
    open: 0.4,
    close: 3,
    average: 1.6,
  },
];

//RangeBulletChart
export default function RangeBulletChart() {
  const id = "range-bullet";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";
  
  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([myTheme]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout,
      })
    );
    chart.plotContainer.get("background").adapters.add("stroke", () => false);

    // x,y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );
    yAxis.data.setAll(data);

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        max: 4,
        min: -1,
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 40,
        }),
      })
    );

    yAxis.get("renderer").adapters.add("stroke", () => false);
    xAxis.get("renderer").adapters.add("stroke", () => false);
    xAxis.get("renderer").grid.template.set("visible", false);
    yAxis.get("renderer").labels.template.setAll({ paddingRight: 12 });

    // rangeSeries 생성
    const rangeSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueXField: "close",
        openValueXField: "open",
        categoryYField: "category",
        fill: colorList[0],
      })
    );
    rangeSeries.columns.template.setAll({ height: 5 });

    const createRangeBullets = (locationX) => {
      rangeSeries.bullets.push(() => {
        return am5.Bullet.new(root, {
          locationX,
          sprite: am5.Circle.new(root, {
            radius: 10,
            fill: colorList[1],
          }),
        });
      });
    };
    createRangeBullets(0);
    createRangeBullets(1);

    // averageSeries 생성
    const averageSeries = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        name: "Average Score",
        valueXField: "average",
        categoryYField: "category",
      })
    );

    averageSeries.strokes.template.setAll({ visible: false });
    averageSeries.bullets.push(() => {
      return am5.Bullet.new(root, {
        sprite: am5.Triangle.new(root, {
          width: 24,
          height: 24,
          rotation: 180,
          fill: colorList[2],
        }),
      });
    });

    // dummySeries
    const dummySeries = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        name: "Min Score / Max Score",
      })
    );

    dummySeries.strokes.template.setAll({ visible: false });
    dummySeries.bullets.push(() => {
      return am5.Bullet.new(root, {
        locationX: 0,
        sprite: am5.Circle.new(root, {
          radius: 10,
          fill: colorList[1],
        }),
      });
    });

    // Add legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        x: am5.p50,
        centerX: am5.p50,
        clickTarget: "none",
        layout: root.horizontalLayout,
        ...themes.legendBackground(root, theme),
        marginTop: 12,
      })
    );
    legend.valueLabels.template.set("width", 0);
    legend.markers.template.setAll({ scale: 0.5 });

    // 데이터 적용
    rangeSeries.data.setAll(data);
    averageSeries.data.setAll(data);
    dummySeries.data.setAll(data);
    legend.data.setAll([dummySeries, averageSeries]);

    // 애니메이션 적용
    rangeSeries.appear();
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`;
