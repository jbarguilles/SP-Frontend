import React from 'react';

interface PhysicalAssessmentData {
  gait: string;
  appearance: string;
  defects: string;
  weight: string;
  height: string;
  bloodPressure: string;
  pulseRate: string;
  respiratoryRate: string;
  temperature: string;
}

interface Props {
  formData: PhysicalAssessmentData;
  handleChange: (field: string, value: string) => void;
}

const PhysicalAssessment: React.FC<Props> = ({ formData, handleChange }) => {
  return (
    <fieldset className="mb-6 p-4 rounded-lg border border-green-800">
      <legend className="text-lg font-semibold text-green-800">Physical Assessment</legend>
      
      {/* General Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-green-800 mb-4">General</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-base font-medium">Gait</label>
            <input
              type="text"
              value={formData.gait}
              onChange={(e) => handleChange('gait', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900"
            />
          </div>
          <div>
            <label className="block text-base font-medium">Appearance</label>
            <input
              type="text"
              value={formData.appearance}
              onChange={(e) => handleChange('appearance', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900"
            />
          </div>
          <div>
            <label className="block text-base font-medium">Defects</label>
            <input
              type="text"
              value={formData.defects}
              onChange={(e) => handleChange('defects', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900"
            />
          </div>
        </div>
      </div>

      {/* Vital Signs Section */}
      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold text-green-800 mb-4">Vital Signs</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-base font-medium">Weight (kg)</label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900"
            />
          </div>
          <div>
            <label className="block text-base font-medium">Height (cm)</label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => handleChange('height', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900"
            />
          </div>
          <div>
            <label className="block text-base font-medium">Blood Pressure</label>
            <input
              type="text"
              value={formData.bloodPressure}
              onChange={(e) => handleChange('bloodPressure', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900"
            />
          </div>
          <div>
            <label className="block text-base font-medium">Pulse Rate (bpm)</label>
            <input
              type="number"
              value={formData.pulseRate}
              onChange={(e) => handleChange('pulseRate', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900"
            />
          </div>
          <div>
            <label className="block text-base font-medium">Respiratory Rate (/min)</label>
            <input
              type="number"
              value={formData.respiratoryRate}
              onChange={(e) => handleChange('respiratoryRate', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900"
            />
          </div>
          <div>
            <label className="block text-base font-medium">Temperature (°C)</label>
            <input
              type="number"
              value={formData.temperature}
              onChange={(e) => handleChange('temperature', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900"
            />
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default PhysicalAssessment;
