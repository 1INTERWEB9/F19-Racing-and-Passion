import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetSingleDriver } from "../../redux/actions";
import css from "./detailCard.module.css";

const DetailCard = () => {
  let { id } = useParams();
  const [color, setColor] = useState({
    "--color-state": "inherit",
  });
  const driver = useSelector((state) => state.singleDriver);
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
      <div className={css.div_custom}>
        <h1 style={color} className={css.div_tittle}>
          {driver?.name?.forename ? driver?.name?.forename : driver?.forename}{" "}
          {driver?.name?.surname ? driver?.name?.surname : driver?.surname}
        </h1>
        <p style={color}>Dale click a cualquier color de la imagen</p>
        {/* <div style={{ display: "flex" }}>
          <div className={css.img} style={{ display: "flex" }}></div>
          <div style={{ marginLeft: 5 }}>
            <h2 style={color}>{driver.status}</h2>
            <h2 className={css.paragraph} style={color}>
              Su origen radica en {driver?.origin?.name} y se encuentra
              localizado en {driver?.location?.name}
            </h2>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default DetailCard;
