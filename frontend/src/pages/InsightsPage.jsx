import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { fetchInsights } from '../services/api';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import {
  Database,
  Users,
  HeartPulse,
  Activity,
  Gauge,
  Sparkles,
  PieChart as PieIcon,
  BarChart2,
} from 'lucide-react';

export default function InsightsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const insightsData = await fetchInsights();
      setData(insightsData);
    } catch (err) {
      setError(err.message || 'Failed to load dataset insights.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading real cardiovascular dataset analytics..." />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ErrorMessage
          title="Dataset Insights Unavailable"
          message={error}
          onRetry={loadData}
        />
      </div>
    );
  }

  const COLORS = ['#16A34A', '#DC2626'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-3">
          <Database className="w-4 h-4 text-blue-600" />
          Verified Dataset Statistics
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Data Insights
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Explore the cardiovascular dataset and key risk indicators derived from 70,000 real patient examinations.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Records */}
        <Card padding="p-5" className="border-slate-200 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Records
            </span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">
            {data.total_records ? data.total_records.toLocaleString() : '70,000'}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Clinical examinations in cardio_train.csv
          </p>
        </Card>

        {/* Risk Distribution */}
        <Card padding="p-5" className="border-slate-200 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Risk Distribution
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <HeartPulse className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2 flex items-baseline gap-1">
            <span>50.0%</span>
            <span className="text-sm font-semibold text-slate-400">/ 50.0%</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Lower Risk (35,021) vs Higher Risk (34,979)
          </p>
        </Card>

        {/* Average Age */}
        <Card padding="p-5" className="border-slate-200 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Average Age
            </span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">
            {data.average_age} yrs
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Normal distribution across 30 to 65 yrs
          </p>
        </Card>

        {/* Average Blood Pressure */}
        <Card padding="p-5" className="border-slate-200 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Average Blood Pressure
            </span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Gauge className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">
            {data.average_bp}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Systolic / Diastolic clinical mean
          </p>
        </Card>
      </div>

      {/* ============================================================ */}
      {/* CHARTS GRID */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* CHART 1: Risk Distribution (Donut) */}
        <Card className="lg:col-span-5 border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  1. Overall Risk Distribution
                </h3>
                <p className="text-xs text-slate-500">
                  Binary outcome balance across the 70,000 cases
                </p>
              </div>
              <PieIcon className="w-4 h-4 text-blue-600" />
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.risk_distribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {data.risk_distribution?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val) => [`${val.toLocaleString()} records`, 'Count']}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 text-center border-t border-slate-50 pt-2">
            Balanced dataset: 50.0% Cardio Negative / 50.0% Cardio Positive
          </p>
        </Card>

        {/* CHART 2: Age Cohort vs Risk */}
        <Card className="lg:col-span-7 border-slate-200 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                2. Age Distribution vs Cardiovascular Risk
              </h3>
              <p className="text-xs text-slate-500">
                Risk prevalence escalates dramatically after age 50
              </p>
            </div>
            <BarChart2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.age_groups} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="lowerRisk" name="Lower Risk" fill="#16A34A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="higherRisk" name="Higher Risk" fill="#DC2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-400 text-center border-t border-slate-50 pt-2 mt-2">
            Higher risk cases exceed lower risk in the 50-59 and 60-65 age brackets
          </p>
        </Card>

        {/* CHART 3: Cholesterol Levels */}
        <Card className="lg:col-span-6 border-slate-200 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                3. Cholesterol Distribution
              </h3>
              <p className="text-xs text-slate-500">
                Serum cholesterol categories (1=Normal, 2=Above, 3=Well Above)
              </p>
            </div>
            <BarChart2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.cholesterol_distribution}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="lowerRisk" name="Lower Risk" fill="#16A34A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="higherRisk" name="Higher Risk" fill="#DC2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-400 text-center border-t border-slate-50 pt-2 mt-2">
            76.5% of subjects with "Well Above Normal" cholesterol tested positive for risk
          </p>
        </Card>

        {/* CHART 4: Glucose Levels */}
        <Card className="lg:col-span-6 border-slate-200 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                4. Glucose Distribution
              </h3>
              <p className="text-xs text-slate-500">
                Serum glucose categories (1=Normal, 2=Above, 3=Well Above)
              </p>
            </div>
            <BarChart2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.glucose_distribution}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="lowerRisk" name="Lower Risk" fill="#16A34A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="higherRisk" name="Higher Risk" fill="#DC2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-400 text-center border-t border-slate-50 pt-2 mt-2">
            Elevated glucose levels show strong positive correlation with cardiovascular risk
          </p>
        </Card>

        {/* CHART 5: Lifestyle Factors */}
        <Card className="lg:col-span-12 border-slate-200 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                5. Lifestyle Factors Prevalence (%)
              </h3>
              <p className="text-xs text-slate-500">
                Rates of physical activity, tobacco usage, and alcohol intake in cohort
              </p>
            </div>
            <BarChart2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.lifestyle_factors}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 40, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 12 }} />
                <YAxis dataKey="factor" type="category" tick={{ fontSize: 12 }} />
                <Tooltip formatter={(val) => [`${val}%`, 'Prevalence']} />
                <Bar dataKey="prevalence" name="Reported Yes (%)" fill="#2563EB" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
