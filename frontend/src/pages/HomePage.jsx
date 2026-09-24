import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BrainCircuit,
  Zap,
  ShieldCheck,
  Percent,
  CheckCircle2,
  Stethoscope,
  Activity,
  HeartPulse,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

export default function HomePage() {
  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* ============================================================ */}
      {/* HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative pt-6 sm:pt-10 lg:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* Early Warning Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-xs font-semibold text-blue-800 tracking-wide uppercase">
                  Early Warning System
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Cardiovascular <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
                  Risk Assessment
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Our AI-powered model analyzes clinical variables to estimate cardiovascular risk and provide an instant prediction.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link to="/assessment">
                  <Button variant="orange" size="lg" className="w-full sm:w-auto" icon={ArrowRight}>
                    Start Assessment
                  </Button>
                </Link>
                <Link to="/model">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto" icon={BrainCircuit}>
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Existing Trained ML Model
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Real Logistic Regression Pipeline
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  StandardScaler Normalization
                </span>
              </div>
            </div>

            {/* Right Dashboard Visual - 4 Cards */}
            <div className="lg:col-span-5">
              <div className="relative p-3 sm:p-4 rounded-3xl bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-100/60 shadow-xl shadow-blue-500/5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* CARD 1: ML Prediction */}
                  <Card hoverEffect={true} padding="p-5" className="border-blue-100 bg-white">
                    <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-blue-600 flex items-center justify-center mb-3">
                      <BrainCircuit className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                      CARD 1
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      ML Prediction
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Trained Machine Learning Model (72.3% verified accuracy).
                    </p>
                  </Card>

                  {/* CARD 2: Instant Results */}
                  <Card hoverEffect={true} padding="p-5" className="border-amber-100 bg-white">
                    <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-amber-600 flex items-center justify-center mb-3">
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                      CARD 2
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      Instant Results
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Real-time prediction calculated through REST API.
                    </p>
                  </Card>

                  {/* CARD 3: Secure & Private */}
                  <Card hoverEffect={true} padding="p-5" className="border-emerald-100 bg-white">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center mb-3">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                      CARD 3
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      Secure & Private
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Data processed through the prediction service without persistence.
                    </p>
                  </Card>

                  {/* CARD 4: Probability Score */}
                  <Card hoverEffect={true} padding="p-5" className="border-indigo-100 bg-white">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center mb-3">
                      <Percent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                      CARD 4
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      Probability Score
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Model probability when available via predict_proba.
                    </p>
                  </Card>
                </div>

                {/* Micro preview ticker */}
                <div className="mt-4 p-3.5 rounded-2xl bg-white/90 border border-slate-200/90 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-red-500" />
                    <span className="font-semibold text-slate-800">Cardio Clinical Model</span>
                  </div>
                  <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                    11 Features
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* HOW IT WORKS SECTION */}
      {/* ============================================================ */}
      <section className="py-12 bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Streamlined Process
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              How It Works
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Transforming patient clinical metrics into instant ML-driven cardiovascular insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 01 */}
            <div className="relative p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-colors group">
              <div className="text-3xl font-extrabold text-blue-600/40 group-hover:text-blue-600 transition-colors">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-3">
                Enter Patient Data
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Enter the required health information including blood pressure, cholesterol, glucose, and lifestyle factors.
              </p>
            </div>

            {/* Step 02 */}
            <div className="relative p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-colors group">
              <div className="text-3xl font-extrabold text-blue-600/40 group-hover:text-blue-600 transition-colors">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-3">
                ML Model Analysis
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                The existing trained model processes the input through feature encoding and standard scaling.
              </p>
            </div>

            {/* Step 03 */}
            <div className="relative p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-colors group">
              <div className="text-3xl font-extrabold text-blue-600/40 group-hover:text-blue-600 transition-colors">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-3">
                View Prediction
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                View the model's risk classification and probability score with clear clinical guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* QUICK CTA & DISCLAIMER */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to assess cardiovascular risk?
            </h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Complete the quick 11-question assessment and obtain real-time machine learning predictions immediately.
            </p>
          </div>
          <Link to="/assessment" className="shrink-0">
            <Button variant="orange" size="lg" icon={ArrowRight}>
              Start Assessment
            </Button>
          </Link>
        </div>

        {/* Small Disclaimer */}
        <p className="text-center text-xs text-slate-500 mt-8">
          Educational ML project. The prediction is not a medical diagnosis.
        </p>
      </section>
    </div>
  );
}
