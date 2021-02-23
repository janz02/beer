import React from "react";
import "./BeerDetailPage.css";
export const BeerDetailPage = () => {
  const beer = {};

  return (
    <div className=".beerContainer">
      <button onClick={() => (window.location = "/beers")}>
        Back to the beers
      </button>
      <img
        className="beerImage"
        alt={`A bottle of fresh ${beer.name}`}
        src={beer.image}
      />
      <label>Name</label>
      <span className=".beerName">{beer.name}</span>
      <label>Ingredients</label>
      <span className="ingredients">{beer.ingredients}</span>
      <label>Recommendations</label>
      <span className="recommendations">{beer.recommendations}</span>
      <label>Percentile</label>
      <span
        className={`beerPercentile${beer.percentile > 5.5 ? " strong" : ""}`}
      >
        {beer.percentile}
      </span>
    </div>
  );
};
