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

  // Populate Example Demo Case
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
      // Prepare payload with numerical types where required
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

      // Call backend API
      const result = await predictCardioRisk(payload);

      // Navigate to /result with state
      navigate('/result', {
        state: {
          result,
          patientData: formData,
        },
      });
    } catch (err) {
      setApiError(err.message || 'Unable to connect to the prediction service. Please make sure the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-3">
          <HeartPulse className="w-4 h-4 text-blue-600" />
          Clinical Assessment Form
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Cardiovascular Risk Assessment
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Enter the patient's health information to generate an ML-based risk prediction.
        </p>
      </div>

      {/* Quick Fill Helpers */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3.5 bg-white rounded-2xl border border-slate-200/90 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="font-semibold text-slate-700">Quick Test Sample:</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleLoadDemo('normal')}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
          >
            Load Low Risk Sample
          </button>
          <button
            type="button"
            onClick={() => handleLoadDemo('high')}
            className="px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-700 font-medium transition-colors"
          >
            Load High Risk Sample
          </button>
        </div>
      </div>

      {/* Backend API Error Banner */}
      {apiError && (
        <div className="mb-6">
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
                1. Basic Information
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
          {/* 2. BODY MEASUREMENTS */}
          {/* ============================================================ */}
          <div>
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-5">
              <Activity className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">
                2. Body Measurements
              </h2>
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
          {/* 3. BLOOD PRESSURE */}
          {/* ============================================================ */}
          <div>
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-5">
              <Gauge className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">
                3. Blood Pressure
              </h2>
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
                4. Health Indicators
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
          {/* 5. LIFESTYLE */}
          {/* ============================================================ */}
          <div>
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-5">
              <Flame className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">
                5. Lifestyle Factors
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <SelectField
                label="Smoking"
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
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
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
              className="w-full sm:w-auto min-w-[200px]"
            >
              Predict Cardio Risk
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
