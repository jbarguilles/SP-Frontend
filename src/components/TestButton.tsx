import { fillPatientRegistrationForm } from '../utils/testUtils';

export const TestButton = () => {
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <button
      type="button"
      onClick={fillPatientRegistrationForm}
      className="fixed bottom-4 right-4 bg-gray-200 p-2 rounded-lg text-sm z-50"
    >
      Fill Test Data
    </button>
  );
};
