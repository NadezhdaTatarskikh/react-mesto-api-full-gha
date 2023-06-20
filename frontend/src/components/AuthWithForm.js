import React from "react";
import { Link } from "react-router-dom";

const AuthWithForm = ({
  name,
  title,
  children,
  buttonText,
  onSubmit,
  register,
}) => {
  return (
    <div className="auth">
      <form
        className={`auth__form auth__form_${name}" name="${name}`}
        onSubmit={onSubmit}
      >
        <h2 className="auth__title">{title}</h2>
        {children}
        <button className="auth__submit" type="submit" name="submit">
          {buttonText}
        </button>
      </form>
      {register && (
        <Link to="/sign-in" className="auth__login-hint">
          Уже зарегистрированы? Войти
        </Link>
      )}
    </div>
  );
};

export default AuthWithForm;
