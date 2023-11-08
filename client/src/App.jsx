import { Suspense, lazy } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Cards = lazy(() => import("./components/cards/Cards"));
const DetailCard = lazy(() => import("./components/detailCard/DetailCard"));
const Form = lazy(() => import("./components/form/Form"));
const HomePage = lazy(() => import("./components/homePage/HomePage"));
const NavBar = lazy(() => import("./components/navBar/NavBar"));

function App() {
  return (
    <>
      <Suspense>
        <NavBar />
      </Suspense>

      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense>
              <HomePage />
            </Suspense>
          }
        />
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
