import { Suspense, lazy } from "react";
import "./App.css";
// import Cards from "./components/cards/Cards";
// import DetailCard from "./components/detailCard/DetailCard";
import { Route, Routes } from "react-router-dom";

const Cards = lazy(() => import("./components/cards/Cards"));
const DetailCard = lazy(() => import("./components/detailCard/DetailCard"));
const Form = lazy(() => import("./components/form/Form"));

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/driver"
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
        <Route
          path="/newDriver"
          element={
            <Suspense>
              <Form />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
