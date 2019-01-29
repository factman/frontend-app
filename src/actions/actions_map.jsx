import { defaultLocation } from "../views/Maps/Maps";

export const MAP = "MAP";

export function displayMap(map) {
  return {
    type: MAP,
    payload: map,
  };
}

export function getMap(address) {
  return dispatch => fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_MAP_API_KEY}`, { method: "GET" })
    .then(response => response.json())
    .then((json) => {
      if (json.status === "OK") {
        dispatch(displayMap(json.results[0].geometry.location));
      } else {
        dispatch(displayMap(defaultLocation));
      }
    })
    .catch(error => console.log(error.message));
}
