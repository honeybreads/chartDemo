import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 데이터, 카테고리 생성 함수
const rowLength = 20;
const colLength = 5;
const maleLength = 58;
const femaleLength = 67;
const fullLength = rowLength * colLength;

const generateData = (count) => {
  let row = 1;
  let col = 1;
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({ x: col + "", y: row + "" });
    col++;
    if (col > rowLength) {
      row++;
      col = 1;
    }
  }
  return data;
};

const generateCategories = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({ cat: i + 1 + "" });
  }
  return data;
};

// 고유 컬러, 아이콘( path )
const femaleColor = am5.color(0xf25f5c);
const maleColor = am5.color(0x247ba0);
const placeholderColor = am5.color(0x999999);
const maleIcon =
  "M29.8498 2.31992C29.8495 2.2665 29.8469 2.21315 29.8417 2.15987C29.8391 2.13398 29.8343 2.10885 29.8306 2.08331C29.8264 2.0544 29.8231 2.02535 29.8174 1.99665C29.8117 1.96802 29.8039 1.94028 29.7968 1.91219C29.7904 1.88686 29.7848 1.86145 29.7773 1.83639C29.769 1.80906 29.7588 1.78276 29.7492 1.75605C29.7401 1.73078 29.7318 1.70531 29.7215 1.68045C29.7112 1.65553 29.6991 1.6317 29.6876 1.60739C29.6756 1.58178 29.6642 1.55589 29.6507 1.53076C29.6383 1.50762 29.6242 1.48572 29.6108 1.4632C29.596 1.43841 29.5819 1.41327 29.5658 1.38911C29.5495 1.36473 29.5313 1.34193 29.5139 1.31851C29.4984 1.29778 29.484 1.27656 29.4674 1.25644C29.4344 1.2162 29.3995 1.17775 29.3629 1.14081C29.3604 1.13827 29.3584 1.13545 29.3558 1.13291C29.3531 1.13017 29.3501 1.1279 29.3473 1.12522C29.3106 1.08897 29.2724 1.05416 29.2325 1.0214C29.2117 1.00431 29.1897 0.989405 29.1683 0.973475C29.1456 0.956514 29.1235 0.938936 29.0999 0.923143C29.075 0.906458 29.0491 0.89197 29.0235 0.876726C29.0018 0.863817 28.9806 0.850148 28.9583 0.838206C28.9325 0.824404 28.9061 0.81273 28.8798 0.800378C28.8561 0.789186 28.8328 0.777376 28.8086 0.767351C28.7832 0.756776 28.7573 0.748331 28.7315 0.73913C28.7053 0.729722 28.6794 0.719628 28.6526 0.711527C28.627 0.703767 28.601 0.698068 28.5751 0.691613C28.5476 0.684679 28.5204 0.676919 28.4924 0.671363C28.4629 0.665597 28.4332 0.662093 28.4035 0.657836C28.3787 0.654266 28.3542 0.649528 28.329 0.647056C28.2757 0.641837 28.2223 0.639136 28.1687 0.638953C28.1666 0.638953 28.1646 0.638672 28.1626 0.638672H21.4126C20.965 0.638672 20.5358 0.816462 20.2193 1.13293C19.9029 1.4494 19.7251 1.87862 19.7251 2.32617C19.7251 2.77372 19.9029 3.20295 20.2193 3.51941C20.5358 3.83588 20.965 4.01367 21.4126 4.01367H24.0885L19.4854 8.61681C17.0936 6.8285 14.1133 6.0125 11.1441 6.33302C8.17501 6.65355 5.43747 8.08681 3.48248 10.3444C1.52748 12.6019 0.500139 15.5162 0.607211 18.5006C0.714282 21.4851 1.94782 24.3182 4.05956 26.4299C6.17131 28.5415 9.00451 29.7749 11.989 29.8819C14.9735 29.9888 17.8877 28.9613 20.1451 27.0062C22.4026 25.0511 23.8357 22.3135 24.1561 19.3444C24.4765 16.3752 23.6604 13.3949 21.8719 11.0032L26.4751 6.40018V9.07617C26.4751 9.52372 26.6529 9.95295 26.9693 10.2694C27.2858 10.5859 27.715 10.7637 28.1626 10.7637C28.6101 10.7637 29.0393 10.5859 29.3558 10.2694C29.6723 9.95295 29.8501 9.52372 29.8501 9.07617V2.32617C29.8501 2.32404 29.8498 2.32198 29.8498 2.31992ZM18.3788 24.0424C17.199 25.2211 15.6963 26.0235 14.0605 26.3482C12.4248 26.673 10.7295 26.5055 9.18898 25.867C7.64843 25.2284 6.33178 24.1475 5.40545 22.7607C4.47912 21.374 3.98471 19.7438 3.98471 18.0762C3.98471 16.4085 4.47912 14.7783 5.40545 13.3916C6.33178 12.0049 7.64843 10.9239 9.18898 10.2854C10.7295 9.64684 12.4248 9.47936 14.0605 9.80411C15.6963 10.1289 17.199 10.9313 18.3788 12.1099C19.9588 13.6935 20.8462 15.8391 20.8462 18.0762C20.8462 20.3132 19.9588 22.4589 18.3788 24.0424Z";
const femaleIcon =
  "M23.8125 12.5873C23.8128 10.323 23.1622 8.10634 21.9384 6.20129C20.7145 4.29625 18.9689 2.78308 16.9095 1.84201C14.85 0.900929 12.5635 0.571592 10.3221 0.893215C8.08081 1.21484 5.97914 2.17387 4.26741 3.6561C2.55568 5.13832 1.30603 7.08129 0.667271 9.25362C0.0285107 11.4259 0.0275587 13.7361 0.664528 15.9089C1.3015 18.0818 2.54955 20.0258 4.26005 21.5094C5.97056 22.9931 8.07143 23.9538 10.3125 24.2773V26.6498H6.375C5.92745 26.6498 5.49822 26.8276 5.18176 27.144C4.86529 27.4605 4.6875 27.8897 4.6875 28.3373C4.6875 28.7848 4.86529 29.2141 5.18176 29.5305C5.49822 29.847 5.92745 30.0248 6.375 30.0248H10.3125V32.8373C10.3125 33.2848 10.4903 33.7141 10.8068 34.0305C11.1232 34.347 11.5524 34.5248 12 34.5248C12.4476 34.5248 12.8768 34.347 13.1932 34.0305C13.5097 33.7141 13.6875 33.2848 13.6875 32.8373V30.0248H17.625C18.0726 30.0248 18.5018 29.847 18.8182 29.5305C19.1347 29.2141 19.3125 28.7848 19.3125 28.3373C19.3125 27.8897 19.1347 27.4605 18.8182 27.144C18.5018 26.8276 18.0726 26.6498 17.625 26.6498H13.6875V24.2773C16.4972 23.8682 19.066 22.4622 20.9249 20.316C22.7838 18.1698 23.8087 15.4266 23.8125 12.5873ZM3.5625 12.5873C3.5625 10.9185 4.05735 9.2872 4.98447 7.89966C5.9116 6.51212 7.22936 5.43067 8.77111 4.79205C10.3129 4.15344 12.0094 3.98635 13.6461 4.31191C15.2828 4.63747 16.7862 5.44107 17.9662 6.62107C19.1462 7.80108 19.9498 9.3045 20.2754 10.9412C20.6009 12.5779 20.4338 14.2744 19.7952 15.8162C19.1566 17.3579 18.0752 18.6757 16.6876 19.6028C15.3001 20.5299 13.6688 21.0248 12 21.0248C9.76301 21.0223 7.61838 20.1325 6.03659 18.5507C4.4548 16.9689 3.56504 14.8243 3.5625 12.5873Z";

// PictogramChart
export default function PictogramChart() {
  const id = "pictogram-xy";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";

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
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingBottom: 0,
        layout: root.verticalLayout,
      })
    );
    chart.plotContainer.get("background").setAll({ opacity: 0 });

    // X,Y축 생성
    const createAxis = (orient, data) => {
      const axes = orient === "x" ? chart.xAxes : chart.yAxes;
      const renderer =
        orient === "x" ? am5xy.AxisRendererX : am5xy.AxisRendererY;

      const axis = axes.push(
        am5xy.CategoryAxis.new(root, {
          maxDeviation:0,
          categoryField: "cat",
          paddingTop: orient === "y" && 10,
          renderer: renderer.new(root, {}),
        })
      );

      axis.get("renderer").adapters.add("stroke", () => false);
      axis.get("renderer").labels.template.set("forceHidden", true);
      axis.get("renderer").grid.template.set("forceHidden", true);
      axis.data.setAll(generateCategories(data));
      return axis;
    };

    const createLabel = (axis, text) => {
      axis.children.unshift(
        am5.Label.new(root, {
          text,
          y: am5.p50,
          fontSize: 24,
          paddingRight: 40,
          centerY: am5.p50,
        })
      );
    };

    const xAxis = createAxis("x", rowLength);
    const yAxis1 = createAxis("y", colLength);
    const yAxis2 = createAxis("y", colLength);
    createLabel(
      yAxis1,
      `[${maleColor}]Male[/]\n[${maleColor}]${maleLength}[/][${placeholderColor}]/${fullLength}[/]`
    );
    createLabel(
      yAxis2,
      `[${femaleColor}]Female[/]\n[${femaleColor}]${femaleLength}[/][${placeholderColor}]/${fullLength}[/]`
    );
    chart.leftAxesContainer.set("layout", root.verticalLayout);

    // series 생성
    const makeSeries = (name, data, fill) => {
      const path = name === "Male" ? maleIcon : femaleIcon;
      const yAxis = name === "Male" ? yAxis1 : yAxis2;

      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          xAxis,
          yAxis,
          clustered: false,
          categoryXField: "x",
          categoryYField: "y",
          openCategoryXField: "x",
          openCategoryYField: "y",
        })
      );

      series.columns.template.setAll({
        fillOpacity: 0,
        strokeOpacity: 0,
        width: am5.percent(100),
        height: am5.percent(100),
      });

      series.bullets.push((root) => {
        return am5.Bullet.new(root, {
          locationX: 0.5,
          locationY: 0.5,
          sprite: am5.Graphics.new(root, {
            fill,
            svgPath: path,
            centerX: am5.p50,
            centerY: am5.p50,
            scale: 0.8,
          }),
        });
      });

      series.data.setAll(data);
      series.appear();
      return series;
    };

    // series 생성
    makeSeries("Male", generateData(fullLength), placeholderColor);
    makeSeries("Male", generateData(maleLength), maleColor);
    makeSeries("Female", generateData(fullLength), placeholderColor);
    makeSeries("Female", generateData(femaleLength), femaleColor);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock 
export const PictogramCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 데이터, 카테고리 생성 함수
const rowLength = 20;
const colLength = 5;
const maleLength = 58;
const femaleLength = 67;
const fullLength = rowLength * colLength;

const generateData = (count) => {
  let row = 1;
  let col = 1;
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({ x: col + "", y: row + "" });
    col++;
    if (col > rowLength) {
      row++;
      col = 1;
    }
  }
  return data;
};

const generateCategories = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({ cat: i + 1 + "" });
  }
  return data;
};

// 고유 컬러, 아이콘( path )
const femaleColor = am5.color(0xf25f5c);
const maleColor = am5.color(0x247ba0);
const placeholderColor = am5.color(0x999999);
const maleIcon =
  "M29.8498 2.31992C29.8495 2.2665 29.8469 2.21315 29.8417 2.15987C29.8391 2.13398 29.8343 2.10885 29.8306 2.08331C29.8264 2.0544 29.8231 2.02535 29.8174 1.99665C29.8117 1.96802 29.8039 1.94028 29.7968 1.91219C29.7904 1.88686 29.7848 1.86145 29.7773 1.83639C29.769 1.80906 29.7588 1.78276 29.7492 1.75605C29.7401 1.73078 29.7318 1.70531 29.7215 1.68045C29.7112 1.65553 29.6991 1.6317 29.6876 1.60739C29.6756 1.58178 29.6642 1.55589 29.6507 1.53076C29.6383 1.50762 29.6242 1.48572 29.6108 1.4632C29.596 1.43841 29.5819 1.41327 29.5658 1.38911C29.5495 1.36473 29.5313 1.34193 29.5139 1.31851C29.4984 1.29778 29.484 1.27656 29.4674 1.25644C29.4344 1.2162 29.3995 1.17775 29.3629 1.14081C29.3604 1.13827 29.3584 1.13545 29.3558 1.13291C29.3531 1.13017 29.3501 1.1279 29.3473 1.12522C29.3106 1.08897 29.2724 1.05416 29.2325 1.0214C29.2117 1.00431 29.1897 0.989405 29.1683 0.973475C29.1456 0.956514 29.1235 0.938936 29.0999 0.923143C29.075 0.906458 29.0491 0.89197 29.0235 0.876726C29.0018 0.863817 28.9806 0.850148 28.9583 0.838206C28.9325 0.824404 28.9061 0.81273 28.8798 0.800378C28.8561 0.789186 28.8328 0.777376 28.8086 0.767351C28.7832 0.756776 28.7573 0.748331 28.7315 0.73913C28.7053 0.729722 28.6794 0.719628 28.6526 0.711527C28.627 0.703767 28.601 0.698068 28.5751 0.691613C28.5476 0.684679 28.5204 0.676919 28.4924 0.671363C28.4629 0.665597 28.4332 0.662093 28.4035 0.657836C28.3787 0.654266 28.3542 0.649528 28.329 0.647056C28.2757 0.641837 28.2223 0.639136 28.1687 0.638953C28.1666 0.638953 28.1646 0.638672 28.1626 0.638672H21.4126C20.965 0.638672 20.5358 0.816462 20.2193 1.13293C19.9029 1.4494 19.7251 1.87862 19.7251 2.32617C19.7251 2.77372 19.9029 3.20295 20.2193 3.51941C20.5358 3.83588 20.965 4.01367 21.4126 4.01367H24.0885L19.4854 8.61681C17.0936 6.8285 14.1133 6.0125 11.1441 6.33302C8.17501 6.65355 5.43747 8.08681 3.48248 10.3444C1.52748 12.6019 0.500139 15.5162 0.607211 18.5006C0.714282 21.4851 1.94782 24.3182 4.05956 26.4299C6.17131 28.5415 9.00451 29.7749 11.989 29.8819C14.9735 29.9888 17.8877 28.9613 20.1451 27.0062C22.4026 25.0511 23.8357 22.3135 24.1561 19.3444C24.4765 16.3752 23.6604 13.3949 21.8719 11.0032L26.4751 6.40018V9.07617C26.4751 9.52372 26.6529 9.95295 26.9693 10.2694C27.2858 10.5859 27.715 10.7637 28.1626 10.7637C28.6101 10.7637 29.0393 10.5859 29.3558 10.2694C29.6723 9.95295 29.8501 9.52372 29.8501 9.07617V2.32617C29.8501 2.32404 29.8498 2.32198 29.8498 2.31992ZM18.3788 24.0424C17.199 25.2211 15.6963 26.0235 14.0605 26.3482C12.4248 26.673 10.7295 26.5055 9.18898 25.867C7.64843 25.2284 6.33178 24.1475 5.40545 22.7607C4.47912 21.374 3.98471 19.7438 3.98471 18.0762C3.98471 16.4085 4.47912 14.7783 5.40545 13.3916C6.33178 12.0049 7.64843 10.9239 9.18898 10.2854C10.7295 9.64684 12.4248 9.47936 14.0605 9.80411C15.6963 10.1289 17.199 10.9313 18.3788 12.1099C19.9588 13.6935 20.8462 15.8391 20.8462 18.0762C20.8462 20.3132 19.9588 22.4589 18.3788 24.0424Z";
const femaleIcon =
  "M23.8125 12.5873C23.8128 10.323 23.1622 8.10634 21.9384 6.20129C20.7145 4.29625 18.9689 2.78308 16.9095 1.84201C14.85 0.900929 12.5635 0.571592 10.3221 0.893215C8.08081 1.21484 5.97914 2.17387 4.26741 3.6561C2.55568 5.13832 1.30603 7.08129 0.667271 9.25362C0.0285107 11.4259 0.0275587 13.7361 0.664528 15.9089C1.3015 18.0818 2.54955 20.0258 4.26005 21.5094C5.97056 22.9931 8.07143 23.9538 10.3125 24.2773V26.6498H6.375C5.92745 26.6498 5.49822 26.8276 5.18176 27.144C4.86529 27.4605 4.6875 27.8897 4.6875 28.3373C4.6875 28.7848 4.86529 29.2141 5.18176 29.5305C5.49822 29.847 5.92745 30.0248 6.375 30.0248H10.3125V32.8373C10.3125 33.2848 10.4903 33.7141 10.8068 34.0305C11.1232 34.347 11.5524 34.5248 12 34.5248C12.4476 34.5248 12.8768 34.347 13.1932 34.0305C13.5097 33.7141 13.6875 33.2848 13.6875 32.8373V30.0248H17.625C18.0726 30.0248 18.5018 29.847 18.8182 29.5305C19.1347 29.2141 19.3125 28.7848 19.3125 28.3373C19.3125 27.8897 19.1347 27.4605 18.8182 27.144C18.5018 26.8276 18.0726 26.6498 17.625 26.6498H13.6875V24.2773C16.4972 23.8682 19.066 22.4622 20.9249 20.316C22.7838 18.1698 23.8087 15.4266 23.8125 12.5873ZM3.5625 12.5873C3.5625 10.9185 4.05735 9.2872 4.98447 7.89966C5.9116 6.51212 7.22936 5.43067 8.77111 4.79205C10.3129 4.15344 12.0094 3.98635 13.6461 4.31191C15.2828 4.63747 16.7862 5.44107 17.9662 6.62107C19.1462 7.80108 19.9498 9.3045 20.2754 10.9412C20.6009 12.5779 20.4338 14.2744 19.7952 15.8162C19.1566 17.3579 18.0752 18.6757 16.6876 19.6028C15.3001 20.5299 13.6688 21.0248 12 21.0248C9.76301 21.0223 7.61838 20.1325 6.03659 18.5507C4.4548 16.9689 3.56504 14.8243 3.5625 12.5873Z";

// PictogramChart
export default function PictogramChart() {
  const id = "pictogram-xy";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";
  
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
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingBottom: 0,
        layout: root.verticalLayout,
      })
    );
    chart.plotContainer.get("background").setAll({ opacity: 0 });

    // X,Y축 생성
    const createAxis = (orient, data) => {
      const axes = orient === "x" ? chart.xAxes : chart.yAxes;
      const renderer =
        orient === "x" ? am5xy.AxisRendererX : am5xy.AxisRendererY;

      const axis = axes.push(
        am5xy.CategoryAxis.new(root, {
          maxDeviation:0,
          categoryField: "cat",
          paddingTop: orient === "y" && 10,
          renderer: renderer.new(root, {}),
        })
      );

      axis.get("renderer").adapters.add("stroke", () => false);
      axis.get("renderer").labels.template.set("forceHidden", true);
      axis.get("renderer").grid.template.set("forceHidden", true);
      axis.data.setAll(generateCategories(data));
      return axis;
    };

    const createLabel = (axis, text) => {
      axis.children.unshift(
        am5.Label.new(root, {
          text,
          y: am5.p50,
          fontSize: 24,
          paddingRight: 40,
          centerY: am5.p50,
        })
      );
    };

    const xAxis = createAxis("x", rowLength);
    const yAxis1 = createAxis("y", colLength);
    const yAxis2 = createAxis("y", colLength);
    createLabel(
      yAxis1,
      \`[\${maleColor}]Male[/]\\n[\${maleColor}]\${maleLength}[/][\${placeholderColor}]/\${fullLength}[/]\`
    );
    createLabel(
      yAxis2,
      \`[\${femaleColor}]Female[/]\\n[\${femaleColor}]\${femaleLength}[/][\${placeholderColor}]/\${fullLength}[/]\`
    );
    chart.leftAxesContainer.set("layout", root.verticalLayout);

    // series 생성
    const makeSeries = (name, data, fill) => {
      const path = name === "Male" ? maleIcon : femaleIcon;
      const yAxis = name === "Male" ? yAxis1 : yAxis2;

      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          xAxis,
          yAxis,
          clustered: false,
          categoryXField: "x",
          categoryYField: "y",
          openCategoryXField: "x",
          openCategoryYField: "y",
        })
      );

      series.columns.template.setAll({
        fillOpacity: 0,
        strokeOpacity: 0,
        width: am5.percent(100),
        height: am5.percent(100),
      });

      series.bullets.push((root) => {
        return am5.Bullet.new(root, {
          locationX: 0.5,
          locationY: 0.5,
          sprite: am5.Graphics.new(root, {
            fill,
            svgPath: path,
            centerX: am5.p50,
            centerY: am5.p50,
            scale: 0.8,
          }),
        });
      });

      series.data.setAll(data);
      series.appear();
      return series;
    };

    // series 생성
    makeSeries("Male", generateData(fullLength), placeholderColor);
    makeSeries("Male", generateData(maleLength), maleColor);
    makeSeries("Female", generateData(fullLength), placeholderColor);
    makeSeries("Female", generateData(femaleLength), femaleColor);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`
