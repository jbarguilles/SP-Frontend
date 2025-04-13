import React from 'react';

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PatientInterview: React.FC<Props> = ({ formData, handleChange }) => {
  return (
    <fieldset className="mb-6 p-4 rounded-lg border border-green-800">
      <legend className="text-lg font-semibold text-green-800">Patient Interview</legend>
      <div className="space-y-4">
        <div>
          <label className="block text-base font-medium">Chief Complaint</label>
          <textarea
            name="chiefComplaint"
            value={formData.chiefComplaint}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-base font-medium">Present Illness</label>
          <textarea
            name="presentIllness"
            value={formData.presentIllness}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-base font-medium">Past Medical History</label>
          <textarea
            name="pastMedicalHistory"
            value={formData.pastMedicalHistory}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900"
            rows={3}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default PatientInterview;
