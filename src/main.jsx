import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import reducers from "./reducers";
import { GoogleOAuthProvider } from "@react-oauth/google";

//compose(applyMiddleware(thunk))
// import postsReducer from "./reducers/postsReducer.js";

// const store = configureStore({
//   reducer: {
//     posts: postsReducer,
//   },
// });

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
