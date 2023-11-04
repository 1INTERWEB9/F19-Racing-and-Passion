/* eslint-disable react/prop-types */
const CustomSelect = ({ className, onClick, values, text }) => {
  return (
    <>
      <select className={className} key={onClick.name} onChange={onClick}>
        {values.map((value, index) => (
          <option key={index} value={value}>
            {text[index]}
          </option>
        ))}
      </select>
    </>
  );
};

export default CustomSelect;
