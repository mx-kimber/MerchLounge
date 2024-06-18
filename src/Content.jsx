import MerchLounge from "./MerchLounge";
import { AccountSettings } from "./AccountSettings";
import { Routes, Route } from "react-router-dom";


export function Content() {


  return (
    <div>
      <Routes>
        <Route path="/MerchLounge" element={<MerchLounge />} />
        <Route path="/account_settings" element={<AccountSettings />} />
        
      </Routes>
    </div>
  );
}

export default Content;

