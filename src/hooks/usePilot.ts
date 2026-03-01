import { useMutation } from '@tanstack/react-query';

interface PilotFormData {
  schoolName: string;
  contactName: string;
  email: string;
}

// Mock API call
const submitPilotForm = async (data: PilotFormData) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { success: true, message: 'Solicitud enviada correctamente' };
};

export const usePilot = () => {
  return useMutation({
    mutationFn: submitPilotForm,
  });
};
