import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PropertyDetails from "./pages/PropertyDetails";
import AddProperty from "./pages/AddProperty";

function App() {
  return (
    <Router>
      <header className="bg-gray-900 p-4 text-white">
        <nav className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Property Listing</h1>
          <div>
            <Link to="/" className="mx-2">Home</Link>
            <Link to="/add-property" className="mx-2">Add Property</Link>
          </div>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/add-property" element={<AddProperty />} />
      </Routes>
    </Router>
  );
}

export default App;
