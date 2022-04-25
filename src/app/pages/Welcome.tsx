import { IoNewspaperOutline, IoAlbumsOutline, IoCallOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Banners from "../Components/Banners";

export function WelcomePage() {
    return (
        <>
        <div className="article-body">
            <section className="title">
              <h1>A man interested in Web Development</h1>
              <p>but I usually develop any items, like Starcraft: Remastered</p>
            </section>
            <section className="shortcut">
              <div className="shortcut-box">
                <div className="flex flex-row align-center gap-5px">
                  <IoNewspaperOutline />
                  <h3>About me</h3>
                </div>
                <p className="grey">I am Web Programmer.</p>
                <p>
                  <Link to="/about">See more</Link>
                </p>
              </div>
              <div className="shortcut-box">
                <div className="flex flex-row align-center gap-5px">
                  <IoAlbumsOutline />
                  <h3>Developments</h3>
                </div>
                <p className="grey">Web, Starcraft, Python...</p>
                <p>
                  <Link to="/developments">See more</Link>
                </p>
              </div>
              <div className="shortcut-box">
                <div className="flex flex-row align-center gap-5px">
                  <IoCallOutline />
                  <h3>Contact</h3>
                </div>
                <p className="grey">Please contact freely.</p>
                <p>
                  <Link to="/contact">See more</Link>
                </p>
              </div>
              <div className="shortcut-box">
                <div className="flex flex-row align-center gap-5px">
                  <IoNewspaperOutline />
                  <h3>Developments</h3>
                </div>
                <p className="grey">Web, Starcraft, Python...</p>
                <p>
                  <Link to="/developments">See more</Link>
                </p>
              </div>
            </section>
            <section className="banner-items">
              <Banners />
            </section>
          </div>
          <section className="files">
            <section className="files-item webditor">
              <div className="title">
                <h1>Webditor</h1>
                <p>
                  Webditor is an <span>Starcraft: Remastered Map Editor</span>{" "}
                  running on React-based web.
                </p>
              </div>
              <div className="img-cat"></div>
              <a href="/">See Demo</a>
            </section>
            <section className="files-item lsp">
              <div className="title">
                <h1>epScript Language Server</h1>
                <p>Language Server Protocol for epScript.</p>
              </div>
              <div className="img-eps"></div>
              <a href="https://github.com/zuhanit/epscript-language-server">
                Repogistory
              </a>
            </section>
          </section>
        </>
    );
}