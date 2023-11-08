/* eslint-disable react/prop-types */
import css from "./form.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetSingleDriver,
  GetTeams,
  GetNationalities,
  CleanCharacters,
  EnableWaitPage,
} from "../../redux/actions";
import validation from "./validation";
import CustomInput from "../customInput/CustomInput";
import CustomSelect from "../customSelect/CustomSelect";
import axios from "axios";
import toast from "react-hot-toast";
import CustomLoading from "../customLoading/customLoading";

export default function Form() {
  const [newDriver, setNewDriver] = useState({});
  const [teamsDriver, setTeamsDriver] = useState("");
  const [errors, setErros] = useState({});
  const driver = useSelector((state) => state.singleDriver);
  const teams = useSelector((state) => state.teams);
  const waitPage = useSelector((state) => state.waitPage);
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
    const description = document.getElementById("description");
    if (description) {
      description.value = "";
    }
    axios
      .post(`http://localhost:3001/drivers`, newDriver)
      .then(({ data }) => {
        handleClearNewDriver();
        toast.custom(<h1>Sucess</h1>);
      })
      .catch(() => {
        toast.custom(<h1>Error</h1>);
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

  const handleClearNewDriver = () => {
    setNewDriver({});
  };

  const handleChangeTeam = (event) => {
    setTeamsDriver(event.target.value);
  };

  const handleInputsDriver = (initial, final) => {
    let inputs = [];
    if (driver?.id == 1) {
      for (const key in driver) {
        if (typeof driver[key] != "object" && key != "id") {
          inputs.push(key);
        } else if (typeof driver[key] == "object") {
          Object.entries(driver[key]).filter(([subkey, value]) => {
            if (
              !subkey.includes("id") &&
              !subkey.includes("Nationality") &&
              !subkey.includes("teams") &&
              subkey.length > 2
            )
              inputs.push(subkey);
          });
        }
      }
      inputs = inputs.slice(initial, final);
      return inputs;
    }
  };

  const handleInputTypeDriver = (inputs) => {
    let inputTypes = inputs.map((input) => {
      if (input.includes("url")) return "url";
      else if (input == "number") return "number";
      else if (input == "dob") return "date";
      else {
        return "text";
      }
    });
    return inputTypes;
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
    if (Object.keys(newDriver).length < 1) error = true;
    Object.keys(errors).map((key) => {
      errors[key] != undefined ? (error = true) : null;
    });
    return error;
  };

  return (
    <>
      <div className={css.div_custom} hidden={waitPage}>
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
              width: "66%",
            }}
          >
            {handleInputsDriver()?.length > 1 ? (
              <>
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    style={{ width: "100%", display: "flex", flexWrap: "wrap" }}
                  >
                    <CustomInput
                      css={css}
                      htmlFor={handleInputsDriver(3 * index, 3 * index + 3)}
                      valuesLabel={handleInputsDriver(3 * index, 3 * index + 3)}
                      valuesInput={newDriver}
                      onChange={handleChangeDriver}
                      errors={errors}
                      types={handleInputTypeDriver(
                        handleInputsDriver(3 * index, 3 * index + 3)
                      )}
                    />
                  </div>
                ))}
              </>
            ) : null}
          </div>
          <div style={{ width: "30%" }}>
            <div style={{ width: "100%" }}>
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
            <div style={{ width: "100%", marginTop: "10vh" }}>
              <h2>Equipos / Escuderos</h2>

              <CustomSelect
                className={css.custom_input}
                onClick={handleChangeTeam}
                values={handleNameTeams()}
                text={handleNameTeams()}
              />
              <button onClick={handleAddTeamDriver} type="button">
                +
              </button>
              <button onClick={handleRemoveTeamDriver} type="button">
                -
              </button>
              {errors?.teams && (
                <h2 style={{ color: "red" }}>{errors.teams}</h2>
              )}
              <p>{newDriver?.teams?.toString()}</p>
            </div>
            <div style={{ width: "100%", marginTop: "10vh" }}>
              <h2>Descripción</h2>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                style={{
                  height: "30vh",
                  width: "85%",
                  backgroundColor: "transparent",
                  color: "black",
                }}
                onChange={handleChangeDriver}
              ></textarea>
              {errors?.description && (
                <h2 style={{ color: "red" }}>{errors.description}</h2>
              )}
            </div>
            <div style={{ marginTop: "10vh", marginBottom: "auto" }}>
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
        </form>
      </div>
      <div hidden={!waitPage}>
        <CustomLoading />
      </div>
    </>
  );
}
