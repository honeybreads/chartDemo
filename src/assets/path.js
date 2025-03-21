import Pie from "@/page/chart/Pie";
import Bar from "@/page/chart/Bar";
import Gauge from "@/page/chart/Gauge";
import Donut from "@/page/chart/Donut";
import Column1 from "@/page/chart/Column1";
import Column2 from "@/page/chart/Column2";
import Dumbbell from "@/page/chart/Dumbbell";
import Bubble from "@/page/chart/Bubble";
import Etc from "@/page/chart/Etc";
import Xy from "@/page/chart/Xy";
import Line1 from "@/page/chart/Line1";
import Line2 from "@/page/chart/Line2";
import Line3 from "@/page/chart/Line3";
import LineEtc from "@/page/chart/LineEtc";
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
      { href: "bar", component: Bar, icon: BarChartHorizontal },
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
      { href: "etc", component: Etc, icon: Guitar },
    ],
  },
];
