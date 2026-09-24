import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldAlert, Sparkles, FileText, BarChart3, Stethoscope } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Cardio<span className="text-blue-400">ML</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Machine Learning Based Cardiovascular Risk Prediction. Powered by an existing trained ML model evaluating 11 clinical and lifestyle features.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Real Logistic Regression Pipeline • Trained on 70,000 Records</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="text-slate-400 hover:text-white transition-colors">
                  Risk Assessment
                </Link>
              </li>
              <li>
                <Link to="/insights" className="text-slate-400 hover:text-white transition-colors">
                  Data Insights
                </Link>
              </li>
              <li>
                <Link to="/model" className="text-slate-400 hover:text-white transition-colors">
                  Model Information
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-slate-400 hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Clinical Note */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Compliance Notice
            </h4>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                <ShieldAlert className="w-4 h-4" />
                <span>Non-Diagnostic Tool</span>
              </div>
              <p className="leading-relaxed">
                Predictions are intended solely for research and educational purposes. Always consult a licensed clinician for medical evaluation.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CardioML. All rights reserved.</p>
          <p className="text-slate-400 font-medium">
            Educational ML Project • Not a medical diagnosis
          </p>
        </div>
      </div>
    </footer>
  );
}
