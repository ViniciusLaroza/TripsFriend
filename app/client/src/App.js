import "./App.css";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup";
import Axios from "axios";

function App() {
  const handleClickRegister = (values) => {
    Axios.post("http://localhost:3001/register", {
      nome: values.nome,
      idade: values.idade,
      sexo: values.sexo,
      email: values.email,
      password: values.password,
      telefone: values.telefone,
      country: values.country,
      cidade: values.cidade,
    }).then((response) => {
      console.log(response);
    });
  };

  const handleClickLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response.data);
      localStorage.setItem('userId', response.data.userId);
    });
  };


  const validationLogin = yup.object().shape({
    email: yup.string().email("Não é um email").required("Este campo é obrigatorio"),
    password: yup.string().min(8, "A senha deve ter 8 caracteres").required("Este campo é obrigatorio"),
  });

  const validationRegister = yup.object().shape({
    email: yup.string().email("Não é um email").required("Este campo é obrigatorio"),
    password: yup.string().min(8, "A senha deve ter 8 caracteres").required("Este campo é obrigatorio"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "As senhas não são iguais"),
  });

  return <div className="container">
    <h1>TripFriends</h1>
    <p>Conecte-se e encontre seus futuros amigos</p>
    <h2>Login</h2>
    <Formik
     initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
      <Form className="login-form"> 

        <div className="login-form-group">
  	      <Field name="email" className="form-field" placeholder="Email"/>
          <ErrorMessage component="span" name="email" className="form-error"></ErrorMessage>
        </div>

        <div className="login-form-group">
  	      <Field name="password" className="form-field" placeholder="Senha"/>
          <ErrorMessage component="span" name="password" className="form-error"></ErrorMessage>
        </div>
        <button className="button" type="submit">Login</button>
      </Form>
     </Formik>



    <h2>Cadastro</h2>
    <Formik
     initialValues={{}} onSubmit={handleClickRegister} validationSchema={validationRegister}>
      <Form className="login-form"> 

        <div className="login-form-group">
  	      <Field name="nome" className="form-field" placeholder="Nome Completo"/>
          <ErrorMessage component="span" name="nome" className="form-error"></ErrorMessage>
        </div>

        <div className="login-form-group">
  	      <Field name="idade" className="form-field" placeholder="Idade"/>
          <ErrorMessage component="span" name="idade" className="form-error"></ErrorMessage>
        </div>

        <div className="login-form-group">
  	      <Field name="sexo" className="form-field" placeholder="Sexo"/>
          <ErrorMessage component="span" name="sexo" className="form-error"></ErrorMessage>
        </div>

        <div className="login-form-group">
  	      <Field name="email" className="form-field" placeholder="Email"/>
          <ErrorMessage component="span" name="email" className="form-error"></ErrorMessage>
        </div>

        <div className="login-form-group">
  	      <Field name="password" className="form-field" placeholder="Senha"/>
          <ErrorMessage component="span" name="password" className="form-error"></ErrorMessage>
        </div>

        <div className="login-form-group">
  	      <Field name="confirmPassword" className="form-field" placeholder="Confirme Senha"/>
          <ErrorMessage component="span" name="confirmPassword" className="form-error"></ErrorMessage>
        </div>

        <div className="login-form-group">
  	      <Field name="telefone" className="form-field" placeholder="Telefone"/>
          <ErrorMessage component="span" name="telefone" className="form-error"></ErrorMessage>
        </div>

        <div className="login-form-group">
  	      <Field name="country" className="form-field" placeholder="País"/>
          <ErrorMessage component="span" name="country" className="form-error"></ErrorMessage>
        </div>

        <div className="login-form-group">
  	      <Field name="cidade" className="form-field" placeholder="Cidade"/>
          <ErrorMessage component="span" name="cidade" className="form-error"></ErrorMessage>
        </div>

        <button className="button" type="submit">Cadastrar</button>
      </Form>


     </Formik>
  </div>;
    
}

export default App;
