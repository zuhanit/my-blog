import {
  IoSearch,
  IoNewspaperOutline,
  IoAlbumsOutline,
  IoCallOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import Banners from "../Components/Banners";
import "../Assets/styles.css";
import { Navigator } from "../Components/Navigator";
import { WelcomePage } from "./Welcome";

interface MainProps {
  article: JSX.Element;
}

/**
 * 
 * @returns 메인 페이지
 */
export default function Main({article}: MainProps) {
  return (
    <div className="main">
      <div className="page-wrapper">
        <header className="top-navigation">
          <Navigator />
        </header>
        <main>
          { article }
        </main>
        <footer>
          <div className="footer-wrapper">
            "There is no one who loves pain itself, who seeks after it and wants
            to have it, simply because it is pain..."
          </div>
        </footer>
      </div>
    </div>
  );
}