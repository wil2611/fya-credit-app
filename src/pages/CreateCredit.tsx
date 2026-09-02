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
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (
      !form.clientName.trim() ||
      !form.clientDocument.trim() ||
      form.amount <= 0 ||
      form.interestRate < 0 ||
      form.interestRate > 100 ||
      form.termMonths <= 0 ||
      !form.salesperson.trim()
    ) {
      setError("Por favor completa correctamente todos los campos.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createCredit(form);

      setShowSuccess(true);

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch {
      setError("No fue posible registrar el crédito.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="create-credit-content">
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
                <IonInput
                  className="form-input"
                  fill="outline"
                  label="Nombre del cliente"
                  labelPlacement="stacked"
                  placeholder="Nombre completo"
                  value={form.clientName}
                  onIonInput={(event) =>
                    setForm({
                      ...form,
                      clientName: event.detail.value ?? "",
                    })
                  }
                />

                <IonInput
                  className="form-input"
                  fill="outline"
                  label="Cédula o ID"
                  labelPlacement="stacked"
                  placeholder="Número de identificación"
                  value={form.clientDocument}
                  onIonInput={(event) =>
                    setForm({
                      ...form,
                      clientDocument: event.detail.value ?? "",
                    })
                  }
                />
              </div>
            </section>

            <section className="form-section">
              <div className="form-section-title">
                <h2>Información del crédito</h2>
              </div>

              <div className="form-grid">
                <IonInput
                  className="form-input amount-input"
                  fill="outline"
                  type="number"
                  label="Valor del crédito"
                  labelPlacement="stacked"
                  placeholder="Ej. 5000000"
                  value={form.amount || ""}
                  onIonInput={(event) =>
                    setForm({
                      ...form,
                      amount: Number(event.detail.value),
                    })
                  }
                />

                <IonInput
                  className="form-input"
                  fill="outline"
                  type="number"
                  label="Tasa de interés (%)"
                  labelPlacement="stacked"
                  placeholder="Ej. 2"
                  value={form.interestRate || ""}
                  onIonInput={(event) =>
                    setForm({
                      ...form,
                      interestRate: Number(event.detail.value),
                    })
                  }
                />

                <IonInput
                  className="form-input"
                  fill="outline"
                  type="number"
                  label="Plazo en meses"
                  labelPlacement="stacked"
                  placeholder="Ej. 12"
                  value={form.termMonths || ""}
                  onIonInput={(event) =>
                    setForm({
                      ...form,
                      termMonths: Number(event.detail.value),
                    })
                  }
                />
              </div>
            </section>

            <section className="form-section">
              <div className="form-section-title">
                <h2>Información comercial</h2>
              </div>

              <IonInput
                className="form-input"
                fill="outline"
                label="Comercial que registra el crédito"
                labelPlacement="stacked"
                placeholder="Nombre del comercial"
                value={form.salesperson}
                onIonInput={(event) =>
                  setForm({
                    ...form,
                    salesperson: event.detail.value ?? "",
                  })
                }
              />
            </section>

            {error && (
              <div className="form-error" role="alert">
                {error}
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
