import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BeerFinder } from "./components/BeerFinder.js";
import { BeerItem } from "./components/BeerItem.js";
import { getBeers } from "./beerListSlice";
import "./BeerListPage.css";

export const BeerListPage = () => {
  const dispatch = useDispatch();
  const { beers, hasErrors, isLoading } = useSelector(
    (state) => state.beerList
  );

  useEffect(() => {
    if (!beers) {
      dispatch(getBeers());
    }
  }, [beers, hasErrors, dispatch]);

  useEffect(() => {
    if (hasErrors) {
      window.alert("Sorry, could not load your beers");
    }
  }, [hasErrors]);

  return (
    <>
      <h1>The palette</h1>

      <BeerFinder />

      <h3>The seeked ones</h3>
      {isLoading ? (
        <>Your beers are filling</>
      ) : (
        <div className="beerContainer">
          {beers && beers.length > 0 ? (
            beers.map((beer) => <BeerItem key={beer.id} {...beer} />)
          ) : (
            <div>No results</div>
          )}
        </div>
      )}
    </>
  );
};
