import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  const navItems = [
    { id: 1, text: 'Home'},
    { id: 2, text: 'Login'},
    { id: 3, text: 'Register' }
  ];

  return (
    <div className='bg-black text-white flex justify-between items-center h-24 max-w-full  px-4 '>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>To Do List Mern Stack</h1>

      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
          >
            {item.text}
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
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1>

        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;