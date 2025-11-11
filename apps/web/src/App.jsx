import { Routes, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Landing from "./pages/Landing";

const App = () => {
  return (
    <Routes>
      <Route
        index
        path="/"
        element={
          <Main>
            <Landing />
          </Main>
        }
      />
    </Routes>
  );
};

export default App;
