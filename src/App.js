import "./App.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const [gramValue, setGramValue] = useState(0);
  const [energyValue, setEnergyValue] = useState(0);
  const [proteinValue, setProteinValue] = useState(0);
  const [carbsValue, setCarbsValue] = useState(0);
  const [fatValue, setFatValue] = useState(0);
  const [fiberValue, setFiberValue] = useState(0);
  const navigate = useNavigate();

  const energyAmount = (gramValue / 100) * energyValue;
  const proteinAmount = (gramValue / 100) * proteinValue;
  const carbsAmount = (gramValue / 100) * carbsValue;
  const fatAmount = (gramValue / 100) * fatValue;
  const fiberAmount = (gramValue / 100) * fiberValue;

  const saveData = () => {
    const savedData =
      JSON.parse(localStorage.getItem("nutritionHistory")) || [];
    const newEntry = {
      name,
      gramValue,
      energyValue,
      proteinValue,
      carbsValue,
      fatValue,
      fiberValue,
      energyAmount,
      proteinAmount,
      carbsAmount,
      fatAmount,
      fiberAmount,
      timestamp: new Date().toISOString(),
    };
    savedData.push(newEntry);
    localStorage.setItem("nutritionHistory", JSON.stringify(savedData));

    setName("");
    setGramValue(0);
    setEnergyValue(0);
    setProteinValue(0);
    setCarbsValue(0);
    setFatValue(0);
    setFiberValue(0);
    alert("Data saved successfully!");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Nutritions Calculator</h1>
      </header>
      <main className="App-main">
        <div className="name-grams-section">
          <p>Name:</p>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <p>Your gramage:</p>
          <div className="text-input">
            <input
              type="number"
              placeholder="0"
              value={gramValue}
              onChange={(e) => setGramValue(Number(e.target.value))}
              onFocus={(e) => e.target.select()}
            />
            <p>g</p>
          </div>
        </div>
        <div className="nutritions-body">
          <div className="nutritions-per-100-section">
            <p className="text-align-end">Energy per 100g</p>
            <input
              type="number"
              placeholder="0"
              value={energyValue}
              onChange={(e) => setEnergyValue(Number(e.target.value))}
              onFocus={(e) => e.target.select()}
            />
            <div>
              <p className="calculated-nutrtitions-label">
                Energy for {gramValue}g:{" "}
              </p>
              <strong>{energyAmount.toFixed(2)}kcal</strong>
            </div>
            <p className="text-align-end">Protein per 100g</p>
            <input
              type="number"
              placeholder="0"
              value={proteinValue}
              onChange={(e) => setProteinValue(Number(e.target.value))}
              onFocus={(e) => e.target.select()}
            />
            <div>
              <p className="calculated-nutritions-label">
                Protein for {gramValue}g:
              </p>
              <strong>{proteinAmount.toFixed(2)}g</strong>
            </div>

            <p className="text-align-end">Carbs per 100g</p>
            <input
              type="number"
              placeholder="0"
              value={carbsValue}
              onChange={(e) => setCarbsValue(Number(e.target.value))}
              onFocus={(e) => e.target.select()}
            />
            <div>
              <p className="calculated-nutritions-label">
                Carbs for {gramValue}g:
              </p>
              <strong>{carbsAmount.toFixed(2)}g</strong>
            </div>

            <p className="text-align-end">Fat per 100g</p>
            <input
              type="number"
              placeholder="0"
              value={fatValue}
              onChange={(e) => setFatValue(Number(e.target.value))}
              onFocus={(e) => e.target.select()}
            />
            <div>
              <p className="calculated-nutritions-label">
                Fat for {gramValue}g:
              </p>
              <strong>{fatAmount.toFixed(2)}g</strong>
            </div>

            <p className="text-align-end">Fiber per 100g</p>
            <input
              type="number"
              placeholder="0"
              value={fiberValue}
              onChange={(e) => setFiberValue(Number(e.target.value))}
              onFocus={(e) => e.target.select()}
            />
            <div>
              <p className="calculated-nutritions-label">
                Fiber for {gramValue}g:
              </p>
              <strong>{fiberAmount.toFixed(2)}g</strong>
            </div>
          </div>
        </div>
        <div className="buttons-section">
          <button className="save-button" onClick={saveData}>
            Save
          </button>
          <button
            className="history-button"
            onClick={() => navigate("/history")}
          >
            History
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
