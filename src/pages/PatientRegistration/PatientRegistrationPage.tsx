import React, { useState, useEffect } from "react";
import { z } from "zod";
import { RegionData, PhilippinesData, ProvinceData, MunicipalityList } from '../../types/location';
import philippineLocations from '../../data/ph.json';
import { fillPatientRegistrationForm } from '../../utils/testUtils'; //test this using window.fillPatientRegistrationForm()
import { TestButton } from '../../components/TestButton';

// Define the form schema with zod
const formSchema = z.object({
  firstname: z.string().min(2).max(50).nonempty(),
  middlename: z.string(),
  lastname: z.string(),
  suffix: z.string(),
  sex: z.enum(["Male", "Female"]),
  civilstatus: z.enum(["Single", "Married", "Widowed", "Divorced"]),
  birthdate: z.string(),
  age: z.number(),
  houseStreetSubdivision: z.string(),
  barangay: z.string(),
  city: z.string(),
  province: z.string(),
  region: z.string(),
  cellphone: z.string().min(11).max(11).startsWith("09"),
  emergencyContact: z.string(),
  emergencyNumber: z.string(),
  relationship: z.string(),
});

const phData:PhilippinesData = philippineLocations;

const toTitleCase = (str: string) => {
  const lowercaseWords = ['na', 'of', 'and', 'the', 'in', 'on', 'at', 'to'];
  // Split by whitespace and handle each word
  return str.toLowerCase().split(' ').map((word, index) => {
    // Check if word is a Roman numeral
    if (/^[IVXLCDM]+$/i.test(word)) {
      return word.toUpperCase();
    }
    // Keep lowercase for specified words unless it's the first word
    if (index !== 0 && lowercaseWords.includes(word.toLowerCase())) {
      return word.toLowerCase();
    }
    // Capitalize first letter of other words
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};

export function ProfileForm() {
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
  
  const [formattedDate, setFormattedDate] = useState<string>("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [patientId, setPatientId] = useState("");

  const regionOrder = ["NCR", "CAR", "01", "02", "03", "4A", "4B", "05", "06", "07", "08", "09", "10", "11", "12", "13", "BARMM"]; // in the order you want
  const [regions] = useState<PhilippinesData>(phData);
  const [provinces, setProvinces] = useState<Record<string, ProvinceData>>({});
  const [municipalities, setMunicipalities] = useState<MunicipalityList>({});
  const [barangays, setBarangays] = useState<string[]>([]);

  useEffect(() => {
    if (formData.birthdate) {
      const birthDate = new Date(formData.birthdate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      // Format the date
      const formatted = birthDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      setFormattedDate(formatted);

      // If the current month is before the birth month or the current day is before the birth day, subtract 1 from the age
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        setFormData((prevData) => ({
          ...prevData,
          age: age - 1,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          age: age,
        }));
      }
    }
  }, [formData.birthdate]); // This hook runs every time the birthdate changes

  useEffect(() => {
    // Ensure the function is available globally
    window.fillPatientRegistrationForm = fillPatientRegistrationForm;
  }, []);

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegion = regions[e.target.value];
    setProvinces(selectedRegion?.province_list || {});
    setMunicipalities({});
    setBarangays([]);
    handleSelectChange(e);
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProvince = provinces[e.target.value];
    setMunicipalities(selectedProvince?.municipality_list || {});
    setBarangays([]);
    handleSelectChange(e);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMunicipality = municipalities[e.target.value];
    setBarangays(selectedMunicipality?.barangay_list || []);
    handleSelectChange(e);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      formSchema.parse(formData); // Will throw if invalid
      setErrors({});
      // Generate a random patient ID (you might want to replace this with your actual ID generation logic)
      const generatedId = `PAT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setPatientId(generatedId);
      setShowSuccessModal(true);
      console.log("Form submitted successfully:", formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const parsedErrors = err.errors.reduce((acc: any, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setErrors(parsedErrors);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-10">
      <TestButton />
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex flex-col items-center">
              <div className="mb-4 bg-green-100 p-3 rounded-full">
                <svg
                  className="w-12 h-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-green-600">Registration Successful!</h2>
              <p className="text-gray-600 mb-4">Your patient ID is:</p>
              <p className="text-xl font-bold text-gray-800 mb-6">{patientId}</p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="w-[60%] bg-white p-6 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-red-900">Patient Registration</h1>

        <form onSubmit={handleSubmit}>
          {/* Name, Sex, Civil Status, Birthdate, and Age */}
          <fieldset className="mb-6 p-4 rounded-lg border border-green-800">
            <legend className="text-lg font-semibold text-green-800">Personal Information</legend>

            <div className="mb-4">
              <label htmlFor="firstname" className="block text-base font-medium">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900"
              />
              {errors.firstname && <p className="text-red-500">{errors.firstname}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="middlename" className="block text-base font-medium">
                Middle Name
              </label>
              <input
                type="text"
                name="middlename"
                value={formData.middlename}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lastname" className="block text-base font-medium">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lastname" className="block text-base font-medium">
                Suffix
              </label>
              <input
                type="text"
                name="suffix"
                value={formData.suffix}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="cellphone" className="block text-base font-medium">
                Cellphone Number
              </label>
              <input
                type="text"
                name="cellphone"
                value={formData.cellphone}
                onChange={handleChange}
                placeholder="09XXXXXXXXX"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900"
              />
              {errors.cellphone && <p className="text-red-500">{errors.cellphone}</p>}
            </div>

            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <label htmlFor="sex" className="block text-base font-medium">
                  Sex
                </label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleSelectChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="w-1/2">
                <label htmlFor="civilstatus" className="block text-base font-medium">
                  Civil Status
                </label>
                <select
                  name="civilstatus"
                  value={formData.civilstatus}
                  onChange={handleSelectChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900"
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>
            </div>

            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <label htmlFor="birthdate" className="block text-base font-medium">
                  Birthdate
                </label>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900"
                />
                {formattedDate && (
                  <p className="mt-1 text-sm text-gray-600">{formattedDate}</p>
                )}
              </div>

              <div className="w-1/2">
                <label htmlFor="age" className="block text-base font-medium">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg cursor-auto focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900"
                  readOnly
                />
              </div>
            </div>
          </fieldset>

          {/* Address */}
          <fieldset className="mb-6 p-4 rounded-lg border border-green-800">
            <legend className="text-lg font-semibold text-green-800">Address</legend>

            <div className="mb-4">
              <label htmlFor="houseStreetSubdivision" className="block text-base font-medium">
                House/Street/Subdivision
              </label>
              <input
                type="text"
                name="houseStreetSubdivision"
                value={formData.houseStreetSubdivision}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="region" className="block text-base font-medium">
                Region
              </label>
              <select
                name="region"
                value={formData.region}
                onChange={handleRegionChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900"
              >
                <option value="">Select Region</option>
                {regionOrder.map((key) => (
                  <option key={key} value={key}>{regions[key].region_name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="province" className="block text-base font-medium">
                Province
              </label>
              <select
                name="province"
                value={formData.province}
                onChange={handleProvinceChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900"
                disabled={!formData.region}
              >
                <option value="">Select Province</option>
                {Object.keys(provinces).map(province => (
                  <option key={province} value={province}>{toTitleCase(province)}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="block text-base font-medium">
                City/Municipality
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleCityChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900"
                disabled={!formData.province}
              >
                <option value="">Select City/Municipality</option>
                {Object.keys(municipalities).map(municipality => (
                  <option key={municipality} value={municipality}>
                    {toTitleCase(municipality)}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="barangay" className="block text-base font-medium">
                Barangay
              </label>
              <select
                name="barangay"
                value={formData.barangay}
                onChange={handleSelectChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900"
                disabled={!formData.city}
              >
                <option value="">Select Barangay</option>
                {barangays.map(barangay => (
                  <option key={barangay} value={barangay}>{toTitleCase(barangay)}</option>
                ))}
              </select>
            </div>
          </fieldset>

          {/* Emergency Contact */}
          <fieldset className="mb-6 p-4 rounded-lg border border-green-800">
            <legend className="text-lg font-semibold text-green-800">Emergency Contact</legend>

            <div className="mb-4">
              <label htmlFor="emergencyContact" className="block text-base font-medium">
                Name
              </label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="emergencyNumber" className="block text-base font-medium">
                Number
              </label>
              <input
                type="text"
                name="emergencyNumber"
                value={formData.emergencyNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="relationship" className="block text-base font-medium">
                Relationship
              </label>
              <input
                type="text"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900"
              />
            </div>
          </fieldset>

          <button 
            type="submit" 
            className="w-full p-2 bg-red-900 text-white rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2 transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
