import './History.css';
import React, { useEffect, useState } from "react";

function History() {
    const [history, setHistory] = useState([]);

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
                <h1>History</h1>
            </header>
            <main className="App-main">
                {history.length === 0 ? (
                    <p>No history available.</p>
                ) : (
                    <ul>
                        {history.slice().reverse().map((entry, index) => (
                            <li key={index} className="history-item">
                                <p><strong>Name:</strong> {entry.name}</p>
                                <p><strong>Grams:</strong> {entry.gramValue}</p>
                                <p><strong>Energy:</strong> {entry.energyValue || 0}kcal, <strong>Energy per {entry.gramValue}g:</strong> {(entry.energyAmount || 0).toFixed(2)}kcal</p>
                                <p><strong>Protein per 100g:</strong> {entry.proteinValue}g, <strong>Protein per {entry.gramValue}g:</strong> {entry.proteinAmount.toFixed(2)}g</p>
                                <p><strong>Carbs per 100g:</strong> {entry.carbsValue}g, <strong>Carbs per {entry.gramValue}g:</strong> {entry.carbsAmount.toFixed(2)}g</p>
                                <p><strong>Fat per 100g:</strong> {entry.fatValue}g, <strong>Fat per {entry.gramValue}g:</strong> {entry.fatAmount.toFixed(2)}g</p>
                                <p><strong>Fiber per 100g:</strong> {entry.fiberValue}g, <strong>Fiber per {entry.gramValue}g:</strong> {entry.fiberAmount.toFixed(2)}g</p>
                                <p><strong>Saved At:</strong> {new Date(entry.timestamp).toLocaleString()}</p>
                                <button onClick={() => deleteItem(index)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
}

export default History;