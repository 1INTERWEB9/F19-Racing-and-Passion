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
  let min = "1";
  return (
    <>
      {valuesLabel.map((valueLabel, index) => (
        <div
          key={htmlFor[index]}
          style={{ height: "130px", marginRight: "auto", marginLeft: "auto" }}
        >
          <label className={css.custom_label} htmlFor={htmlFor[index]}>
            {valueLabel}:{" "}
          </label>
          <input
            min={min}
            max={types[index] == "date" ? "2005-12-31" : null}
            className={css.custom_input}
            type={types[index] ? types[index] : "text"}
            name={htmlFor[index]}
            value={valuesInput[htmlFor[index]]}
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
