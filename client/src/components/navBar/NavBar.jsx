import { Link } from "react-router-dom";
import css from "./navBar.module.css";

const NavBar = () => {
  return (
    <>
      <div className={css.div}>
        <Link to="/driver">
          <button>Home</button>
        </Link>
        <Link to="/newDriver">
          <button>Create</button>
        </Link>
      </div>
    </>
  );
};

export default NavBar;
