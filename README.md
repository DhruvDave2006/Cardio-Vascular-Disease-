# CardioML — AI Cardiovascular Risk Assessment Platform

A modern full-stack healthcare web application converted from a Python desktop application into a cloud-ready platform. This platform features dual machine learning models (**Random Forest Classifier** and **Calibrated Logistic Regression**), an optimized **FastAPI** backend, and an interactive **React (Vite + Tailwind CSS)** clinical assessment frontend.

---

## 1. Project Overview

- **Original Foundation**: Python desktop application using CustomTkinter (`app.py`).
- **Modern Architecture**: Full-stack REST architecture combining React (client-side) and FastAPI (server-side inference).
- **Dual Machine Learning Engine**:
  - **Random Forest Classifier (`Cardio_RandomForest_Model.pkl`)**:
    - **Architecture**: 150 calibrated decision trees, `max_depth=12`, `min_samples_leaf=8`.
    - **Performance**: **73.61% Test Accuracy**, **0.8002 ROC-AUC**.
    - **Strengths**: Captures complex non-linear feature interactions (e.g., blood pressure combined with BMI and age).
  - **Logistic Regression Classifier (`Cardio_Prediction_Model.pkl`)**:
    - **Architecture**: Clinically calibrated, bounded optimization.
    - **Performance**: **71.91% Test Accuracy**, **0.7823 ROC-AUC**.
    - **Strengths**: Highly interpretable, validated linear clinical baseline.
  - **Feature Scaler (`Cardio_Scaler.pkl`)**:
    - `StandardScaler` fitted on continuous attributes: `['age', 'height', 'weight', 'ap_hi', 'ap_lo']`.
  - **Dataset**: `cardio_train.csv` (70,000 real-world cardiovascular clinical patient records).

---

## 2. Clinical Calibration & Risk Monotonicity Fix

In raw observational cardiovascular datasets, observational biases (such as survivor bias and reverse causality) often cause standard Maximum Likelihood Estimation to assign counter-intuitive negative weights to smoking or alcohol. 

In this upgraded version:
- **Clinical Monotonicity Guaranteed**: Both models have been calibrated so that adverse lifestyle indicators strictly elevate predicted cardiovascular disease risk.
- **Lower Risk Sample Test (Verified Baseline)**:
  - Starting from a healthy baseline profile (~28% to 34% base risk):
    - **Smoking (No ➔ Yes)**: Risk increases (+2.8% to +5.2%)
    - **Alcohol Consumption (No ➔ Yes)**: Risk increases (+2.3% to +6.6%)
    - **Physical Inactivity (Yes ➔ No)**: Risk increases (+2.8% to +4.3%)
    - **All 3 Combined**: Risk increases by **+9.6% to +9.8%**, ensuring clinical soundness.

---

## 3. Architecture & Data Flow

```
[ User in React Web App ]
         │
         │ (HTTP POST /api/predict with patient data + model_choice)
         ▼
[ FastAPI Backend (port 8000) ]
         │
         ├── 1. Validate 11 clinical fields with Pydantic
         ├── 2. Map categorical strings to encoded values
         ├── 3. Standardize 5 numerical features via Cardio_Scaler.pkl
         ├── 4. Evaluate with selected model (Random Forest OR Logistic Regression)
         └── 5. Compute probability via model.predict_proba()
         │
         │ (Structured JSON Response)
         ▼
[ React Results Dashboard ]
Displays:
  • Single selected model's risk classification (Lower Risk / Higher Risk)
  • Exact calibrated probability score & confidence gauge
  • Key biometric drivers & personalized health advisories
```

---

## 4. Repository Structure

```
Cardio/
├── backend/
│   ├── main.py                         # FastAPI server (/api/predict, /api/insights, /api/model-info)
│   ├── Cardio_Prediction_Model.pkl     # Calibrated Logistic Regression model
│   ├── Cardio_RandomForest_Model.pkl   # Calibrated Random Forest model
│   ├── Cardio_Scaler.pkl               # Trained StandardScaler
│   ├── cardio_train.csv                # 70,000-patient dataset for analytics
│   └── requirements.txt                # Python backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/                 # UI components
│   │   │   ├── Navbar.jsx              # Responsive navigation with branding
│   │   │   ├── Footer.jsx              # Healthcare footer with disclaimer
│   │   │   ├── Button.jsx              # Reusable button with state handling
│   │   │   ├── Card.jsx                # Glassmorphic container cards
│   │   │   ├── InputField.jsx          # Numerical inputs with real-time validation
│   │   │   ├── SelectField.jsx         # Accessible dropdown inputs
│   │   │   ├── ProbabilityRing.jsx     # SVG circular gauge for probability
│   │   │   ├── PatientSummary.jsx      # Summary of patient's 11 inputs
│   │   │   ├── LoadingSpinner.jsx      # Animated state loader
│   │   │   └── ErrorMessage.jsx        # Error alert component
│   │   ├── pages/
│   │   │   ├── HomePage.jsx            # Landing page with hero & platform overview
│   │   │   ├── AssessmentPage.jsx      # Assessment form with single model selection
│   │   │   ├── ResultPage.jsx          # Risk assessment score & clinical guidance
│   │   │   ├── InsightsPage.jsx        # Interactive population charts (Recharts)
│   │   │   ├── ModelInfoPage.jsx       # Architecture, benchmarks & feature importance
│   │   │   └── DisclaimerPage.jsx      # Medical compliance and legal notice
│   │   ├── services/
│   │   │   └── api.js                  # Axios client connecting to backend API
│   │   ├── data/
│   │   │   └── modelMeta.js            # Model benchmarks, feature metadata & samples
│   │   ├── App.jsx                     # React Router configurations
│   │   ├── main.jsx
│   │   └── index.css                   # Tailwind CSS styling & design system
│   ├── package.json
│   └── vite.config.js
│
├── app.py                              # Original standalone CustomTkinter application
├── Cardio_Prediction_Model.pkl         # Preserved Logistic Regression model in root
├── Cardio_RandomForest_Model.pkl       # Preserved Random Forest model in root
├── Cardio_Scaler.pkl                   # Preserved scaler in root
├── cardio_train.csv                    # Dataset
└── README.md                           # Documentation
```

---

## 5. Prerequisites

- **Python**: 3.10 or higher
- **Node.js**: 18.0 or higher (v20+ / v22+ recommended)
- **npm**: 9.0 or higher

---

## 6. Setup & Execution Guide

### Backend (FastAPI)

1. Open a terminal and navigate to `backend/`:
   ```bash
   cd backend
   ```

2. (Optional) Create and activate a virtual environment:
   ```bash
   # Windows (PowerShell):
   python -m venv venv
   .\venv\Scripts\Activate.ps1

   # Linux / macOS:
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the server with Uvicorn:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
   - API Base URL: `http://localhost:8000`
   - Interactive Swagger API Docs: `http://localhost:8000/docs`

---

### Frontend (React + Vite)

1. Open a second terminal and navigate to `frontend/`:
   ```bash
   cd frontend
   ```

2. Verify environment configuration (`frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:8000
   ```

3. Install packages:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   - Web application URL: `http://localhost:5173`

5. (Optional) Production build check:
   ```bash
   npm run build
   ```

---

## 7. API Reference

### `POST /api/predict`
Calculates cardiovascular disease risk using the user's selected machine learning model.

**Request Body:**
```json
{
  "age": 52,
  "gender": "Male",
  "height": 170,
  "weight": 70,
  "ap_hi": 120,
  "ap_lo": 80,
  "cholesterol": "Normal",
  "gluc": "Normal",
  "smoke": "No",
  "alco": "No",
  "active": "Yes",
  "model_choice": "random_forest"
}
```
*Note: `model_choice` accepts either `"random_forest"` or `"logistic_regression"`.*

**Response (Sample Lower Risk):**
```json
{
  "model_used": "Random Forest",
  "prediction": 0,
  "risk": "Lower Risk",
  "probability": 28.16,
  "accuracy": "73.61%",
  "message": "This is an AI prediction based on clinical statistics, not a medical diagnosis."
}
```

### `GET /api/insights`
Calculates aggregate health statistics, distributions, and risk correlations across the 70,000-record dataset.

### `GET /api/model-info`
Provides comparative metadata, performance metrics (Accuracy, ROC-AUC), confusion matrix details, and feature importances for both models.

### `GET /api/health`
Health check verifying model loading and scaler availability in memory.

---

## 8. Feature Mappings & Preprocessing

| Feature Name | Description | Encoded Value | Preprocessing |
| :--- | :--- | :--- | :--- |
| `age` | Age in years | Numerical (e.g., 52) | Scaled via `Cardio_Scaler.pkl` |
| `gender` | Biological sex | `Male = 1`, `Female = 2` | Unscaled |
| `height` | Standing height (cm) | Numerical (e.g., 170) | Scaled via `Cardio_Scaler.pkl` |
| `weight` | Body weight (kg) | Numerical (e.g., 70) | Scaled via `Cardio_Scaler.pkl` |
| `ap_hi` | Systolic Blood Pressure (mmHg) | Numerical (e.g., 120) | Scaled via `Cardio_Scaler.pkl` |
| `ap_lo` | Diastolic Blood Pressure (mmHg) | Numerical (e.g., 80) | Scaled via `Cardio_Scaler.pkl` |
| `cholesterol` | Serum cholesterol level | `Normal = 1`, `Above = 2`, `Well Above = 3` | Unscaled |
| `gluc` | Fasting blood glucose | `Normal = 1`, `Above = 2`, `Well Above = 3` | Unscaled |
| `smoke` | Tobacco smoking status | `No = 0`, `Yes = 1` | Unscaled |
| `alco` | Alcohol intake status | `No = 0`, `Yes = 1` | Unscaled |
| `active` | Physical activity habit | `No = 0`, `Yes = 1` | Unscaled |

---

## 9. Medical Disclaimer

This application is developed as an educational Machine Learning project. The risk percentages and classifications are statistical approximations generated by predictive models and do **not** constitute medical advice or clinical diagnosis. Always seek the advice of a qualified physician or healthcare provider regarding any cardiovascular symptoms or health conditions.
