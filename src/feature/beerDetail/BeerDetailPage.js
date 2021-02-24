import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../App";
import { getBeer, resetBeer } from "./beerDetailSlice";
import { useParams } from "react-router-dom";

import "./BeerDetailPage.css";

export const BeerDetailPage = () => {
  const dispatch = useDispatch();

  const { beer, hasErrors, isLoading } = useSelector(
    (state) => state.beerDetail
  );

  const { beerId } = useParams();

  useEffect(() => {
    dispatch(getBeer(beerId));
    
    return () => {
      dispatch(resetBeer());
    };
  }, [beerId, hasErrors, dispatch]);

  useEffect(() => {
    if (hasErrors) {
      window.alert("Sorry, could not find your beer");
    }
  }, [hasErrors]);

  return (
    <div>
      <button className="backButton" onClick={() => history.goBack()}>
        Back to the beers
      </button>

      {isLoading ? (
        <div>You are the next in the line, please be patient</div>
      ) : (
        <div>
          <div className="beerDescription">
            <img
              className="beerImage"
              alt={`A bottle of fresh ${beer.name}`}
              src={beer.image_url}
            />
            <h1 className="beerName">
              {beer.name}
              <sup
                className={`beerPercentile${beer.abv > 5.5 ? " strong" : ""}`}
              >
                {beer.abv}%
              </sup>
            </h1>
          </div>
          <div>
            <p>
              <i>{beer.description}</i>
            </p>
            <h3>Ingredients</h3>
            {beer?.ingredients && Object.keys(beer.ingredients).join(", ")}
            <h3>Recommended food</h3>
            <ul>
              {beer.food_pairing &&
                beer.food_pairing.map((foodPair) => (
                  <li key={foodPair}>{foodPair}</li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
