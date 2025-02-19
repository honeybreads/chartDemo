import { useTheme } from "@/components/Theme";
import { Lightbulb, Menu } from "lucide-react";
import PropTypes from "prop-types";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";

const colorThemeList = ["basic", "purple", "colorfull"];

export default function Header({ navToggle, setNavToggle }) {
  const { setTheme, setColorTheme, colorTheme } = useTheme();
  const { primary } = themes[colorTheme];

  const modeChagne = () => {
    const nowTheme = window.document.documentElement.classList.value;
    let chageTheme = nowTheme == "light" ? "dark" : "light";
    setTheme(chageTheme);
  };

  const colorChange = (e) => {
    setColorTheme(e.target.value);
  };

  useLayoutEffect(() => {
    document.body.style.setProperty("--primary", primary[3]);
  }, [primary]);

  return (
    <header className="header">
      <h1 className="header-logo" onClick={() => (location.href = "/")}>
        로고
      </h1>
      <div className="header-group">
        <select onChange={colorChange} value={colorTheme}>
          {colorThemeList.map((item, index) => (
            <option key={index} value={item + "Theme"}>
              {item}
            </option>
          ))}
        </select>
        {/* 라이트모드 다크모드 체인지 */}
        <button onClick={modeChagne}>
          <Lightbulb className="h-4 w-4" />
        </button>
        {/* 모바일용 토글 */}
        <button
          className={`header-toggle ${navToggle ? "active" : ""}`}
          onClick={() => setNavToggle((prev) => !prev)}
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  navToggle: PropTypes.bool,
  setNavToggle: PropTypes.any,
};
