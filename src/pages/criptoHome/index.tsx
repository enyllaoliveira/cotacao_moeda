import { FormEvent, useEffect, useState } from "react";
import styles from "./home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { CoinProps } from "../../interfaces/CoinProps";

export function CriptoHome() {
  const apiInstance = new useApi();
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [offset, setOffset] = useState(0);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const price = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const priceCompact = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: "compact",
  });

  async function getCoins() {
    try {
      const res = await apiInstance.getListCripto(offset);
      const formattedData = res.data.map((coin: CoinProps) => ({
        ...coin,
        formattedMarket: priceCompact.format(Number(coin.marketCapUsd)),
        formattedPrice: price.format(Number(coin.priceUsd)),
        formattedVolume: priceCompact.format(Number(coin.volumeUsd24Hr)),
      }));
      const listCoins = [...coins, ...formattedData];
      setCoins(listCoins);
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  useEffect(() => {
    getCoins();
  }, [offset]);

  function handleGetMoreCoins() {
    setOffset((listCoins) => listCoins + 10);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (input === "") return;
    navigate(`/criptoDetails/${input}`);
  }

  function handleSearchItem() {
    if (input === "") return;
    navigate(`/criptoDetails/${input}`);
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome da moeda... Ex Bitcoin"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" onClick={handleSearchItem}>
          Pesquisar
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Moeda</th>
            <th scope="col">Valor de mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coins) => (
            <tr key={coins.id} className={styles.tr}>
              <td className={styles.tdLabel} data-label="Rank">
                {" "}
                {coins.rank}
              </td>
              <td className={styles.tdLabel} data-label="Moeda">
              <div>
  <img
    className={styles.logo}
    alt="logo cripto"
    src={`https://assets.coincap.io/assets/icons/${coins.symbol.toLocaleLowerCase()}@2x.png`}
  />
  <Link to={`/criptoDetails/${coins.id}`} className={styles.noUnderline}>
    <div className={styles.group}>
      <span> {coins.name} </span> |{coins.symbol}
    </div>
  </Link>
</div>
              </td>
              <td className={styles.tdLabel} data-label="Valor de mercado">
                {" "}
                {coins.formattedMarket}
              </td>
              <td className={styles.tdLabel} data-label="Preço">
                {coins.formattedPrice}
              </td>
              <td className={styles.tdLabel} data-label="Volume">
                {" "}
                {coins.formattedVolume}
              </td>
              <td
                className={
                  Number(coins.changePercent24Hr) >= 0
                    ? styles.tdProfit
                    : styles.tdLoss
                }
                data-label="Mudança 24h"
              >
                {Number(coins.changePercent24Hr).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles.buttonMore} onClick={handleGetMoreCoins}>
        Carregar mais
      </button>
    </main>
  );
}
