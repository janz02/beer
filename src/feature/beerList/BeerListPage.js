import React, { useEffect } from "react";
import { BeerItem } from "./BeerItem.js";
import "./BeerListPage.css";

export const BeerListPage = () => {
  let beers = [];
  let filteredBeers = [{
    "name":"Keg",
    "percentile":5.1,
    "id":10,
    "image":"https://images.punkapi.com/v2/keg.png"
  },{
    "name":"Keg",
    "percentile":5.1,
    "id":10,
    "image":"https://images.punkapi.com/v2/keg.png"
  },{
    "name":"Keg",
    "percentile":5.1,
    "id":10,
    "image":"https://images.punkapi.com/v2/keg.png"
  },{
    "name":"Keg",
    "percentile":5.1,
    "id":10,
    "image":"https://images.punkapi.com/v2/keg.png"
  },{
    "name":"Keg",
    "percentile":5.1,
    "id":10,
    "image":"https://images.punkapi.com/v2/keg.png"
  },{
    "name":"Keg",
    "percentile":5.1,
    "id":10,
    "image":"https://images.punkapi.com/v2/keg.png"
  }];
  useEffect(() => {
    if (beers.length === 0) {
    }
  });

  return (
    <form>
      <h1>The palette</h1>

      <div className="filterBox">
        <h3>Filter</h3>
        <div>
          <label>by name</label>
          <input type="text" />
        </div>
        <div>
          <label>by strength</label>
          <input type="number" name="" />
        </div>
      </div>

      <h3>The seeked ones</h3>
      <div className="beerContainer">
        {filteredBeers.length > 0 ? (
          filteredBeers.map((beer) => <BeerItem {...beer} />)
        ) : (
          <div>No results</div>
        )}
      </div>
    </form>
  );
};
