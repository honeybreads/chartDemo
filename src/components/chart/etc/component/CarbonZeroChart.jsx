import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "15",
    value: 100,
  },
  {
    category: "14",
    value: 100,
  },
  {
    category: "13",
    value: 100,
  },
  {
    category: "12",
    value: 100,
  },
  {
    category: "11",
    value: 100,
  },
  {
    category: "10",
    value: 100,
  },
  {
    category: "9",
    value: 100,
  },
  {
    category: "8",
    value: 100,
  },
  {
    category: "7",
    value: 100,
  },
  {
    category: "6",
    value: 100,
  },
  {
    category: "5",
    value: 100,
  },
  {
    category: "4",
    value: 100,
  },
  {
    category: "3",
    value: 100,
    currentBullet: true,
  },
  {
    category: "2",
    value: 100,
  },
  {
    category: "1",
    value: 100,
  },
  {
    category: "0",
    value: 100,
    targetBullet: true,
  },
];

export default function CarbonZeroChart() {
  const id = "carbonzero-chart";
  const { theme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const colorList = ["#000000", "#6bc352", "#fcc034", "#c6251a"];
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout,
        paddingRight: 80,
      })
    );
    chart.plotContainer.get("background").set("opacity", 0);

    // 범례 생성
    chart.children.push(
      am5.Legend.new(root, {
        x: am5.p50,
        centerX: am5.p50,
      })
    );

    // x,y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    xAxis.get("renderer").grid.template.set("forceHidden", true);
    xAxis.get("renderer").labels.template.set("forceHidden", true);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 180,
        strictMinMax: true,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    yAxis.get("renderer").grid.template.set("forceHidden", true);
    yAxis.get("renderer").labels.template.set("forceHidden", true);

    // series 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        maskBullets: false,
        valueYField: "value",
        categoryXField: "category",
      })
    );

    series.columns.template.setAll({
      tooltipY: 0,
      width: am5.p100,
      strokeWidth: 3,
      strokeOpacity: 1,
      cornerRadiusTL: 4,
      cornerRadiusTR: 4,
      cornerRadiusBL: 4,
      cornerRadiusBR: 4,
    });

    series.columns.template.adapters.add("fill", (c, target) => {
      const targetNum = series.columns.indexOf(target) + 1;
      const colorNum = Math.ceil(targetNum / Math.floor(data.length / 3));
      return colorList[colorNum];
    });

    series.columns.template.adapters.add("stroke", (c, target) => {
      const targetNum = series.columns.indexOf(target);
      if (targetNum === data.length - 1) return false;
      return themes.modeColor[theme].line;
    });

    // bullets(값 표시) 생성
    series.bullets.push((root, target, dataItem) => {
      if (dataItem.dataContext.currentBullet) {
        const container = am5.Container.new(root, {});
        const targetNum = data.length - dataItem.dataContext.category;
        const colorNum = Math.ceil(targetNum / Math.floor(data.length / 3));

        container.children.push(
          am5.Graphics.new(root, {
            dy: -5,
            centerX: am5.p50,
            centerY: am5.p100,
            fill: colorList[colorNum],
            svgPath:
              "M14.5676 26.5893C21.1369 25.9332 26.2676 20.3578 26.2676 13.5769C26.2676 6.35474 20.4473 0.5 13.2676 0.5C6.08788 0.5 0.267578 6.35474 0.267578 13.5769C0.267578 20.3578 5.39826 25.9332 11.9676 26.5893V34.5H14.5676V26.5893Z",
          })
        );

        container.children.push(
          am5.Label.new(root, {
            dy: -26,
            paddingTop: 2,
            paddingLeft: 6,
            paddingRight: 6,
            paddingBottom: 2,
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true,
            text: dataItem.get("categoryX"),
            background: am5.RoundedRectangle.new(root, {
              cornerRadiusTL: 20,
              cornerRadiusTR: 20,
              cornerRadiusBR: 20,
              cornerRadiusBL: 20,
              fill: am5.color(0xffffff),
            }),
          })
        );

        return am5.Bullet.new(root, {
          locationY: 1,
          sprite: container,
        });
      } else if (dataItem.dataContext.targetBullet) {
        const container = am5.Container.new(root, {dx:40});
        container.children.push(
          am5.Circle.new(root, {
            radius: 50,
            fill: am5.color(0x11326d),
          })
        );

        container.children.push(
          am5.Label.new(root, {
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true,
            textAlign: "center",
            fill: am5.color(0xffffff),
            text: "GOAL\n[bold]ZERO[/]",
          })
        );

        return am5.Bullet.new(root, {
          locationY: 0.5,
          sprite: container,
        });
      }
      return false;
    });

    // labels 생성 함수
    const createAxisLabel = (category, text) => {
      const rangeDataItem = xAxis.makeDataItem({ category });
      const range = xAxis.createAxisRange(rangeDataItem);

      range.get("label").setAll({
        text: text,
        forceHidden: false,
      });

      range.get("grid").setAll({
        location: 1,
        strokeOpacity: 1,
      });
    };

    // 라벨 생성
    createAxisLabel("15", "20+");
    createAxisLabel("10", "10");
    createAxisLabel("5", "5");

    // 데이터 적용
    xAxis.data.setAll(data);
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000, 100);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme]);

  return <div id={id} style={{ width: "100%", height: "100%", minWidth:460 }} />;
}
