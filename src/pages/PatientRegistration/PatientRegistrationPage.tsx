import React, { useState, useEffect } from "react";
import { z } from "zod";

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
  
  useEffect(() => {
    if (formData.birthdate) {
      const birthDate = new Date(formData.birthdate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      formSchema.parse(formData); // Will throw if invalid
      setErrors({});
      // Handle form submission
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
                className="w-full p-2 border border-gray-400 rounded-lg "
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
                className="w-full p-2 border border-gray-400 rounded-lg"
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
                className="w-full p-2 border border-gray-400 rounded-lg"
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
                className="w-full p-2 border border-gray-400 rounded-lg"
              />
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
                  className="w-full p-2 border border-gray-400 rounded-lg"
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
                  className="w-full p-2 border border-gray-400 rounded-lg"
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
                  className="w-full p-2 border border-gray-400 rounded-lg"
                />
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
                  className="w-full p-2 border border-gray-400 rounded-lg cursor-auto"
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
                className="w-full p-2 border border-gray-400 rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="barangay" className="block text-base font-medium">
                Barangay
              </label>
              <input
                type="text"
                name="barangay"
                value={formData.barangay}
                onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="block text-base font-medium">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="province" className="block text-base font-medium">
                Province
              </label>
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="region" className="block text-base font-medium">
                Region
              </label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded-lg"
              />
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
                className="w-full p-2 border border-gray-400 rounded-lg"
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
                className="w-full p-2 border border-gray-400 rounded-lg"
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
                className="w-full p-2 border border-gray-400 rounded-lg"
              />
            </div>
          </fieldset>

          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
