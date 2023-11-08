/* eslint-disable react/prop-types */
import css from "./apiSearchBar.module.css";
import { useEffect, useState } from "react";
import {
  CleanCharacters,
  EnableWaitPage,
  GetTeams,
  GetNationalities,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "../customSelect/CustomSelect";

export default function ApiSearchBar({ setConditionSearch }) {
  const dispatch = useDispatch();
  const nationalities = useSelector((state) => state.nationalities);
  const teams = useSelector((state) => state.teams);
  const waitPage = useSelector((state) => state.waitPage);
  const [pageSize, setPageSize] = useState(9);
  const [sortDrivers, setSortDrivers] = useState("");
  const [orderSort, setOrderSort] = useState("false");
  const [search, setSearch] = useState({
    value: "",
    type: "name",
  });

  const handleTypeSearch = (event) => {
    if (search.value != "") {
      dispatch(CleanCharacters());
      dispatch(EnableWaitPage());
    }
    setSearch({ ...search, value: "", type: event.target.value });
  };

  const handleSearchCharacter = (event) => {
    dispatch(CleanCharacters());
    dispatch(EnableWaitPage());
    setSearch({ ...search, value: event.target.value });
  };

  const handlePageSize = (event) => {
    if (pageSize != event.target.value) {
      setConditionSearch(
        `&pagesize=${event.target.value}&sort=${sortDrivers}&reverse=${orderSort}&${search.type}=${search.value}`
      );
      setPageSize(event.target.value);
      dispatch(CleanCharacters());
      dispatch(EnableWaitPage());
    }
  };

  const handleSort = (event) => {
    if (sortDrivers != event.target.value) {
      setConditionSearch(
        `&sort=${event.target.value}&pagesize=${pageSize}&reverse=${orderSort}&${search.type}=${search.value}`
      );
      setSortDrivers(event.target.value);
      dispatch(CleanCharacters());
      dispatch(EnableWaitPage());
    }
  };

  const handleOrderSort = (event) => {
    if (orderSort != event.target.value) {
      setConditionSearch(
        `&sort=${sortDrivers}&reverse=${event.target.value}&pagesize=${pageSize}&${search.type}=${search.value}`
      );
      setOrderSort(event.target.value);
      dispatch(CleanCharacters());
      dispatch(EnableWaitPage());
    }
  };

  const handleNameTeams = () => {
    let nameTeams = teams.map((team) => team?.nameTeam);
    nameTeams.unshift("");
    nameTeams.sort();
    return nameTeams;
  };

  const handleNameNationalities = () => {
    const nameNationalities = nationalities.map(
      (nameNationalities) => nameNationalities?.nameNationality
    );
    nameNationalities.unshift("");
    nameNationalities.sort();
    return nameNationalities;
  };

  useEffect(() => {
    dispatch(GetTeams());
    dispatch(GetNationalities());
    const timer = setTimeout(() => {
      setConditionSearch(
        `&${search.type}=${search.value}&sort=${sortDrivers}&reverse=${orderSort}&pagesize=${pageSize}`
      );
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [search.value]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <nav className={css.custom_nav}>
          <div style={{ marginLeft: 30 }}>
            <CustomSelect
              className={css.custom_select}
              onClick={handleTypeSearch}
              values={["name", "teams", "nationality"]}
              text={["Nombre", "Equipo", "Nacionalidad"]}
              disabled={waitPage}
            />
            {search.type == "name" ? (
              <input
                id="SearchBar"
                type="search"
                className={css.custom_input}
                value={search.value}
                onChange={handleSearchCharacter}
              />
            ) : search.type == "teams" ? (
              <CustomSelect
                className={css.custom_select}
                onClick={handleSearchCharacter}
                values={handleNameTeams()}
                text={handleNameTeams()}
              />
            ) : (
              <CustomSelect
                className={css.custom_select}
                onClick={handleSearchCharacter}
                values={handleNameNationalities()}
                text={handleNameNationalities()}
              />
            )}
          </div>
          <div>
            <CustomSelect
              className={css.custom_select}
              onClick={handlePageSize}
              values={[9, 20, 50]}
              text={[9, 20, 50]}
              disabled={waitPage}
            />
            <CustomSelect
              className={css.custom_select}
              onClick={handleOrderSort}
              values={["false", "true"]}
              text={["Ascendente", "Descendente"]}
              disabled={waitPage}
            />
            <CustomSelect
              className={css.custom_select}
              onClick={handleSort}
              values={[
                "",
                "forename",
                "surname",
                "dob",
                "driverRef",
                "nationality",
                "teams",
              ]}
              text={[
                "Orden por defecto",
                "Nombre",
                "Apellido",
                "Fecha Nacimiento",
                "Apodo",
                "Nacionalidad",
                "Equipos",
              ]}
              disabled={waitPage}
            />
          </div>
        </nav>
      </div>
    </>
  );
}
