import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from 'react';
import LoadingAnimation from "./layouts/fallback";
const IndexPage = lazy(() => import('@/pages/index'))
const MoviesPage = lazy(() => import('@/pages/movies'))
const AboutPage = lazy(() => import("@/pages/about"))
const FavoritesPage = lazy(() => import("@/pages/favorites"))
const SeriesPage = lazy(() => import("@/pages/series"))
const AnimePage = lazy(() => import("@/pages/animes"))
const MediaPage = lazy(() => import("@/pages/media"))

function App() {
    return (
        <Suspense fallback={<LoadingAnimation />}>
            <Routes>
                <Route element={<IndexPage />} path="/" />
                <Route element={<FavoritesPage />} path="/favorites" />
                <Route element={<MoviesPage />} path="/movies" />
                <Route element={<MediaPage />} path="/:mediaType/:id" />
                <Route element={<SeriesPage />} path="/series" />
                <Route element={<AnimePage />} path="/animes" />
                <Route element={<AboutPage />} path="/about" />
            </Routes>
        </Suspense>
    );
}

export default App;
