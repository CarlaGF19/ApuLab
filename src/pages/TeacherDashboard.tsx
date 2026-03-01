import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  LogOut, 
  Search, 
  Filter, 
  GraduationCap, 
  TrendingUp, 
  Dna, 
  AlertCircle, 
  Target, 
  ChevronRight,
  Zap,
  BookOpen,
  CheckCircle2,
  Clock,
  Users
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { DemoBanner } from '@/components/layout/DemoBanner';
import { Logo } from '@/components/ui/logo';
import { StudentProfileView } from '@/components/institutional/StudentProfileView';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

// Mock Data
const steamData = [
  { subject: 'Ciencia', A: 85, fullMark: 100 },
  { subject: 'Tecnología', A: 92, fullMark: 100 },
  { subject: 'Ingeniería', A: 78, fullMark: 100 },
  { subject: 'Arte', A: 88, fullMark: 100 },
  { subject: 'Matemática', A: 82, fullMark: 100 },
];

const studentsData = [
  { id: 1, name: 'Sofía García', level: 'Tecnología', evolution: '+12%', status: 'consolidado' },
  { id: 2, name: 'Lucía Pérez', level: 'Ciencia', evolution: '+5%', status: 'potencial' },
  { id: 3, name: 'Elena Martínez', level: 'Arte', evolution: '+8%', status: 'desarrollo' },
  { id: 4, name: 'Valentina Soto', level: 'Ingeniería', evolution: '+15%', status: 'consolidado' },
  { id: 5, name: 'Camila Rivas', level: 'Matemática', evolution: '+3%', status: 'desarrollo' },
];

const alertsData = [
  { id: 1, type: 'Caída de rendimiento', student: 'Camila Rivas', suggestion: 'Recomendar taller de robótica' },
  { id: 2, type: 'Talento no estimulado', student: 'Valentina Soto', suggestion: 'Estimular lectura científica' },
  { id: 3, type: 'Desbalance STEAM', student: 'Elena Martínez', suggestion: 'Vincular con proyecto de Arte Digital' },
];

const opportunitiesData = [
  { id: 1, title: 'Hackathon Nacional de Robótica', type: 'Hackathon', affinity: 'Tecnología', age: '12-15 años' },
  { id: 2, title: 'Taller de Bio-Ingeniería Marina', type: 'Taller', affinity: 'Ciencia', age: '10-14 años' },
  { id: 3, title: 'Concurso de Diseño 3D y VR', type: 'Concurso', affinity: 'Arte', age: '13-17 años' },
];

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('identidad');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('5°');
  const [selectedGroup, setSelectedGroup] = useState('A');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const handleLogout = () => {
    navigate('/login');
    // Pequeño timeout para asegurar que la navegación ocurrió antes de limpiar el estado
    setTimeout(() => {
      logout();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background-base font-sans pb-20">
      {user?.isDemo && <DemoBanner />}
      
      {/* Topbar */}
      <header className="bg-background-card border-b border-border-soft sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <Logo className="scale-90" />
          </div>

          {/* Center: Context */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Colegio</span>
              <span className="font-semibold text-text-primary">San Silvestre School</span>
            </div>
            <div className="w-px h-8 bg-border-soft" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Grado</span>
              <span className="font-semibold text-text-primary">{selectedGrade} Secundaria</span>
            </div>
            <div className="w-px h-8 bg-border-soft" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Grupo</span>
              <span className="font-semibold text-text-primary">{selectedGroup}</span>
            </div>
            <div className="w-px h-8 bg-border-soft" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Ciclo</span>
              <span className="font-semibold text-text-primary">2026</span>
            </div>
          </div>

          {/* Right: User */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-badge flex items-center justify-center text-primary font-bold text-xs">
                {user?.name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-text-primary">{user?.name}</span>
            </div>
            <button className="text-text-secondary hover:text-primary transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsLogoutModalOpen(true)}
              className="text-sm text-text-secondary hover:text-primary-dark transition-colors font-normal"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-10">
        <AnimatePresence mode="wait">
          {selectedStudent ? (
            <StudentProfileView 
              key="profile"
              student={selectedStudent} 
              onClose={() => setSelectedStudent(null)} 
            />
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Tabs Navigation */}
              <div className="flex gap-8 border-b border-border-soft mb-10">
                {['identidad', 'rendimiento', 'alertas', 'oportunidades'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-semibold capitalize transition-all relative ${
                      activeTab === tab ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'identidad' && (
                  <motion.div
                    key="identidad"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-10"
                  >
                    {/* 1. Resumen Identidad STEAM */}
                    <section>
                      <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                        <Dna className="w-5 h-5 text-primary" /> Resumen Identidad del Aula
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-background-card p-6 rounded-3xl border border-border-soft shadow-sm">
                          <div className="w-10 h-10 rounded-xl bg-primary-badge flex items-center justify-center mb-4">
                            <Zap className="w-5 h-5 text-primary" />
                          </div>
                          <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">Identidad Dominante</p>
                          <h3 className="text-lg font-bold text-text-primary">Tecnología + Ingeniería</h3>
                        </div>
                        <div className="bg-background-card p-6 rounded-3xl border border-border-soft shadow-sm">
                          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          </div>
                          <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">Potencial Alto</p>
                          <h3 className="text-2xl font-bold text-text-primary">42%</h3>
                        </div>
                        <div className="bg-background-card p-6 rounded-3xl border border-border-soft shadow-sm">
                          <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center mb-4">
                            <Clock className="w-5 h-5 text-yellow-600" />
                          </div>
                          <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">En Desarrollo</p>
                          <h3 className="text-2xl font-bold text-text-primary">18%</h3>
                        </div>
                        <div className="bg-background-card p-6 rounded-3xl border border-border-soft shadow-sm">
                          <div className="w-10 h-10 rounded-xl bg-primary-badge flex items-center justify-center mb-4">
                            <Target className="w-5 h-5 text-primary" />
                          </div>
                          <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">Afinidad Emergente</p>
                          <h3 className="text-lg font-bold text-text-primary">Arte Digital</h3>
                        </div>
                      </div>
                    </section>

                    {/* 2. Mapa STEAM del Grupo */}
                    <section className="grid lg:grid-cols-2 gap-10">
                      <div className="bg-background-card p-8 rounded-[32px] border border-border-soft shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                          <h3 className="text-lg font-bold text-text-primary">Mapa STEAM del Grupo</h3>
                          <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                            <TrendingUp className="w-3 h-3" /> +8% Crecimiento
                          </div>
                        </div>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={steamData}>
                              <PolarGrid stroke="#E8E6EC" />
                              <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B6B75', fontSize: 12 }} />
                              <Radar
                                name="Aula"
                                dataKey="A"
                                stroke="#92487A"
                                fill="#92487A"
                                fillOpacity={0.4}
                              />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="bg-background-card p-8 rounded-[32px] border border-border-soft shadow-sm flex flex-col justify-center">
                        <h3 className="text-lg font-bold text-text-primary mb-6">Comparativa de Nivel</h3>
                        <div className="space-y-6">
                          {steamData.map((item) => (
                            <div key={item.subject} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium text-text-primary">{item.subject}</span>
                                <span className="font-bold text-primary">{item.A}%</span>
                              </div>
                              <div className="h-2 bg-background-base rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${item.A}%` }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  className="h-full bg-primary"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    {/* 3. Lista de Estudiantes */}
                    <section className="bg-background-card rounded-[32px] border border-border-soft shadow-sm overflow-hidden">
                      <div className="p-8 border-b border-border-soft flex flex-col md:flex-row justify-between items-center gap-6">
                        <h2 className="text-xl font-bold text-text-primary">Lista de Estudiantes</h2>
                        <div className="flex items-center gap-4">
                          <div className="flex bg-background-base p-1 rounded-xl">
                            {['3°', '4°', '5°', '6°'].map(grade => (
                              <button 
                                key={grade}
                                onClick={() => setSelectedGrade(grade)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                  selectedGrade === grade ? 'bg-white text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
                                }`}
                              >
                                {grade}
                              </button>
                            ))}
                          </div>
                          <div className="flex bg-background-base p-1 rounded-xl">
                            {['A', 'B'].map(group => (
                              <button 
                                key={group}
                                onClick={() => setSelectedGroup(group)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                  selectedGroup === group ? 'bg-white text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
                                }`}
                              >
                                {group}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="bg-background-base/50 text-text-secondary text-[10px] uppercase tracking-widest font-bold">
                              <th className="px-8 py-4">Estudiante</th>
                              <th className="px-8 py-4">Nivel STEAM Dominante</th>
                              <th className="px-8 py-4">Evolución</th>
                              <th className="px-8 py-4">Estado</th>
                              <th className="px-8 py-4 text-right">Acción</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border-soft">
                            {studentsData.map((student) => (
                              <tr key={student.id} className="hover:bg-background-base/30 transition-colors group">
                                <td className="px-8 py-5">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-background-base flex items-center justify-center text-text-primary font-bold text-xs">
                                      {student.name.charAt(0)}
                                    </div>
                                    <span className="font-semibold text-text-primary">{student.name}</span>
                                  </div>
                                </td>
                                <td className="px-8 py-5">
                                  <span className="text-sm font-medium text-text-secondary">{student.level}</span>
                                </td>
                                <td className="px-8 py-5">
                                  <span className="text-sm font-bold text-green-600">{student.evolution}</span>
                                </td>
                                <td className="px-8 py-5">
                                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    student.status === 'consolidado' ? 'bg-green-50 text-green-600' :
                                    student.status === 'potencial' ? 'bg-primary-badge text-primary' :
                                    'bg-yellow-50 text-yellow-600'
                                  }`}>
                                    {student.status}
                                  </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                  <button 
                                    onClick={() => setSelectedStudent(student)}
                                    className="text-primary hover:underline text-sm font-bold"
                                  >
                                    Ver Perfil
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  </motion.div>
                )}

                {activeTab === 'rendimiento' && (
                  <motion.div
                    key="rendimiento"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-background-card p-10 rounded-[32px] border border-border-soft shadow-sm"
                  >
                    <h2 className="text-xl font-bold text-text-primary mb-8">Rendimiento Académico y Destrezas</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest">Competencias Clave</h3>
                        <div className="space-y-6">
                          {[
                            { label: 'Pensamiento Crítico', val: 88 },
                            { label: 'Resolución de Problemas', val: 92 },
                            { label: 'Colaboración', val: 85 },
                            { label: 'Creatividad Digital', val: 90 }
                          ].map(skill => (
                            <div key={skill.label} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium text-text-primary">{skill.label}</span>
                                <span className="font-bold text-primary">{skill.val}%</span>
                              </div>
                              <div className="h-1.5 bg-background-base rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${skill.val}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-background-base/50 p-8 rounded-2xl flex flex-col justify-center text-center">
                        <p className="text-text-secondary mb-2 text-sm">Promedio General del Aula</p>
                        <h3 className="text-5xl font-bold text-primary">17.8</h3>
                        <p className="text-xs text-text-secondary mt-4">Basado en el ciclo actual 2026</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'alertas' && (
                  <motion.div
                    key="alertas"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-primary" /> Alertas Inteligentes IA
                      </h2>
                      <span className="text-xs font-bold text-primary bg-primary-badge px-3 py-1 rounded-full">3 Alertas Activas</span>
                    </div>
                    
                    <div className="grid gap-4">
                      {alertsData.map((alert) => (
                        <div key={alert.id} className="bg-background-card p-6 rounded-2xl border border-border-soft shadow-sm flex items-center justify-between group hover:border-primary/30 transition-all">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary-badge flex items-center justify-center flex-shrink-0">
                              <AlertCircle className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-bold text-text-primary">{alert.type}</h4>
                              <p className="text-sm text-text-secondary">Detectado en: <span className="font-semibold text-text-primary">{alert.student}</span></p>
                              <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-primary bg-primary-badge px-3 py-1.5 rounded-lg">
                                <Zap className="w-3 h-3" /> Sugerencia: {alert.suggestion}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" className="rounded-xl border-border-soft text-text-primary hover:bg-primary hover:text-white transition-all">
                            Tomar acción
                          </Button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'oportunidades' && (
                  <motion.div
                    key="oportunidades"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                      <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" /> Oportunidades Vinculadas
                      </h2>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-xl border-border-soft"><Filter className="w-4 h-4 mr-2" /> Afinidad</Button>
                        <Button variant="outline" size="sm" className="rounded-xl border-border-soft"><Filter className="w-4 h-4 mr-2" /> Nivel</Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {opportunitiesData.map((opp) => (
                        <div key={opp.id} className="bg-background-card p-6 rounded-[32px] border border-border-soft shadow-sm hover:shadow-md transition-all flex flex-col">
                          <div className="mb-4">
                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary-badge px-3 py-1 rounded-full">
                              {opp.type}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-text-primary mb-2 flex-grow">{opp.title}</h3>
                          <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-xs text-text-secondary">
                              <Dna className="w-3 h-3" /> Afinidad: {opp.affinity}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-text-secondary">
                              <Users className="w-3 h-3" /> Edad: {opp.age}
                            </div>
                          </div>
                          <Button className="w-full bg-primary hover:bg-primary-dark text-white rounded-xl py-5 font-bold shadow-md shadow-primary/20">
                            Asignar al grupo
                          </Button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Logout Modal */}
      <AnimatePresence>
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLogoutModalOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-background-card p-8 rounded-3xl shadow-2xl border border-border-soft w-full max-w-sm text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary-badge flex items-center justify-center mx-auto mb-6">
                <LogOut className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">¿Cerrar sesión?</h3>
              <p className="text-text-secondary mb-8">¿Estás seguro que deseas salir del panel docente?</p>
              <div className="flex gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="flex-1 rounded-xl text-text-secondary hover:bg-background-base"
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleLogout}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white rounded-xl"
                >
                  Cerrar sesión
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
