import { useAuthStore } from '@/store/authStore';
import { Info } from 'lucide-react';

export function DemoBanner() {
  const user = useAuthStore((state) => state.user);

  if (!user?.isDemo) return null;

  return (
    <div className="bg-primary-badge border-b border-border-soft py-2 px-4 flex items-center justify-center gap-2 sticky top-0 z-[60]">
      <Info className="w-4 h-4 text-primary" />
      <p className="text-xs font-medium text-primary">
        Estás explorando la versión demo. Los cambios no se guardarán.
      </p>
    </div>
  );
}
