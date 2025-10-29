import { useCurrency } from "../context/CurrencyContext";

export default function Price({ price }) {
  const { currency, usdRate, eurRate } = useCurrency();

  const aznPrice = Number(price) || 0; // Əsas valyuta AZN-dir

  const displayPrice =
    currency === "USD"
      ? (aznPrice / usdRate).toFixed(2)           // Manatdan dollara
      : currency === "EUR"
      ? (aznPrice / (usdRate / eurRate)).toFixed(2) // Manatdan avroya
      : aznPrice.toFixed(2);                      // Əgər AZN seçilibsə, olduğu kimi göstər

  return <span>{displayPrice} {currency}</span>;
}
