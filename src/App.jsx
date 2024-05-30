import React, { useState } from "react";
import BarSide from "./Component/BarSide";
import DashBoard from "./Component/DashBoard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from "./Pages/Edit";
import Create from "./Pages/Create";
import Card from "./Pages/Card";

const App = () => {
  const [id, setId] = useState(0);
  return (
    <div>
      <BrowserRouter>
        <div>
          <BarSide />
        </div>

        <Routes>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/card" element={<Card setId={setId} />} />

          <Route path="/edit/:id" element={<Edit id={id} />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
