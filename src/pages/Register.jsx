import { useState } from "react"
import Navbar from "../components/Navbar"

const Register = () => {
  const [newUser,setNewUser] = useState({
    username : "",
    email : "",
    password : "",
  })
  console.log(newUser);

  const register = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(newUser);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/register",
          requestOptions
        );
        const result = await response.text();
        console.log(result);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchData();
  };
  return (
    <>
      <Navbar />
      <div className="bg-white mt-40 rounded-2xl shadow-2xl flex flex-col w-full justify-center items-center transition duration-1000 ease-out">
        <h2 className="p-3 text-3xl font-bold text-pink-400">
          Welcome To MIRA
        </h2>
        <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
        <h3 className="text-xl font-semibold text-blue-400 pt-2">Sign Up!</h3>
        {/* Inputs */}
        <div className="flex flex-col items-center justify-center">
        <input
            type="username"
            value={newUser.username}
            onChange={(e) => setNewUser({...newUser,username:e.target.value})}
            className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
            placeholder="Email"
          ></input>
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser,email:e.target.value})}
            className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
            placeholder="Email"
          ></input>
          <input
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({...newUser,password:e.target.value})}
            className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
            placeholder="Password"
          ></input>
          <button
            onClick={register}
            className="rounded-2xl m-2 text-white bg-blue-400 w-2/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in"
          >
            Sign Up
          </button>
        </div>
        <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
      </div>
    </>
  )
}

export default Register