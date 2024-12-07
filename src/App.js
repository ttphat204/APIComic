import Home from "./Components/Home";
import Details from "./Components/Details";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gender from "./Components/Include/Gender";
import Trending from "./Components/Include/Trending";
import Search from "./Components/Include/Search";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/comics/:slug" element={<Details />}></Route>
          <Route path="/gender/:slug" element={<Gender />}></Route>
          <Route path="/trending/:slug" element={<Trending />}></Route>
          <Route path="/trending/:slug" element={<Trending />}></Route>
          <Route path="/search" element={<Search />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
