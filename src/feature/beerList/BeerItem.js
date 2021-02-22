import React from "react";
import { history } from "../../App.js";

export const BeerItem = (props) => {
  const showDetails = (id) => {
    history.push(`/beer/${id}`);
  };

  return (
    <div className=".beerContainer" onClick={() => showDetails(props.id)}>
      <img
        className="beerImage"
        alt={`A bottle of fresh ${props.name}`}
        src={props.image}
      />
      <span className="beerName">{props.name}</span>
      <span
        className={`beerPercentile${props.percentile > 5.5 ? " strong" : ""}`}
      >
        {props.percentile}
      </span>
    </div>
  );
};
