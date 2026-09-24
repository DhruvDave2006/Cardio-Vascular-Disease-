import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import { predictCardioRisk } from '../services/api';
import {
  HeartPulse,
  User,
  Activity,
  Gauge,
  Droplets,
  Flame,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Scale,
  ShieldCheck,
} from 'lucide-react';

const INITIAL_FORM = {
  age: '',
  gender: '',
  height: '',
  weight: '',
  ap_hi: '',
  ap_lo: '',
  cholesterol: '',
  gluc: '',
  smoke: '',
  alco: '',
  active: '',
};

export default function AssessmentPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  // Count filled fields
  const filledCount = Object.values(formData).filter((v) => v !== '').length;
  const progressPercent = Math.round((filledCount / 11) * 100);

  // Live BMI calculation
  const heightNum = parseFloat(formData.height);
  const weightNum = parseFloat(formData.weight);
  let liveBmi = null;
  if (heightNum >= 80 && heightNum <= 250 && weightNum >= 25 && weightNum <= 300) {
    const bmiVal = (weightNum / ((heightNum / 100) ** 2)).toFixed(1);
    const bmiF = parseFloat(bmiVal);
    let category = 'Normal Weight';
    let catColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';

    if (bmiF < 18.5) {
      category = 'Underweight';
      catColor = 'text-amber-700 bg-amber-50 border-amber-200';
    } else if (bmiF < 25) {
      category = 'Normal Weight';
      catColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    } else if (bmiF < 30) {
      category = 'Overweight';
      catColor = 'text-amber-700 bg-amber-50 border-amber-200';
    } else {
      category = 'Obese';
      catColor = 'text-red-700 bg-red-50 border-red-200';
    }
    liveBmi = { val: bmiVal, category, catColor };
  }

  // Live Blood Pressure Classification
  const sysNum = parseFloat(formData.ap_hi);
  const diaNum = parseFloat(formData.ap_lo);
  let liveBp = null;
  if (sysNum >= 60 && diaNum >= 30 && sysNum <= 260 && diaNum <= 180 && diaNum <= sysNum) {
    let stage = 'Normal BP';
    let stageColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';

    if (sysNum >= 140 || diaNum >= 90) {
      stage = 'Stage 2 Hypertension';
      stageColor = 'text-red-700 bg-red-50 border-red-200';
    } else if ((sysNum >= 130 && sysNum <= 139) || (diaNum >= 80 && diaNum <= 89)) {
      stage = 'Stage 1 Hypertension';
      stageColor = 'text-orange-700 bg-orange-50 border-orange-200';
    } else if (sysNum >= 120 && sysNum <= 129 && diaNum < 80) {
      stage = 'Elevated BP';
      stageColor = 'text-amber-700 bg-amber-50 border-amber-200';
    }
    liveBp = { stage, stageColor };
  }

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear inline error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Inline Validation
  const validateForm = () => {
    const newErrors = {};

    // 1. Age
    if (!formData.age) {
      newErrors.age = 'Age is required.';
    } else {
      const ageNum = Number(formData.age);
      if (isNaN(ageNum) || ageNum <= 0) {
        newErrors.age = 'Age must be a positive number.';
      } else if (ageNum < 10 || ageNum > 120) {
        newErrors.age = 'Please enter a valid age between 10 and 120.';
      }
    }

    // 2. Gender
    if (!formData.gender) {
      newErrors.gender = 'Gender is required.';
    }

    // 3. Height
    if (!formData.height) {
      newErrors.height = 'Height is required.';
    } else {
      const hNum = Number(formData.height);
      if (isNaN(hNum) || hNum <= 0) {
        newErrors.height = 'Height must be a positive number.';
      } else if (hNum < 50 || hNum > 260) {
        newErrors.height = 'Please enter a realistic height (50 - 260 cm).';
      }
    }

    // 4. Weight
    if (!formData.weight) {
      newErrors.weight = 'Weight is required.';
    } else {
      const wNum = Number(formData.weight);
      if (isNaN(wNum) || wNum <= 0) {
        newErrors.weight = 'Weight must be a positive number.';
      } else if (wNum < 20 || wNum > 350) {
        newErrors.weight = 'Please enter a realistic weight (20 - 350 kg).';
      }
    }

    // 5. Systolic BP
    if (!formData.ap_hi) {
      newErrors.ap_hi = 'Systolic blood pressure is required.';
    } else {
      const sNum = Number(formData.ap_hi);
      if (isNaN(sNum) || sNum <= 0) {
        newErrors.ap_hi = 'Systolic BP must be a positive number.';
      } else if (sNum < 60 || sNum > 260) {
        newErrors.ap_hi = 'Please enter a valid systolic BP (60 - 260 mmHg).';
      }
    }

    // 6. Diastolic BP
    if (!formData.ap_lo) {
      newErrors.ap_lo = 'Diastolic blood pressure is required.';
    } else {
      const dNum = Number(formData.ap_lo);
      if (isNaN(dNum) || dNum <= 0) {
        newErrors.ap_lo = 'Diastolic BP must be a positive number.';
      } else if (dNum < 30 || dNum > 180) {
        newErrors.ap_lo = 'Please enter a valid diastolic BP (30 - 180 mmHg).';
      } else if (formData.ap_hi && dNum > Number(formData.ap_hi)) {
        newErrors.ap_lo = 'Diastolic BP cannot exceed Systolic BP.';
      }
    }

    // 7. Cholesterol
    if (!formData.cholesterol) {
      newErrors.cholesterol = 'Cholesterol level is required.';
    }

    // 8. Glucose
    if (!formData.gluc) {
      newErrors.gluc = 'Glucose level is required.';
    }

    // 9. Smoking
    if (!formData.smoke) {
      newErrors.smoke = 'Smoking status is required.';
    }

    // 10. Alcohol
    if (!formData.alco) {
      newErrors.alco = 'Alcohol consumption is required.';
    }

    // 11. Physical Activity
    if (!formData.active) {
      newErrors.active = 'Physical activity status is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Clear Form
  const handleClear = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setApiError('');
  };

  // Populate Example Demo Cases
  const handleLoadDemo = (type) => {
    if (type === 'normal') {
      setFormData({
        age: '52',
        gender: 'Male',
        height: '170',
        weight: '70',
        ap_hi: '120',
        ap_lo: '80',
        cholesterol: 'Normal',
        gluc: 'Normal',
        smoke: 'No',
        alco: 'No',
        active: 'Yes',
      });
    } else if (type === 'moderate') {
      setFormData({
        age: '57',
        gender: 'Female',
        height: '162',
        weight: '76',
        ap_hi: '136',
        ap_lo: '86',
        cholesterol: 'Above Normal',
        gluc: 'Normal',
        smoke: 'No',
        alco: 'No',
        active: 'Yes',
      });
    } else {
      setFormData({
        age: '62',
        gender: 'Male',
        height: '165',
        weight: '92',
        ap_hi: '155',
        ap_lo: '95',
        cholesterol: 'Well Above Normal',
        gluc: 'Above Normal',
        smoke: 'Yes',
        alco: 'Yes',
        active: 'No',
      });
    }
    setErrors({});
    setApiError('');
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        age: parseFloat(formData.age),
        gender: formData.gender,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        ap_hi: parseFloat(formData.ap_hi),
        ap_lo: parseFloat(formData.ap_lo),
        cholesterol: formData.cholesterol,
        gluc: formData.gluc,
        smoke: formData.smoke,
        alco: formData.alco,
        active: formData.active,
      };

      const result = await predictCardioRisk(payload);

      // Navigate to /result with state (ScrollToTop component ensures top of page)
      navigate('/result', {
        state: {
          result,
          patientData: formData,
        },
      });
    } catch (err) {
      setApiError(err.message || 'Unable to connect to the prediction service. Please ensure the backend server is reachable.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-3 shadow-xs">
          <HeartPulse className="w-4 h-4 text-blue-600" />
          Interactive Clinical Assessment
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Patient Risk Examination
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Provide the 11 clinical features below to compute real-time cardiovascular risk probability.
        </p>
      </div>

      {/* Quick Fill Helpers & Presets */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <div>
            <span className="font-semibold text-slate-900 text-xs sm:text-sm">Demo Patient Presets:</span>
            <span className="text-slate-500 text-xs block sm:inline sm:ml-1">Auto-populate test cases for demonstration</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            type="button"
            onClick={() => handleLoadDemo('normal')}
            className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition-colors"
          >
            🟢 Low Risk Demo
          </button>
          <button
            type="button"
            onClick={() => handleLoadDemo('moderate')}
            className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-200 transition-colors"
          >
            🟡 Borderline Demo
          </button>
          <button
            type="button"
            onClick={() => handleLoadDemo('high')}
            className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-800 text-xs font-semibold border border-red-200 transition-colors"
          >
            🔴 High Risk Demo
          </button>
        </div>
      </div>

      {/* Form Completion Progress Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex justify-between items-center text-xs mb-1.5">
          <span className="font-semibold text-slate-700">
            Form Progress: <span className="text-blue-600 font-bold">{filledCount} of 11</span> metrics entered
          </span>
          <span className="font-bold text-slate-500">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Backend API Error Banner */}
      {apiError && (
        <div>
          <ErrorMessage
            title="Prediction Service Error"
            message={apiError}
          />
        </div>
      )}

      {/* Main Form Card */}
      <Card className="border-slate-200 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ============================================================ */}
          {/* 1. BASIC INFORMATION */}
          {/* ============================================================ */}
          <div>
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-5">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">
                1. Patient Demographics
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g. 52"
                unit="years"
                error={errors.age}
              />
              <SelectField
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={['Male', 'Female']}
                placeholder="Select Gender"
                error={errors.gender}
              />
            </div>
          </div>

          {/* ============================================================ */}
          {/* 2. BODY MEASUREMENTS & LIVE BMI */}
          {/* ============================================================ */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-slate-900">
                  2. Anthropometric Measurements
                </h2>
              </div>
              {liveBmi && (
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${liveBmi.catColor}`}>
                  BMI: {liveBmi.val} kg/m² • {liveBmi.category}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField
                label="Height"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleChange}
                placeholder="e.g. 170"
                unit="cm"
                error={errors.height}
              />
              <InputField
                label="Weight"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                placeholder="e.g. 70"
                unit="kg"
                error={errors.weight}
              />
            </div>
          </div>

          {/* ============================================================ */}
          {/* 3. BLOOD PRESSURE & LIVE FEEDBACK */}
          {/* ============================================================ */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-slate-900">
                  3. Arterial Blood Pressure
                </h2>
              </div>
              {liveBp && (
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${liveBp.stageColor}`}>
                  {liveBp.stage}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField
                label="Systolic Blood Pressure"
                name="ap_hi"
                type="number"
                value={formData.ap_hi}
                onChange={handleChange}
                placeholder="e.g. 120"
                unit="mmHg"
                error={errors.ap_hi}
              />
              <InputField
                label="Diastolic Blood Pressure"
                name="ap_lo"
                type="number"
                value={formData.ap_lo}
                onChange={handleChange}
                placeholder="e.g. 80"
                unit="mmHg"
                error={errors.ap_lo}
              />
            </div>
          </div>

          {/* ============================================================ */}
          {/* 4. HEALTH INDICATORS */}
          {/* ============================================================ */}
          <div>
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-5">
              <Droplets className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">
                4. Biochemical Laboratory Tests
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <SelectField
                label="Cholesterol"
                name="cholesterol"
                value={formData.cholesterol}
                onChange={handleChange}
                options={['Normal', 'Above Normal', 'Well Above Normal']}
                placeholder="Select Cholesterol Level"
                error={errors.cholesterol}
              />
              <SelectField
                label="Glucose"
                name="gluc"
                value={formData.gluc}
                onChange={handleChange}
                options={['Normal', 'Above Normal', 'Well Above Normal']}
                placeholder="Select Glucose Level"
                error={errors.gluc}
              />
            </div>
          </div>

          {/* ============================================================ */}
          {/* 5. LIFESTYLE FACTORS */}
          {/* ============================================================ */}
          <div>
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-5">
              <Flame className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">
                5. Lifestyle & Behavioral Factors
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <SelectField
                label="Smoking Status"
                name="smoke"
                value={formData.smoke}
                onChange={handleChange}
                options={['No', 'Yes']}
                placeholder="Select Smoking Status"
                error={errors.smoke}
              />
              <SelectField
                label="Alcohol Consumption"
                name="alco"
                value={formData.alco}
                onChange={handleChange}
                options={['No', 'Yes']}
                placeholder="Select Alcohol Intake"
                error={errors.alco}
              />
              <SelectField
                label="Physical Activity"
                name="active"
                value={formData.active}
                onChange={handleChange}
                options={['No', 'Yes']}
                placeholder="Select Physical Activity"
                error={errors.active}
              />
            </div>
          </div>

          {/* ============================================================ */}
          {/* ACTION BUTTONS */}
          {/* ============================================================ */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Patient data is processed ephemerally and never stored.</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                onClick={handleClear}
                disabled={isLoading}
                icon={RotateCcw}
                className="w-full sm:w-auto"
              >
                Clear Form
              </Button>
              <Button
                type="submit"
                variant="orange"
                size="lg"
                loading={isLoading}
                disabled={isLoading}
                className="w-full sm:w-auto min-w-[220px]"
              >
                Assess Cardiovascular Risk
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
