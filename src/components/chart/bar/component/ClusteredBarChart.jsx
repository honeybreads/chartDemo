import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    year: "2017",
    income: 23.5,
    expenses: 18.1,
  },
  {
    year: "2018",
    income: 26.2,
    expenses: 22.8,
  },
  {
    year: "2019",
    income: 30.1,
    expenses: 23.9,
  },
  {
    year: "2020",
    income: 29.5,
    expenses: 25.1,
  },
  {
    year: "2021",
    income: 24.6,
    expenses: 25,
  },
];

export default function ClusteredBarChart() {
  const id = "clustered-bar";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { colorSet } = themes[colorTheme];
    const colorList = colorSet(2);
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        layout: root.verticalLayout,
      })
    );

    // cursor 생성
    var cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomY",
      })
    );
    cursor.lineY.set("forceHidden", true);
    cursor.lineX.set("forceHidden", true);

    // legend 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        x: am5.p50,
        centerX: am5.p50,
      })
    );

    // X,Y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: true,
          cellEndLocation: 0.9,
          cellStartLocation: 0.1,
          minorGridEnabled: true,
        }),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.1,
          minGridDistance: 50,
        }),
      })
    );

    // series 생성 함수
    const createSeries = (field, name) => {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: field,
          categoryYField: "year",
          sequencedInterpolation: true,
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[bold]{name}[/]\n{categoryY}: {valueX}",
          }),
        })
      );

      series.columns.template.setAll({
        height: am5.p100,
        cornerRadiusBL: 0,
        cornerRadiusTL: 0,
        cornerRadiusBR: 0,
        cornerRadiusTR: 0,
      });

      series.bullets.push(() => {
        return am5.Bullet.new(root, {
          locationX: 1,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            text: "{valueX}",
            centerY: am5.p50,
            populateText: true,
          }),
        });
      });

      series.bullets.push(() => {
        return am5.Bullet.new(root, {
          locationX: 1,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            text: "{name}",
            centerY: am5.p50,
            centerX: am5.p100,
            populateText: true,
            fill: am5.color(0xffffff),
          }),
        });
      });

      series.data.setAll(data);
      series.appear();

      return series;
    };

    // series 생성
    createSeries("income", "Income");
    createSeries("expenses", "Expenses");

    // 데이터 적용
    yAxis.data.setAll(data);
    legend.data.setAll(chart.series.values);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: 420 }} />;
}
