import "./Header.css"

export function Header() {
  return (
    <header>
      <div className="nav-links">
        <div className="">
          <a href="#">Create Account </a>
        </div> 
        <div>
          <a href="#"> Login</a>
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