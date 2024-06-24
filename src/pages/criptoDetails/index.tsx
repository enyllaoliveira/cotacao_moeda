import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CoinProps } from "../../interfaces/CoinProps";
import styles from './detail.module.css'

interface ResponseData {
  status: "success";
  data: CoinProps;
}

interface ErrorData {
  status: "error";
  error: string;
}

type DataProps = ResponseData | ErrorData;

interface CoinData extends CoinProps {
  formattedMarket: string;
  formattedPrice: string;
  formattedVolume: string;
}

export function CriptoDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [coins, setCoins] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCoin() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}assets/${id}`
        );
        const data: DataProps = await response.json();

        if (data.status === "error") {
          navigate("/");
          return;
        }

        const price = Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const priceCompact = Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          notation: "compact",
        });

        const resultData: CoinData = {
          ...data.data,
          formattedMarket: priceCompact.format(Number(data.data.marketCapUsd)),
          formattedPrice: price.format(Number(data.data.priceUsd)),
          formattedVolume: priceCompact.format(Number(data.data.volumeUsd24Hr)),
        };

        setCoins(resultData);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        navigate("/");
      }
    }

    getCoin();
  }, [id, navigate]);

  if (loading || !coins) {
    return (
      <div className={styles.container}>
        <h4 className={styles.center}> Carregando...</h4>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.center}>Nome da Criptomoeda: {coins?.name}</h1>
      <h1 className={styles.center}>{coins?.symbol}</h1>
      <section className={styles.center}>
        <img
          src={`https://assets.coincap.io/assets/icons/${coins?.symbol.toLocaleLowerCase()}@2x.png`}
          alt="Logo Moedas"
          className={styles.logo}
        />
        <p>
          <strong>Preço:</strong> {coins?.formattedPrice}
        </p>
        <p>
          <strong> Mercado:</strong> {coins?.formattedMarket}
        </p>
        <p>
          <strong> Volume:</strong> {coins?.formattedVolume}
        </p>
        <p>
          <strong> Mudança 24h:</strong>{" "}
          <span
            className={
              Number(coins?.changePercent24Hr) > 0
                ? styles.tdProfit
                : styles.tdLoss
            }
          >
            {Number(coins?.changePercent24Hr).toFixed(2)}%
          </span>
        </p>

      </section>
    </div>
  );
}
