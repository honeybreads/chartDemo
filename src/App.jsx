import { useState, useEffect, useRef } from "react";
import { page } from "@/assets/path.js";
import { Route, Routes } from "react-router-dom";
import Intro from "./page/Intro";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Lenis from "@studio-freight/lenis";

function App() {
  const lenis = useRef(null);
  const [navToggle, setNavToggle] = useState(false);

  // use lenis
  useEffect(() => {
    lenis.current = new Lenis({
      wrapper: document.querySelector(".section"),
      duration: 0.6,
      smooth: true,
      smoothTouch: true,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    const animate = (time) => {
      lenis.current.raf(time);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return () => {
      lenis.current.destroy();
    };
  }, []);

  return (
    <>
      <Header setNavToggle={setNavToggle} navToggle={navToggle} />
      <main className="main">
        <Nav navToggle={navToggle} />
        <section className="section">
          <Routes>
            <Route path="/" element={<Intro />}></Route>
            {page.map((item) => {
              return item.children.map((sub, index) => {
                return (
                  <Route
                    key={index}
                    path={`/${item.href}/${sub.href}`}
                    Component={sub.component}
                  />
                );
              });
            })}
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
