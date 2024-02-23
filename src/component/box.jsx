import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Platform(props) {
  return (
    <div
      className="box"
      style={
        props.isheld
          ? { backgroundColor: "rgb(78, 216, 78)" }
          : { backgroundColor: "wheat" }
      }
      onClick={props.handleclick}
    >
      {props.getRndInteger}
    </div>
  );
}
