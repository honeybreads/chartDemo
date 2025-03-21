import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "Stage #1",
    start1: 0,
    end1: 83,
    start2: 83,
    end2: 128,
  },
  {
    category: "Stage #2",
    start1: 121,
    end1: 128,
    start2: 128,
    end2: 128,
  },
  {
    category: "Stage #3",
    start1: 111,
    end1: 114,
    start2: 114,
    end2: 121,
  },
  {
    category: "Stage #4",
    start1: 98,
    end1: 108,
    start2: 108,
    end2: 111,
  },
  {
    category: "Stage #5",
    start1: 85,
    end1: 96,
    start2: 96,
    end2: 98,
  },
  {
    category: "Stage #6",
    start1: 55,
    end1: 70,
    start2: 70,
    end2: 85,
  },
  {
    category: "Stage #7",
    start1: 3,
    end1: 36,
    start2: 36,
    end2: 55,
  },
  {
    category: "Stage #8",
    start1: 0,
    end1: 2,
    start2: 2,
    end2: 3,
  },
];

// StackedWaterfallColumnChart
export default function StackedWaterfallColumnChart() {
  const id = "stackedwaterfall-column";
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
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        layout: root.verticalLayout,
      })
    );

    // x,y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 20,
          cellEndLocation: 0.9,
          cellStartLocation: 0.1,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraMax: 0.05,
        calculateTotals: true,
        renderer: am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 }),
      })
    );

    xAxis.get("renderer").grid.template.setAll({ location: 1 });
    xAxis.get("renderer").labels.template.setAll({ textAlign: "center" });
    xAxis.get("renderer").labels.template.adapters.add("width", (_, target) => {
      return themes.axisLabelSetWidth(xAxis, target);
    });

    // series 생성 함수
    const makeSeries = (name, openField, field, total) => {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          xAxis,
          yAxis,
          clustered: false,
          valueYField: field,
          openValueYField: openField,
          categoryXField: "category",
        })
      );

      series.columns.template.setAll({
        tooltipY: 0,
        strokeOpacity: 1,
        cornerRadiusTR: 0,
        cornerRadiusTL: 0,
        width: am5.percent(95),
        tooltipText: "{name}, {categoryX}: {valueY}",
      });

      series.data.setAll(data);
      series.appear();

      // bullet 생성
      series.bullets.push((root, cols) => {
        const fill = themes.createAlternative(cols.get("fill")); 
        const label = am5.Label.new(root, {
          fill,
          text: "{valueY}",
          centerY: am5.p50,
          centerX: am5.p50,
          populateText: true,
          textAlign: "center",
          oversizedBehavior: "hide",
        });

        label.adapters.add("text", (_, target) => {
          return Math.abs(
            target.dataItem.get("valueY") - target.dataItem.get("openValueY")
          );
        });

        return am5.Bullet.new(root, {
          locationX: 0.5,
          locationY: 0.5,
          sprite: label,
        });
      });

      // total bullet 생성
      if (total) {
        series.bullets.push(() => {
          const totalLabel = am5.Label.new(root, {
            y: am5.p100,
            centerX: am5.p50,
            centerY: am5.p100,
            populateText: true,
            textAlign: "center",
          });

          totalLabel.adapters.add("text", (_, target) => {
            const dataContext = target.dataItem.dataContext;
            const val = Math.abs(dataContext.end2 - dataContext.start1);
            return val;
          });

          return am5.Bullet.new(root, {
            locationY: 1,
            locationX: 0.5,
            sprite: totalLabel,
          });
        });
      }
    };

    makeSeries("value #1", "start1", "end1", false);
    makeSeries("value #2", "start2", "end2", true);
    xAxis.data.setAll(data);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
