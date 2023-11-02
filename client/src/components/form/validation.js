const validation = (user) => {
  const errors = {};
  if (!/^[a-z][^\W_]{7,14}$/i.test(user.username))
    errors.username = "No es un usuario válido";
  if (!/^(?=[^a-z]*[a-z])(?=\D*\d)[^:&.~\s]{5,20}$/.test(user.password))
    errors.password = "No es una contraseña válida";

  return errors;
};

export default validation;
