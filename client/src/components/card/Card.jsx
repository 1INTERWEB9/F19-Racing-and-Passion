/* eslint-disable react/prop-types */
import css from "./card.module.css";
import { useState, useEffect, memo } from "react";
// import { AddCardFav, DeleteCardFav } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Card = memo(function Card({ props, favCards }) {
  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(false);
  const allFavCharacters = useSelector((state) => state.allFavCharacters);
  const [color, setColor] = useState({});
  const colorFav = "#ff355e";
  const colorNoFav = "#fff";

  useEffect(() => {
    allFavCharacters?.map((character) => {
      if (character.id === props.id) setIsFav(true);
    });
    setColor({
      "--main-color": !isFav && !favCards ? colorNoFav : colorFav,
      "--second-color": !isFav && !favCards ? colorFav : colorNoFav,
    });
  }, [isFav]);

  // const handleButtonFav = () => {
  //   if (!isFav && !favCards) {
  //     dispatch(AddCardFav(props.id));
  //     setIsFav(true);
  //     setColor({ "--main-color": colorFav, "--second-color": colorNoFav });
  //   } else {
  //     dispatch(DeleteCardFav(props.id));
  //     setIsFav(false);
  //     setColor({ "--main-color": colorNoFav, "--second-color": colorFav });
  //   }
  // };

  return (
    <>
      <div className={css.div_card}>
        {/* <button id={css.Fav} style={color} onClick={handleButtonFav}>
          ❤
        </button> */}
        <h2 className={css.name}>
          {props?.name?.forename ? props.name?.forename : props?.forename}{" "}
          {props?.name?.surname ? props.name?.surname : props?.surname}
        </h2>
        <div style={{ maxWidth: "200px" }}>
          <Link to={`/driver/${props.id}`}>
            <img
              className={css.img}
              style={{
                display: "flex",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 10,
                maxHeight: "300px",
                maxWidth: "auto",
              }}
              src={
                props?.image?.urlImage
                  ? props?.image?.urlImage
                  : props?.Images[0]?.urlImage
              }
              alt={props.driverRef}
            />
          </Link>
        </div>
      </div>
    </>
  );
});

export default Card;
