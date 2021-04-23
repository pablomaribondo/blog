import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Routes from "./routes";
import store from "./redux/store/store";

import Nav from "./components/Nav";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Nav />
        <Routes />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
