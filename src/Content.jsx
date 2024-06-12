import MerchLounge from "./MerchLounge";
import ShopsIndex from "./ShopsIndex"
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";


export function Content() {

  const [shops, setShops] = useState([]);

  const handleIndexShops = () => {
    console.log("handleIndexShops");
    axios.get("http://localhost:3000/shops.json").then((response) => {
      console.log(response.data);
      setShops(response.data);
    });
  };

  useEffect(handleIndexShops, []);

  return (
    <div>
      <div className="container-row">
        <ShopsIndex shops={shops} />
      </div>
      <Routes>
        <Route path="/MerchLounge" element={<MerchLounge />} />
      </Routes>
    </div>
  );
}
