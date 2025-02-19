import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    name: "cat #01",
    steps: 45688,
    pictureSettings: {
      src: "https://cdn.pixabay.com/photo/2019/11/22/03/58/cat-4644008_1280.jpg",
    },
  },
  {
    name: "cat #02",
    steps: 35402,
    pictureSettings: {
      src: "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg",
    },
  },
  {
    name: "cat #03",
    steps: 30402,
    pictureSettings: {
      src: "https://cdn.pixabay.com/photo/2023/05/23/15/26/bengal-cat-8012976_1280.jpg",
    },
  },
  {
    name: "cat #04",
    steps: 25402,
    pictureSettings: {
      src: "https://cdn.pixabay.com/photo/2024/02/17/00/18/cat-8578562_1280.jpg",
    },
  },
  {
    name: "cat #05",
    steps: 21402,
    pictureSettings: {
      src: "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_960_720.jpg",
    },
  },
  {
    name: "cat #06",
    steps: 15402,
    pictureSettings: {
      src: "https://cdn.pixabay.com/photo/2017/08/07/16/36/cat-2605502_1280.jpg",
    },
  },
];

export default function MovingBulletColumnChart() {
  const id = "movingbullet-column";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { colorSet } = themes[colorTheme];
    const colorList = colorSet(data.length);
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // 카테고리, 값 필드
    const categoryField = Object.keys(data[0])[0];
    const valueField = Object.keys(data[0])[1];

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingTop: 40,
      })
    );

    chart.plotContainer.get("background").set("strokeOpacity", 0);

    // x,y축 생성
    const xRenderer = am5xy.AxisRendererX.new(root, {});
    xRenderer.grid.template.set("visible", false);

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField,
        paddingTop: 40,
        renderer: xRenderer,
      })
    );

    const yRenderer = am5xy.AxisRendererY.new(root, {});
    yRenderer.grid.template.set("strokeDasharray", [3]);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: yRenderer,
      })
    );

    // series 그래프 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        maskBullets: false,
        valueYField: valueField,
        categoryXField: categoryField,
        calculateAggregates: true,
        sequencedInterpolation: true,
        tooltip: am5.Tooltip.new(root, {
          dy: -30,
          labelText: "{valueY}",
          pointerOrientation: "vertical",
        }),
      })
    );

    series.columns.template.setAll({
      maxWidth: 50,
      cornerRadiusBR: 0,
      cornerRadiusBL: 0,
      cornerRadiusTR: 20,
      cornerRadiusTL: 20,
    });

    series.columns.template.adapters.add("fill", function (_, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.bullets.push((root, _, dataItem) => {
      const index = data.findIndex(
        (item) => item[categoryField] === dataItem.dataContext[categoryField]
      );

      const bulletContainer = am5.Container.new(root, {});
      bulletContainer.children.push(
        am5.Circle.new(root, { layer: 99, radius: 34, fill: colorList[index] })
      );

      const maskCircle = bulletContainer.children.push(
        am5.Circle.new(root, { radius: 27 })
      );

      const imageContainer = bulletContainer.children.push(
        am5.Container.new(root, { mask: maskCircle })
      );

      imageContainer.children.push(
        am5.Picture.new(root, {
          layer: 99,
          width: 60,
          height: 60,
          centerX: am5.p50,
          centerY: am5.p50,
          templateField: "pictureSettings",
        })
      );

      return am5.Bullet.new(root, {
        locationY: 0,
        sprite: bulletContainer,
      });
    });

    // 마우스 이벤트 함수
    let currentlyHovered = null;
    const handleHover = (dataItem) => {
      if (dataItem) {
        handleOut();
        currentlyHovered = dataItem;
        const bullet = dataItem.bullets[0];
        bullet.animate({
          key: "locationY",
          to: 1,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }
    };

    const handleOut = () => {
      if (currentlyHovered) {
        var bullet = currentlyHovered.bullets[0];
        bullet.animate({
          key: "locationY",
          to: 0,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }
    };
    // 커서 생성
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("visible", false);
    cursor.lineY.set("visible", false);

    // 이벤트 연결
    series.columns.template.events.on("pointerover", (e) => {
      handleHover(e.target.dataItem);
    });

    cursor.events.on("cursormoved", () => {
      const dataItem = series.get("tooltip").dataItem;
      dataItem ? handleHover(dataItem) : handleOut();
    });
    series.columns.template.events.on("pointerout", handleOut);
    chart.events.on("pointerout", handleOut);

    // 데이터 적용
    series.data.setAll(data);
    xAxis.data.setAll(data);

    // 애니메이션 적용
    series.appear();
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return (
    <div id={id} style={{ width: "100%", height: "100%", minWidth: 640 }} />
  );
}
