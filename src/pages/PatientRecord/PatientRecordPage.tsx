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
    patientInformationData: {
      firstname: "Juan",
      middlename: "Santos",
      lastname: "Dela Cruz",
      suffix: "Jr",
      sex: "Male",
      civilstatus: "Single",
      birthdate: "1990-01-01",
      age: 33,
      houseStreetSubdivision: "123 Main Street, Green Village",
      barangay: "San Antonio",
      city: "Makati",
      province: "Metro Manila",
      region: "NCR",
      cellphone: "+63 912 345 6789",
      emergencyContact: "Maria Dela Cruz",
      emergencyNumber: "+63 998 765 4321",
      relationship: "Mother"
    },
    dentalStatusData: {
      teethNotes: ""
    },
    softTissueData: {
      lips: "",
      gingiva: "",
      tongue: "",
      oralMucosa: ""
    },
    radiographicData: {
      radiographicFindings: ""
    },
    physicalAssessmentData: {
      gait: "",
      appearance: "",
      defects: "",
      weight: "",
      height: "",
      bloodPressure: "",
      pulseRate: "",
      temperature: "",
      respiratoryRate: ""
    },
    patientInterviewData: {
      chiefComplaintAndHistory: "",
      lastDentalVisit: "",
      dentalVisitFrequency: "",
      lastVisitProcedures: "",
      anesthesiaResponse: "",
      dentalComplications: "",
      underPhysicianCare: "",
      physicianName: "",
      physicianPhone: "",
      everHospitalized: "",
      hospitalizationDate: "",
      hospitalizationReason: "",
      allergies: "",
      illnesses: "",
      medications: "",
      childhoodDiseases: "",
      medicalUpdate: "",
      socialHistory: ""
    },
    problemListData: {
      attending_clinician: "",
      management_of_periodontal_disease: false,
      od_class_i: false,
      od_class_i_toothnum: "",
      od_class_ii: false,
      od_class_ii_toothnum: "",
      od_class_iii: false,
      od_class_iii_toothnum: "",
      od_class_iv: false,
      od_class_iv_toothnum: "",
      od_class_v: false,
      od_class_v_toothnum: "",
      od_onlay: false,
      od_onlay_toothnum: "",
      
      // Adding missing fields from ProblemListData interface
      et_pulp_sedation: false,
      et_recementation_of_crowns: false, 
      et_temporary_fillings: false,
      et_management_of_acute_infections: false,
      et_management_of_traumatic_injuries: false,
      
      fpd_laminates_veneers: false,
      fpd_laminates_veneers_tooth_number: "",
      fpd_single_crown: false,
      fpd_single_crown_tooth_number: "",
      fpd_bridge: false,
      fpd_bridge_tooth_number: "",
      
      endodontics_anterior: false,
      endodontics_anterior_tooth_number: "",
      endodontics_posterior: false,
      endodontics_posterior_tooth_number: "",
      endodontics_others: false,
      endodontics_others_tooth_number: "",
      endodontics_others_specify: "",
      
      p_complete_denture: false,
      p_single_denture: false,
      p_removable_partial_denture: false,
      p_other_denture_services: false,
      
      // Keeping existing fields
      rpd_maxillary: false,
      rpd_mandibular: false,
      cd_maxillary: false,
      cd_mandibular: false,
      extraction: false,
      extraction_toothnum: "",
      surgery_extraction: false,
      surgery_extraction_toothnum: "",
      surgery_odontectomy: false,
      surgery_odontectomy_toothnum: "",
      surgery_special_case: false,
      surgery_special_case_toothnum: "",
      surgery_pedodontics: false,
      surgery_pedodontics_toothnum: "",
      surgery_orthodontics: false,
      surgery_orthodontics_toothnum: "",
      endodontic_treatment: false,
      endodontic_treatment_toothnum: "",
      crown_bridge: false,
      crown_bridge_toothnum: "",
      orthodontic_treatment: false,
      orthodontic_treatment_desc: "",
      periodontal_treatment: false,
      periodontal_treatment_desc: "",
      pedodontic_treatment: false,
      pedodontic_treatment_desc: "",
      full_mouth_rehabilitation: false,
      dental_implants: false,
      others: false,
      others_desc: ""
    }
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, 
    section: string
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [name]: value
      }
    }));
  };

  // Update handleChange for ProblemList to support both string and boolean values
  const handleProblemListChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      problemListData: {
        ...prev.problemListData,
        [field]: value
      }
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
        return <PatientInformation formData={formData} />;
      case 2:
        return <PatientInterview 
          formData={formData.patientInterviewData} 
          handleChange={(e) => handleChange(e, 'patientInterviewData')} 
        />;
      case 3:
        return <PhysicalAssessment 
          formData={formData.physicalAssessmentData} 
          handleChange={(field, value) => {
            setFormData(prev => ({
              ...prev,
              physicalAssessmentData: {
                ...prev.physicalAssessmentData,
                [field]: value
              }
            }));
          }} 
        />;
      case 4:
        return <SoftTissueExamination 
          formData={formData.softTissueData} 
          handleChange={(e) => handleChange(e, 'softTissueData')} 
        />;
      case 5:
        return <DentalStatusCharting 
          formData={formData.dentalStatusData} 
          handleChange={(e) => handleChange(e, 'dentalStatusData')} 
        />;
      case 6:
        return <RadiographicExamination 
          formData={formData.radiographicData} 
          handleChange={(e) => handleChange(e, 'radiographicData')} 
        />;
      case 7:
        return <ProblemList 
          formData={formData.problemListData} 
          handleChange={handleProblemListChange} 
        />;
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
              className={`px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 cursor-pointer ${
                currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={currentStep === 1}
            >
              Previous
            </button>

            {currentStep === totalSteps ? (
              <button
                type="submit"
                className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 cursor-pointer"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 cursor-pointer"
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