/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const [counter, setCounter] = useState(0);
  const location = useLocation();

  return <h2>Dashboard Sayfası</h2>;
}

export default Dashboard;
