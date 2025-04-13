import React from 'react';

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

interface Props {
  patientData: PatientData;
}

const PatientInformation: React.FC<Props> = ({ patientData }) => {
  return (
    <fieldset className="mb-6 p-4 rounded-lg border border-green-800">
      <legend className="text-lg font-semibold text-green-800">Patient Information</legend>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <p className="mt-1 text-lg font-semibold">
              {`${patientData.firstname} ${patientData.middlename} ${patientData.lastname} ${patientData.suffix}`.trim()}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Personal Information</label>
            <p className="mt-1">Sex: {patientData.sex}</p>
            <p className="mt-1">Civil Status: {patientData.civilstatus}</p>
            <p className="mt-1">Birthdate: {patientData.birthdate}</p>
            <p className="mt-1">Age: {patientData.age}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <p className="mt-1">{patientData.cellphone}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Complete Address</label>
            <p className="mt-1">{patientData.houseStreetSubdivision}</p>
            <p className="mt-1">Barangay {patientData.barangay}</p>
            <p className="mt-1">{patientData.city}</p>
            <p className="mt-1">{patientData.province}</p>
            <p className="mt-1">{patientData.region}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
            <p className="mt-1">Name: {patientData.emergencyContact}</p>
            <p className="mt-1">Contact Number: {patientData.emergencyNumber}</p>
            <p className="mt-1">Relationship: {patientData.relationship}</p>
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default PatientInformation;
