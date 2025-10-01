import { Users, BarChart3, FileText, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel de Control - Administración</h1>
        <p className="text-muted-foreground mt-1">
          Supervisión general del sistema educativo
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Usuarios Totales"
          value="342"
          icon={Users}
          trend={{ value: 8, isPositive: true }}
          description="87 alumnos, 15 docentes"
        />
        <StatCard
          title="Promedio General"
          value="7.8"
          icon={TrendingUp}
          trend={{ value: 3, isPositive: true }}
          description="Todos los cursos"
        />
        <StatCard
          title="Tasa de Asistencia"
          value="91%"
          icon={BarChart3}
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard
          title="Reportes Mes"
          value="24"
          icon={FileText}
          description="Marzo 2025"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Estadísticas por Carrera</CardTitle>
            <CardDescription>Rendimiento académico por carrera</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: 'Profesorado de Matemática', students: 87, average: 8.2, attendance: 93 },
                { name: 'Profesorado de Lengua', students: 64, average: 7.9, attendance: 91 },
                { name: 'Profesorado de Historia', students: 52, average: 7.5, attendance: 89 },
                { name: 'Profesorado de Inglés', students: 45, average: 8.0, attendance: 92 },
              ].map((career, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{career.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {career.students} estudiantes
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{career.average}</p>
                      <p className="text-xs text-muted-foreground">Promedio</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Asistencia</span>
                      <span className="font-medium">{career.attendance}%</span>
                    </div>
                    <Progress value={career.attendance} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Gestionar Roles
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generar Reporte PDF
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Exportar a Excel
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              Ver Estadísticas Detalladas
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { role: 'Alumnos', count: 248, percentage: 72, color: 'bg-primary' },
                { role: 'Docentes', count: 68, percentage: 20, color: 'bg-success' },
                { role: 'Bedelía/Regencia', count: 18, percentage: 5, color: 'bg-warning' },
                { role: 'Administradores', count: 8, percentage: 3, color: 'bg-destructive' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.role}</span>
                    <span className="text-muted-foreground">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente del Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: 'Notas validadas', detail: '128 calificaciones aprobadas', time: 'Hace 1 hora' },
                { action: 'Nuevo usuario creado', detail: 'Docente agregado al sistema', time: 'Hace 3 horas' },
                { action: 'Reporte generado', detail: 'Estadísticas mensuales exportadas', time: 'Hace 5 horas' },
                { action: 'Backup completado', detail: 'Base de datos respaldada', time: 'Hace 1 día' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted">
                  <p className="font-medium text-sm">{item.action}</p>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
