import React from "react";

export const BeerItem = (props) => {
  const showDetails = (id) => {
    window.location = `/beer/${id}`;
  };

  return (
    <div className="beerItem" onClick={() => showDetails(props.id)}>
      <div>
        <img
          className="beerItemImage"
          alt={`A bottle of fresh ${props.name}`}
          src={props.image}
        />
      </div>
      <div className="beerItemName">{props.name}</div>
      <div
        className={`beerItemPercentile${
          props.percentile > 5.5 ? " strong" : ""
        }`}
      >
        {props.percentile}%
      </div>
    </div>
  );
};
