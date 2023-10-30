import "./App.css";
import Cards from "./components/cards/Cards";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Cards></Cards>} />
      </Routes>
    </>
  );
}

export default App;
