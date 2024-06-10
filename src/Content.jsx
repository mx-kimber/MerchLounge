import MerchLounge from "./MerchLounge";
import { Signup } from "./Signup"
import { Login } from "./Login"

export function Content() {
  return (
   
    <div className="container outline"> 
      <div>
        <MerchLounge />
      </div>
      <div>
        <Signup />
      </div>
      <div>
        <Login />
      </div> 
    </div>
  )
}