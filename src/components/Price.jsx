import { useCurrency } from "../context/CurrencyContext";

export default function Price({ price }) {
  const { currency, rate } = useCurrency();

  // price-i number tipinə çeviririk
  const usdPrice = Number(price) || 0;

  const displayPrice =
    currency === "AZN"
      ? (usdPrice * rate).toFixed(2)
      : usdPrice.toFixed(2);

  return <span>{displayPrice} {currency}</span>;
}
