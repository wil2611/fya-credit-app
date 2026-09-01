import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonToast,
} from "@ionic/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { CreateCreditRequest } from "../models/CreateCreditRequest";
import { createCredit } from "../services/creditService";

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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registrar crédito</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Nombre del cliente</IonLabel>
          <IonInput
            value={form.clientName}
            onIonInput={(event) =>
              setForm({
                ...form,
                clientName: event.detail.value ?? "",
              })
            }
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Cédula o ID</IonLabel>
          <IonInput
            value={form.clientDocument}
            onIonInput={(event) =>
              setForm({
                ...form,
                clientDocument: event.detail.value ?? "",
              })
            }
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Valor del crédito</IonLabel>
          <IonInput
            type="number"
            value={form.amount}
            onIonInput={(event) =>
              setForm({
                ...form,
                amount: Number(event.detail.value),
              })
            }
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Tasa de interés (%)</IonLabel>
          <IonInput
            type="number"
            value={form.interestRate}
            onIonInput={(event) =>
              setForm({
                ...form,
                interestRate: Number(event.detail.value),
              })
            }
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Plazo en meses</IonLabel>
          <IonInput
            type="number"
            value={form.termMonths}
            onIonInput={(event) =>
              setForm({
                ...form,
                termMonths: Number(event.detail.value),
              })
            }
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Comercial</IonLabel>
          <IonInput
            value={form.salesperson}
            onIonInput={(event) =>
              setForm({
                ...form,
                salesperson: event.detail.value ?? "",
              })
            }
          />
        </IonItem>

        {error && (
          <p style={{ marginTop: "16px" }}>
            {error}
          </p>
        )}

        <IonButton
          expand="block"
          onClick={handleSubmit}
          disabled={loading}
          className="ion-margin-top"
        >
          {loading ? "Registrando..." : "Registrar crédito"}
        </IonButton>

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