import React from "react";
import style from "./css/Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={style.container}>
      <div className={style.title}>
        <h5>With love &#9829; by <a href="https://www.linkedin.com/in/arley-gonzalez-g">leyargo</a></h5>
      </div>
    </div>
  );
};

export default Footer;
