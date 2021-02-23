import React, { useEffect } from "react";
import { BeerItem } from "./BeerItem.js";
import "./BeerListPage.css";

export const BeerListPage = () => {
  let beers = [];
  let filteredBeers = [
    {
      name: "Keg",
      percentile: 5.1,
      id: 1,
      image: "https://images.punkapi.com/v2/keg.png",
    },
    {
      name: "Keg",
      percentile: 5.1,
      id: 453,
      image: "https://images.punkapi.com/v2/keg.png",
    },
    {
      name: "Keg",
      percentile: 5.1,
      id: 111,
      image: "https://images.punkapi.com/v2/keg.png",
    },
    {
      name: "Keg",
      percentile: 4.1,
      id: 6,
      image: "https://images.punkapi.com/v2/keg.png",
    },
    {
      name: "Keg",
      percentile: 7.1,
      id: 1,
      image: "https://images.punkapi.com/v2/keg.png",
    },
    {
      name: "Keg",
      percentile: 15.1,
      id: 13,
      image: "https://images.punkapi.com/v2/keg.png",
    },
    {
      name: "Keg",
      percentile: 4.1,
      id: 6,
      image: "https://images.punkapi.com/v2/keg.png",
    },
    {
      name: "Keg",
      percentile: 7.1,
      id: 1,
      image: "https://images.punkapi.com/v2/keg.png",
    },
    {
      name: "Keg",
      percentile: 15.1,
      id: 13,
      image: "https://images.punkapi.com/v2/keg.png",
    },
    {
      name: "Keg",
      percentile: 4.1,
      id: 6,
      image: "https://images.punkapi.com/v2/keg.png",
    },
    {
      name: "Keg",
      percentile: 7.1,
      id: 1,
      image: "https://images.punkapi.com/v2/keg.png",
    },
    {
      name: "Keg",
      percentile: 15.1,
      id: 13,
      image: "https://images.punkapi.com/v2/keg.png",
    },
  ];
  useEffect(() => {
    if (beers.length === 0) {
    }
  });

  return (
    <form>
      <h1>The palette</h1>

      <div className="filterBox">
        <h3>Filter</h3>
        <table>
          <tr>
            <td>by name</td>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <td>by strength</td>
            <td><input type="number"  /></td>
          </tr>
        </table>
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
