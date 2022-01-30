import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const loginSubmit = async (e) => {
    e.preventDefault(); // xoa quay tron
    try {
      await axios.post("/user/login", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href="/"
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    //    .user>form>h2+input*2+.user__btn>button+Link
    <div className="user">
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={onChangeInput}
          placeholder='Email'
        />
        <input
          type="password"
          name="password"
          autoComplete="on"
          value={user.password}
          onChange={onChangeInput}
          placeholder='Password'
        />
        <div className="user__btn">
          <button>Login</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
