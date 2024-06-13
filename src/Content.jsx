import MerchLounge from "./MerchLounge";
import { AccountSettings } from "./AccountSettings";
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
      <Routes>
        <Route path="/MerchLounge" element={<MerchLounge shops={shops} />} />
        <Route path="/account_settings" element={<AccountSettings />} />
        
      </Routes>
    </div>
  );
}

export default Content;

