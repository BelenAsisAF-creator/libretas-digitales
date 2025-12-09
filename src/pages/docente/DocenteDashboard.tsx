import { BookOpen, Users, FileText, AlertTriangle, CheckSquare, Clock } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export const DocenteDashboard = () => {
  const navigate = useNavigate();

  const recentActions = [
    {
      action: 'Notas cargadas',
      description: 'Matemática I - Parcial 1 (28 alumnos)',
      time: 'Hace 3 horas',
      status: 'pendiente'
    },
    {
      action: 'Asistencia registrada',
      description: 'Álgebra - 3ro A (19 alumnos)',
      time: 'Hace 1 día',
      status: 'completado'
    },
    {
      action: 'Planilla validada',
      description: 'Cálculo - TP 2 (16 alumnos)',
      time: 'Hace 2 días',
      status: 'aprobado'
    },
    {
      action: 'Notas rechazadas',
      description: 'Física I - Final (12 alumnos)',
      time: 'Hace 3 días',
      status: 'rechazado'
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pendiente: { label: 'Pendiente', className: 'bg-warning/10 text-warning border-warning/20' },
      completado: { label: 'Completado', className: 'bg-success/10 text-success border-success/20' },
      aprobado: { label: 'Aprobado', className: 'bg-success/10 text-success border-success/20' },
      rechazado: { label: 'Rechazado', className: 'bg-destructive/10 text-destructive border-destructive/20' },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pendiente;
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel de Control - Docente</h1>
        <p className="text-muted-foreground mt-1">
          Gestión de materias, notas y asistencias
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Materias Asignadas"
          value="4"
          icon={BookOpen}
          description="Cuatrimestre actual"
        />
        <StatCard
          title="Comisiones"
          value="6"
          icon={Users}
          description="Total de grupos"
        />
        <StatCard
          title="Planillas Pendientes"
          value="3"
          icon={FileText}
          description="Por cargar"
          trend={{ value: 2, isPositive: false }}
        />
        <StatCard
          title="Alertas Asistencia"
          value="5"
          icon={AlertTriangle}
          description="Alumnos < 75%"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Gestión de notas y asistencias</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/docente/materias')}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Ver Mis Materias
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/docente/materias')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Cargar Notas
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/docente/materias')}
            >
              <CheckSquare className="mr-2 h-4 w-4" />
              Registrar Asistencias
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/docente/historial')}
            >
              <Clock className="mr-2 h-4 w-4" />
              Ver Historial
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Planillas Enviadas</CardTitle>
            <CardDescription>Estado de validación por Bedelía</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { materia: 'Matemática I', tipo: 'Parcial 1', estado: 'pendiente', fecha: '05/12/2024' },
                { materia: 'Álgebra', tipo: 'TP 3', estado: 'aprobado', fecha: '03/12/2024' },
                { materia: 'Cálculo', tipo: 'Final', estado: 'rechazado', fecha: '01/12/2024' },
              ].map((planilla, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">{planilla.materia}</p>
                    <p className="text-xs text-muted-foreground">{planilla.tipo} - {planilla.fecha}</p>
                  </div>
                  {getStatusBadge(planilla.estado)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Últimas Acciones</CardTitle>
          <CardDescription>Historial de actividad reciente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActions.map((activity, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                  {getStatusBadge(activity.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocenteDashboard;
