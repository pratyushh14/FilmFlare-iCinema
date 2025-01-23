import React from "react";
import "./style.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircleRating = ({ rating }) => {
  return (
    <div className="circleRating">
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: "#020c1b",
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
          textColor: "white",
          trailColor: "transparent",
          textSize: "34px",
        })}
      />
    </div>
  );
};

export default CircleRating;
