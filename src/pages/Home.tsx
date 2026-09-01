import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";

import type { Credit } from "../models/Credit";
import { getCredits } from "../services/creditService";

const Home: React.FC = () => {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCredits = async () => {
      try {
        const data = await getCredits();
        setCredits(data);
      } catch {
        setError("No fue posible cargar los créditos.");
      } finally {
        setLoading(false);
      }
    };

    loadCredits();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Créditos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
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