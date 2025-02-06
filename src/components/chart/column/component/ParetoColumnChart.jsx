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
  {
    category: "Netherlands",
    value: 665,
  },
  {
    category: "South Korea",
    value: 443,
  },
  {
    category: "Canada",
    value: 441,
  },
];

export default function ParetoColumnChart() {
  const id = "pareto-column";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { colorSet, lineColors } = themes[colorTheme];
    const colorList = colorSet(data.length);
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // 카테고리, 값 필드 지정
    const categoryField = Object.keys(data[0])[0];
    const valueField = Object.keys(data[0])[1];

    // 누적 값 생성
    const calculateParetoData = () => {
      let total = data.reduce((sum, item) => sum + item[valueField], 0);
      let cumulative = 0;
      data.forEach((item) => {
        cumulative += item[valueField];
        item.pareto = (cumulative / total) * 100; // 누적 비율 계산
      });
    };
    calculateParetoData();

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        paddingRight: 0,
        layout: root.verticalLayout,
      })
    );

    // x,y축 생성
    const xRenderer = am5xy.AxisRendererX.new(root, {});
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField,
        renderer: xRenderer,
      })
    );
    xRenderer.grid.template.setAll({ location: 1 });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    // pareto축 생성
    const paretoAxisRenderer = am5xy.AxisRendererY.new(root, {
      opposite: true,
    });

    const paretoAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        strictMinMax: true,
        renderer: paretoAxisRenderer,
      })
    );

    paretoAxis.set("numberFormat", "#'%");
    paretoAxisRenderer.grid.template.set("forceHidden", true);

    // series(바 그래프) 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: valueField,
        categoryXField: categoryField,
      })
    );

    series.columns.template.setAll({
      tooltipY: 0,
      tooltipText: "{categoryX}: {valueY}",
    });

    series.columns.template.adapters.add("fill", function (_, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    // pareto series(라인 그래프) 생성
    const paretoSeries = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: paretoAxis,
        maskBullets: true, // hide
        valueYField: "pareto",
        categoryXField: categoryField,
        stroke: lineColors.lineStroke[0],
      })
    );

    paretoSeries.bullets.push(() => {
      return themes.createBulletSpriet(
        root,
        lineColors.bulletFill,
        lineColors.lineStroke[0]
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

  return <div id={id} style={{ width: "100%", height: 340 }} />;
}
