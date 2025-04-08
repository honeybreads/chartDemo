import { page } from "@/assets/path.js";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function Nav({ navToggle, setNavToggle }) {
  const segment = useLocation();

  return (
    <nav className={`nav ${navToggle ? "active" : ""}`}>
      <h2 className="hidden">nav</h2>
      {page.map((item, index) => {
        return (
          <ul className="nav-list" key={index}>
            <li>
              <p className="nav-list-title">{item.title}</p>
              <ul className="nav-sub-list">
                {item.children.map((sub, index) => {
                  const path = `/${item.href}/${sub.href}`;
                  return (
                    <li
                      key={index}
                      className={`nav-sub-list__item ${
                        segment.pathname === path ? "active" : ""
                      }`}
                    >
                      <Link
                        to={path}
                        onClick={() => setNavToggle((prev) => !prev)}
                      >
                        {sub.icon && <sub.icon size={18} />}
                        {sub.href}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        );
      })}
    </nav>
  );
}

Nav.propTypes = {
  navToggle: PropTypes.bool,
  setNavToggle: PropTypes.any,
};
