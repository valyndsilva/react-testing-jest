import axios from "axios";
import React, { useState } from "react";

function Login() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      setUser(data); // test user should be rendered after fetching by commenting this
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col w-full h-[100vh] items-center justify-center">
      <form className="flex flex-col items-center">
        <span className="text-black font-bold">{user.name}</span>
        <input
          className="p-2 my-2 h-8 border rounded-md"
          type="text"
          placeholder="username"
          //   value="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="p-2 my-2 h-8 border rounded-md"
          type="password"
          placeholder="password"
          //   value="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          //   disabled="true"
          disabled={!username || !password}
          className="w-36 h-7 bg-teal-600 text-white border-none font-bold m-2  cursor-pointer rounded-md disabled:bg-teal-300 disabled:cursor-not-allowed"
          onClick={handleClick}
        >
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>
      <span
        data-testid="error"
        style={{ visibility: error ? "visible" : "hidden" }}
        className="text-red-400 mt-5"
      >
        Something went wrong!
      </span>
    </div>
  );
}

export default Login;
