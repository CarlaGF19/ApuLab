import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore, UserRole } from '@/store/authStore';
import { DemoModal } from '@/components/auth/DemoModal';

const loginSchema = z.object({
  email: z.string().email('Ingresa un correo electrónico válido').min(1, 'El correo es obligatorio'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: 'user-123',
      email: data.email,
      name: 'Usuario ApuLab',
      role: 'docente' as UserRole,
      isDemo: false,
    };

    login(mockUser);
    if (mockUser.role === 'docente') {
      navigate('/dashboard-docente');
    } else {
      navigate('/dashboard-alumno');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background-base flex flex-col items-center justify-center p-4 font-sans relative">
      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al inicio
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-[420px] bg-background-card p-10 rounded-2xl shadow-sm border border-border-soft"
      >
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Acceso Institucional</h1>
          <p className="text-sm text-text-secondary">
            Ingresa como Docente o Estudiante vinculado a tu institución.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-primary uppercase tracking-wider ml-1">Email institucional</label>
            <input
              {...register('email')}
              type="email"
              placeholder="nombre@colegio.edu"
              className={`w-full h-12 px-4 rounded-lg border ${
                errors.email ? 'border-red-500' : 'border-border-soft'
              } focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all bg-white text-text-primary`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 ml-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-primary uppercase tracking-wider ml-1">Contraseña</label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`w-full h-12 px-4 pr-12 rounded-lg border ${
                  errors.password ? 'border-red-500' : 'border-border-soft'
                } focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all bg-white text-text-primary`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1 ml-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full h-12 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md shadow-primary/20"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Validando...
              </>
            ) : (
              'Entrar al panel'
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-border-soft text-center">
          <p className="text-sm text-text-secondary mb-2">¿Eres padre o madre de familia?</p>
          <Link 
            to="/familias" 
            className="text-primary font-bold hover:underline text-sm"
          >
            Crear cuenta aquí
          </Link>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="text-xs text-text-secondary hover:text-primary transition-colors"
          >
            Explorar versión demo
          </button>
        </div>
      </motion.div>

      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
        mode="institutional"
      />
    </div>
  );
}
