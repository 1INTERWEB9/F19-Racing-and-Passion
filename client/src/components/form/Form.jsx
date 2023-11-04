/* eslint-disable react/prop-types */
import css from "./form.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetSingleDriver,
  GetTeams,
  GetNationalities,
} from "../../redux/actions";
import validation from "./validation";
import CustomInput from "../customInput/CustomInput";
import CustomSelect from "../customSelect/CustomSelect";
import axios from "axios";

export default function Form() {
  const [newDriver, setNewDriver] = useState({});
  const [teamsDriver, setTeamsDriver] = useState("");
  const [errors, setErros] = useState({});
  const driver = useSelector((state) => state.singleDriver);
  const teams = useSelector((state) => state.teams);
  const nationalities = useSelector((state) => state.nationalities);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(newDriver).length >= 1) {
      const driverValidated = validation(newDriver, handleInputsDriver());
      setErros({ ...driverValidated });
    }
    if (Object.keys(newDriver).length < 1) {
      dispatch(GetSingleDriver(1));
      dispatch(GetTeams());
      dispatch(GetNationalities());
    }
  }, [newDriver]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3001/drivers`, newDriver)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(() => {
        console.log("AY JOAQUIN");
      });
  };

  const handleChangeDriver = (event) => {
    if (event.target.name) {
      setNewDriver({
        ...newDriver,
        [event.target.name]: event.target.value,
      });
    } else {
      setNewDriver({
        ...newDriver,
        nationality: event.target.value,
      });
    }
  };

  const handleChangeTeam = (event) => {
    setTeamsDriver(event.target.value);
  };

  const handleInputsDriver = () => {
    let inputs = [];
    for (const key in driver) {
      if (typeof driver[key] != "object" && key != "id") {
        inputs.push(key);
      } else if (typeof driver[key] == "object") {
        Object.entries(driver[key]).filter(([subkey, value]) => {
          if (
            !subkey.includes("id") &&
            !subkey.includes("Nationality") &&
            subkey.length > 2
          )
            inputs.push(subkey);
        });
      }
    }
    return inputs;
  };

  const handleNameTeams = () => {
    let nameTeams = teams.map((team) => team?.nameTeam);
    nameTeams.unshift("");
    for (let index = 0; index < newDriver?.teams?.length; index++) {
      nameTeams = nameTeams.filter((team) => team != newDriver?.teams[index]);
    }
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

  const handleAddTeamDriver = () => {
    if (teamsDriver != "") {
      let teams = newDriver?.teams ? newDriver?.teams : [];
      teams.push(teamsDriver);
      setNewDriver({
        ...newDriver,
        teams: teams,
      });
      setTeamsDriver("");
    }
  };
  const handleRemoveTeamDriver = () => {
    let filterTeams = newDriver?.teams;
    filterTeams.pop();
    setNewDriver({
      ...newDriver,
      teams: filterTeams,
    });
    handleNameTeams();
  };

  const handleErrorsInputs = () => {
    let error = false;
    Object.keys(errors).map((key) => {
      errors[key] != undefined ? (error = true) : null;
    });
    return error;
  };

  return (
    <div className={css.div_custom}>
      <h1>Crea tu conductor</h1>
      <form
        style={{ margin: 15, display: "flex", flexWrap: "wrap" }}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            margin: 15,
            display: "flex",
            flexWrap: "wrap",
            width: "700px",
          }}
        >
          {handleInputsDriver()?.length > 1 ? (
            <>
              <CustomInput
                css={css}
                htmlFor={handleInputsDriver()}
                valuesLabel={handleInputsDriver()}
                valuesInput={newDriver}
                onChange={handleChangeDriver}
                errors={errors}
                types={[
                  "text",
                  "number",
                  "text",
                  "text",
                  "text",
                  "text",
                  "url",
                  "date",
                  "url",
                  "text",
                ]}
              />
            </>
          ) : null}
        </div>
        <div>
          <div style={{ width: "400px", height: "250px" }}>
            <h2>Nacionalidad</h2>
            <CustomSelect
              className={css.custom_input}
              onClick={handleChangeDriver}
              values={handleNameNationalities()}
              text={handleNameNationalities()}
            />
            {errors?.nationality && (
              <h2 style={{ color: "red" }}>{errors.nationality}</h2>
            )}
          </div>
          <div style={{ width: "400px", height: "250px" }}>
            <h2>Equipos / Escuderos</h2>

            <CustomSelect
              className={css.custom_input}
              onClick={handleChangeTeam}
              values={handleNameTeams()}
              text={handleNameTeams()}
            />
            <button onClick={handleAddTeamDriver}>+</button>
            <button onClick={handleRemoveTeamDriver}>-</button>
            {errors?.teams && <h2 style={{ color: "red" }}>{errors.teams}</h2>}
            <p>{newDriver?.teams?.toString()}</p>
            <div style={{ marginTop: "75px", marginBottom: "auto" }}>
              <button
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                type="submit"
                disabled={handleErrorsInputs()}
              >
                Registrar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
