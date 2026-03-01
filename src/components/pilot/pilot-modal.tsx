import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Check } from 'lucide-react';
import { usePilotStore } from '@/store/use-pilot-store';

const pilotSchema = z.object({
  participationType: z.string().min(1, 'Selecciona un tipo de participación'),
  email: z.string().email('Ingresa un correo electrónico válido').min(1, 'El correo es obligatorio'),
  institutionName: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar los términos para continuar',
  }),
});

type PilotFormData = z.infer<typeof pilotSchema>;

export function PilotModal() {
  const { isModalOpen, closeModal, showToast } = usePilotStore();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<PilotFormData>({
    resolver: zodResolver(pilotSchema),
    mode: 'onChange',
  });

  const participationType = watch('participationType');

  const onSubmit = (data: PilotFormData) => {
    console.log('Form submitted:', data);
    closeModal();
    showToast();
    reset();
    setTimeout(() => {
      usePilotStore.getState().hideToast();
    }, 3000);
  };

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeModal]);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-[420px] bg-white/88 backdrop-blur-md rounded-[20px] shadow-xl p-8 overflow-hidden font-poppins"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <h2 className="text-[22px] font-semibold text-[#2A1E2E] leading-tight mb-2">
                Unirse al Piloto 2026
              </h2>
              <p className="text-[16px] font-normal text-gray-600">
                Sé parte de las primeras instituciones y familias en impulsar la identidad STEAM en niñas.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Participation Type */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Tipo de participación</label>
                <select
                  {...register('participationType')}
                  className={`w-full h-12 px-4 rounded-xl border ${
                    errors.participationType ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-[#92487A] focus:border-[#92487A] outline-none transition-all appearance-none bg-white`}
                  defaultValue=""
                >
                  <option value="" disabled hidden></option>
                  <option value="Institución Educativa">Institución Educativa</option>
                  <option value="Padre o Madre de Familia">Padre o Madre de Familia</option>
                </select>
                {errors.participationType && (
                  <p className="text-xs text-red-500 mt-1">{errors.participationType.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Correo electrónico</label>
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  {...register('email')}
                  className={`w-full h-12 px-4 rounded-xl border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-[#92487A] focus:border-[#92487A] outline-none transition-all placeholder:text-gray-300`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Conditional Institution Name */}
              <AnimatePresence>
                {participationType === 'Institución Educativa' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-1.5 pt-1">
                      <label className="text-sm font-medium text-gray-700">Nombre de la institución</label>
                      <input
                        type="text"
                        {...register('institutionName')}
                        className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#92487A] focus:border-[#92487A] outline-none transition-all"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Terms Checkbox */}
              <div className="flex gap-3 items-start">
                <div className="relative flex items-center pt-0.5">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    {...register('acceptTerms')}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 transition-all checked:bg-[#92487A] checked:border-[#92487A]"
                  />
                  <Check className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5" />
                </div>
                <label htmlFor="acceptTerms" className="text-sm text-gray-600 leading-snug cursor-pointer">
                  Acepto recibir comunicaciones relacionadas al piloto ApuLab 2026, incluyendo avances, actualizaciones y eventos.
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="text-xs text-red-500 -mt-2">{errors.acceptTerms.message}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isValid}
                className="w-full h-12 bg-[#92487A] hover:bg-[#540863] disabled:bg-gray-300 text-white rounded-xl font-medium transition-colors duration-200 mt-2"
              >
                Enviar solicitud
              </button>

              <p className="text-[14px] text-gray-400 text-center leading-tight">
                Tus datos serán tratados con confidencialidad y no serán compartidos con terceros.
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
