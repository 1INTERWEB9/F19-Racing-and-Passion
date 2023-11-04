import validator from "validator";

const validation = (newDriver, inputs) => {
  let keys = [...inputs, "nationality", "teams"];
  let errors = {};
  for (let index = 0; index < keys.length; index++) {
    if (
      newDriver[keys[index]] == "" ||
      newDriver[keys[index]] == null ||
      newDriver[keys[index]].length < 1
    )
      errors[keys[index]] = "Te hace falta llenar " + keys[index];
    else {
      switch (keys[index]) {
        case "forename":
          errors[keys[index]] = filterLength(
            newDriver[keys[index]],
            keys[index],
            3,
            15
          );
          errors[keys[index]] = filterStraightString(newDriver[keys[index]]);
          break;
        case "surname":
          errors[keys[index]] = filterLength(
            newDriver[keys[index]],
            keys[index],
            3,
            15
          );
          errors[keys[index]] = filterStraightString(newDriver[keys[index]]);
          break;
        case "driverRef":
          errors[keys[index]] = filterLength(
            newDriver[keys[index]],
            keys[index],
            3,
            20
          );
          break;
        case "code":
          if (newDriver[keys[index]].length != 3)
            errors[keys[index]] = keys[index] + " debe ser de 3  caracteres";
          else {
            errors[keys[index]] = filterStraightString(newDriver[keys[index]]);
          }

          break;
        case "description":
          errors[keys[index]] = filterLength(
            newDriver[keys[index]],
            keys[index],
            10,
            3000
          );
          break;
        case "url":
          if (!validator.isURL(newDriver[keys[index]]))
            errors[keys[index]] = "URL invalida";
          break;
        case "urlImage":
          if (!validator.isURL(newDriver[keys[index]]))
            errors[keys[index]] = "URL invalida";
          break;
        default:
          break;
      }
    }
  }
  return errors;
};

const filterStraightString = (string) => {
  const regex = /^[a-zA-Z\-]+$/;
  if (!regex.test(string)) return "no debe contener simbolos ni numeros";
};

const filterLength = (input, key, min, max) => {
  if (input.length > max)
    return key + " debe tener maximo " + max + " caracteres";
  else if (input.length < min)
    return key + " debe tener minimo " + min + " caracteres";
};

export default validation;
