import React, { useState } from 'react';
import './App.css';

function App() {
    const [skinSymptom, setSkinSymptom] = useState('');
    const [upperRespiratorySymptom, setUpperRespiratorySymptom] = useState('');
    const [lowerRespiratorySymptom, setLowerRespiratorySymptom] = useState('');
    const [gastrointestinalSymptom, setGastrointestinalSymptom] = useState('');
    const [cardiovascularSymptom, setCardiovascularSymptom] = useState('');
    const [generalSymptom, setGeneralSymptom] = useState('');
    const [result, setResult] = useState('');

    const assessSymptoms = () => {
        let grade1Count = 0;
        let grade2Count = 0;
        let grade3Count = 0;

        const symptoms = [
            skinSymptom,
            upperRespiratorySymptom,
            lowerRespiratorySymptom,
            gastrointestinalSymptom,
            cardiovascularSymptom,
            generalSymptom,
        ];

        symptoms.forEach(symptom => {
            if (symptom.includes('Grade 1')) grade1Count++;
            else if (symptom.includes('Grade 2')) grade2Count++;
            else if (symptom.includes('Grade 3')) grade3Count++;
        });

        if (grade3Count > 0) {
            setResult('Reaction: Stop the challenge. Provide necessary medical treatment.');
        } else if (grade2Count >= 3) {
            setResult('Reaction: Stop the challenge. Provide necessary medical treatment.');
        } else if (grade2Count === 2) {
            setResult('Examine patient, check haemodynamics, and delay next dose (if after 1st dose) or repeat dose rather than escalate.');
        } else if (grade2Count === 1) {
            setResult('Proceed with caution.');
        } else {
            setResult('Proceed with caution.');
        }
    };

    return (
        <div className="App">
            <h1>Symptom Severity Calculator</h1>
            <form>
                <label>
                    Skin Symptoms:
                    <select value={skinSymptom} onChange={(e) => setSkinSymptom(e.target.value)}>
                        <option value="">No or nil</option>
                        <option value="Grade 1">Pruritus - Grade 1</option>
                        <option value="Grade 2 Moderate">Pruritus - Grade 2 (Moderate)</option>
                        <option value="Grade 2 Hard">Pruritus - Grade 2 (Hard continuous)</option>
                        <option value="Grade 2 Hives">Urticaria/Angioedema - Grade 2 (&lt;3 hives)</option>
                        <option value="Grade 2 Hives 10">Urticaria/Angioedema - Grade 2 (3-10 hives)</option>
                        <option value="Grade 3 Oedema">Urticaria/Angioedema - Grade 3 (Significant lip or face oedema)</option>
                        <option value="Grade 3 Severe">Urticaria/Angioedema - Grade 3 (Severe generalised involvement)</option>
                        <option value="Grade 1 Mild">Rash - Grade 1 (Mild)</option>
                        <option value="Grade 2 Moderate">Rash - Grade 2 (Moderate)</option>
                        <option value="Grade 3 Severe">Rash - Grade 3 (Severe)</option>
                    </select>
                </label>
                <label>
                    Upper Respiratory Symptoms:
                    <select value={upperRespiratorySymptom} onChange={(e) => setUpperRespiratorySymptom(e.target.value)}>
                        <option value="">No or nil</option>
                        <option value="Grade 1">Sneezing and itching - Grade 1 (Rare)</option>
                        <option value="Grade 2 Less 10">Sneezing and itching - Grade 2 (&lt;10 bursts)</option>
                        <option value="Grade 2 Intermittent">Sneezing and itching - Grade 2 (Intermittent)</option>
                        <option value="Grade 3 Continuous">Sneezing and itching - Grade 3 (Continuous rubbing)</option>
                        <option value="Grade 3 Peri-ocular">Sneezing and itching - Grade 3 (Peri-ocular swelling)</option>
                        <option value="Grade 3 Long">Sneezing and itching - Grade 3 (Long bursts)</option>
                        <option value="Grade 3 Persistent">Sneezing and itching - Grade 3 (Persistent rhinorrhoea)</option>
                    </select>
                </label>
                <label>
                    Lower Respiratory Symptoms:
                    <select value={lowerRespiratorySymptom} onChange={(e) => setLowerRespiratorySymptom(e.target.value)}>
                        <option value="">No or nil</option>
                        <option value="Grade 1">Cough - Grade 1 (Rare)</option>
                        <option value="Grade 2 Less 10">Cough - Grade 2 (&lt;10 bursts)</option>
                        <option value="Grade 2 Intermittent">Cough - Grade 2 (Intermittent)</option>
                        <option value="Grade 3 Continuous">Cough - Grade 3 (Continuous coughing)</option>
                        <option value="Grade 3 Wheeze">Wheeze - Grade 3</option>
                        <option value="Grade 3 SOB">Shortness of breath - Grade 3</option>
                    </select>
                </label>
                <label>
                    Gastrointestinal Symptoms:
                    <select value={gastrointestinalSymptom} onChange={(e) => setGastrointestinalSymptom(e.target.value)}>
                        <option value="">No or nil</option>
                        <option value="Grade 1">Nausea - Grade 1</option>
                        <option value="Grade 2 Vomiting">Vomiting - Grade 2</option>
                        <option value="Grade 3 Severe Vomiting">Severe Vomiting - Grade 3</option>
                        <option value="Grade 3 Diarrhea">Diarrhea - Grade 3</option>
                    </select>
                </label>
                <label>
                    Cardiovascular Symptoms:
                    <select value={cardiovascularSymptom} onChange={(e) => setCardiovascularSymptom(e.target.value)}>
                        <option value="">No or nil</option>
                        <option value="Grade 1">Dizziness - Grade 1</option>
                        <option value="Grade 2 Tachycardia">Tachycardia - Grade 2</option>
                        <option value="Grade 3 Hypotension">Hypotension - Grade 3 (&gt;20% drop from baseline)</option>
                        <option value="Grade 3 Collapse">Collapse - Grade 3</option>
                    </select>
                </label>
                <label>
                    General Symptoms:
                    <select value={generalSymptom} onChange={(e) => setGeneralSymptom(e.target.value)}>
                        <option value="">No or nil</option>
                        <option value="Grade 1">Mild Anxiety - Grade 1</option>
                        <option value="Grade 2 Restlessness">Restlessness - Grade 2</option>
                        <option value="Grade 3 Severe Anxiety">Severe Anxiety - Grade 3</option>
                    </select>
                </label>
                <button type="button" onClick={assessSymptoms}>Assess</button>
            </form>
            <p>{result}</p>
        </div>
    );
}

export default App;
