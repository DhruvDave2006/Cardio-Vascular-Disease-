import React from 'react';
import Card from './Card';
import { User, Activity, Gauge, Flame, GlassWater, Dumbbell, Droplets, Scale } from 'lucide-react';

export default function PatientSummary({ data }) {
  if (!data) return null;

  const hM = data.height ? parseFloat(data.height) / 100 : 0;
  const wKg = data.weight ? parseFloat(data.weight) : 0;
  const bmiVal = hM > 0 ? (wKg / (hM * hM)).toFixed(1) : null;

  const items = [
    { label: 'Age', value: `${data.age} years`, icon: User },
    { label: 'Gender', value: data.gender, icon: User },
    { label: 'Height', value: `${data.height} cm`, icon: Activity },
    { label: 'Weight', value: `${data.weight} kg`, icon: Activity },
    { label: 'Calculated BMI', value: bmiVal ? `${bmiVal} kg/m²` : 'N/A', icon: Scale },
    { label: 'Systolic BP', value: `${data.ap_hi} mmHg`, icon: Gauge },
    { label: 'Diastolic BP', value: `${data.ap_lo} mmHg`, icon: Gauge },
    { label: 'Cholesterol', value: data.cholesterol, icon: Droplets },
    { label: 'Glucose', value: data.gluc, icon: Droplets },
    { label: 'Smoking', value: data.smoke, icon: Flame },
    { label: 'Alcohol Intake', value: data.alco, icon: GlassWater },
    { label: 'Physical Activity', value: data.active, icon: Dumbbell },
  ];

  return (
    <Card className="border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            Submitted Patient Profile
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Clinical metrics & derived indicators evaluated by the model
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
          Verified Parameters
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between hover:bg-slate-100/70 transition-colors"
            >
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                <IconComponent className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{item.label}</span>
              </div>
              <span className="text-sm font-semibold text-slate-900 truncate">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
