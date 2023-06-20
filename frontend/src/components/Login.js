import React, { useState } from "react";
import AuthWithForm from "./AuthWithForm.js";

const Login = ({ onLogin }) => {
  const [loginDataUser, setLoginDataUser] = useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setLoginDataUser((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({
      email: loginDataUser.email,
      password: loginDataUser.password,
    });
  }
  return (
    <div className="auth">
      <AuthWithForm
        name={"login"}
        title={"Вход"}
        buttonText={"Войти"}
        onSubmit={handleSubmit}
      >
        <input
          id="email"
          required
          type="email"
          autoComplete="email"
          className="auth__input auth__input_type_email"
          name="email"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          value={loginDataUser.email || ""}
          onChange={handleChange}
        />
        <span className="popup__error" id="email-error"></span>
        <input
          id="password"
          required
          type="password"
          autoComplete="password"
          className="auth__input auth__input_type_password"
          name="password"
          placeholder="Пароль"
          minLength="6"
          maxLength="200"
          value={loginDataUser.password || ""}
          onChange={handleChange}
        />
        <span className="popup__error" id="password-error"></span>
      </AuthWithForm>
    </div>
  );
};

export default Login;
