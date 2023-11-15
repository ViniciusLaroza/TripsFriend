import React from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import axios from 'axios';
import "./App.css";

function CreateTrip() {
  const handleCreateTrip = (values) => {
    const criador = localStorage.getItem('userId');
    try {
      axios.post("http://localhost:3001/trips", {
        data_inicio: values.dataInicio,
        data_fim: values.dataFim,
        criador: criador,
        país: values.país,
        cidade: values.cidade,
        local_hospedagem: values.localHospedagem,
      });
      handleReload();
      console.log(localStorage.getItem('userId'));
    } catch (error) {
      console.error('Erro ao criar viagem:', error);
    }
  };

  const handleReload = () => {
    window.location.reload();
  }

  return (
    <div className="container">
      <h1>Criar Viagem</h1>
      <Formik
      initialValues={{}}
      onSubmit={handleCreateTrip}
      >
        <Form className="login-form">
            <div className="login-form-group">
              <label>Data de Início:</label>
              <Field name="dataInicio" className="form-field" placeholder="Data de Inicio"/>
              <ErrorMessage component="span" name="dataInicio" className="form-error"></ErrorMessage>
            </div>
            <div className="login-form-group">
              <label>Data de Fim:</label>
              <Field name="dataFim" className="form-field" placeholder="Data de Fim"/>
              <ErrorMessage component="span" name="dataFim" className="form-error"></ErrorMessage>
            </div>
            <div className="login-form-group">
              <label>País:</label>
              <Field name="país" className="form-field" placeholder="País"/>
              <ErrorMessage component="span" name="país" className="form-error"></ErrorMessage>
            </div>
            <div className="login-form-group">
              <label>Cidade:</label>
              <Field name="cidade" className="form-field" placeholder="Cidade"/>
              <ErrorMessage component="span" name="cidade" className="form-error"></ErrorMessage>
            </div>
            <div className="login-form-group">
              <label>Local Hospedagem:</label>
              <Field name="localHospedagem" className="form-field" placeholder="Local Hospedagem"/>
              <ErrorMessage component="span" name="localHospedagem" className="form-error"></ErrorMessage>
            </div>

            <button className="button" type="submit">Cadastrar Viagem</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateTrip;