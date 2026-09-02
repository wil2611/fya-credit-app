import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonPage,
  IonSpinner,
  IonToast,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import fyaLogo from "../assets/fya-logo.png";
import type { CreateCreditRequest } from "../models/CreateCreditRequest";
import { createCredit } from "../services/creditService";

import "./CreateCredit.css";

type FormErrors = Partial<
  Record<keyof CreateCreditRequest, string>
>;

const nameRegex = /^[\p{L}.' -]+$/u;
const documentRegex = /^\d+$/;

const CreateCredit: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateCreditRequest>({
    clientName: "",
    clientDocument: "",
    amount: 0,
    interestRate: 0,
    termMonths: 0,
    salesperson: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");

  const blockInvalidNumberKeys = (
    event: React.KeyboardEvent<HTMLIonInputElement>
  ) => {
    if (["e", "E", "+", "-"].includes(event.key)) {
      event.preventDefault();
    }
  };

  const validateForm = () => {
    const errors: FormErrors = {};

    if (!form.clientName.trim()) {
      errors.clientName = "El nombre del cliente es obligatorio.";
    } else if (form.clientName.trim().length > 120) {
      errors.clientName = "El nombre no puede superar 120 caracteres.";
    } else if (!nameRegex.test(form.clientName.trim())) {
      errors.clientName =
        "El nombre solo puede contener letras, espacios, guiones y apóstrofes.";
    }

    if (!form.clientDocument.trim()) {
      errors.clientDocument = "La cédula o ID es obligatoria.";
    } else if (form.clientDocument.trim().length > 30) {
      errors.clientDocument = "El documento no puede superar 30 caracteres.";
    } else if (!documentRegex.test(form.clientDocument.trim())) {
      errors.clientDocument =
        "La cédula o ID debe contener únicamente números.";
    }

    if (!Number.isFinite(form.amount) || form.amount <= 0) {
      errors.amount = "El valor del crédito debe ser mayor a $0.";
    }

    if (
      !Number.isFinite(form.interestRate) ||
      form.interestRate < 0 ||
      form.interestRate > 100
    ) {
      errors.interestRate =
        "La tasa de interés debe estar entre 0% y 100%.";
    }

    if (
      !Number.isInteger(form.termMonths) ||
      form.termMonths < 1 ||
      form.termMonths > 600
    ) {
      errors.termMonths =
        "El plazo debe ser un número entero entre 1 y 600 meses.";
    }

    if (!form.salesperson.trim()) {
      errors.salesperson = "El nombre del comercial es obligatorio.";
    } else if (form.salesperson.trim().length > 120) {
      errors.salesperson =
        "El nombre del comercial no puede superar 120 caracteres.";
    } else if (!nameRegex.test(form.salesperson.trim())) {
      errors.salesperson =
        "El nombre del comercial contiene caracteres no válidos.";
    }

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setSubmitError("");

      await createCredit(form);

      setShowSuccess(true);

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch {
      setSubmitError(
        "No fue posible registrar el crédito. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="create-credit-content">
        <div
          slot="fixed"
          className="status-bar-background"
          aria-hidden="true"
        />

        <div className="create-credit-container">
          <header className="create-credit-header">
            <div className="create-credit-header-main">
              <img
                src={fyaLogo}
                alt="FYA Social Capital"
                className="create-credit-logo"
              />

              <div className="create-credit-heading">
                <h1>Registrar crédito</h1>
                <p>Completa la información del cliente y del crédito.</p>
              </div>
            </div>

            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/home")}
            >
              <IonIcon icon={arrowBackOutline} />
              Volver a créditos
            </button>
          </header>

          <form
            aria-busy={loading}
            className="credit-form"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <section className="form-section">
              <div className="form-section-title">
                <h2>Datos del cliente</h2>
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <IonInput
                    className="form-input"
                    fill="outline"
                    maxlength={120}
                    label="Nombre del cliente"
                    labelPlacement="stacked"
                    placeholder="Nombre completo"
                    value={form.clientName}
                    onIonInput={(event) => {
                      setForm({
                        ...form,
                        clientName: event.detail.value ?? "",
                      });

                      setFieldErrors({
                        ...fieldErrors,
                        clientName: undefined,
                      });
                    }}
                  />

                  {fieldErrors.clientName && (
                    <span className="field-error">
                      {fieldErrors.clientName}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <IonInput
                    className="form-input"
                    fill="outline"
                    inputmode="numeric"
                    maxlength={30}
                    label="Cédula o ID"
                    labelPlacement="stacked"
                    placeholder="Número de identificación"
                    value={form.clientDocument}
                    onIonInput={(event) => {
                      setForm({
                        ...form,
                        clientDocument: event.detail.value ?? "",
                      });

                      setFieldErrors({
                        ...fieldErrors,
                        clientDocument: undefined,
                      });
                    }}
                  />

                  {fieldErrors.clientDocument && (
                    <span className="field-error">
                      {fieldErrors.clientDocument}
                    </span>
                  )}
                </div>
              </div>
            </section>

            <section className="form-section">
              <div className="form-section-title">
                <h2>Información del crédito</h2>
              </div>

              <div className="form-grid">
                <div className="form-field amount-input">
                  <IonInput
                    className="form-input"
                    fill="outline"
                    type="number"
                    min="0.01"
                    step="0.01"
                    inputmode="decimal"
                    label="Valor del crédito"
                    labelPlacement="stacked"
                    placeholder="Ej. 5000000"
                    value={form.amount || ""}
                    onKeyDown={blockInvalidNumberKeys}
                    onIonInput={(event) => {
                      setForm({
                        ...form,
                        amount: Number(event.detail.value),
                      });

                      setFieldErrors({
                        ...fieldErrors,
                        amount: undefined,
                      });
                    }}
                  />

                  {fieldErrors.amount && (
                    <span className="field-error">
                      {fieldErrors.amount}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <IonInput
                    className="form-input"
                    fill="outline"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    inputmode="decimal"
                    label="Tasa de interés (%)"
                    labelPlacement="stacked"
                    placeholder="Ej. 2"
                    value={form.interestRate || ""}
                    onKeyDown={blockInvalidNumberKeys}
                    onIonInput={(event) => {
                      setForm({
                        ...form,
                        interestRate: Number(event.detail.value),
                      });

                      setFieldErrors({
                        ...fieldErrors,
                        interestRate: undefined,
                      });
                    }}
                  />

                  {fieldErrors.interestRate && (
                    <span className="field-error">
                      {fieldErrors.interestRate}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <IonInput
                    className="form-input"
                    fill="outline"
                    type="number"
                    min="1"
                    max="600"
                    step="1"
                    inputmode="numeric"
                    label="Plazo en meses"
                    labelPlacement="stacked"
                    placeholder="Ej. 12"
                    value={form.termMonths || ""}
                    onKeyDown={blockInvalidNumberKeys}
                    onIonInput={(event) => {
                      setForm({
                        ...form,
                        termMonths: Number(event.detail.value),
                      });

                      setFieldErrors({
                        ...fieldErrors,
                        termMonths: undefined,
                      });
                    }}
                  />

                  {fieldErrors.termMonths && (
                    <span className="field-error">
                      {fieldErrors.termMonths}
                    </span>
                  )}
                </div>
              </div>
            </section>

            <section className="form-section">
              <div className="form-section-title">
                <h2>Información comercial</h2>
              </div>

              <div className="form-field">
                <IonInput
                  className="form-input"
                  fill="outline"
                  maxlength={120}
                  label="Comercial que registra el crédito"
                  labelPlacement="stacked"
                  placeholder="Nombre del comercial"
                  value={form.salesperson}
                  onIonInput={(event) => {
                    setForm({
                      ...form,
                      salesperson: event.detail.value ?? "",
                    });

                    setFieldErrors({
                      ...fieldErrors,
                      salesperson: undefined,
                    });
                  }}
                />

                {fieldErrors.salesperson && (
                  <span className="field-error">
                    {fieldErrors.salesperson}
                  </span>
                )}
              </div>
            </section>

            {submitError && (
              <div className="form-error" role="alert">
                {submitError}
              </div>
            )}

            <div className="form-actions">
              <IonButton
                type="button"
                fill="clear"
                className="cancel-button"
                disabled={loading}
                onClick={() => navigate("/home")}
              >
                Cancelar
              </IonButton>

              <IonButton
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading && (
                  <IonSpinner
                    slot="start"
                    name="crescent"
                  />
                )}

                {loading ? "Registrando..." : "Registrar crédito"}
              </IonButton>
            </div>
          </form>
        </div>

        <IonToast
          isOpen={showSuccess}
          message="Crédito registrado correctamente"
          duration={1000}
        />
      </IonContent>
    </IonPage>
  );
};

export default CreateCredit;
