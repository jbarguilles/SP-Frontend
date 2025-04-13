import React from 'react';

interface ProblemListData {
  [key: string]: string | boolean;
  attending_clinician: string;
  management_of_periodontal_disease: boolean;
  od_class_i: boolean;
  od_class_i_toothnum: string;
  od_class_ii: boolean;
  od_class_ii_toothnum: string;
  od_class_iii: boolean;
  od_class_iii_toothnum: string;
  od_class_iv: boolean;
  od_class_iv_toothnum: string;
  od_class_v: boolean;
  od_class_v_toothnum: string;
  od_onlay: boolean;
  od_onlay_toothnum: string;

  surgery_extraction: boolean;
  surgery_extraction_toothnum: string;
  surgery_odontectomy: boolean;
  surgery_odontectomy_toothnum: string;
  surgery_special_case: boolean;
  surgery_special_case_toothnum: string;
  surgery_pedodontics: boolean;
  surgery_pedodontics_toothnum: string;
  surgery_orthodontics: boolean;
  surgery_orthodontics_toothnum: string;

  et_pulp_sedation: boolean;
  et_recementation_of_crowns: boolean;
  et_temporary_fillings: boolean;
  et_management_of_acute_infections: boolean;
  et_management_of_traumatic_injuries: boolean;

  fpd_laminates_veneers: boolean;
  fpd_laminates_veneers_tooth_number: string;
  fpd_single_crown: boolean;
  fpd_single_crown_tooth_number: string;
  fpd_bridge: boolean;
  fpd_bridge_tooth_number: string;

  endodontics_anterior: boolean;
  endodontics_anterior_tooth_number: string;
  endodontics_posterior: boolean;
  endodontics_posterior_tooth_number: string;
  endodontics_others: boolean;
  endodontics_others_tooth_number: string;
  endodontics_others_specify: string;

  p_complete_denture: boolean;
  p_single_denture: boolean;
  p_removable_partial_denture: boolean;
  p_other_denture_services: boolean;
}

interface Props {
  formData: ProblemListData;
  handleChange: (field: string, value: string | boolean) => void;
}

const ProblemList: React.FC<Props> = ({ formData, handleChange }) => {
  return (
    <fieldset className="mb-6 p-4 rounded-lg border border-green-800">
      <legend className="text-lg font-semibold text-green-800">Problem List</legend>
      
      <div className="space-y-6">
        {/* Clinician Info */}
        <div>
          <label className="block text-base font-medium">Attending Clinician</label>
          <input
            type="text"
            value={formData.attending_clinician}
            onChange={(e) => handleChange('attending_clinician', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Periodontics Section */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Periodontics</h3>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.management_of_periodontal_disease}
              onChange={(e) => handleChange('management_of_periodontal_disease', e.target.checked)}
              className="rounded border-gray-300"
            />
            <label>Management of Periodontal Disease</label>
          </div>
        </div>

        {/* Operative Dentistry Section */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Operative Dentistry</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Class I', field: 'od_class_i' },
              { label: 'Class II', field: 'od_class_ii' },
              { label: 'Class III', field: 'od_class_iii' },
              { label: 'Class IV', field: 'od_class_iv' },
              { label: 'Class V', field: 'od_class_v' },
              { label: 'Onlay', field: 'od_onlay' },
            ].map(({ label, field }) => (
              <div key={field} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData[field as keyof ProblemListData] as boolean}
                    onChange={(e) => handleChange(field, e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label>{label}</label>
                </div>
                <input
                  type="text"
                  placeholder="Tooth Number"
                  value={formData[`${field}_toothnum`] as string}
                  onChange={(e) => handleChange(`${field}_toothnum`, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Add other sections (Surgery, Emergency Treatment, etc.) following the same pattern */}
      </div>
    </fieldset>
  );
};

export default ProblemList;
