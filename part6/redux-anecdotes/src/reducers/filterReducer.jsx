const filterReducer = (state = "", action) => {
  //console.log("State:" + state);
  //console.log("Action:" + action);
  switch (action.type) {
    case "SEARCH":
      return action.payload;

    default:
      return state;
  }
};

export const filterChange = (filter) => {
  return {
    type: "SEARCH",
    payload: filter,
  };
};

export default filterReducer;
