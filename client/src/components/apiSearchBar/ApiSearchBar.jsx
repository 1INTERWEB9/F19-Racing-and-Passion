/* eslint-disable react/prop-types */
import css from "./apiSearchBar.module.css";
import { useEffect, useState } from "react";
//import CustomSelect from "../customSelect/CustomSelect";
import { CleanCharacters, DisabledPageButtons } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function ApiSearchBar({ setConditionSearch }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState({
    value: "",
    type: "name",
  });

  const handleTypeSearch = (event) => {
    setSearch({ ...search, value: "", type: event.target.value });
  };

  const handleSearchCharacter = (event) => {
    dispatch(DisabledPageButtons());
    dispatch(CleanCharacters());
    setSearch({ ...search, value: event.target.value });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setConditionSearch(`&${search.type}=${search.value}`);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [search.value]);

  return (
    <nav className={css.custom_nav}>
      {/* <CustomSelect
        className={css.custom_select}
        onClick={handleTypeSearch}
        values={["name", "species", "gender", "status"]}
        text={["Nombre", "Especie", "Género", "Estado"]}
      /> */}
      <input
        id="SearchBar"
        type="search"
        className={css.custom_input}
        value={search.value}
        onChange={handleSearchCharacter}
      />
    </nav>
  );
}
