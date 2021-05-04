import Head from "next/head";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function Contact() {
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const sendEmail = async (props) => {
    const contactFormBtn = document.getElementById("contact-form-btn");
    contactFormBtn.classList.add("disable-click");
    sending();
    props["to"] = "enquiries@bendando.com";
    props["website"] = "tenantshub.co.uk";
    const response = await fetch(
      "https://sendgridcsharp.azurewebsites.net/api/sendemail",
      {
        method: "POST",
        contentType: "application/json",
        body: JSON.stringify(props),
      }
    );
    try {
      let bodyresponse = await response.json();
      if (
        response.status === 200 &&
        bodyresponse.message != null &&
        bodyresponse.message == "Email Sent"
      ) {
        responseSuccess();
      } else {
        responseError();
      }
    } catch (err) {
      responseError();
    }
  };

  function sending() {
    const feedback = document.getElementById("feedback");
    let feedbackText = document.getElementById("feedback-text");
    feedback.classList.add("pop-down");
    feedbackText.classList.add("fade-in");
    setTimeout(function () {
      feedback.classList.remove("pop-down");
      feedbackText.classList.add("fade-out");
      feedback.classList.add("pop-up");
    }, 1500);
    setTimeout(function () {
      feedback.classList.remove("pop-up");
      feedbackText.classList.remove("fade-out", "fade-in");
    }, 2500);
  }

  function responseSuccess() {
    setTimeout(function () {
      const contactFormBtn = document.getElementById("contact-form-btn");
      const response = document.getElementById("response");
      let responseText = document.getElementById("response-text");
      response.classList.add("pop-down", "message-sent");
      responseText.classList.add("fade-in");
      responseText.innerHTML = "Message Sent";
      contactFormBtn.classList.remove("disable-click");
    }, 2500);
  }

  function responseError() {
    setTimeout(function () {
      const contactFormBtn = document.getElementById("contact-form-btn");
      const response = document.getElementById("response");
      let responseText = document.getElementById("response-text");
      response.classList.add("pop-down", "message-error");
      responseText.classList.add("fade-in");
      responseText.innerHTML = "Error - Please Try Again";
      contactFormBtn.classList.remove("disable-click");
    }, 2500);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100vw" }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.8,
        },
      }}
    >
      <Head>
        <title>Contact | Marisol Corona</title>
      </Head>
      <div className="header contact">
        <div className="text-center intro">
          <h1 className="mb-3">Contact Marisol Corona</h1>
        </div>
      </div>
      {/* Start of Container */}
      <div className="container">
        {/* Section */}
        <div className="row my-5 justify-content-evenly py-5">
          <div className="col-md-6" data-aos="fade-up">
            <ul className="mb-5">
              <li>
                <h4 className="mb-3">SESIÓN ONLINE</h4>
                <p>¿Cómo funciona?</p>
              </li>
              <li>
                <h4 className="mb-3">RESERVA TU CITA</h4>
                <p>
                  A través de la web, por email: info@marisolcorona.com o al
                  teléfono +7539390244.
                </p>
              </li>
              <li>
                <h4 className="mb-3">PAGA ONLINE</h4>
                <p>
                  A través de nuestra web con nuestra pasarela de pago segura.
                </p>
              </li>
              <li>
                <h4 className="mb-3">CONFIRMACIÓN </h4>
                <p>
                  Recibirás un correo electrónico con los pasos a seguir para la
                  sesión online.
                </p>
              </li>
              <li>
                <h4 className="mb-3">SKYPE O ZOOM</h4>
                <p>Añade esta cuenta a tu Skype: corona.marisol_1</p>
              </li>
            </ul>
          </div>
          <div className="col-md-4" data-aos="fade-up">
            <div className="contact_form shadow-5">
              {
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    message: "",
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={(values) => {
                    sendEmail(values);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form id="contact_form">
                      <h2 className="text-center mb-4">Escríbenos</h2>
                      <hr />
                      <div className="row">
                        <div>
                          <i className="fas fa-user me-2"></i>
                        </div>
                        <Field
                          type="text"
                          name="name"
                          placeholder="Tu nombre"
                          className="form-label px-3"
                          htmlFor="form4Example1"
                        />
                        {errors.name && touched.name ? (
                          <div className="error-validation">*{errors.name}</div>
                        ) : null}
                        <div>
                          <i className="fas fa-envelope prefix me-2"></i>
                        </div>
                        <Field
                          name="email"
                          type="email"
                          id="email"
                          placeholder="Tu correo electrónico"
                          className="form-label px-3"
                        />
                        {errors.email && touched.email ? (
                          <div className="error-validation">
                            *{errors.email}
                          </div>
                        ) : null}
                        <div>
                          <i className="fas fa-pencil-alt me-2"></i>
                        </div>
                        <div className="col-sm-12">
                          <Field
                            type="textarea"
                            as="textarea"
                            name="message"
                            type="message"
                            id="message"
                            placeholder="Tu mensaje"
                            className="w-100 form-label px-3"
                            rows="5"
                          />
                          {errors.message && touched.message ? (
                            <div className="error-validation">
                              *{errors.message}
                            </div>
                          ) : null}
                          <div id="feedback">
                            <p id="feedback-text">Sending...</p>
                          </div>
                          <div id="response">
                            <p id="response-text"></p>
                          </div>
                          <div className="text-center">
                            <button
                              className="btn text-white pink-btn mt-3"
                              type="submit"
                              id="contact-form-btn"
                            >
                              Send
                            </button>
                          </div>
                          <div id="msg"></div>
                          <hr />
                          <p className="text-center">
                            Todos los campos son obligatorios
                          </p>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              }
            </div>
            {/* <form>
              <h2 className="text-center mb-4">Escríbenos</h2>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form4Example1">
                  <i className="fas fa-user me-2"></i>
                  Tu nombre
                </label>
                <input
                  type="text"
                  id="form4Example1"
                  className="form-control"
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form4Example2">
                  <i className="fas fa-envelope prefix grey-text me-2"></i>
                  Tu correo electrónico
                </label>
                <input
                  type="email"
                  id="form4Example2"
                  className="form-control"
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form4Example3">
                  <i className="fas fa-envelope me-2"></i>
                  Tu mensaje
                </label>
                <textarea
                  className="form-control"
                  id="form4Example3"
                  rows="4"
                ></textarea>
              </div>

              <div className="form-check d-flex justify-content-center mb-4">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  value=""
                  id="form4Example4"
                />
                <label className="form-check-label" htmlFor="form4Example4">
                  Suscríbeme al boletín
                </label>
              </div>
              <div className="row justify-content-center">
                <button
                  id={styles.headerButtonPink}
                  className="btn mx-2 mt-4 py-3 px-5 text-white"
                  href=""
                  role="button"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
