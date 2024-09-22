import React, { useState } from "react";
import axios from "axios";

function App() {
    const [inputData, setInputData] = useState("");
    const [apiResult, setApiResult] = useState(null);
    const [activeFilters, setActiveFilters] = useState([]);

    const handleInputChange = (event) => {
        setInputData(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const dataPayload = JSON.parse(inputData);
            const response = await axios.post("https://bajaj-backend-qtmr.onrender.com/bfhl", dataPayload);
            setApiResult(response.data);
            setActiveFilters([]);
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    const handleFilterSelection = (event) => {
        const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
        setActiveFilters(selectedValues);
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <header style={{ textAlign: "center" }}>
                <h1>{apiResult ? apiResult.roll_number : "Submit JSON Data"}</h1>
                <form onSubmit={handleFormSubmit} style={{ marginTop: "20px" }}>
                    <div style={{ marginBottom: "15px" }}>
                        <label htmlFor="jsonData" style={{ fontSize: "18px", fontWeight: "bold" }}>Enter JSON Data</label>
                        <textarea
                            id="jsonData"
                            style={{
                                width: "100%",
                                height: "100px",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginTop: "10px",
                                fontSize: "16px",
                                resize: "none"
                            }}
                            value={inputData}
                            onChange={handleInputChange}
                            placeholder='Enter JSON data: {"data": ["A","C","z"]}'
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: "green",
                            color: "#fff",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "16px"
                        }}
                    >
                        Submit
                    </button>
                </form>
                {apiResult && (
                    <div style={{ marginTop: "30px" }}>
                        <label htmlFor="filters" style={{ fontSize: "18px", fontWeight: "bold" }}>Select Filters</label>
                        <select
                            id="filters"
                            multiple
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginTop: "10px",
                                fontSize: "16px"
                            }}
                            value={activeFilters}
                            onChange={handleFilterSelection}
                        >
                            <option value="alphabets">Alphabets</option>
                            <option value="numbers">Numbers</option>
                            <option value="highest_alphabet">Highest Alphabet</option>
                        </select>
                        <div style={{ marginTop: "20px" }}>
                            {activeFilters.includes("alphabets") && (
                                <div>
                                    <h3>Alphabets:</h3>
                                    <pre style={{ backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "5px" }}>
                                        {JSON.stringify(apiResult.alphabets, null, 2)}
                                    </pre>
                                </div>
                            )}
                            {activeFilters.includes("numbers") && (
                                <div>
                                    <h3>Numbers:</h3>
                                    <pre style={{ backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "5px" }}>
                                        {JSON.stringify(apiResult.numbers, null, 2)}
                                    </pre>
                                </div>
                            )}
                            {activeFilters.includes("highest_alphabet") && (
                                <div>
                                    <h3>Highest Alphabet:</h3>
                                    <pre style={{ backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "5px" }}>
                                        {JSON.stringify(apiResult.highest_alphabet, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;