import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"

export default function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const navigate = useNavigate();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const userDetails = {
      name: name,
      email: email,
      password: password,
      location: address,
    };
    const response = await fetch("/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
    const json = await response.json();
    console.log(json);
    if (!json.sucess) {
      alert("enter your vaild information");
    } else {
      toast.success("you are successfully SignUp")
      setAddress("");
      setEmail("");
      setName("");
      setPassword("");
      navigate("/login");
    }
  };

  return (
    <div className="container mt-5 ">
      <Link to={"/"}>
        <Button sx={{ mb: 5 }}>
          <WestIcon />
        </Button>
      </Link>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            value={name}
            type="text"
            className="form-control"
            id="name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={email}
            className="form-control"
            id="exampleInputEmail1"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={password}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Address
          </label>
          <input
            value={address}
            type="address"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />
        </div>

        <button type="submit" className=" m-3 btn btn-primary">
          Signup
        </button>
        <Link to={"/login"} className="m-3 btn btn-danger">
          Already a User
        </Link>
      </form>
    </div>
  );
}
