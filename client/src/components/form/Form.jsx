/* eslint-disable react/prop-types */
import css from "./form.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetSingleDriver } from "../../redux/actions";
import validation from "./validation";
import CustomInput from "../customInput/CustomInput";

export default function LogIn({ logIn }) {
  const [newDriver, setNewDriver] = useState({
    driverRef: "",
    number: null,
    code: "",
    forename: "",
    surname: "",
    imageBy: "",
    urlImage: "",
    dob: "",
    nationality: "",
    url: "",
    teams: [],
    description: "",
  });
  const [driverNationality, setDriverNationality] = useState([]);
  const [driverTeams, setDriverTeams] = useState([]);
  const [driverInputs, setDriverInputs] = useState([]);
  const [errors, setErros] = useState({});
  const driver = useSelector((state) => state.singleDriver);
  const dispatch = useDispatch();

  const handleChangeDriver = (event) => {
    setNewDriver({
      ...newDriver,
      [event.target.name]: event.target.value,
    });
  };

  const handleNamesInputs = ({ driver }) => {
    for (const key in driver) {
      setDriverInputs([...driverInputs, key]);
    }
  };

  useEffect(() => {
    if (user.username !== "" || user.password !== "") {
      const userValidated = validation(user);
      setErros({ ...userValidated });
    }
    dispatch(GetSingleDriver(1));
    handleChangeDriver(driver);
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    logIn(user);
  };

  return (
    <div className={css.div_custom}>
      <form style={{ margin: 15 }} onSubmit={handleSubmit}>
        <CustomInput
          css={css}
          htmlFor={["username", "password"]}
          valuesLabel={["Username", "Password"]}
          valuesInput={[user.username, user.password]}
          onChanges={handleChangeDriver}
          types={["text", "password"]}
          errors={errors}
        />
        <button
          style={{ margin: 10 }}
          type="submit"
          disabled={
            !user.username ||
            !user.password ||
            errors?.username ||
            errors?.password
          }
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
