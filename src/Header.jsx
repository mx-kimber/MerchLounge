import "./Header.css"
import { LogoutLink } from "./LogoutLink"

export function Header() {
  let authenticationLinks;
  if (localStorage.jwt === undefined) {
    authenticationLinks = <>
      <a href="/login">Login</a>| <a href="/signup">Signup</a>
    </>
  } else {
    authenticationLinks = <LogoutLink />
  }

  return (
    <header>
      <div className="nav-links">
        <div>
          {authenticationLinks}
        </div>
      </div>

      <div className="logo-container">
        <div className="container">
          <div className="font-100 outline">
            M
          </div>
          <div className="container-2">
            <div className="font-30 outline">
              erch 
            </div>
            <div className="font-50 outline">
              L
            </div>
            <div className="font-30 outline margin-neg-5">
              ounge
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}