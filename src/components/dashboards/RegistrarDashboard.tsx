import { CheckSquare, Users, FileText, AlertTriangle } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const RegistrarDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel de Control - Bedelía/Regencia</h1>
        <p className="text-muted-foreground mt-1">
          Validación y gestión académica
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Notas Pendientes"
          value="23"
          icon={AlertTriangle}
          description="Requieren validación"
        />
        <StatCard
          title="Validadas Hoy"
          value="45"
          icon={CheckSquare}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Usuarios Activos"
          value="342"
          icon={Users}
          description="Total del sistema"
        />
        <StatCard
          title="Reportes Generados"
          value="8"
          icon={FileText}
          description="Esta semana"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Notas Pendientes de Validación</CardTitle>
            <CardDescription>Requieren aprobación para publicarse</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  teacher: 'Prof. González',
                  subject: 'Matemática I',
                  course: '1ro A',
                  count: 28,
                  date: '18/03/2025',
                  type: 'Parcial 1'
                },
                {
                  teacher: 'Prof. Martínez',
                  subject: 'Historia',
                  course: '2do B',
                  count: 24,
                  date: '17/03/2025',
                  type: 'TP 3'
                },
                {
                  teacher: 'Prof. Rodríguez',
                  subject: 'Lengua',
                  course: '3ro A',
                  count: 19,
                  date: '16/03/2025',
                  type: 'Oral'
                },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-lg border bg-card">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{item.subject} - {item.course}</p>
                      <p className="text-sm text-muted-foreground">{item.teacher}</p>
                    </div>
                    <Badge variant="outline">{item.count} notas</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {item.type} • {item.date}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Revisar
                      </Button>
                      <Button size="sm">
                        Validar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gestión Rápida</CardTitle>
            <CardDescription>Acciones administrativas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <CheckSquare className="mr-2 h-4 w-4" />
              Validar Notas Pendientes
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Gestionar Usuarios
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generar Reporte de Notas
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Ver Historial de Validaciones
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actividad del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                user: 'Prof. González',
                action: 'Cargó notas de Matemática I - Parcial 1',
                time: 'Hace 1 hora',
                status: 'Pendiente'
              },
              {
                user: 'Admin. Martínez',
                action: 'Validó 24 notas de Historia - TP 3',
                time: 'Hace 2 horas',
                status: 'Completado'
              },
              {
                user: 'Prof. Rodríguez',
                action: 'Actualizó asistencias de Lengua',
                time: 'Hace 3 horas',
                status: 'Completado'
              },
              {
                user: 'Admin. López',
                action: 'Creó nuevo usuario docente',
                time: 'Hace 5 horas',
                status: 'Completado'
              },
            ].map((activity, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                  <Badge
                    variant={activity.status === 'Completado' ? 'default' : 'secondary'}
                    className="ml-2"
                  >
                    {activity.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
