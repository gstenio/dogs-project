import React from "react";
import { Link } from "react-router-dom";
import Input from "../../Forms/Input/Input";
import Button from "../../Forms/Button/Button";
import useForm from "../../../Hooks/useForm";
import { UserContext } from "../../../UserContext";
import Error from "../../Helper/Error";
import styles from "./Form.module.css";
import stylesBtn from "../../Forms/Button/Button.module.css";

const Form = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    // O fetch() só vai ocorrer após a validação dos campos de usuário e senha
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Campo de usuário */}
        <Input label="Usuário" type="text" name="username" {...username} />
        {/* Campo de senha */}
        <Input label="Senha" type="password" name="password" {...password} />

        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error} />
      </form>

      <Link className={styles.lost} to="/login/perdeu">
        Perdeu a senha?
      </Link>
      <div className={styles.register}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site</p>
      </div>
      <Link className={stylesBtn.button} to="/login/criar">
        Cadastro
      </Link>
    </section>
  );
};

export default Form;
