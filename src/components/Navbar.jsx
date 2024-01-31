import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  const Links = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Login", link: "/login" },
    { id: 3, name: "Register", link: "/register" },
  ];
  return (
    <div className='bg-black text-white flex justify-between items-center h-24 max-w-full  px-4 '>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>To Do List Mern Stack</h1>

      <ul className='hidden md:flex'>
        {Links.map(item => (
          <li
            key={item.id}
            className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
          >
            <Link key={item.id} to={item.link}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>To Do List</h1>

        {Links.map(item => (
          <li
            key={item.id}
            className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
          >
            <Link key={item.id} to={item.link}>
              {item.name}
            </Link>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;