import React from 'react';

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const PatientInterview: React.FC<Props> = ({ formData, handleChange }) => {
  return (
    <fieldset className="mb-6 p-4 rounded-lg border border-green-800">
      <legend className="text-lg font-semibold text-green-800">Patient Interview</legend>
      <div className="space-y-6">
        <div>
          <label className="block text-base font-medium">Chief Complaint and History of Present Illness</label>
          <textarea
            name="chiefComplaintAndHistory"
            value={formData.chiefComplaintAndHistory}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900"
            rows={3}
          />
        </div>

        {/* Dental History Section */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Dental History</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Date of Last Visit</label>
              <input
                type="date"
                name="lastDentalVisit"
                value={formData.lastDentalVisit}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Frequency of Dental Visit</label>
              <input
                type="text"
                name="dentalVisitFrequency"
                value={formData.dentalVisitFrequency}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="e.g., Every 6 months"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Procedures Done on Last Visit</label>
              <textarea
                name="lastVisitProcedures"
                value={formData.lastVisitProcedures}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Local Anesthesia Response</label>
              <textarea
                name="anesthesiaResponse"
                value={formData.anesthesiaResponse}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Dental Procedure Complications</label>
              <textarea
                name="dentalComplications"
                value={formData.dentalComplications}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Medical History Section */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Medical History</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium">Under Physician's Care?</label>
                <select
                  name="underPhysicianCare"
                  value={formData.underPhysicianCare}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              {formData.underPhysicianCare === 'yes' && (
                <>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium">Physician's Name</label>
                    <input
                      type="text"
                      name="physicianName"
                      value={formData.physicianName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Physician's Phone</label>
                    <input
                      type="tel"
                      name="physicianPhone"
                      value={formData.physicianPhone}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Ever Hospitalized?</label>
                <select
                  name="everHospitalized"
                  value={formData.everHospitalized}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              {formData.everHospitalized === 'yes' && (
                <>
                  <div>
                    <label className="block text-sm font-medium">When?</label>
                    <input
                      type="date"
                      name="hospitalizationDate"
                      value={formData.hospitalizationDate}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium">For What?</label>
                    <textarea
                      name="hospitalizationReason"
                      value={formData.hospitalizationReason}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      rows={2}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium">Allergies</label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Current Illnesses</label>
                <textarea
                  name="illnesses"
                  value={formData.illnesses}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Current Medications</label>
                <textarea
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Childhood Disease History</label>
                <textarea
                  name="childhoodDiseases"
                  value={formData.childhoodDiseases}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Medical Update</label>
                <textarea
                  name="medicalUpdate"
                  value={formData.medicalUpdate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={2}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social History Section */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Social History</h3>
          <textarea
            name="socialHistory"
            value={formData.socialHistory}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={3}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default PatientInterview;
