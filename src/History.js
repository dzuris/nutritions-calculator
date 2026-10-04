import './History.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NUTRIENTS = [
    { key: 'energy', label: 'Energy', unit: 'kcal' },
    { key: 'protein', label: 'Protein', unit: 'g' },
    { key: 'carbs', label: 'Carbs', unit: 'g' },
    { key: 'fat', label: 'Fat', unit: 'g' },
    { key: 'fiber', label: 'Fiber', unit: 'g' },
];

const format = (value) =>
    (Number(value) || 0).toLocaleString(undefined, { maximumFractionDigits: 1 });

function History() {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'History · Nutrition Calculator';
        return () => { document.title = 'Nutrition Calculator'; };
    }, []);

    // Fetch history data from localStorage
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('nutritionHistory')) || [];
        setHistory(savedData);
    }, []);

    const deleteItem = (indexToDelete) => {
        const updatedHistory = history.filter((_, index) => index !== indexToDelete);
        setHistory(updatedHistory);
        localStorage.setItem('nutritionHistory', JSON.stringify(updatedHistory));
    };

    return (
        <div className="History">
            <header className="App-header">
                <h1 className="brand">
                    <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="" />
                    History
                </h1>
                <button type="button" className="link-button" onClick={() => navigate('/')}>
                    Calculator
                </button>
            </header>
            <main className="App-main">
                {history.length === 0 ? (
                    <p className="history-empty">No history yet.</p>
                ) : (
                    <ul className="history-list">
                        {history.map((entry, index) => ({ entry, index })).reverse().map(({ entry, index }) => (
                            <li key={entry.timestamp + index} className="card history-item">
                                <div className="history-item-head">
                                    <div>
                                        <strong>{entry.name || 'Unnamed'}</strong>
                                        <span className="history-meta">
                                            {format(entry.gramValue)} g · values per {format(entry.baseGrams ?? 100)} g
                                        </span>
                                    </div>
                                    <button type="button" className="delete-button" onClick={() => deleteItem(index)}>
                                        Delete
                                    </button>
                                </div>
                                <dl className="history-grid">
                                    {NUTRIENTS.map(({ key, label, unit }) => (
                                        <div key={key}>
                                            <dt>{label}</dt>
                                            <dd>
                                                {format(entry[`${key}Amount`])}<small>{unit}</small>
                                            </dd>
                                            <dd className="history-base">
                                                {format(entry[`${key}Value`])} / {format(entry.baseGrams ?? 100)} g
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                                <time className="history-meta" dateTime={entry.timestamp}>
                                    {new Date(entry.timestamp).toLocaleString()}
                                </time>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
}

export default History;
