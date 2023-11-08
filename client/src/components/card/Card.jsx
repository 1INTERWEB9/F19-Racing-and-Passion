/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import css from "./card.module.css";
import { useState, useEffect, memo } from "react";
import { CleanCharacters } from "../../redux/actions";
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

  const colorFav = "#ff355e";
  const colorNoFav = "#fff";

  useEffect(() => {
    allFavCharacters?.map((character) => {
      if (character.id === props.id) setIsFav(true);
    });
  }, [isFav]);

  return (
    <>
      <div className={css.div_card}>
        <h2 className={css.name}>
          {props?.name?.forename ? props.name?.forename : props?.forename}{" "}
          {props?.name?.surname ? props.name?.surname : props?.surname}
        </h2>

        <div
          onClick={() => {
            dispatch(CleanCharacters());
          }}
        >
          <Link to={`/driver/${props.id}`}>
            <LazyLoadImage
              className={css.img}
              alt={props.driverRef}
              effect="blur"
              style={{
                marginBottom: 15,
                objectFit: "cover",
                objectPosition: "top",
              }}
              height={400}
              width={300}
              src={
                props?.image?.urlImage
                  ? props?.image?.urlImage
                  : props?.Image?.urlImage
              }
            />
          </Link>
        </div>
      </div>
    </>
  );
});

export default trackWindowScroll(Card);
