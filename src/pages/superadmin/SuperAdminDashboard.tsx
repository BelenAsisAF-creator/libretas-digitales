import { BarChart3, Users, FileText, TrendingUp, CheckSquare, AlertTriangle, BookOpen, Download } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

export const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  const estadisticasCarrera = [
    { nombre: 'Tecnicatura en Programación', alumnos: 120, aprobacion: 78, asistencia: 85 },
    { nombre: 'Tecnicatura en Redes', alumnos: 85, aprobacion: 82, asistencia: 88 },
    { nombre: 'Tecnicatura en Diseño', alumnos: 65, aprobacion: 75, asistencia: 80 },
  ];

  const usuariosPorRol = [
    { rol: 'Alumnos', cantidad: 270, porcentaje: 75 },
    { rol: 'Docentes', cantidad: 45, porcentaje: 13 },
    { rol: 'Bedelía', cantidad: 8, porcentaje: 2 },
    { rol: 'Administración', cantidad: 5, porcentaje: 1 },
  ];

  const actividadReciente = [
    { accion: 'Planilla validada', usuario: 'Bedelía', descripcion: 'Matemática I - 1ro A', tiempo: 'Hace 1 hora' },
    { accion: 'Usuario creado', usuario: 'Admin', descripcion: 'Nuevo docente registrado', tiempo: 'Hace 2 horas' },
    { accion: 'Reporte generado', usuario: 'Secretaría', descripcion: 'Rendimiento 1er cuatrimestre', tiempo: 'Hace 3 horas' },
    { accion: 'Materia creada', usuario: 'Admin', descripcion: 'Programación III agregada', tiempo: 'Hace 5 horas' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel de Control - Administración</h1>
        <p className="text-muted-foreground mt-1">
          Vista general del sistema académico
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Usuarios"
          value="328"
          icon={Users}
          description="Activos en el sistema"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Tasa de Aprobación"
          value="78%"
          icon={TrendingUp}
          description="Promedio general"
          trend={{ value: 3, isPositive: true }}
        />
        <StatCard
          title="Asistencia Promedio"
          value="85%"
          icon={CheckSquare}
          description="Este cuatrimestre"
        />
        <StatCard
          title="Reportes Generados"
          value="24"
          icon={FileText}
          description="Este mes"
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Estadísticas por Carrera</CardTitle>
            <CardDescription>Rendimiento académico</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {estadisticasCarrera.map((carrera, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{carrera.nombre}</p>
                      <p className="text-xs text-muted-foreground">{carrera.alumnos} alumnos</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-medium">{carrera.aprobacion}% aprobación</p>
                      <p className="text-xs text-muted-foreground">{carrera.asistencia}% asistencia</p>
                    </div>
                  </div>
                  <Progress value={carrera.aprobacion} />
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
              onClick={() => navigate('/superadmin/reportes')}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Generar Reportes Académicos
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/superadmin/validaciones')}
            >
              <CheckSquare className="mr-2 h-4 w-4" />
              Panel de Validaciones
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/superadmin/academico')}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Administración Académica
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/superadmin/roles')}
            >
              <Users className="mr-2 h-4 w-4" />
              Gestión de Roles
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Usuarios</CardTitle>
            <CardDescription>Por rol en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {usuariosPorRol.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.rol}</p>
                      <p className="text-xs text-muted-foreground">{item.porcentaje}% del total</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold">{item.cantidad}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {actividadReciente.map((actividad, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{actividad.accion}</p>
                      <p className="text-sm text-muted-foreground">{actividad.descripcion}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {actividad.usuario} • {actividad.tiempo}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
