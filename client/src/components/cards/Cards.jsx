/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Card from "../card/Card";
import { FixedSizeList as List } from "react-window";
// import ApiSearchBar from "../apiSearchBar/ApiSearchBar";
import CustomButton from "../customButton/CustomButton";
import { GetDrivers } from "../../redux/actions";
import { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

const Cards = memo(function Cards() {
  const drivers = useSelector((state) => state.drivers);
  const infoAPI = useSelector((state) => state.infoAPI);
  const dispatch = useDispatch();
  const [conditionSearch, setConditionSearch] = useState("");
  const [currentDriversPage, setcurrentDriversPage] = useState(1);

  useEffect(() => {
    dispatch(GetDrivers(currentDriversPage, conditionSearch));
  }, [currentDriversPage, conditionSearch]);
  console.log(drivers);
  const handleIncrementPageAPI = () => {
    if (currentDriversPage < infoAPI.pages) {
      setcurrentDriversPage(currentDriversPage + 1);
    } else if (currentDriversPage === infoAPI.pages) {
      setcurrentDriversPage(1);
    } else {
      setcurrentDriversPage(2);
    }
  };
  const handleDecrementPageAPI = () => {
    if (currentDriversPage > 1 && currentDriversPage < infoAPI.pages) {
      setcurrentDriversPage(currentDriversPage - 1);
    } else {
      setcurrentDriversPage(infoAPI.pages);
    }
  };

  return (
    <>
      <div>
        <h1>Catalogo de conductores</h1>
        <h2>Busca los conductores que mas te interesen</h2>
        {/* <ApiSearchBar setConditionSearch={setConditionSearch} /> */}
        <h2>
          Te encuentras en la pagina{" "}
          {currentDriversPage > infoAPI.pages ? 1 : currentDriversPage}
        </h2>
        <CustomButton
          style={{ margin: 10 }}
          onClick={[handleDecrementPageAPI, handleIncrementPageAPI]}
          text={["Anterior página", "Siguiente Página"]}
        />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {drivers.map((driver) => (
          <Card key={driver.id} props={driver} />
        ))}
      </div>
    </>
  );
});

export default Cards;
