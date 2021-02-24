import React from "react";
import { history } from "../../App";

export const BeerItem = (beer) => {
  const showDetails = (id) => {
    history.push(`/beer/${id}`);
  };

  return (
    <div className="beerItem" onClick={() => showDetails(beer.id)}>
      <div>
        <img
          className="beerItemImage"
          alt={`A bottle of fresh ${beer.name}`}
          src={beer.image_url}
        />
      </div>
      <div className="beerItemName">{beer.name}</div>
      <div
        className={`beerItemPercentile${
          beer.abv > 5.5 ? " strong" : ""
        }`}
      >
        {beer.abv}%
      </div>
    </div>
  );
};
