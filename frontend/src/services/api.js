const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Custom error class for API requests
 */
export class ApiError extends Error {
  constructor(message, status = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Predict cardiovascular disease risk
 * @param {Object} data 11 patient features
 */
export async function predictCardioRisk(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorDetail = 'Prediction request failed.';
      try {
        const errorData = await response.json();
        if (errorData.detail) {
          errorDetail = Array.isArray(errorData.detail)
            ? errorData.detail.map(d => d.msg || d).join(', ')
            : errorData.detail;
        }
      } catch {
        // use fallback message
      }
      throw new ApiError(errorDetail, response.status);
    }

    return await response.json();
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }
    // Network / server offline error
    throw new ApiError(
      'Unable to connect to the prediction service. Please make sure the backend server is running on ' + API_BASE_URL
    );
  }
}

/**
 * Fetch insights derived from cardio_train.csv
 */
export async function fetchInsights() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/insights`);
    if (!response.ok) {
      throw new ApiError('Failed to fetch dataset insights', response.status);
    }
    return await response.json();
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError('Unable to connect to the analytics service.');
  }
}

/**
 * Fetch model information and parameters
 */
export async function fetchModelInfo() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/model-info`);
    if (!response.ok) {
      throw new ApiError('Failed to fetch model info', response.status);
    }
    return await response.json();
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError('Unable to connect to the model information service.');
  }
}

/**
 * Check backend health
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return response.ok;
  } catch {
    return false;
  }
}
