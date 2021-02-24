import React from "react";
import { useDispatch } from "react-redux";
import { getBeers } from "../beerListSlice";
import { useDebouncedCallback } from "use-debounce";

export const BeerFinder = () => {
  const dispatch = useDispatch();

  const createQueryString = (queryData) => {
    const queryParams = [];

    for (let i = 0; i < queryData.length; i++) {
      const item = queryData[i];
      if (item.value && item.value !== "") {
        queryParams.push(`${item.name}=${item.value}`);
      }
    }

    return queryParams.join("&");
  };

  const handleSearch = useDebouncedCallback((e) => {
    const input = e.target.form.elements;
    const filter = createQueryString(input);

    dispatch(getBeers(filter));
  }, 600);

  return (
    <form onChange={(e) => handleSearch.callback(e)}>
      <div className="filterBox">
        <h3>Filter</h3>
        <table>
          <tbody>
            <tr>
              <td>by name</td>
              <td colSpan={2}>
                <input type="text" name="beer_name" />
              </td>
            </tr>
            <tr>
              <td>by strength</td>
              <td>
                <input
                  type="number"
                  min={0}
                  max={100}
                  defaultValue={0}
                  name="abv_gt"
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  max={100}
                  defaultValue={100}
                  name="abv_lt"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  );
};
