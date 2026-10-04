import "./App.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DEFAULT_BASE_GRAMS = "100";

const NUTRIENTS = [
  { key: "energy", label: "Energy", unit: "kcal" },
  { key: "protein", label: "Protein", unit: "g" },
  { key: "carbs", label: "Carbs", unit: "g" },
  { key: "fat", label: "Fat", unit: "g" },
  { key: "fiber", label: "Fiber", unit: "g" },
];

const EMPTY_VALUES = { energy: "", protein: "", carbs: "", fat: "", fiber: "" };

// Accepts both "1.5" and "1,5" so the decimal keyboard works in any locale.
const toNumber = (value) => {
  const parsed = parseFloat(String(value).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
};

export const calculateAmount = (value, baseGrams, gramValue) => {
  const base = toNumber(baseGrams);
  if (base <= 0) return 0;
  return (toNumber(gramValue) / base) * toNumber(value);
};

const formatAmount = (amount) =>
  amount.toLocaleString(undefined, { maximumFractionDigits: 1 });

function NumberField({ id, value, onChange, placeholder = "0", ...rest }) {
  return (
    <input
      id={id}
      type="text"
      inputMode="decimal"
      autoComplete="off"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={(e) => e.target.select()}
      {...rest}
    />
  );
}

function App() {
  const [name, setName] = useState("");
  const [baseGrams, setBaseGrams] = useState(DEFAULT_BASE_GRAMS);
  const [gramValue, setGramValue] = useState("");
  const [values, setValues] = useState(EMPTY_VALUES);
  const [savedMessage, setSavedMessage] = useState("");
  const navigate = useNavigate();

  const baseLabel = toNumber(baseGrams) || 0;
  const gramLabel = toNumber(gramValue);

  const amounts = Object.fromEntries(
    NUTRIENTS.map(({ key }) => [
      key,
      calculateAmount(values[key], baseGrams, gramValue),
    ])
  );

  const setValue = (key, value) =>
    setValues((current) => ({ ...current, [key]: value }));

  const saveData = () => {
    const savedData =
      JSON.parse(localStorage.getItem("nutritionHistory")) || [];
    const newEntry = {
      name,
      baseGrams: baseLabel,
      gramValue: gramLabel,
      energyValue: toNumber(values.energy),
      proteinValue: toNumber(values.protein),
      carbsValue: toNumber(values.carbs),
      fatValue: toNumber(values.fat),
      fiberValue: toNumber(values.fiber),
      energyAmount: amounts.energy,
      proteinAmount: amounts.protein,
      carbsAmount: amounts.carbs,
      fatAmount: amounts.fat,
      fiberAmount: amounts.fiber,
      timestamp: new Date().toISOString(),
    };
    savedData.push(newEntry);
    localStorage.setItem("nutritionHistory", JSON.stringify(savedData));

    setName("");
    setBaseGrams(DEFAULT_BASE_GRAMS);
    setGramValue("");
    setValues(EMPTY_VALUES);
    setSavedMessage(`Saved${name ? ` “${name}”` : ""}`);
    setTimeout(() => setSavedMessage(""), 2000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="brand">
          <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="" />
          Nutrition Calculator
        </h1>
        <button
          type="button"
          className="link-button"
          onClick={() => navigate("/history")}
        >
          History
        </button>
      </header>

      <main className="App-main">
        <section className="card amounts-card">
          <label className="field field-full" htmlFor="name">
            <span className="field-label">Food</span>
            <input
              id="name"
              type="text"
              placeholder="e.g. Oat flakes"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="field" htmlFor="gramValue">
            <span className="field-label">I'm eating</span>
            <span className="input-with-unit">
              <NumberField
                id="gramValue"
                value={gramValue}
                onChange={setGramValue}
              />
              <span className="unit">g</span>
            </span>
          </label>

          <label className="field" htmlFor="baseGrams">
            <span className="field-label">Values are per</span>
            <span className="input-with-unit">
              <NumberField
                id="baseGrams"
                value={baseGrams}
                onChange={setBaseGrams}
                placeholder="100"
              />
              <span className="unit">g</span>
            </span>
          </label>
        </section>

        <section className="card nutrients-card">
          <div className="nutrients-head">
            <span>For {formatAmount(gramLabel)} g</span>
            <span>Per {formatAmount(baseLabel)} g</span>
          </div>

          {NUTRIENTS.map(({ key, label, unit }) => (
            <div
              key={key}
              className={`nutrient-row${key === "energy" ? " is-energy" : ""}`}
            >
              <div className="nutrient-result" data-testid={`${key}-result`}>
                <span className="nutrient-name">{label}</span>
                <span className="nutrient-amount">
                  {formatAmount(amounts[key])}
                  <small>{unit}</small>
                </span>
              </div>
              <label className="nutrient-input" htmlFor={key}>
                <span className="visually-hidden">
                  {label} per {baseLabel} g
                </span>
                <span className="input-with-unit">
                  <NumberField
                    id={key}
                    value={values[key]}
                    onChange={(value) => setValue(key, value)}
                  />
                  <span className="unit">{unit}</span>
                </span>
              </label>
            </div>
          ))}
        </section>

        <button type="button" className="save-button" onClick={saveData}>
          {savedMessage || "Save"}
        </button>
      </main>
    </div>
  );
}

export default App;
