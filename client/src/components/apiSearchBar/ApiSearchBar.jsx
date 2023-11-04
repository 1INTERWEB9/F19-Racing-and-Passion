/* eslint-disable react/prop-types */
import css from "./apiSearchBar.module.css";
import { useEffect, useState } from "react";
import { CleanCharacters, EnableWaitPage } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "../customSelect/CustomSelect";

export default function ApiSearchBar({ setConditionSearch }) {
  const dispatch = useDispatch();
  const waitPage = useSelector((state) => state.waitPage);
  const [pageSize, setPageSize] = useState(9);
  const [search, setSearch] = useState({
    value: "",
    type: "name",
  });

  const handleTypeSearch = (event) => {
    setSearch({ ...search, value: "", type: event.target.value });
  };

  const handleSearchCharacter = (event) => {
    dispatch(CleanCharacters());
    dispatch(EnableWaitPage());
    setSearch({ ...search, value: event.target.value });
  };

  const handlePageSize = (event) => {
    if (pageSize != event.target.value) {
      setConditionSearch(`&pagesize=${event.target.value}`);
      setPageSize(event.target.value);
      dispatch(CleanCharacters());
      dispatch(EnableWaitPage());
    }
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
    <>
      <div style={{ display: "flex" }}>
        <nav className={css.custom_nav}>
          <CustomSelect
            className={css.custom_select}
            onClick={handleTypeSearch}
            values={["name", "teams", "nationality"]}
            text={["Nombre", "Equipo", "Nacionalidad"]}
          />
          <input
            id="SearchBar"
            type="search"
            className={css.custom_input}
            value={search.value}
            onChange={handleSearchCharacter}
          />
        </nav>
        <div>
          <CustomSelect
            className={css.custom_select}
            onClick={handlePageSize}
            values={[9, 20, 50]}
            text={[9, 20, 50]}
          />
        </div>
      </div>
    </>
  );
}
