import MerchLounge from "./MerchLounge";
import { Signup } from "./Signup"
import { Login } from "./Login"
import { Routes, Route } from "react-router-dom";


export function Content() {
  return (
   
    <Routes>    
              
      <Route path="/MerchLounge" element={<MerchLounge /> } />
      
      <Route path="/signup" element={<Signup />} />
      
      <Route path="/login" element={<Login />} />
      
    </Routes>
      
  )
}