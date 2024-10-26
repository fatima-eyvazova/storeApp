import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { I18nextProvider } from "react-i18next";
import i18next from "./i18n";
import router from "./router/router";
import { persistor, store } from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18next}>
          <RouterProvider router={router} />
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
