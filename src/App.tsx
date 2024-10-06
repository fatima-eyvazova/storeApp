import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";

import router from "./router/router";
import {
  store,
  // persistor
} from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <RouterProvider router={router} />
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
