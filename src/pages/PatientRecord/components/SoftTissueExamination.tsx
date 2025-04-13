import React from 'react';

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const SoftTissueExamination: React.FC<Props> = ({ formData, handleChange }) => {
  return (
    <fieldset className="mb-6 p-4 rounded-lg border border-green-800">
      <legend className="text-lg font-semibold text-green-800">Soft Tissue Examination</legend>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium">Lips</label>
          <textarea
            name="lips"
            value={formData.lips}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900"
            rows={2}
          />
        </div>
        <div>
          <label className="block text-base font-medium">Gingiva</label>
          <textarea
            name="gingiva"
            value={formData.gingiva}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900"
            rows={2}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default SoftTissueExamination;
