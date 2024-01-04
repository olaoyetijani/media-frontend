const initialState = {
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...initialState, action.payload];
    case "UPDATE":
      return state.map((post) =>
        post.id === action.payload._id ? action.payload : post
      );
    case "LIKE":
      return state.map((post) =>
        post.id === action.payload._id ? action.payload : post
      );
    case "DELETE":
      return state.filter((post) => post._id !== action.payload);
    default:
      return state;
  }
};
