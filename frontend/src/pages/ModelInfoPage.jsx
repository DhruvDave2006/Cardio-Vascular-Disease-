import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchModelInfo } from '../services/api';
import { FEATURE_DEFINITIONS, PIPELINE_STEPS } from '../data/modelMeta';
import {
  BrainCircuit,
  Binary,
  Layers,
  CheckCircle2,
  Workflow,
  Sparkles,
  Table as TableIcon,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

export default function ModelInfoPage() {
  const [modelInfo, setModelInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const info = await fetchModelInfo();
        setModelInfo(info);
      } catch {
        // Fallback default info if backend temporarily offline
        setModelInfo({
          algorithm: 'Logistic Regression (max_iter=1000)',
          scaler_type: 'StandardScaler',
          verified_accuracy: 72.3,
          input_features_count: 11,
          has_probability: true,
          description: 'Binary classification model trained to estimate the risk of cardiovascular disease based on clinical examination metrics and patient lifestyle indicators.',
        });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading model architecture details..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-3">
          <BrainCircuit className="w-4 h-4 text-blue-600" />
          Technical Specifications
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Model Information
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Understand how the cardiovascular risk prediction system processes clinical metrics and estimates risk.
        </p>
      </div>

      {/* ============================================================ */}
      {/* SECTION 1: ABOUT THE MODEL */}
      {/* ============================================================ */}
      <Card className="border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-6">
          <BrainCircuit className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">
            About the Model
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Machine Learning Algorithm
            </span>
            <span className="text-base font-bold text-slate-900 mt-1 block">
              {modelInfo?.algorithm || 'Logistic Regression (max_iter=1000)'}
            </span>
            <span className="text-xs text-slate-500 mt-0.5 block">
              Loaded from Cardio_Prediction_Model.pkl
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Feature Preprocessing Scaler
            </span>
            <span className="text-base font-bold text-slate-900 mt-1 block">
              {modelInfo?.scaler_type || 'StandardScaler'}
            </span>
            <span className="text-xs text-slate-500 mt-0.5 block">
              Loaded from Cardio_Scaler.pkl
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Verified Test Accuracy
            </span>
            <span className="text-base font-bold text-emerald-600 mt-1 block">
              {modelInfo?.verified_accuracy || 72.3}%
            </span>
            <span className="text-xs text-slate-500 mt-0.5 block">
              Evaluated on 70,000 dataset records
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          {modelInfo?.description ||
            'Binary classification model trained to estimate the risk of cardiovascular disease based on clinical examination metrics and patient lifestyle indicators.'}
        </p>
      </Card>

      {/* ============================================================ */}
      {/* SECTION 2: MODEL PIPELINE */}
      {/* ============================================================ */}
      <Card className="border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-6">
          <Workflow className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">
            Prediction Pipeline
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PIPELINE_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold font-mono text-blue-600 bg-blue-100/80 px-2 py-0.5 rounded">
                    Step {step.step}
                  </span>
                  {idx === 4 && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
                      Real Model
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ============================================================ */}
      {/* SECTION 3: FEATURE SPECIFICATIONS TABLE */}
      {/* ============================================================ */}
      <Card className="border-slate-200 shadow-sm overflow-hidden" padding="p-0">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TableIcon className="w-5 h-5 text-blue-600" />
              Input Feature Specifications
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Exact feature requirements and encodings expected by the trained model
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            11 Features Total
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[11px] font-bold tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Feature</th>
                <th className="px-6 py-3.5">Description</th>
                <th className="px-6 py-3.5">Type & Scale</th>
                <th className="px-6 py-3.5">Encoding / Normal Range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {FEATURE_DEFINITIONS.map((f, i) => (
                <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span>{f.label}</span>
                      <code className="text-[11px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        {f.name}
                      </code>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {f.description}
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    <span className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-blue-50 text-blue-700 border border-blue-100 mr-1.5">
                      {f.type}
                    </span>
                    <span className="text-xs text-slate-500">{f.unit}</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-600">
                    {f.scaling}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ============================================================ */}
      {/* SECTION 4: RISK CLASSIFICATION & PROBABILITY */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-2">
            Risk Classification Logic
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            The model performs binary decision classification evaluating the decision boundary:
          </p>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-800 font-bold">Prediction 0 (Lower Risk):</strong>
                <p className="text-emerald-700 mt-0.5">
                  Calculated score indicates normal arterial pressure, lipid profiles, and active lifestyle patterns without elevated risk signals.
                </p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-red-800 font-bold">Prediction 1 (Higher Risk):</strong>
                <p className="text-red-700 mt-0.5">
                  Identifies elevated systolic/diastolic blood pressure, advanced age, or hypercholesterolemia requiring clinician review.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-2">
            Probability Score Estimation
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Via Logistic Regression sigmoid activation <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-[11px]">predict_proba()</code>:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs text-slate-600">
            <p className="leading-relaxed">
              The continuous probability (0.0 to 1.0) reflects the calibrated statistical confidence of the model based on the distance of the scaled patient profile from the hyperplane.
            </p>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-slate-700 font-semibold">
              <span>Decision Threshold:</span>
              <span className="font-mono text-blue-600">P ≥ 0.50 → Higher Risk</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
