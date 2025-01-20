import { JSX } from "react";
import "./Layout.css";
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { Routing } from "../Routing/Routing";
import { Footer } from "../Footer/Footer";

export function Layout(): JSX.Element {
  return (
    <div className="Layout">
      <header>
        <Header />
      </header>
      <aside>
        <Menu />
      </aside>
      <main>
        <Routing />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
