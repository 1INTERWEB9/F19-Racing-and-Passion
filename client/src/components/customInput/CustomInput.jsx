/* eslint-disable react/prop-types */
const CustomInput = ({
  css,
  htmlFor,
  valuesLabel,
  types,
  errors,
  onChange,
  valuesInput,
}) => {
  return (
    <>
      {valuesLabel.map((valueLabel, index) => (
        <div key={htmlFor[index]}>
          <label className={css.custom_label} htmlFor={htmlFor[index]}>
            {valueLabel}:{" "}
          </label>
          <input
            className={css.custom_input}
            type={types[index]}
            name={htmlFor[index]}
            value={valuesInput[index]}
            onChange={onChange}
          />
          {errors[htmlFor[index]] && (
            <h2 style={{ color: "red" }}>{errors[htmlFor[index]]}</h2>
          )}
          <br />
        </div>
      ))}
    </>
  );
};

export default CustomInput;
