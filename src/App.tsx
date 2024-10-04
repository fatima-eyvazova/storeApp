import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./layouts/dashboard/components/Sidebar/Sidebar";
import Products from "./layouts/dashboard/pages/ProductsDashboard/ProductsPage";
import Category from "./layouts/dashboard/pages/CategoryDashboard/CategoryDasbboard";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/category" element={<Category />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
