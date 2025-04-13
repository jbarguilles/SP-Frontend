import React, { useState, useEffect } from 'react';

interface RadiographEntry {
  id: string;
  radiographType: string;
  findings: string;
  images: File[];
}

interface RadiographicData {
  entries: RadiographEntry[];
}

interface Props {
  formData: RadiographicData;
  handleChange: (field: string, value: any) => void;
}

const RadiographicExamination: React.FC<Props> = ({ formData, handleChange }) => {
  const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string[] }>({});

  // Initialize with one entry if none exist
  useEffect(() => {
    if (!formData.entries || formData.entries.length === 0) {
      const initialEntry: RadiographEntry = {
        id: Date.now().toString(),
        radiographType: '',
        findings: '',
        images: []
      };
      handleChange('entries', {
        target: {
          name: 'entries',
          value: [initialEntry]
        }
      });
    }
  }, []);

  const radiographTypes = [
    "Periapical Radiograph",
    "Panoramic Radiograph",
    "Bitewing Radiograph",
    "Occlusal Radiograph",
    // Add more types as needed
  ];

  const addNewEntry = () => {
    const newEntry: RadiographEntry = {
      id: Date.now().toString(),
      radiographType: '',
      findings: '',
      images: []
    };
    handleChange('entries', {
      target: {
        name: 'entries',
        value: [...(formData.entries || []), newEntry]
      }
    });
  };

  const removeEntry = (id: string) => {
    // Don't allow removing the last entry
    if (formData.entries.length <= 1) {
      return;
    }
    
    // Cleanup preview URLs
    if (previewUrls[id]) {
      previewUrls[id].forEach(url => URL.revokeObjectURL(url));
    }
    handleChange('entries', {
      target: {
        name: 'entries',
        value: formData.entries.filter(entry => entry.id !== id)
      }
    });
    const newPreviewUrls = { ...previewUrls };
    delete newPreviewUrls[id];
    setPreviewUrls(newPreviewUrls);
  };

  const handleEntryChange = (id: string, field: string, value: any) => {
    handleChange('entries', {
      target: {
        name: 'entries',
        value: formData.entries.map(entry => 
          entry.id === id ? { ...entry, [field]: value } : entry
        )
      }
    });
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const entry = formData.entries.find(e => e.id === id);
    if (entry) {
      handleEntryChange(id, 'images', [...entry.images, ...files]);
      
      // Create preview URLs
      const newUrls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => ({
        ...prev,
        [id]: [...(prev[id] || []), ...newUrls]
      }));
    }
  };

  // If entries is undefined or empty, show a loading message
  if (!formData.entries || formData.entries.length === 0) {
    return (
      <fieldset className="mb-6 p-4 rounded-lg border border-green-800">
        <legend className="text-lg font-semibold text-green-800">Radiographic Examination</legend>
        <p>Initializing...</p>
      </fieldset>
    );
  }

  return (
    <fieldset className="mb-6 p-4 rounded-lg border border-green-800">
      <legend className="text-lg font-semibold text-green-800">Radiographic Examination</legend>
      
      <div className="space-y-6">
        {formData.entries.map((entry) => (
          <div key={entry.id} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-green-800">Radiograph Entry</h3>
              {formData.entries.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEntry(entry.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>

            <div>
              <label className="block text-base font-medium mb-2">Type of Radiograph</label>
              <select
                value={entry.radiographType}
                onChange={(e) => handleEntryChange(entry.id, 'radiographType', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Type</option>
                {radiographTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-base font-medium mb-2">Upload Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(entry.id, e)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                {previewUrls[entry.id]?.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Radiograph ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = [...entry.images];
                        newImages.splice(index, 1);
                        handleEntryChange(entry.id, 'images', newImages);
                        URL.revokeObjectURL(url);
                        const newUrls = [...previewUrls[entry.id]];
                        newUrls.splice(index, 1);
                        setPreviewUrls(prev => ({ ...prev, [entry.id]: newUrls }));
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-base font-medium mb-2">Findings</label>
              <textarea
                value={entry.findings}
                onChange={(e) => handleEntryChange(entry.id, 'findings', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows={4}
              />
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <button
            type="button"
            onClick={addNewEntry}
            className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700"
          >
            Add New Radiograph
          </button>
        </div>
      </div>
    </fieldset>
  );
};

export default RadiographicExamination;