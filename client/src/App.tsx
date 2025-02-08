import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import MoviesPage from "@/pages/movies";
import AboutPage from "@/pages/about";
import FavoritesPage from "./pages/favorites";
import SeriesPage from "./pages/series";

function App() {
    return (
        <Routes>
            <Route element={<IndexPage />} path="/" />
            <Route element={<FavoritesPage />} path="/favorites" />
            <Route element={<MoviesPage />} path="/movies" />
            <Route element={<SeriesPage />} path="/series" />
            <Route element={<AboutPage />} path="/about" />
        </Routes>
    );
}

export default App;
