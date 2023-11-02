/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Card from "../card/Card";
import css from "./cards.module.css";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import ApiSearchBar from "../apiSearchBar/ApiSearchBar";
import CustomButton from "../customButton/CustomButton";
import {
  GetDrivers,
  CleanCharacters,
  EnableWaitPage,
} from "../../redux/actions";
import { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

const Cards = memo(function Cards() {
  const drivers = useSelector((state) => state.drivers);
  const infoAPI = useSelector((state) => state.infoAPI);
  const waitPage = useSelector((state) => state.waitPage);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const [conditionSearch, setConditionSearch] = useState("");
  const [currentDriversPage, setcurrentDriversPage] = useState(1);

  useEffect(() => {
    dispatch(GetDrivers(currentDriversPage, conditionSearch));
  }, [currentDriversPage, conditionSearch]);

  const handleIncrementPageAPI = () => {
    if (currentDriversPage < infoAPI.pages) {
      setcurrentDriversPage(currentDriversPage + 1);
    } else if (currentDriversPage === infoAPI.pages) {
      setcurrentDriversPage(1);
    } else {
      setcurrentDriversPage(2);
    }
    dispatch(EnableWaitPage());
    dispatch(CleanCharacters());
  };
  const handleDecrementPageAPI = () => {
    if (currentDriversPage > 1 && currentDriversPage <= infoAPI.pages) {
      setcurrentDriversPage(currentDriversPage - 1);
    } else {
      setcurrentDriversPage(infoAPI.pages);
    }
    dispatch(EnableWaitPage());
    dispatch(CleanCharacters());
  };

  return (
    <>
      <div className={css["in-view-card"]}>
        <h1>Catalogo de conductores</h1>
        <h2>Busca los conductores que mas te interesen</h2>
        <ApiSearchBar setConditionSearch={setConditionSearch} />
        <h2>
          Te encuentras en la pagina{" "}
          {currentDriversPage > infoAPI.pages ? 1 : currentDriversPage}
        </h2>
        <CustomButton
          style={{ margin: 10 }}
          onClick={[handleDecrementPageAPI, handleIncrementPageAPI]}
          text={["Anterior página", "Siguiente Página"]}
          disabled={waitPage}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          minHeight: "1000px",
        }}
      >
        {error ? (
          <h1>No se encuentran conductores que coincidan con la busqueda</h1>
        ) : waitPage ? (
          <h1>Cargando...</h1>
        ) : null}
        {drivers.map((driver) => (
          <>
            <LazyLoadComponent>
              <Card key={driver.id} props={driver} />
            </LazyLoadComponent>
          </>
        ))}
      </div>
    </>
  );
});

export default Cards;
