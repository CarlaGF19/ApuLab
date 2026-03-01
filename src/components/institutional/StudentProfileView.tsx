import React from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Target, 
  History, 
  FileDown, 
  Dna, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Zap,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  BookOpen,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

interface StudentProfileViewProps {
  student: any;
  onClose: () => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({ student, onClose }) => {
  // Mock detailed data for the student
  const steamProfile = [
    { subject: 'Ciencia', A: 82 },
    { subject: 'Tecnología', A: 95 },
    { subject: 'Ingeniería', A: 70 },
    { subject: 'Arte', A: 90 },
    { subject: 'Matemática', A: 85 },
  ];

  const performanceData = [
    { name: 'U1', score: 16 },
    { name: 'U2', score: 18 },
    { name: 'U3', score: 17 },
    { name: 'U4', score: 19 },
  ];

  const alerts = [
    { id: 1, text: 'Desmotivación detectada en matemáticas', type: 'warning' },
    { id: 2, text: 'Alto potencial no estimulado en Arte Digital', type: 'info' },
  ];

  const recommendedOpportunities = [
    { id: 1, title: 'Hackathon Nacional de Robótica', type: 'Hackathon', affinity: 'Tecnología' },
    { id: 2, title: 'Concurso de Diseño 3D y VR', type: 'Concurso', affinity: 'Arte' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-8"
    >
      {/* Header del perfil */}
      <div className="bg-background-card p-8 rounded-[32px] border border-border-soft shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary-badge flex items-center justify-center text-primary font-bold text-2xl">
            {student.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-1">{student.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
              <span className="flex items-center gap-1 font-medium"><BookOpen className="w-4 h-4" /> Grado: 5° A</span>
              <span className="flex items-center gap-1 font-medium"><Clock className="w-4 h-4" /> Edad: 11 años</span>
              <span className="flex items-center gap-1 font-medium"><History className="w-4 h-4" /> Última actualización: Hoy</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" className="rounded-xl border-border-soft text-text-primary">
            <Target className="w-4 h-4 mr-2" /> Asignar oportunidad
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl border-border-soft text-text-primary">
            <History className="w-4 h-4 mr-2" /> Ver historial
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl border-border-soft text-text-primary">
            <FileDown className="w-4 h-4 mr-2" /> Exportar reporte
          </Button>
          <Button 
            onClick={onClose}
            className="rounded-xl bg-text-primary hover:bg-text-primary/90 text-white"
          >
            <X className="w-4 h-4 mr-2" /> Cerrar
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 1. Identidad STEAM */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-background-card p-8 rounded-[32px] border border-border-soft shadow-sm">
            <h2 className="text-xl font-bold text-text-primary mb-8 flex items-center gap-2">
              <Dna className="w-5 h-5 text-primary" /> Identidad STEAM
            </h2>
            
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={steamProfile}>
                    <PolarGrid stroke="#E8E6EC" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B6B75', fontSize: 12 }} />
                    <Radar
                      name={student.name}
                      dataKey="A"
                      stroke="#92487A"
                      fill="#92487A"
                      fillOpacity={0.4}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Identidad dominante detectada</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-badge rounded-xl text-primary font-bold">
                    <Zap className="w-4 h-4" /> Perfil Tecno-Creativo
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background-base rounded-2xl">
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Confianza STEAM</p>
                    <span className="text-sm font-bold text-text-primary">Alto</span>
                  </div>
                  <div className="p-4 bg-background-base rounded-2xl">
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Evolución</p>
                    <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" /> Creciendo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Potencial Detectado */}
          <div className="bg-background-card p-8 rounded-[32px] border border-border-soft shadow-sm">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" /> Potencial Detectado (IA Insight)
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                <div className="flex items-center gap-2 text-green-700 font-bold text-sm mb-3">
                  <CheckCircle2 className="w-4 h-4" /> Fortaleza principal
                </div>
                <p className="text-sm text-green-800 font-medium leading-relaxed">Alta capacidad lógica y estructuración de algoritmos complejos.</p>
              </div>
              <div className="p-6 bg-primary-badge rounded-2xl border border-primary/10">
                <div className="flex items-center gap-2 text-primary font-bold text-sm mb-3">
                  <ArrowUpRight className="w-4 h-4" /> Área emergente
                </div>
                <p className="text-sm text-primary font-medium leading-relaxed">Creatividad aplicada en entornos de diseño 3D y realidad virtual.</p>
              </div>
              <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
                <div className="flex items-center gap-2 text-yellow-700 font-bold text-sm mb-3">
                  <AlertCircle className="w-4 h-4" /> Área subestimulada
                </div>
                <p className="text-sm text-yellow-800 font-medium leading-relaxed">Baja exposición a ingeniería práctica y construcción física.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* 3. Rendimiento Académico */}
          <div className="bg-background-card p-8 rounded-[32px] border border-border-soft shadow-sm">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Rendimiento
            </h2>
            <div className="space-y-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">Promedio Actual</p>
                  <h3 className="text-4xl font-bold text-primary">18.5</h3>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">vs Grupo</p>
                  <span className="text-sm font-bold text-green-600">+1.2 pts</span>
                </div>
              </div>
              
              <div className="h-[120px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide domain={[0, 20]} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#92487A" 
                      strokeWidth={3} 
                      dot={{ fill: '#92487A', r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-border-soft">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Destrezas</span>
                  <span className="font-bold text-text-primary">92%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Competencias</span>
                  <span className="font-bold text-text-primary">88%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Alertas Inteligentes */}
          <div className="bg-background-card p-8 rounded-[32px] border border-border-soft shadow-sm">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" /> Alertas IA
            </h2>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4 bg-background-base rounded-2xl border border-border-soft">
                  <p className="text-sm font-medium text-text-primary mb-3">{alert.text}</p>
                  <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                    Ver recomendación IA <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Oportunidades Recomendadas */}
          <div className="bg-background-card p-8 rounded-[32px] border border-border-soft shadow-sm">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" /> Recomendados
            </h2>
            <div className="space-y-4">
              {recommendedOpportunities.map((opp) => (
                <div key={opp.id} className="p-4 bg-background-base rounded-2xl border border-border-soft group cursor-pointer hover:border-primary/30 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary-badge px-2 py-0.5 rounded">
                      {opp.type}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-text-primary">{opp.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
