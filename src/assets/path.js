import Xy from "@/page/chart/Xy";
import Pie from "@/page/chart/Pie";
import Bar1 from "@/page/chart/Bar1";
import Bar2 from "@/page/chart/Bar2";
import Etc1 from "@/page/chart/Etc1";
import Etc2 from "@/page/chart/Etc2";
import Gauge from "@/page/chart/Gauge";
import Donut from "@/page/chart/Donut";
import Line1 from "@/page/chart/Line1";
import Line2 from "@/page/chart/Line2";
import Line3 from "@/page/chart/Line3";
import Bubble from "@/page/chart/Bubble";
import LineEtc from "@/page/chart/LineEtc";
import Column1 from "@/page/chart/Column1";
import Column2 from "@/page/chart/Column2";
import Dumbbell from "@/page/chart/Dumbbell";
import {
  BarChartHorizontal,
  Shell,
  BarChart3,
  DonutIcon,
  DumbbellIcon,
  GaugeCircle,
  LineChart,
  PieChart,
  AreaChartIcon,
  LucideScatterChart,
  Guitar,
} from "lucide-react";

// pageList
export const page = [
  {
    title: "Chart",
    href: "chart",
    children: [
      { href: "bar1", component: Bar1, icon: BarChartHorizontal },
      { href: "bar2", component: Bar2, icon: BarChartHorizontal },
      { href: "bubble", component: Bubble, icon: Shell },
      { href: "column1", component: Column1, icon: BarChart3 },
      { href: "column2", component: Column2, icon: BarChart3 },
      { href: "dumbbell", component: Dumbbell, icon: DumbbellIcon },
      { href: "line", component: Line1, icon: LineChart },
      { href: "line-fill", component: Line2, icon: AreaChartIcon },
      { href: "line-smooth&angled", component: Line3, icon: LineChart },
      { href: "line-etc&mix", component: LineEtc, icon: LineChart },
      { href: "pie", component: Pie, icon: PieChart },
      { href: "pie-donut", component: Donut, icon: DonutIcon },
      { href: "radar-gauge", component: Gauge, icon: GaugeCircle },
      { href: "xy", component: Xy, icon: LucideScatterChart },
      { href: "etc1", component: Etc1, icon: Guitar },
      { href: "etc2", component: Etc2, icon: Guitar },
    ],
  },
];
