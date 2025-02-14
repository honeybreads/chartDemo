import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 카테고리 데이터 (SNS 플랫폼 정보)
const categories = [
  {
    category: "Like",
    icon: "https://img.icons8.com/?size=100&id=19411&format=png&color=000000",
    color: am5.color(0xff0100),
  },
  {
    category: "Follow",
    icon: "https://img.icons8.com/?size=100&id=20750&format=png&color=000000",
    color: am5.color(0x385997),
  },
  {
    category: "Share",
    icon: "https://img.icons8.com/?size=100&id=12771&format=png&color=000000",
    color: am5.color(0x00aade),
  },
  {
    category: "Alarm",
    icon: "https://img.icons8.com/?size=100&id=114436&format=png&color=000000",
    color: am5.color(0xffc107),
  },
  {
    category: "Search",
    icon: "https://img.icons8.com/?size=100&id=12773&format=png&color=000000",
    color: am5.color(0x0d47a1),
  },
  {
    category: "Chat",
    icon: "https://img.icons8.com/?size=100&id=13751&format=png&color=000000",
    color: am5.color(0x4caf50),
  },
  {
    category: "Bookmark",
    icon: "https://img.icons8.com/?size=100&id=26083&format=png&color=000000",
    color: am5.color(0x000000),
  },
];

// 데이터 생성 (각 카테고리에 대해 무작위 데이터 추가)
const data = categories.flatMap((category) =>
  Array.from({ length: Math.ceil(Math.random() * 20) }, () => ({
    category: category.category,
    position: Math.round(Math.random() * 100),
    value: Math.round(Math.random() * 1000),
    bulletSettings: { fill: category.color },
  }))
);

export default function StripPlotBubbleChart() {
  const id = "stripplot-bubble";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { colorSet } = themes[colorTheme];
    const colorList = colorSet(0);
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
        pinchZoomX: false,
        pinchZoomY: false,
      })
    );
    chart.plotContainer.get("background").setAll({ stroke: 0 });

    // X,Y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: true,
          cellEndLocation: 0.9,
          cellStartLocation: 0.1,
        }),
        bullet: (root, axis, dataItem) => {
          return am5xy.AxisBullet.new(root, {
            locationY: 0.5,
            sprite: am5.Picture.new(root, {
              dx: -10,
              width: 24,
              height: 24,
              centerY: am5.p50,
              centerX: am5.p100,
              src: dataItem.dataContext.icon,
            }),
          });
        },
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: -10,
        max: 110,
        strictMinMax: true,
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    xAxis.get("renderer").labels.template.setAll({ forceHidden: true });
    xAxis.get("renderer").grid.template.setAll({ forceHidden: true });
    yAxis.get("renderer").grid.template.setAll({ location: 0.5 });
    yAxis.get("renderer").labels.template.setAll({
      width: 92,
      textAlign: "left",
    });

    // series 생성
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        baseAxis: yAxis,
        valueField: "value",
        valueXField: "position",
        categoryYField: "category",
        calculateAggregates: true,
      })
    );
    series.strokes.template.setAll({ strokeOpacity: 0 });

    // bullets 생성
    const circleTemplate = am5.Template.new({});
    series.bullets.push(() => {
      return am5.Bullet.new(root, {
        locationY: 0.5,
        sprite: am5.Circle.new(
          root,
          {
            tooltipText: "{valueX}: [bold]{value}[/]",
            radius: 5,
            stroke: am5.color(0xffffff),
            strokeWidth: 1,
            fillOpacity: 0.8,
            templateField: "bulletSettings",
          },
          circleTemplate
        ),
      });
    });

    series.set("heatRules", [
      {
        target: circleTemplate,
        min: 5,
        max: 20,
        dataField: "value",
        key: "radius",
      },
    ]);

    // 데이터 적용
    yAxis.data.setAll(categories);
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear();
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: 420 }} />;
}
