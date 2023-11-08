import { useEffect, useState } from "react";
import axios from "axios";
import intro from "/videos/This is Formula 1 - F1 intro (BBC remastered).mp4";
import css from "./homePage.module.css";
import CustomButton from "../customButton/CustomButton";

export default function HomePage() {
  const [waitComplete, setWaitComplete] = useState(false);
  useEffect(() => {
    axios
      .post(`http://localhost:3001/database`)
      .then(({ data }) => {
        setWaitComplete(true);
      })
      .catch((error) => {
        setWaitComplete(false);
      });
  }, []);

  const rootElement = document.getElementById("root");

  if (rootElement) {
    rootElement.style.margin = 0;
    rootElement.style.padding = 0;
    rootElement.style.width = "100%";
    rootElement.style.height = "100vh";
  }

  return (
    <>
      <div className={css.overlay}></div>
      <video className={css.video} src={intro} autoPlay loop muted />
      <div className={css.content}>
        <p>Plataforma enfocada al deporte automovilistico</p>
        <h1>F19</h1>
        <h1>Racing and Passion</h1>
        <CustomButton
          style={{ margin: 10 }}
          onClick={[""]}
          link={["/driver"]}
          text={[["Ingresa ya!"]]}
          disabled={waitComplete}
        />
      </div>
    </>
  );
}
