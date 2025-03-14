import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { category: "Raina", open: 101, close: 112 },
  { category: "Demarcus", open: 96, close: 105 },
  { category: "Carlo", open: 95, close: 102 },
  { category: "Jacinda", open: 91, close: 95 },
  { category: "Richie", open: 89, close: 100 },
  { category: "Antony", open: 92, close: 98 },
  { category: "Amada", open: 90, close: 101 },
  { category: "Idalia", open: 89, close: 100 },
  { category: "Janella", open: 89, close: 100 },
  { category: "Marla", open: 86, close: 93 },
  { category: "Curtis", open: 84, close: 91 },
  { category: "Shellie", open: 83, close: 91 },
];

export default function BasicDumbbellChart() {
  const id = "basic-dumbbell";
  const { theme, colorTheme } = useTheme();

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
        paddingLeft: 0,
        pinchZoomX: true,
      })
    );

    // 커서 추가
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke",themes.chartVariables[theme].base);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "category",
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 20,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      centerX: 0,
      rotation: -90,
      centerY: am5.p50,
    });

    yAxis.get("renderer").grid.template.setAll({ visible: false });

    // series 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        name: "Series 1",
        valueYField: "close",
        openValueYField: "open",
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{openValueY} - {valueY}",
        }),
      })
    );

    series.columns.template.setAll({
      fillGradient: am5.LinearGradient.new(root, {
        stops: [
          {
            color: chart.get("colors").getIndex(1),
          },
          {
            color: chart.get("colors").getIndex(0),
          },
        ],
      }),
      width: 2,
    });

    // series bullets 생성
    [...Array(2)].map((_, index) => {
      series.bullets.push(() => {
        return am5.Bullet.new(root, {
          locationY: index,
          sprite: am5.Circle.new(root, {
            radius: 6,
            fill: chart.get("colors").getIndex(index),
          }),
        });
      });
    });

    //데이터 적용
    xAxis.data.setAll(data);
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
