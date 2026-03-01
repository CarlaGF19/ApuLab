import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePilot } from '@/hooks/usePilot';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const pilotSchema = z.object({
  schoolName: z.string().min(3, { message: "El nombre del colegio es requerido" }),
  contactName: z.string().min(3, { message: "El nombre de contacto es requerido" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(9, { message: "Teléfono requerido" }),
});

type PilotFormValues = z.infer<typeof pilotSchema>;

interface PilotFormProps {
  onSuccess?: () => void;
}

export function PilotForm({ onSuccess }: PilotFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<PilotFormValues>({
    resolver: zodResolver(pilotSchema),
  });
  
  const { mutate: submitPilot, isPending } = usePilot();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = (data: PilotFormValues) => {
    submitPilot(data, {
      onSuccess: () => {
        setIsSuccess(true);
        setTimeout(() => {
          onSuccess?.();
        }, 2000);
      },
    });
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-institutional mb-2">¡Solicitud Enviada!</h3>
        <p className="text-institutional/70">Nos pondremos en contacto contigo pronto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="schoolName">Nombre del Colegio</Label>
        <Input id="schoolName" placeholder="Ej. Colegio San José" {...register("schoolName")} />
        {errors.schoolName && <p className="text-xs text-red-500">{errors.schoolName.message}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="contactName">Nombre de Contacto</Label>
        <Input id="contactName" placeholder="Ej. María Pérez" {...register("contactName")} />
        {errors.contactName && <p className="text-xs text-red-500">{errors.contactName.message}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Institucional</Label>
        <Input id="email" type="email" placeholder="director@colegio.edu" {...register("email")} />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Teléfono</Label>
        <Input id="phone" placeholder="+51 999 999 999" {...register("phone")} />
        {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar Solicitud"
        )}
      </Button>
    </form>
  );
}
