import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export function Logo({ className, iconClassName, textClassName }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative w-8 h-8 flex items-center justify-center", iconClassName)}>
        {/* Minimal Star Icon with Orbit */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full h-full"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_2px_4px_rgba(84,8,99,0.1)]"
          >
            {/* Subtle Orbit */}
            <path
              d="M28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16"
              stroke="#F1E6F4"
              strokeWidth="1"
              strokeLinecap="round"
              className="opacity-80"
            />
            
            {/* 4-Point Star */}
            <path
              d="M16 4L19 13L28 16L19 19L16 28L13 19L4 16L13 13L16 4Z"
              fill="var(--color-primary)"
              stroke="var(--color-primary-dark)"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
      
      <span className={cn("font-bold text-xl tracking-tight text-text-primary", textClassName)}>
        Apu<span className="text-primary">Lab</span>
      </span>
    </div>
  );
}
