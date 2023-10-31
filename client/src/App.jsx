import "./App.css";
import Cards from "./components/cards/Cards";
import DetailCard from "./components/detailCard/DetailCard";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Cards></Cards>} />
        <Route path="/driver/:id" element={<DetailCard />} />
      </Routes>
    </>
  );
}

export default App;
