import { FileText, CheckSquare, XCircle, Users, Bell, Clock } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export const BedeliaDashboard = () => {
  const navigate = useNavigate();

  const planillasPendientes = [
    { id: '1', docente: 'Prof. González, María', materia: 'Matemática I', comision: '1ro A', fecha: '05/12/2024', alumnos: 28 },
    { id: '2', docente: 'Prof. Rodríguez, Juan', materia: 'Física I', comision: '2do B', fecha: '04/12/2024', alumnos: 24 },
    { id: '3', docente: 'Prof. López, Ana', materia: 'Química', comision: '1ro C', fecha: '03/12/2024', alumnos: 30 },
  ];

  const actividadReciente = [
    { accion: 'Planilla validada', usuario: 'Bedelía - Sistema', descripcion: 'Álgebra - 2do A aprobada', tiempo: 'Hace 1 hora' },
    { accion: 'Usuario creado', usuario: 'Admin', descripcion: 'Nuevo docente registrado', tiempo: 'Hace 2 horas' },
    { accion: 'Notificación enviada', usuario: 'Sistema', descripcion: 'Recordatorio de cierre de notas', tiempo: 'Hace 3 horas' },
    { accion: 'Planilla rechazada', usuario: 'Bedelía - Sistema', descripcion: 'Cálculo - 3ro A rechazada', tiempo: 'Hace 5 horas' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel de Control - Bedelía</h1>
        <p className="text-muted-foreground mt-1">
          Gestión de validaciones y usuarios del sistema
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Planillas Pendientes"
          value="12"
          icon={Clock}
          description="Por validar"
          trend={{ value: 3, isPositive: false }}
        />
        <StatCard
          title="Validadas Hoy"
          value="8"
          icon={CheckSquare}
          description="Aprobadas"
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Rechazadas"
          value="2"
          icon={XCircle}
          description="Este mes"
        />
        <StatCard
          title="Usuarios Activos"
          value="156"
          icon={Users}
          description="En el sistema"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Planillas Pendientes</CardTitle>
                <CardDescription>Requieren validación</CardDescription>
              </div>
              <Button size="sm" onClick={() => navigate('/bedelia/validaciones')}>
                Ver todas
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {planillasPendientes.map((planilla) => (
                <div 
                  key={planilla.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div>
                    <p className="font-medium text-sm">{planilla.materia} - {planilla.comision}</p>
                    <p className="text-xs text-muted-foreground">{planilla.docente}</p>
                    <p className="text-xs text-muted-foreground">{planilla.alumnos} alumnos • {planilla.fecha}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => navigate('/bedelia/validaciones')}>
                      Revisar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Gestión del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/bedelia/validaciones')}
            >
              <CheckSquare className="mr-2 h-4 w-4" />
              Validar Planillas
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/bedelia/usuarios')}
            >
              <Users className="mr-2 h-4 w-4" />
              Gestión de Usuarios
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/bedelia/asistencias')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Cargar Asistencias Masivas
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/bedelia/notificaciones')}
            >
              <Bell className="mr-2 h-4 w-4" />
              Enviar Notificaciones
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actividad del Sistema</CardTitle>
          <CardDescription>Últimas acciones realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {actividadReciente.map((actividad, i) => (
              <div key={i} className="flex items-start justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm">{actividad.accion}</p>
                  <p className="text-sm text-muted-foreground">{actividad.descripcion}</p>
                  <p className="text-xs text-muted-foreground mt-1">{actividad.usuario} • {actividad.tiempo}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BedeliaDashboard;
