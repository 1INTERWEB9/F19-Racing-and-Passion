import css from "./customLoading.module.css";

const CustomLoading = () => {
  return (
    <>
      <div style={{ margin: 40 }}>
        <div>
          <span className={css.loader}>Loading</span>
        </div>
        <span className={css.flag}></span>
      </div>
    </>
  );
};

export default CustomLoading;
