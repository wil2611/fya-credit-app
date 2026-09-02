import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonInput,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSpinner,
} from "@ionic/react";
import {
  addOutline,
  briefcaseOutline,
  calendarOutline,
  refreshOutline,
  searchOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import fyaLogo from "../assets/fya-logo.png";
import type { Credit } from "../models/Credit";
import type { CreditFilters } from "../services/creditService";
import { getCredits } from "../services/creditService";

import "./Home.css";

const Home: React.FC = () => {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [clientName, setClientName] = useState("");
  const [clientDocument, setClientDocument] = useState("");
  const [salesperson, setSalesperson] = useState("");

  const [sortBy, setSortBy] =
    useState<"amount" | "createdAt">("createdAt");

  const [sortOrder, setSortOrder] =
    useState<"asc" | "desc">("desc");

  const navigate = useNavigate();

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

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("es-CO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));

  return (
    <IonPage>
      <IonContent fullscreen className="fya-content">
        <div
          slot="fixed"
          className="status-bar-background"
          aria-hidden="true"
        />

        <div className="fya-container">
          <header className="brand-header">
            <div className="header-main">
              <img
                src={fyaLogo}
                alt="FYA Social Capital"
                className="fya-logo"
              />

              <div className="page-heading">
                <h1>Créditos</h1>
                <p>Consulta y gestiona los créditos de tus clientes.</p>
              </div>
            </div>

            <IonButton
              className="register-button"
              onClick={() => navigate("/credits/new")}
            >
              <IonIcon slot="start" icon={addOutline} />
              Registrar crédito
            </IonButton>
          </header>

          <section className="filters-section">
            <div className="section-title">
              <h2>Filtros</h2>
              <p>Busca por cliente, documento o comercial.</p>
            </div>

            <IonCard className="filter-card">
              <IonCardContent>
                <div className="filter-grid">
                  <IonInput
                    className="fya-input"
                    fill="outline"
                    label="Nombre del cliente"
                    labelPlacement="stacked"
                    placeholder="Ej. Pepito Pérez"
                    value={clientName}
                    onIonInput={(event) =>
                      setClientName(event.detail.value ?? "")
                    }
                  />

                  <IonInput
                    className="fya-input"
                    fill="outline"
                    label="Cédula o ID"
                    labelPlacement="stacked"
                    placeholder="Número de identificación"
                    value={clientDocument}
                    onIonInput={(event) =>
                      setClientDocument(event.detail.value ?? "")
                    }
                  />

                  <IonInput
                    className="fya-input salesperson-field"
                    fill="outline"
                    label="Comercial"
                    labelPlacement="stacked"
                    placeholder="Nombre del comercial"
                    value={salesperson}
                    onIonInput={(event) =>
                      setSalesperson(event.detail.value ?? "")
                    }
                  />

                  <IonSelect
                    className="fya-input"
                    fill="outline"
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

                  <IonSelect
                    className="fya-input"
                    fill="outline"
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

                  <div className="filter-actions">
                    <IonButton
                      fill="clear"
                      className="clear-button"
                      onClick={handleClearFilters}
                    >
                      <IonIcon slot="start" icon={refreshOutline} />
                      Limpiar
                    </IonButton>

                    <IonButton
                      className="search-button"
                      onClick={handleSearch}
                      disabled={loading}
                    >
                      <IonIcon slot="start" icon={searchOutline} />
                      Buscar
                    </IonButton>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          </section>

          <section className="credits-section">
            <div className="section-title section-title-results">
              <h2>Resultados</h2>
              <p>
                {credits.length === 1
                  ? "1 registro encontrado"
                  : `${credits.length} registros encontrados`}
              </p>
            </div>

            {loading && (
              <div className="state-container">
                <IonSpinner name="crescent" />
                <p>Cargando créditos...</p>
              </div>
            )}

            {error && (
              <div className="error-state">
                <p>{error}</p>
                <IonButton
                  fill="outline"
                  onClick={() => loadCredits()}
                >
                  Intentar nuevamente
                </IonButton>
              </div>
            )}

            {!loading && !error && credits.length === 0 && (
              <div className="empty-state">
                <p>No se encontraron créditos.</p>
              </div>
            )}

            {!loading && !error && credits.length > 0 && (
              <div className="credits-list">
                {credits.map((credit) => (
                  <IonCard
                    key={credit.id}
                    className="credit-card"
                  >
                    <IonCardContent>
                      <div className="credit-top">
                        <div className="credit-main-info">
                          <h3>{credit.clientName}</h3>
                          <p className="credit-document">
                            Documento: {credit.clientDocument}
                          </p>
                        </div>

                        <div className="credit-amount-group">
                          <span>Valor del crédito</span>
                          <strong className="credit-amount">
                            {formatCurrency(credit.amount)}
                          </strong>
                        </div>
                      </div>

                      <div className="credit-middle">
                        <div className="credit-detail">
                          <span>Plazo</span>
                          <strong>{credit.termMonths} meses</strong>
                        </div>
                        <div className="credit-detail">
                          <span>Tasa de interés</span>
                          <strong>{credit.interestRate}%</strong>
                        </div>
                      </div>

                      <div className="credit-footer">
                        <div>
                          <IonIcon icon={briefcaseOutline} />
                          <span>{credit.salesperson}</span>
                        </div>

                        <div>
                          <IonIcon icon={calendarOutline} />
                          <span>{formatDate(credit.createdAt)}</span>
                        </div>
                      </div>
                    </IonCardContent>
                  </IonCard>
                ))}
              </div>
            )}
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
