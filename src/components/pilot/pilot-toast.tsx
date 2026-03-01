import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePilotStore } from '@/store/use-pilot-store';

export function PilotToast() {
  const { isToastVisible } = usePilotStore();

  return (
    <AnimatePresence>
      {isToastVisible && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white/90 backdrop-blur-md border border-[#92487A]/20 shadow-2xl rounded-2xl p-6 text-center max-w-sm mx-4 pointer-events-auto"
          >
            <p className="text-[18px] font-semibold text-[#2A1E2E] mb-1">
              Gracias por unirte al piloto 💜
            </p>
            <p className="text-[16px] text-gray-600">
              Te contactaremos pronto.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
