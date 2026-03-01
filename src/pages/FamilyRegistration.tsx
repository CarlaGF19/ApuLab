import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { Loader2, ArrowLeft, Heart } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

const familySchema = z.object({
  parentName: z.string().min(2, 'El nombre es demasiado corto'),
  email: z.string().email('Ingresa un correo electrónico válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  confirmPassword: z.string(),
  daughterName: z.string().min(2, 'El nombre es demasiado corto'),
  daughterAge: z.string().min(1, 'La edad es obligatoria'),
  grade: z.string().min(1, 'El grado es obligatorio'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type FamilyFormValues = z.infer<typeof familySchema>;

export default function FamilyRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FamilyFormValues>({
    resolver: zodResolver(familySchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FamilyFormValues) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const newUser = {
      id: `family-${Date.now()}`,
      email: data.email,
      name: data.parentName,
      role: 'family' as const,
      isDemo: false,
    };

    login(newUser);
    navigate('/dashboard-familia');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background-base flex flex-col items-center justify-center p-4 font-sans">
      <Link to="/familias" className="mb-8 flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" /> Volver a Familias
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[500px] bg-background-card p-8 rounded-[32px] shadow-sm border border-border-soft"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-badge mb-4">
            <Heart className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Únete a ApuLab</h1>
          <p className="text-text-secondary">Crea tu cuenta de familia y empieza hoy</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Parent Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Información del Padre/Madre</h3>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-primary">Tu Nombre Completo</label>
                <input
                  {...register('parentName')}
                  className="w-full h-12 px-4 rounded-xl border border-border-soft focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="Ej. María García"
                />
                {errors.parentName && <p className="text-xs text-red-500">{errors.parentName.message}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-primary">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full h-12 px-4 rounded-xl border border-border-soft focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-primary">Contraseña</label>
                  <input
                    {...register('password')}
                    type="password"
                    className="w-full h-12 px-4 rounded-xl border border-border-soft focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-primary">Confirmar</label>
                  <input
                    {...register('confirmPassword')}
                    type="password"
                    className="w-full h-12 px-4 rounded-xl border border-border-soft focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
                </div>
              </div>
            </div>

            {/* Daughter Info */}
            <div className="space-y-4 pt-4 border-t border-border-soft">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Información de tu Hija</h3>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-primary">Nombre de tu Hija</label>
                <input
                  {...register('daughterName')}
                  className="w-full h-12 px-4 rounded-xl border border-border-soft focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="Ej. Sofía"
                />
                {errors.daughterName && <p className="text-xs text-red-500">{errors.daughterName.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-primary">Edad</label>
                  <input
                    {...register('daughterAge')}
                    type="number"
                    className="w-full h-12 px-4 rounded-xl border border-border-soft focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="Ej. 12"
                  />
                  {errors.daughterAge && <p className="text-xs text-red-500">{errors.daughterAge.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-primary">Grado Escolar</label>
                  <select
                    {...register('grade')}
                    className="w-full h-12 px-4 rounded-xl border border-border-soft focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-background-card"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="6">6to Primaria</option>
                    <option value="7">1ro Secundaria</option>
                    <option value="8">2do Secundaria</option>
                    <option value="9">3ro Secundaria</option>
                    <option value="10">4to Secundaria</option>
                    <option value="11">5to Secundaria</option>
                  </select>
                  {errors.grade && <p className="text-xs text-red-500">{errors.grade.message}</p>}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full h-14 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Creando cuenta...
              </>
            ) : (
              'Crear cuenta gratuita'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Inicia sesión
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
