import React, { useState } from 'react';

interface PatientData {
  firstname: string;
  middlename: string;
  lastname: string;
  suffix: string;
  sex: string;
  civilstatus: string;
  birthdate: string;
  age: number;
  houseStreetSubdivision: string;
  barangay: string;
  city: string;
  province: string;
  region: string;
  cellphone: string;
  emergencyContact: string;
  emergencyNumber: string;
  relationship: string;
}

// Define props interface to accept patientData
interface PatientInformationProps {
  patientData: PatientData;
}

const PatientInformation: React.FC<PatientInformationProps> = ({ patientData }) => {
  const [patientId, setPatientId] = useState('P-001'); // Pre-filled ID for preview
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!patientId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/patients/${patientId}`); // adjust API endpoint as needed
      // Note: We're not setting patient data here because it's now coming from props
      // and should be managed in the parent component
      console.log('Fetched data:', await response.json());
    } catch (error) {
      console.error('Error fetching patient data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Patient ID</label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="flex-1 rounded-l-md border border-gray-300 px-3 py-2"
            placeholder="Enter Patient ID"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="rounded-r-md border border-l-0 border-green-800 bg-green-800 px-4 py-2 text-white hover:bg-green-700"
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>

      {patientData && (
        <fieldset className="mb-6 p-4 rounded-lg border border-green-800">
          <legend className="text-lg font-semibold text-green-800">Patient Information</legend>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-bold text-gray-900">Full Name</label>
                <p className="mt-1 text-base font-semibold">
                  {`${patientData.firstname} ${patientData.middlename} ${patientData.lastname} ${patientData.suffix}`.trim()}
                </p>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900">Personal Information</label>
                <p className="mt-1">Sex: {patientData.sex}</p>
                <p className="mt-1">Civil Status: {patientData.civilstatus}</p>
                <p className="mt-1">Birthdate: {patientData.birthdate}</p>
                <p className="mt-1">Age: {patientData.age}</p>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900">Contact Number</label>
                <p className="mt-1">{patientData.cellphone}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-lg font-bold text-gray-900">Complete Address</label>
                <p className="mt-1">{patientData.houseStreetSubdivision}</p>
                <p className="mt-1">Barangay {patientData.barangay}</p>
                <p className="mt-1">{patientData.city}</p>
                <p className="mt-1">{patientData.province}</p>
                <p className="mt-1">{patientData.region}</p>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900">Emergency Contact</label>
                <p className="mt-1">Name: {patientData.emergencyContact}</p>
                <p className="mt-1">Contact Number: {patientData.emergencyNumber}</p>
                <p className="mt-1">Relationship: {patientData.relationship}</p>
              </div>
            </div>
          </div>
        </fieldset>
      )}
    </div>
  );
};

export default PatientInformation;