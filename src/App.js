import "./App.css";
import { Lists, MyNav, Home } from "./components";
import { Routes, Route } from "react-router-dom";
import { ListProvider } from "./context/useListContext";

function App() {
  return (
    // Wrapping the app with ListProvider to provide context
    <ListProvider>
    <div>
      <MyNav expand="sm" />
      <div className="App">
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/lists" element={<Lists />} />
        </Routes>
      </div>
    </div>
    </ListProvider>
  );
}

export default App;
