import { useTheme } from "@/components/Theme";
import { Lightbulb, Menu, SwatchBook, Github } from "lucide-react";
import PropTypes from "prop-types";

const colorThemeList = ["basic", "violet", "pastel"];

export default function Header({ navToggle, setNavToggle }) {
  const { setTheme, setColorTheme, colorTheme } = useTheme();

  const modeChagne = () => {
    const nowTheme = window.document.documentElement.classList.value;
    let chageTheme = nowTheme == "light" ? "dark" : "light";
    setTheme(chageTheme);
  };

  const colorChange = (e) => {
    setColorTheme(e.target.value);
  };

  return (
    <header className="header">
      <div className="header-con">
        <h1 className="header-logo" onClick={() => (location.href = "/")}>
          <SwatchBook size={26} />
          <span>Chart Demo</span>
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
          <a target="_blank" href="https://github.com/honeybreads/chartDemo">
            <Github className="h-4 w-4" />
          </a>
          {/* 모바일용 토글 */}
          <button
            className={`header-toggle ${navToggle ? "active" : ""}`}
            onClick={() => setNavToggle((prev) => !prev)}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  navToggle: PropTypes.bool,
  setNavToggle: PropTypes.any,
};
