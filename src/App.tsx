import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Loading from "./components/Loading";
import ProjectsPage from "./pages/ProjectsPage";
import "./il8n";

const HomeWithLoading = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalAssets = 100;
    let loadedAssets = 0;

    const loadAssets = () => {
      const interval = setInterval(() => {
        loadedAssets += 1;
        const newProgress = (loadedAssets / totalAssets) * 100;
        setProgress(newProgress);

        if (loadedAssets >= totalAssets) {
          clearInterval(interval);

          setTimeout(() => {
            const loader = document.querySelector('.loading-overlay');
            if (loader) {
              loader.classList.add('fade-out');

              setTimeout(() => {
                setLoading(false);
              }, 500);
            } else {
              setLoading(false);
            }
          }, 500);
        }
      }, 20);
    };

    loadAssets();

    return () => {
      window.removeEventListener('load', () => { });
    };
  }, []);

  if (loading) {
    return <Loading progress={progress} />;
  }

  return <Home />;
};

// With HashRouter, you don't need to account for the base path in your routes
// The hash part (#/) is separate from the base path
function App() {
  // The main app no longer has loading state
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomeWithLoading />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;