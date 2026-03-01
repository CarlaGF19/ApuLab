import { Container } from '@/components/ui/container';

export function Footer() {
  return (
    <footer id="contacto" className="bg-text-primary text-background-base py-6 font-sans border-t border-white/5">
      <Container className="max-w-[1200px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Brand & Mission */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path
                  d="M16 2L19.5 12.5L30 16L19.5 19.5L16 30L12.5 19.5L2 16L12.5 12.5Z"
                  fill="#92487A"
                  stroke="#540863"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-semibold text-lg tracking-tight text-background-base">
                ApuLab
              </span>
            </div>
            <p className="text-xs text-background-base/60 leading-relaxed max-w-[240px]">
              Impulsamos la identidad STEAM en niñas desde primaria.
            </p>
          </div>

          {/* Links & Contact */}
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <div className="flex flex-col space-y-1.5">
              <h4 className="text-[10px] font-medium tracking-[1px] text-background-base/40 uppercase">
                Plataforma
              </h4>
              <div className="flex gap-x-4">
                <a href="#modelo" className="text-xs text-background-base/80 hover:text-white transition-colors">
                  Modelo
                </a>
                <a href="#metricas" className="text-xs text-background-base/80 hover:text-white transition-colors">
                  Métricas
                </a>
                <a href="#oportunidades" className="text-xs text-background-base/80 hover:text-white transition-colors">
                  Oportunidades
                </a>
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <h4 className="text-[10px] font-medium tracking-[1px] text-background-base/40 uppercase">
                Contacto
              </h4>
              <div className="flex gap-x-4">
                <a href="mailto:contacto@apulab.edu" className="text-xs text-background-base/80 hover:text-white transition-colors">
                  contacto@apulab.edu
                </a>
                <span className="text-xs text-background-base/60">
                  +51 925 058 019
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-white/5 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-[11px] text-background-base/40">
            &copy; 2026 ApuLab – Plataforma SaaS Institucional.
          </p>
          <div className="flex gap-4 text-[11px] text-background-base/40">
            <a href="#" className="hover:text-white transition-all">Términos</a>
            <a href="#" className="hover:text-white transition-all">Privacidad</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
