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
  let { state } = useLocation();
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
      <div className={css.div_custom} hidden={state?.render}>
        <h1 style={color} className={css.div_tittle}>
          {driver?.name?.forename ? driver?.name?.forename : driver?.forename}{" "}
          {driver?.name?.surname ? driver?.name?.surname : driver?.surname}
        </h1>
        <div style={{ display: "flex" }}>
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
          </div>
          <div style={{ marginLeft: 5 }}>
            {/* {driver?.teams.map((team) => (
              <h2 key={team?.id_Team}>{team?.nameTeam}</h2>
            ))} */}

            <h2 className={css.paragraph} style={color}>
              x
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailCard;
