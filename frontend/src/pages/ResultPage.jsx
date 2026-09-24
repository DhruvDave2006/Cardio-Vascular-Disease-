import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import ProbabilityRing from '../components/ProbabilityRing';
import PatientSummary from '../components/PatientSummary';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Info,
  Stethoscope,
} from 'lucide-react';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const stateData = location.state;
  const result = stateData?.result;
  const patientData = stateData?.patientData;

  // Fallback if accessed directly without prediction
  if (!result) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <Card className="border-slate-200">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">No Assessment Found</h2>
          <p className="text-slate-600 text-sm mt-2 mb-6 max-w-md mx-auto">
            Please complete the assessment form with patient health indicators to view real machine learning prediction results.
          </p>
          <Link to="/assessment">
            <Button variant="primary" icon={RotateCcw}>
              Go to Assessment
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const isHigherRisk = result.prediction === 1;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Real ML Model Output
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Prediction Result
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          AI-powered cardiovascular risk assessment
        </p>
      </div>

      {/* Primary Result Banner Card */}
      <Card
        className={`border-2 shadow-lg ${
          isHigherRisk
            ? 'border-red-200 bg-gradient-to-b from-red-50/40 to-white'
            : 'border-emerald-200 bg-gradient-to-b from-emerald-50/40 to-white'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left: Risk Indicator & Decision */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                  isHigherRisk
                    ? 'bg-red-100 text-red-600'
                    : 'bg-emerald-100 text-emerald-600'
                }`}
              >
                {isHigherRisk ? (
                  <AlertTriangle className="w-8 h-8" />
                ) : (
                  <CheckCircle2 className="w-8 h-8" />
                )}
              </div>
              <div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    isHigherRisk ? 'text-red-600' : 'text-emerald-700'
                  }`}
                >
                  Clinical Classification
                </span>
                <h2
                  className={`text-3xl font-extrabold tracking-tight ${
                    isHigherRisk ? 'text-red-600' : 'text-emerald-700'
                  }`}
                >
                  {isHigherRisk ? 'Higher Risk' : 'Lower Risk'}
                </h2>
              </div>
            </div>

            {/* Model Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 text-xs font-mono font-medium text-slate-700">
              <span>Model Prediction:</span>
              <strong className={isHigherRisk ? 'text-red-600' : 'text-emerald-700'}>
                Cardio = {result.prediction}
              </strong>
            </div>

            {/* Advisory Message */}
            <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed">
              {result.message}
            </p>

            {isHigherRisk && (
              <div className="p-3.5 rounded-xl bg-red-100/60 border border-red-200/80 text-xs text-red-800 leading-relaxed flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                <span>
                  Elevated metrics detected. It is strongly recommended to review arterial blood pressure and lipid panels with a physician.
                </span>
              </div>
            )}
          </div>

          {/* Right: Probability Gauge Ring */}
          <div className="md:col-span-5 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
            <div className="text-center mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Estimated Probability
              </span>
            </div>
            <ProbabilityRing
              probability={result.probability}
              isHigherRisk={isHigherRisk}
              size={170}
              strokeWidth={14}
            />
            <p className="text-[11px] text-slate-400 mt-2 text-center">
              LogisticRegression probability estimation
            </p>
          </div>
        </div>
      </Card>

      {/* Patient Summary Card */}
      <PatientSummary data={patientData} />

      {/* Medical Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold block mb-0.5">Medical Disclaimer:</strong>
          This is an ML model prediction and not a medical diagnosis. The model estimates cardiovascular risk from statistical patterns in clinical research data and should never replace qualified clinical judgment.
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link to="/assessment" className="w-full sm:w-auto">
          <Button variant="orange" size="lg" icon={RotateCcw} className="w-full sm:w-auto">
            New Assessment
          </Button>
        </Link>
        <Link to="/" className="w-full sm:w-auto">
          <Button variant="outline" size="lg" icon={ArrowLeft} className="w-full sm:w-auto">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
