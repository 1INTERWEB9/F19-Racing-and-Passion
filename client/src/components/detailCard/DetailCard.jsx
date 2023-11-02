/* eslint-disable react/prop-types */
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { GetSingleDriver } from "../../redux/actions";
import css from "./detailCard.module.css";

const DetailCard = () => {
  let { id } = useParams();
  const [color, setColor] = useState({
    "--color-state": "inherit",
  });
  const driver = useSelector((state) => state.singleDriver);
  const waitPage = useSelector((state) => state.waitPage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetSingleDriver(id));
  }, [id]);

  const handleColorPick = (color) => {
    console.log(color);
    setColor({
      "--color-state": color,
    });
  };
  return (
    <>
      <div className={css.div_custom} hidden={waitPage}>
        <h1 style={color} className={css.div_tittle}>
          {driver?.name?.forename ? driver?.name?.forename : driver?.forename}{" "}
          {driver?.name?.surname ? driver?.name?.surname : driver?.surname}
        </h1>

        <div className={css.img} style={{ display: "flex" }}>
          <LazyLoadImage
            className={css.img}
            style={{
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 10,
              maxHeight: "auto",
              maxWidth: "300px",
            }}
            src={
              driver?.image?.urlImage
                ? driver?.image?.urlImage
                : driver?.Images?.urlImage
            }
            alt={driver.driverRef}
            effect="blur"
          />
          <div style={{ marginLeft: 5, display: "flex", flexWrap: "wrap" }}>
            {driver?.teams?.map((team) => (
              <h2
                key={team?.id_Team}
                style={{ marginLeft: 15, marginRight: 15 }}
              >
                {team?.nameTeam}
              </h2>
            ))}
          </div>
        </div>
        <div style={{}}>
          <p>{driver?.description}</p>
        </div>
      </div>
      <h1 hidden={!waitPage}>Cargando...</h1>
    </>
  );
};

export default DetailCard;
