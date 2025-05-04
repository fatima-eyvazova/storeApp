import { jsx as _jsx } from "react/jsx-runtime";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { I18nextProvider } from "react-i18next";
import i18next from "./i18n";
import router from "./router/router";
import { persistor, store } from "./redux/store";
const App = () => {
    return (_jsx(Provider, { store: store, children: _jsx(PersistGate, { loading: null, persistor: persistor, children: _jsx(I18nextProvider, { i18n: i18next, children: _jsx(RouterProvider, { router: router }) }) }) }));
};
export default App;
