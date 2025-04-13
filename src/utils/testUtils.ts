declare global {
    interface Window {
      fillPatientRegistrationForm: () => void;
    }
  }
  
  const sampleData = {
    firstname: "Jade Andrey",
    middlename: "Bagang",
    lastname: "Arguilles",
    suffix: "",
    sex: "Male",
    civilstatus: "Single",
    birthdate: "2003-05-18",
    age: 21,
    houseStreetSubdivision: "#44 Block 3 K9 Area Samabana Purok 6D",
    barangay: "LOWER BICUTAN",
    city: "Taguig",
    province: "Taguig - Pateros",
    region: "NCR",
    cellphone: "09086546024",
    emergencyContact: "Analyn B. Arguilles",
    emergencyNumber: "09669103192",
    relationship: "Mother"
  };
  
  export const fillPatientRegistrationForm = async () => {
    const form = document.querySelector('form');
    if (!form) return;

    // Enhanced trigger events to better work with React state
    const triggerEvents = (element: HTMLElement) => {
      const events = [
        new Event('focus', { bubbles: true }),
        new Event('input', { bubbles: true }),
        new Event('change', { bubbles: true }),
        new Event('blur', { bubbles: true })
      ];
      
      events.forEach(event => {
        element.dispatchEvent(event);
      });
    };

    // Set field value with React-friendly event simulation
    const setFieldValue = async (fieldName: string, value: string) => {
      try {
        const element = form.querySelector(`[name="${fieldName}"]`) as HTMLInputElement | HTMLSelectElement;
        if (!element) return false;

        // Set the value
        if (element instanceof HTMLSelectElement) {
          element.value = value;
        } else {
          // For input elements, use Object.getOwnPropertyDescriptor to properly set value
          const descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
          if (descriptor?.set) {
            descriptor.set.call(element, value);
          }
        }

        // Create a more detailed change event
        const changeEvent = new Event('change', { bubbles: true });
        Object.defineProperty(changeEvent, 'target', {
          value: element,
          enumerable: true
        });

        // Trigger events in sequence with small delays
        await new Promise(resolve => {
          element.dispatchEvent(new Event('focus', { bubbles: true }));
          setTimeout(() => {
            element.dispatchEvent(new Event('input', { bubbles: true }));
            setTimeout(() => {
              element.dispatchEvent(changeEvent);
              setTimeout(() => {
                element.dispatchEvent(new Event('blur', { bubbles: true }));
                resolve(true);
              }, 50);
            }, 50);
          }, 50);
        });

        return true;
      } catch (error) {
        console.error(`Error setting ${fieldName}:`, error);
        return false;
      }
    };

    try {
      // Fill basic fields first with proper delays
      const basicFields = ['firstname', 'middlename', 'lastname', 'suffix'];
      for (const field of basicFields) {
        await setFieldValue(field, String(sampleData[field as keyof typeof sampleData]));
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Fill other fields
      const otherFields = ['sex', 'civilstatus', 'birthdate', 'cellphone'];
      for (const field of otherFields) {
        await setFieldValue(field, String(sampleData[field as keyof typeof sampleData]));
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Handle location fields with longer delays
      const locationFields = ['houseStreetSubdivision', 'region', 'province', 'city', 'barangay'];
      for (const field of locationFields) {
        await setFieldValue(field, String(sampleData[field as keyof typeof sampleData]));
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Fill emergency contact fields last
      const emergencyFields = ['emergencyContact', 'emergencyNumber', 'relationship'];
      for (const field of emergencyFields) {
        await setFieldValue(field, String(sampleData[field as keyof typeof sampleData]));
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Optional: Submit form
      const submitButton = form.querySelector('button[type="submit"]');
    //   if (submitButton) {
    //     submitButton.click();
    //   }

    } catch (error) {
      console.error('Error filling form:', error);
    }
  };
  
  window.fillPatientRegistrationForm = fillPatientRegistrationForm;