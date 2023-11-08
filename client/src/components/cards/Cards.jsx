/* eslint-disable react/jsx-key */
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
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import CustomLoading from "../customLoading/customLoading";

const Cards = memo(function Cards() {
  const drivers = useSelector((state) => state.drivers);
  const infoAPI = useSelector((state) => state.infoAPI);
  const waitPage = useSelector((state) => state.waitPage);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const [conditionSearch, setConditionSearch] = useState("");
  const [currentDriversPage, setcurrentDriversPage] = useState(1);

  const rootElement = document.getElementById("root");

  if (rootElement) {
    rootElement.style.margin = "0 auto";
    rootElement.style.padding = "2rem";
    rootElement.style.width = "85%";
    rootElement.style.height = "auto";
  }

  useEffect(() => {
    dispatch(GetDrivers(currentDriversPage, conditionSearch));
    return () => {
      dispatch(EnableWaitPage());
      dispatch(CleanCharacters());
    };
  }, [currentDriversPage, conditionSearch]);

  const handleIncrementPageAPI = () => {
    if (currentDriversPage < infoAPI.pages) {
      setcurrentDriversPage(currentDriversPage + 1);
    } else if (currentDriversPage === infoAPI.pages && infoAPI.pages > 1) {
      setcurrentDriversPage(1);
    } else if (currentDriversPage != infoAPI.pages) {
      setcurrentDriversPage(2);
    }
  };
  const handleDecrementPageAPI = () => {
    if (currentDriversPage > 1 && currentDriversPage <= infoAPI.pages) {
      setcurrentDriversPage(currentDriversPage - 1);
    } else if (currentDriversPage != infoAPI.pages) {
      setcurrentDriversPage(infoAPI.pages);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#faea5c",
          border: "10px solid #804000",
          textShadow: "1px 0px 5px #d0d5d3",
        }}
      >
        <h1>Catalogo de conductores</h1>
        <h2>Busca los conductores que mas te interesen</h2>
        <ApiSearchBar setConditionSearch={setConditionSearch} />
        <br />
        <CustomButton
          style={{ margin: 10 }}
          onClick={[handleDecrementPageAPI, () => {}, handleIncrementPageAPI]}
          text={[
            <AiOutlineArrowLeft />,
            `${currentDriversPage} de ${infoAPI.pages}`,
            <AiOutlineArrowRight />,
          ]}
          disabled={waitPage}
        />
      </div>
      <br />
      <div className={css.div}>
        {error ? (
          <h1>No se encuentran conductores que coincidan con la busqueda</h1>
        ) : waitPage ? (
          <CustomLoading />
        ) : null}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {drivers?.map((driver) => (
            <>
              <LazyLoadComponent>
                <Card key={driver.id} props={driver} />
              </LazyLoadComponent>
            </>
          ))}
        </div>
      </div>
    </>
  );
});

export default Cards;
