import React from 'react';

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PhysicalAssessment: React.FC<Props> = ({ formData, handleChange }) => {
  return (
    <fieldset className="mb-6 p-4 rounded-lg border border-green-800">
      <legend className="text-lg font-semibold text-green-800">Physical Assessment</legend>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-base font-medium">Blood Pressure</label>
          <input
            type="text"
            name="bloodPressure"
            value={formData.bloodPressure}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900"
          />
        </div>
        <div>
          <label className="block text-base font-medium">Pulse Rate</label>
          <input
            type="text"
            name="pulseRate"
            value={formData.pulseRate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900"
          />
        </div>
        <div>
          <label className="block text-base font-medium">Temperature</label>
          <input
            type="text"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default PhysicalAssessment;
