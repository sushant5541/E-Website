import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import Cart from "./Pages/Cart";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Shop" element={<Shop/>}/>
      <Route path="/About" element={<About/>}/>
      <Route path="/Cart" element={<Cart/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Add other routes as needed */}
    </Routes>
  );
}

export default App;