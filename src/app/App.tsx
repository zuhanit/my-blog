import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import "./App.css"
import PostPage from "./Components/PostPage";
import { Editor } from "./pages/Editor/Editor";
import { WelcomePage } from "./pages/Welcome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main article={<WelcomePage />} />} />
        <Route path="/posts/:id" element={<Main article={<PostPage />} />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </Router>
  );
}

export default App;