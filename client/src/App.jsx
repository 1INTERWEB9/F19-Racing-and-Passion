import { Suspense, lazy } from "react";
import "./App.css";
// import Cards from "./components/cards/Cards";
// import DetailCard from "./components/detailCard/DetailCard";
import { Route, Routes } from "react-router-dom";

const Cards = lazy(() => import("./components/cards/Cards"));
const DetailCard = lazy(() => import("./components/detailCard/DetailCard"));

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense>
              <Cards />
            </Suspense>
          }
        />
        <Route
          path="/driver/:id"
          element={
            <Suspense>
              <DetailCard />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
