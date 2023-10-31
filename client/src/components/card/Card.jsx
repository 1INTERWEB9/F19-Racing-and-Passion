/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import css from "./card.module.css";
import { useState, useEffect, memo } from "react";
import { DisabledPageButtons } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
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

        <div
          onClick={() => {
            dispatch(DisabledPageButtons());
          }}
        >
          <Link to={`/driver/${props.id}`}>
            <LazyLoadImage
              alt={props.driverRef}
              effect="blur"
              style={{ marginBottom: 15 }}
              height={300}
              width={300}
              src={
                props?.image?.urlImage
                  ? props?.image?.urlImage
                  : props?.Images[0]?.urlImage
              }
            />
          </Link>
        </div>
      </div>
    </>
  );
});

export default trackWindowScroll(Card);
