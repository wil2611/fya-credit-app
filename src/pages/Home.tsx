import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Credit } from "../models/Credit";
import { getCredits } from "../services/creditService";
import type { CreditFilters } from "../services/creditService";

const Home: React.FC = () => {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [clientDocument, setClientDocument] = useState("");
  const [salesperson, setSalesperson] = useState("");
  const [sortBy, setSortBy] = useState<"amount" | "createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const loadCredits = async (filters: CreditFilters = {}) => {
    try {
      setLoading(true);
      setError("");

      const data = await getCredits(filters);

      setCredits(data);
    } catch {
      setError("No fue posible cargar los créditos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCredits();
  }, []);

  const handleSearch = () => {
    loadCredits({
      clientName,
      clientDocument,
      salesperson,
      sortBy,
      sortOrder,
    });
  };

  const handleClearFilters = () => {
    setClientName("");
    setClientDocument("");
    setSalesperson("");
    setSortBy("createdAt");
    setSortOrder("desc");

    loadCredits();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Créditos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton
          expand="block"
          onClick={() => navigate("/credits/new")}
          className="ion-margin-bottom"
        >
          Registrar crédito
        </IonButton>
        <IonItem>
          <IonInput
            label="Nombre del cliente"
            labelPlacement="stacked"
            value={clientName}
            onIonInput={(event) =>
              setClientName(event.detail.value ?? "")
            }
          />
        </IonItem>

        <IonItem>
          <IonInput
            label="Cédula o ID"
            labelPlacement="stacked"
            value={clientDocument}
            onIonInput={(event) =>
              setClientDocument(event.detail.value ?? "")
            }
          />
        </IonItem>

        <IonItem>
          <IonInput
            label="Comercial"
            labelPlacement="stacked"
            value={salesperson}
            onIonInput={(event) =>
              setSalesperson(event.detail.value ?? "")
            }
          />
        </IonItem>

        <IonItem>
          <IonSelect
            label="Ordenar por"
            labelPlacement="stacked"
            value={sortBy}
            onIonChange={(event) =>
              setSortBy(event.detail.value)
            }
          >
            <IonSelectOption value="createdAt">
              Fecha
            </IonSelectOption>

            <IonSelectOption value="amount">
              Valor del crédito
            </IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonSelect
            label="Orden"
            labelPlacement="stacked"
            value={sortOrder}
            onIonChange={(event) =>
              setSortOrder(event.detail.value)
            }
          >
            <IonSelectOption value="desc">
              Descendente
            </IonSelectOption>

            <IonSelectOption value="asc">
              Ascendente
            </IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonButton
          expand="block"
          onClick={handleSearch}
          className="ion-margin-top"
        >
          Buscar
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          onClick={handleClearFilters}
        >
          Limpiar filtros
        </IonButton>

        {loading && <IonSpinner />}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <IonList>
            {credits.map((credit) => (
              <IonItem key={credit.id}>
                <IonLabel>
                  <h2>{credit.clientName}</h2>

                  <p>
                    ${credit.amount.toLocaleString("es-CO")}
                  </p>

                  <p>
                    {credit.termMonths} meses · {credit.interestRate}%
                  </p>

                  <p>Comercial: {credit.salesperson}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;