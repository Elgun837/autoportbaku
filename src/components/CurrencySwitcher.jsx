import { useState } from "react";
import { useCurrency } from "../context/CurrencyContext";
import "../assets/styles/Currency.scss"; // eyni SCSS-dən istifadə edə bilərsən

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const currencies = [
    { code: "AZN", label: "AZN", icon: "₼" }, // icon yerinə AZN simvolu də ola bilər
    { code: "USD", label: "USD", icon: "$" },
    { code: "EUR", label: "EUR", icon: "€" },
  ];

  const current = currencies.find((c) => c.code === currency) || currencies[0];
  
  const handleSelect = (code) => {
    setOpen(false);
    if (code !== currency) {
      setCurrency(code);
    }
  };

  return (
    <div className="currency_switch">
     
      <button onClick={() => setOpen(!open)}>
        {current.label}
        <i className="drop-icon">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 10.8273L11.854 6.9743L11.147 6.2663L8 9.4133L4.854 6.2663L4.146 6.9743L8 10.8273Z"
              fill="white"
            />
          </svg>
        </i>
      </button>
      {open && (
        <div className="drop_lang">
          {currencies
            .filter((c) => c.code !== currency)
            .map((c) => (
              <button key={c.code} onClick={() => handleSelect(c.code)}>
                {c.label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
