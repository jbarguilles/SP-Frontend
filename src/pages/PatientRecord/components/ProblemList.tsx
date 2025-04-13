import React from 'react';

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ProblemList: React.FC<Props> = ({ formData, handleChange }) => {
  return (
    <fieldset className="mb-6 p-4 rounded-lg border border-green-800">
      <legend className="text-lg font-semibold text-green-800">Problem List</legend>
      <div>
        <label className="block text-base font-medium">Problems</label>
        <textarea
          name="problems"
          value={formData.problems.join(", ")}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900"
          rows={4}
        />
      </div>
    </fieldset>
  );
};

export default ProblemList;
