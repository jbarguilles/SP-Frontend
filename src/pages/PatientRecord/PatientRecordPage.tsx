import React, { useState } from 'react';
import { z } from 'zod';
import PatientInformation from './components/PatientInformation';
import PatientInterview from './components/PatientInterview';
import PhysicalAssessment from './components/PhysicalAssessment';
import SoftTissueExamination from './components/SoftTissueExamination';
import DentalStatusCharting from './components/DentalStatusCharting';
import RadiographicExamination from './components/RadiographicExamination';
import ProblemList from './components/ProblemList';

const formSchema = z.object({
  // Patient Information (will be pre-filled from registration)
  patientId: z.string(),
  
  // Patient Interview
  chiefComplaint: z.string(),
  presentIllness: z.string(),
  pastMedicalHistory: z.string(),
  medications: z.string(),
  allergies: z.string(),
  familyHistory: z.string(),
  
  // Physical Assessment
  bloodPressure: z.string(),
  pulseRate: z.string(),
  temperature: z.string(),
  
  // Soft Tissue Examination
  lips: z.string(),
  gingiva: z.string(),
  tongue: z.string(),
  oralMucosa: z.string(),
  
  // Dental Status
  teethNotes: z.string(),
  
  // Radiographic Exam
  radiographicFindings: z.string(),
  
  // Problem List
  problems: z.array(z.string())
});

export function PatientRecordForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    suffix: "",
    sex: "Male",
    civilstatus: "Single",
    birthdate: "",
    age: 0,
    houseStreetSubdivision: "",
    barangay: "",
    city: "",
    province: "",
    region: "",
    cellphone: "",
    emergencyContact: "",
    emergencyNumber: "",
    relationship: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  const steps = {
    1: "Patient Information",
    2: "Patient Interview",
    3: "Physical Assessment",
    4: "Soft Tissue Examination",
    5: "Dental Status Charting",
    6: "Radiographic Examination",
    7: "Problem List"
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      formSchema.parse(formData);
      console.log("Form submitted:", formData);
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PatientInformation patientData={formData} />;
      case 2:
        return <PatientInterview formData={formData} handleChange={handleChange} />;
      case 3:
        return <PhysicalAssessment formData={formData} handleChange={handleChange} />;
      case 4:
        return <SoftTissueExamination formData={formData} handleChange={handleChange} />;
      case 5:
        return <DentalStatusCharting formData={formData} handleChange={handleChange} />;
      case 6:
        return <RadiographicExamination formData={formData} handleChange={handleChange} />;
      case 7:
        return <ProblemList formData={formData} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center min-h-screen py-10">
      <div className="w-[80%] bg-white p-6 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-red-900">Patient Record</h1>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {Object.entries(steps).map(([step, label]) => (
              <button
                key={step}
                onClick={() => setCurrentStep(Number(step))}
                className={`px-4 py-2 rounded cursor-pointer ${
                  currentStep === Number(step)
                    ? 'bg-red-900 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-red-900 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {renderStep()}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={prevStep}
              className={`px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 ${
                currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={currentStep === 1}
            >
              Previous
            </button>

            {currentStep === totalSteps ? (
              <button
                type="submit"
                className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientRecordForm;
