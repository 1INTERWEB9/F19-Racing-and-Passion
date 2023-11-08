/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  GetSingleDriver,
  EnableWaitPage,
  CleanCharacters,
} from "../../redux/actions";
import css from "./detailCard.module.css";
import CustomLoading from "../customLoading/customLoading";
import { FaCakeCandles } from "react-icons/fa6";
import { BsPersonBadgeFill } from "react-icons/bs";
import { CiBarcode } from "react-icons/ci";
import { BiLinkExternal } from "react-icons/bi";
import { AiOutlineFieldNumber } from "react-icons/ai";

const DetailCard = () => {
  let { id } = useParams();

  const driver = useSelector((state) => state.singleDriver);
  const waitPage = useSelector((state) => state.waitPage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(EnableWaitPage());
    dispatch(GetSingleDriver(id));
    return () => {
      dispatch(EnableWaitPage());
      dispatch(CleanCharacters());
    };
  }, [id]);

  return (
    <div className={css.div_custom}>
      <div hidden={waitPage}>
        <h1 className={css.div_tittle}>
          {driver?.name?.forename ? driver?.name?.forename : driver?.forename}{" "}
          {driver?.name?.surname ? driver?.name?.surname : driver?.surname}
        </h1>
        <div className={css.contain} style={{ display: "flex" }}>
          <LazyLoadImage
            className={css.img}
            src={
              driver?.image?.urlImage
                ? driver?.image?.urlImage
                : driver?.Image?.urlImage
            }
            alt={driver.driverRef}
            effect="blur"
          />
          <div className={css.book}>
            <h1 style={{ textAlign: "center" }}>Datos</h1>
            <h2 className={css.data}>
              <CiBarcode /> {driver?.code ? driver?.code : "Desconocido"}
            </h2>
            <h2 className={css.data}>
              <AiOutlineFieldNumber />{" "}
              {driver?.number ? driver?.number : "Desconocido"}
            </h2>
            <h2 className={css.data}>
              <BsPersonBadgeFill />{" "}
              {driver?.driverRef ? driver?.driverRef : "Desconocido"}
            </h2>
            <h2 className={css.data}>
              <FaCakeCandles /> {driver?.dob}
            </h2>
            <a href={driver?.url}>
              <h2 className={css.data}>
                <BiLinkExternal /> Mas Información
              </h2>
            </a>
          </div>
          <div className={css.book}>
            <h1 style={{ textAlign: "center" }}>Escuderos</h1>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {driver?.teams?.map((team) => (
                <h2
                  key={team?.id_Team}
                  style={{
                    marginLeft: 15,
                    marginRight: 5,
                    fontSize: "x-large",
                  }}
                >
                  {team?.nameTeam}
                </h2>
              ))}
              {driver?.Teams?.map((team) => (
                <h2
                  key={team?.id_Team}
                  style={{
                    marginLeft: 15,
                    marginRight: 15,
                    fontSize: "xx-large",
                  }}
                >
                  {team?.nameTeam}
                </h2>
              ))}
            </div>
          </div>
        </div>
        <div style={{ width: "100%", overflow: "hidden" }}>
          <h2
            style={{
              marginLeft: 40,
              marginRight: 40,
              textAlign: "justify",
              lineHeight: 1.2,
            }}
          >
            {driver?.description}
          </h2>
        </div>
      </div>
      <div hidden={!waitPage}>
        <CustomLoading />
      </div>
    </div>
  );
};

export default DetailCard;
