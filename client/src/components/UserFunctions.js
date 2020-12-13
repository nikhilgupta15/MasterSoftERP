import axios from "axios";

export const register = (newUser) => {
  return axios
    .post("http://localhost:5000/users/register", {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      secQues: newUser.secQues,
      secAns: newUser.secAns,
    })
    .then((response) => {
      console.log("Registered");
    });
};

export const login = (user) => {
  return axios
    .post("http://localhost:5000/users/login", {
      email: user.email,
      password: user.password,
    })
    .then((response) => {
      if (
        response.data !== "Password does not match" ||
        response.data !== "User does not exist"
      ) {
        localStorage.setItem("usertoken", response.data);
        return response.data;
      } else {
        return response.data;
      }
    });
};