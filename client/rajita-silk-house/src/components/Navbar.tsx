import Logo from "../assets/images/logo2.png";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { BiStore } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Cart from "./Cart";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  console.log(menuRef);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // Clicked outside the menu, close it
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleMenuIconClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Stop event propagation
    setShowMenu(!showMenu); // Toggle showMenu state
  };

  return (
    <div className="relative">
      <nav className="m-0 flex top-0 fixed z-50 justify-between items-center h-20 py-10 px-3 md:px-20 bg-gray-50 w-full">
        <div className="gap-7 text-2xl items-center hidden md:flex">
          <Link to="products/1">Mekhela Chador</Link>
          <Link to="products/2">Sarees</Link>
          <Link to="products/3">Lehengas</Link>
        </div>
        <Link to="/">
          <img className="h-[60px] cursor-pointer" src={Logo} alt="logo" />
        </Link>

        <div className="gap-7 text-2xl items-center hidden md:flex md:flex-wrap">
          <Link to="/about" className="cursor-pointer">
            About
          </Link>
          <Link to="/contact" className="cursor-pointer">
            Contact
          </Link>
          <BiSearch className="cursor-pointer" />
          <BsPerson className="cursor-pointer" />
          <AiOutlineHeart className="cursor-pointer" />
          <div onClick={() => setOpenCart(!openCart)} className="flex relative">
            <AiOutlineShoppingCart className="cursor-pointer" />
            <span className="absolute bg-blue-400 rounded-full w-5 h-5 text-center text-sm -top-3 -right-3">
              0
            </span>
          </div>
        </div>

        {/* Menu Icon */}
        {!showMenu ? (
          <>
            <div className="relative md:hidden block">
              <input
                placeholder="Search Products"
                className="border border-gray-700 px-3 py-[3px] outline-none"
                type="search"
              />
              <BiSearch className="absolute top-1 right-1 cursor-pointer text-2xl" />
            </div>
            <BiStore
              className="cursor-pointer md:hidden block text-3xl"
              onClick={handleMenuIconClick}
            />
          </>
        ) : (
          <IoMdClose
            className="cursor-pointer md:hidden block text-3xl"
            onClick={handleMenuIconClick}
          />
        )}

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`${
            showMenu ? "translate-x-[0px]" : "translate-x-[300px]"
          } transition ease-in-out duration-500 z-10 rounded-sm absolute right-5 top-14 flex flex-col gap-7 p-5 bg-white w-[250px]`}
        >
          <div className="flex gap-7 p-4 rounded-md items-center bg-gray-100">
            <BsPerson className="cursor-pointer text-2xl" />
            <AiOutlineHeart
              onClick={() => setShowMenu(false)}
              className="cursor-pointer text-2xl"
            />
            <div
              onClick={() => {
                setShowMenu(false);
                setOpenCart(!openCart);
              }}
              className="flex relative"
            >
              <AiOutlineShoppingCart className="cursor-pointer text-xl" />
              <span className="absolute bg-blue-400 rounded-full w-5 h-5 text-center -top-3 -right-3">
                0
              </span>
            </div>
          </div>
          <Link to="/" className="cursor-pointer text-xl">
            Homepage 🏡
          </Link>
          <Link to="/about" className="cursor-pointer text-xl">
            About Us ✨
          </Link>
          <Link to="/contact" className="cursor-pointer text-xl">
            Contact Us 📧
          </Link>
          <div className="gap-7 flex flex-col text-xl">
            <h3 className="font-bold text-cyan-700 text-xl">
              CATEGORIES⚡️ :-
            </h3>
            <Link to="products/1">Mekhela Chador</Link>
            <Link to="products/2">Sarees</Link>
            <Link to="products/3">Lehengas</Link>
          </div>
        </div>
      </nav>
      {openCart && <Cart />}
    </div>
  );
}
