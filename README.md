# CardioML — AI Cardiovascular Risk Assessment Platform

A professional full-stack healthcare web application converted from an existing Python CustomTkinter desktop application. This platform integrates the **existing trained machine learning model (`Cardio_Prediction_Model.pkl`)** and **existing scaler (`Cardio_Scaler.pkl`)** via a high-performance **FastAPI** backend and a responsive **React (Vite + Tailwind CSS)** frontend.

---

## 1. Project Overview

- **Original Application**: Python desktop app using CustomTkinter (`app.py`).
- **New Architecture**: Full-stack REST architecture with React and FastAPI.
- **Machine Learning Core**:
  - **Model**: `Cardio_Prediction_Model.pkl` (`LogisticRegression` classifier, `max_iter=1000`).
  - **Scaler**: `Cardio_Scaler.pkl` (`StandardScaler` fitted on `['age', 'height', 'weight', 'ap_hi', 'ap_lo']`).
  - **Dataset**: `cardio_train.csv` (70,000 patient clinical examination records, 72.3% verified test accuracy).
  - **Predictions & Probabilities**: Evaluated in real time via `model.predict()` and `model.predict_proba()`. **No mock models or hardcoded predictions are used.**

---

## 2. Architecture & Data Flow

```
[ User in React Web App ]
         ↓ (HTTP POST /api/predict)
[ FastAPI Backend (port 8000) ]
         ↓
1. Validate 11 clinical fields with Pydantic
2. Map categorical strings to original integer codes
3. Apply Cardio_Scaler.pkl to 5 numerical features
4. Evaluate with Cardio_Prediction_Model.pkl
5. Compute probability via model.predict_proba()
         ↓ (JSON Response)
[ React Result Dashboard ]
Displays Lower / Higher Risk (Cardio = 0 / 1), exact Probability Ring, and Patient Profile
```

---

## 3. Folder Structure

```
Cardio/
├── backend/
│   ├── main.py                     # FastAPI server with /api/predict, /api/insights, /api/model-info
│   ├── Cardio_Prediction_Model.pkl # Existing trained LogisticRegression model
│   ├── Cardio_Scaler.pkl           # Existing trained StandardScaler
│   ├── cardio_train.csv            # Real 70,000-record dataset for analytics
│   └── requirements.txt            # Python backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Navbar.jsx          # Header with logo, links, mobile menu, CTA
│   │   │   ├── Footer.jsx          # Medical SaaS footer with links and disclaimer
│   │   │   ├── Button.jsx          # Multi-variant button with loading state
│   │   │   ├── Card.jsx            # Modern rounded card with subtle shadows
│   │   │   ├── InputField.jsx      # Controlled input with inline validation & units
│   │   │   ├── SelectField.jsx     # Accessible select input with inline validation
│   │   │   ├── ProbabilityRing.jsx # Circular SVG probability risk visualization
│   │   │   ├── PatientSummary.jsx  # Structured card showing 11 patient features
│   │   │   ├── LoadingSpinner.jsx  # Animated spinner with status message
│   │   │   └── ErrorMessage.jsx    # Alert card with retry button
│   │   ├── pages/
│   │   │   ├── HomePage.jsx        # Route /: SaaS landing page with hero & 4 cards
│   │   │   ├── AssessmentPage.jsx  # Route /assessment: 11-field clinical form
│   │   │   ├── ResultPage.jsx      # Route /result: Classification & probability gauge
│   │   │   ├── InsightsPage.jsx    # Route /insights: Real 70k dataset analytics (Recharts)
│   │   │   ├── ModelInfoPage.jsx   # Route /model: Architecture, pipeline, feature table
│   │   │   └── DisclaimerPage.jsx  # Route /disclaimer: Clinical & compliance notice
│   │   ├── services/
│   │   │   └── api.js              # Centralized API service calling VITE_API_URL
│   │   ├── data/
│   │   │   └── modelMeta.js        # Feature definitions, encodings, and pipeline info
│   │   ├── App.jsx                 # React Router setup
│   │   ├── main.jsx
│   │   └── index.css               # Tailwind CSS v4 setup and typography
│   ├── .env                        # VITE_API_URL=http://localhost:8000
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── app.py                          # Preserved original CustomTkinter application
├── Cardio_Prediction_Model.pkl     # Original model preserved in root
├── Cardio_Scaler.pkl               # Original scaler preserved in root
├── cardio_train.csv                # Original dataset preserved in root
└── README.md                       # Documentation
```

---

## 4. Prerequisites

- **Python**: 3.10 or higher
- **Node.js**: 18.0 or higher (v22.x tested)
- **npm**: 9.0 or higher

---

## 5. Backend Setup & Run

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

2. (Optional but recommended) Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows (PowerShell):
   .\venv\Scripts\Activate.ps1
   # On Linux/macOS:
   source venv/bin/activate
   ```

3. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI API server:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
   The backend will be available at `http://localhost:8000`.
   Interactive OpenAPI documentation is accessible at `http://localhost:8000/docs`.

---

## 6. Frontend Setup & Run

1. Open a new terminal and navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```

2. Ensure `frontend/.env` contains your backend API URL:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

3. Install frontend dependencies:
   ```bash
   npm install
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

5. (Optional) To create a production bundle:
   ```bash
   npm run build
   ```

---

## 7. API Endpoints

### `POST /api/predict`
Calculates cardiovascular risk using the trained model and scaler.

**Request Payload:**
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
  "active": "Yes"
}
```

**Lower Risk Response (`prediction: 0`):**
```json
{
  "prediction": 0,
  "risk": "Lower Risk",
  "probability": 0.3567,
  "message": "This is a model prediction, not a medical diagnosis."
}
```

**Higher Risk Response (`prediction: 1`):**
```json
{
  "prediction": 1,
  "risk": "Higher Risk",
  "probability": 0.9184,
  "message": "Please consult a qualified health professional for assessment."
}
```

### `GET /api/insights`
Returns statistical metrics calculated from the 70,000-record `cardio_train.csv` dataset.

### `GET /api/model-info`
Returns model specifications, algorithm details, scaling method, and feature encodings.

### `GET /api/health`
Health check verifying model and scaler memory status.

---

## 8. Feature Mappings & Scaling Specifications

| Feature Name | Description | Encoded Value | Preprocessing |
| :--- | :--- | :--- | :--- |
| `age` | Age in years | Numerical (e.g. 52) | `Cardio_Scaler.pkl` |
| `gender` | Biological sex | `Male = 1`, `Female = 2` | Unscaled |
| `height` | Standing height (cm) | Numerical (e.g. 170) | `Cardio_Scaler.pkl` |
| `weight` | Body weight (kg) | Numerical (e.g. 70) | `Cardio_Scaler.pkl` |
| `ap_hi` | Systolic Blood Pressure (mmHg) | Numerical (e.g. 120) | `Cardio_Scaler.pkl` |
| `ap_lo` | Diastolic Blood Pressure (mmHg) | Numerical (e.g. 80) | `Cardio_Scaler.pkl` |
| `cholesterol` | Serum cholesterol | `Normal = 1`, `Above = 2`, `Well Above = 3` | Unscaled |
| `gluc` | Blood glucose | `Normal = 1`, `Above = 2`, `Well Above = 3` | Unscaled |
| `smoke` | Smoking status | `No = 0`, `Yes = 1` | Unscaled |
| `alco` | Alcohol intake | `No = 0`, `Yes = 1` | Unscaled |
| `active` | Physical activity | `No = 0`, `Yes = 1` | Unscaled |

---

## 9. Disclaimer

This platform is an educational machine learning project. The predictions are mathematical approximations generated by a statistical model and do not constitute a medical diagnosis. Users should always consult qualified healthcare professionals for medical evaluations and advice.
