import MerchLounge from "./MerchLounge";
import { Routes, Route } from "react-router-dom";


export function Content() {

  return (
    <div>
      <Routes>
        <Route path="/MerchLounge" element={<MerchLounge />} />
      </Routes>
    </div>
  );
}
