import { useState } from "react";
import AuthWithForm from "./AuthWithForm";

const Register = ({ onRegister }) => {
  const [registrationValues, setRegistrationValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setRegistrationValues({
      ...registrationValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    onRegister(registrationValues);
  };

  return (
    <div className="auth">
      <AuthWithForm
        name={"login"}
        title={"Регистрация"}
        buttonText={"Зарегистрироваться"}
        onSubmit={handleSubmit}
        register
      >
        <input
          id="email"
          required
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          minLength="2"
          maxLength="20"
          className="auth__input auth__input_type_email"
          value={registrationValues.email}
          onChange={handleChange}
        />
        <span className="popup__error" id="email-error"></span>
        <input
          id="password"
          required
          type="password"
          name="password"
          placeholder="Пароль"
          autoComplete="password"
          minLength="6"
          maxLength="20"
          className="auth__input auth__input_type_password"
          value={registrationValues.password}
          onChange={handleChange}
        />
        <span className="popup__error" id="password-error"></span>
      </AuthWithForm>
    </div>
  );
};

export default Register;
