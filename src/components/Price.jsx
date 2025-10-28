import { useCurrency } from "../context/CurrencyContext";

export default function Price({ price }) {
  const { currency, usdRate, eurRate } = useCurrency();

  const usdPrice = Number(price) || 0;
 

  const displayPrice =
    currency === "AZN"
      ? (usdPrice * usdRate).toFixed(2)
      : currency === "EUR"
      ? (usdPrice * (usdRate / eurRate)).toFixed(2)
      : usdPrice.toFixed(2);

  return <span>{displayPrice} {currency}</span>;
}
