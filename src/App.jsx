import { useState } from "react";
import { page } from "@/assets/path.js";
import { Route, Routes } from "react-router-dom";
import Intro from "./page/Intro";
import Nav from "./components/Nav";
import Header from "./components/Header";


function App() {
  const [navToggle, setNavToggle] = useState(false);

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
