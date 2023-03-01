import React from "react";
import ReactDOM from "react-dom/client";
import { ReduxProvider } from "@travel-tailor/functions";

import { store } from "@/setup/redux/store";
import { Router } from "@/setup/router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Router/>
    </ReduxProvider>
  </React.StrictMode>
);
