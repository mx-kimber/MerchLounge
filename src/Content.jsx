import MerchLounge from "./MerchLounge";
import { AccountSettings } from "./AccountSettings";
import { Routes, Route } from "react-router-dom";
import { SellerDashboard } from "./SellerDashboard"

export function Content() {


  return (
    <div>
      <Routes>
        <Route path="/MerchLounge" element={<MerchLounge />} />
        <Route path="/account_settings" element={<AccountSettings />} />
        <Route path="/seller_dashboard" element={<SellerDashboard />} />
      </Routes>
    </div>
  );
}

export default Content;

