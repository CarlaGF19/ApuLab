import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  Rocket, 
  Bot, 
  Library, 
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Star,
  Calendar,
  ClipboardCheck,
  GraduationCap,
  Clock,
  ShieldAlert,
  Medal,
  BarChart3,
  Lightbulb,
  FileText,
  Image,
  ListChecks,
  BookMarked,
  Send,
  UserPlus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarItem {
  name: string;
  icon: React.ElementType;
  path?: string;
  subItems?: { name: string; path: string; icon?: React.ElementType }[];
}

const sidebarItems: SidebarItem[] = [
  { 
    name: 'Dashboard', 
    icon: LayoutDashboard, 
    path: '/dashboard-alumno' 
  },
  { 
    name: 'Académico', 
    icon: BookOpen,
    subItems: [
      { name: 'Publicaciones', path: '/academico/publicaciones', icon: FileText },
      { name: 'Asistencia', path: '/academico/asistencia', icon: Clock },
      { name: 'Exámenes', path: '/academico/examenes', icon: ClipboardCheck },
      { name: 'Horario Escolar', path: '/academico/horario', icon: Calendar },
      { name: 'Mérito y Demérito', path: '/academico/conducta', icon: ShieldAlert },
    ]
  },
  { 
    name: 'Logros', 
    icon: Trophy,
    subItems: [
      { name: 'Insignias', path: '/logros/insignias', icon: Medal },
      { name: 'Ranking', path: '/logros/ranking', icon: BarChart3 },
      { name: 'Nivel actual', path: '/logros/nivel', icon: TrendingUpIcon },
      { name: 'Retos completados', path: '/retos', icon: ListChecks },
    ]
  },
  { 
    name: 'Oportunidades', 
    icon: Rocket,
    subItems: [
      { name: 'Hackathones', path: '/oportunidades?tipo=hackathon', icon: ZapIcon },
      { name: 'Concursos', path: '/oportunidades?tipo=concurso', icon: Trophy },
      { name: 'Talleres', path: '/oportunidades?tipo=taller', icon: Lightbulb },
      { name: 'Becas', path: '/oportunidades?tipo=beca', icon: GraduationCap },
      { name: 'Convocatorias', path: '/oportunidades?tipo=convocatoria', icon: Send },
    ]
  },
  { 
    name: 'Asistente IA', 
    icon: Bot,
    subItems: [
      { name: 'Recomendaciones', path: '/ia/recomendaciones', icon: SparklesIcon },
      { name: 'Qué estudiar hoy', path: '/ia/estudio', icon: BookMarked },
      { name: 'Qué oportunidad aplicar', path: '/ia/oportunidades', icon: Rocket },
      { name: 'Mejora de rendimiento', path: '/ia/rendimiento', icon: TrendingUpIcon },
    ]
  },
  { 
    name: 'Recursos', 
    icon: Library,
    subItems: [
      { name: 'Biblioteca Virtual', path: '/recursos/biblioteca', icon: BookMarked },
      { name: 'Galería', path: '/recursos/galeria', icon: Image },
      { name: 'Lista de Útiles', path: '/recursos/utiles', icon: ListChecks },
      { name: 'Material Complementario', path: '/recursos/material', icon: FileText },
    ]
  },
  { 
    name: 'Comunicación', 
    icon: MessageSquare,
    subItems: [
      { name: 'Mensajería', path: '/comunicacion/mensajes', icon: Send },
      { name: 'Reservar Cita', path: '/comunicacion/citas', icon: UserPlus },
    ]
  },
];

// Helper icons that might be missing from the main import
function TrendingUpIcon(props: any) { return <BarChart3 {...props} />; }
function ZapIcon(props: any) { return <Rocket {...props} />; }
function SparklesIcon(props: any) { return <Bot {...props} />; }

export function StudentSidebar() {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>(['Dashboard']);

  const toggleMenu = (name: string) => {
    setOpenMenus(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name) 
        : [...prev, name]
    );
  };

  const isPathActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const isSubItemActive = (subItems?: { path: string }[]) => {
    if (!subItems) return false;
    return subItems.some(item => location.pathname === item.path);
  };

  return (
    <aside className="w-72 bg-white border-r border-border-soft h-screen sticky top-0 overflow-y-auto hidden lg:block font-sans scrollbar-hide">
      <div className="p-8">
        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isOpen = openMenus.includes(item.name);
            const isActive = isPathActive(item.path) || isSubItemActive(item.subItems);

            return (
              <div key={item.name} className="space-y-1">
                {item.path ? (
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 group",
                      isActive 
                        ? "bg-primary-badge text-primary" 
                        : "text-text-secondary hover:bg-background-base hover:text-text-primary"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-text-secondary group-hover:text-primary transition-colors")} />
                      <span className="text-[14px] font-medium">{item.name}</span>
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 group",
                      isActive 
                        ? "bg-primary-badge/50 text-primary" 
                        : "text-text-secondary hover:bg-background-base hover:text-text-primary"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-text-secondary group-hover:text-primary transition-colors")} />
                      <span className="text-[14px] font-medium">{item.name}</span>
                    </div>
                    {hasSubItems && (
                      isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                )}

                <AnimatePresence>
                  {hasSubItems && isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden ml-4 pl-4 border-l border-border-soft space-y-1"
                    >
                      {item.subItems?.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive = location.pathname === subItem.path;
                        return (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className={cn(
                              "flex items-center gap-3 px-4 py-2 rounded-xl text-[13px] transition-all duration-200",
                              isSubActive 
                                ? "text-primary font-semibold" 
                                : "text-text-secondary hover:text-primary"
                            )}
                          >
                            {SubIcon && <SubIcon className="w-3.5 h-3.5" />}
                            {subItem.name}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: AI Assistant Quick Access */}
      <div className="p-6 mt-10">
        <div className="bg-primary-badge rounded-3xl p-6 border border-primary/10 relative overflow-hidden group cursor-pointer">
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -mr-10 -mt-10 blur-xl group-hover:scale-110 transition-transform" />
          <div className="relative z-10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Asistente IA</p>
              <p className="text-[13px] font-medium text-text-primary mt-1">¿Qué quieres aprender hoy?</p>
            </div>
            <button className="text-[11px] font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
              Preguntar ahora <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
