import { useEffect, useState } from "react";
import Logo from "../../assets/logo11.png";
import { Link, useNavigate } from "react-router-dom";
import Login from "../Auth/Login";
import shopping from "../../assets/shopping-cart.gif";
import Nav1 from "./Nav1";
import { useProductContext } from "@/ContextAPI/ProductContext";

export default function Navbar() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const { cart } = useProductContext();
  const [userEmail, setUserEmail] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("loggedInUser");
    if (email) setUserEmail(email);

    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserEmail("");
    setAccessToken("");
    navigate("/");
  };

  // Get cart length from context
  const totalCartItems = cart ? cart.length : 0;

  return (
    <>
      <Nav1 />

      {/*<!-- Header --> */}
      <header className="relative z-20 w-full border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
            role="navigation"
          >
            {/*      <!-- Brand logo --> */}
            <div
              id="WindUI"
              aria-label="WindUI logo"
              aria-current="page"
              className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
            >
              <Link to={"/"}>
                <img src={Logo} alt="" className="h-22 w-20 bg-emerald-500" />
              </Link>

              <Link to={"/"}>MERNify</Link>
            </div>
            {/*      <!-- Mobile trigger --> */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
                ${
                  isToggleOpen
                    ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                    : ""
                }
              `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>
            {/*      <!-- Navigation links --> */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <Link to={"/"}>
                    <span>Home</span>
                  </Link>
                </a>
              </li>
              <li role="none" className="flex items-stretch">
                <div
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                >
                  <Link to={"/collection"}>
                    <span>Collection</span>
                  </Link>
                </div>
              </li>
            </ul>
            {/*      <!-- Actions --> */}
            <div className="ml-auto flex items-center justify-end px-6 gap-4 lg:ml-0 lg:flex-1 lg:p-0">
              <li role="none" className="flex items-stretch">
                <div
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-2 border border-gray-500 rounded-full transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                >
                  {userEmail ? userEmail : <Login />}
                </div>
              </li>

              <Link to={"/cart"}>
                <div className="relative inline-flex h-22 w-22 items-center justify-center rounded-full text-lg text-emerald-500">
                  <img src={shopping} className="h-10 w-10" alt="" />
                  <span className="absolute -right-1.5 -top-1.5 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 px-1.5 text-sm text-white">
                    {totalCartItems}
                  </span>
                </div>
              </Link>
              {accessToken ? (
                <button
                  onClick={handleLogout}
                  className="border-2 p-3 ml-4 rounded-[10px] border-b-2 border-gray-500 text-black-500"
                >
                  Logout
                </button>
              ) : (
                ""
              )}
            </div>
          </nav>
        </div>
      </header>
      {/*<!-- End Navbar with Topbar--> */}
    </>
  );
}
