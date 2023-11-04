/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
const CustomButton = ({
  style,
  onClick,
  text,
  link,
  className,
  disabled,
  values,
}) => {
  return (
    <>
      {!link
        ? onClick.map((button, index) => (
            <button
              key={index}
              onClick={button}
              style={style}
              className={className ? className : undefined}
              disabled={disabled ? disabled : false}
            >
              {text[index]}
            </button>
          ))
        : link.map((route, index) => (
            <Link key={index} to={route}>
              <button key={index} onClick={onClick[index]} style={style}>
                {text[index]}
              </button>
            </Link>
          ))}
    </>
  );
};
export default CustomButton;
