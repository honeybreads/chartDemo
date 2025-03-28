import * as am5 from "@amcharts/amcharts5";
import * as am5flow from "@amcharts/amcharts5/flow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { from: "A", to: "D", value: 10 },
  { from: "B", to: "D", value: 8 },
  { from: "B", to: "E", value: 4 },
  { from: "B", to: "C", value: 2 },
  { from: "C", to: "E", value: 14 },
  { from: "E", to: "D", value: 8 },
  { from: "C", to: "A", value: 4 },
  { from: "G", to: "A", value: 7 }
]

// ChordDiagramChart
export default function ChordDiagramChart() {
  const id = "chord-diagram";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);
    const colorSet = am5.ColorSet.new(root, {
      colors: colorList.map((color) => am5.color(color)),
    });

    // Series 생성
    const series = root.container.children.push(am5flow.ChordNonRibbon.new(root, {
      sourceIdField: "from",
      targetIdField: "to",
      valueField: "value"
    }));
    
    series.nodes.set("colors", colorSet);
    series.bullets.push(function (_root, _series, dataItem) {
      var bullet = am5.Bullet.new(root, {
        locationY: Math.random(),
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: dataItem.get("source").get("fill")
        })
      });
    
      bullet.animate({
        key: "locationY",
        to: 1,
        from: 0,
        duration: Math.random() * 1000 + 2000,
        loops: Infinity,
        easing: am5.ease.yoyo(am5.ease.cubic)
      });
    
      return bullet;
    });

    series.nodes.labels.template.setAll({
      textType: "regular",
      fill: root.interfaceColors.get("background"),
      fontSize: "1.1em",
      radius: -5
    });
    
    series.nodes.bullets.push(function (_root, _series, dataItem) {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 20,
          fill: dataItem.get("fill")
        })
      });
    });
    
    series.children.moveValue(series.bulletsContainer, 0);

    // 데이터 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
