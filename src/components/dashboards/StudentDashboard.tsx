import { Calendar, Award, Download, FileText } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const StudentDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel de Control - Estudiante</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenido a tu libreta digital de calificaciones
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Promedio General"
          value="8.5"
          icon={Award}
          description="Ciclo Lectivo 2025"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Materias Cursando"
          value="6"
          icon={FileText}
          description="1er Cuatrimestre"
        />
        <StatCard
          title="Asistencia"
          value="94%"
          icon={Calendar}
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard
          title="Materias Aprobadas"
          value="12"
          icon={Award}
          description="Total acumuladas"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Últimas Calificaciones</CardTitle>
            <CardDescription>Calificaciones recientes de tus materias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { subject: 'Matemática', grade: 9, date: '15/03/2025', type: 'Parcial 1' },
                { subject: 'Lengua y Literatura', grade: 8, date: '12/03/2025', type: 'TP 2' },
                { subject: 'Historia', grade: 10, date: '10/03/2025', type: 'Oral' },
                { subject: 'Inglés', grade: 7, date: '08/03/2025', type: 'Parcial 1' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0">
                  <div className="flex-1">
                    <p className="font-medium">{item.subject}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.type} - {item.date}
                    </p>
                  </div>
                  <Badge
                    variant={item.grade >= 7 ? 'default' : 'destructive'}
                    className="text-lg px-3"
                  >
                    {item.grade}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Gestiona tu información académica</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Ver Libreta Completa
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Descargar Certificado de Alumno Regular
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Descargar Certificado de Estudios
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Ver Historial de Asistencias
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notificaciones Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                title: 'Nueva calificación disponible',
                description: 'Se ha publicado tu nota de Matemática - Parcial 1',
                time: 'Hace 2 horas',
                type: 'success'
              },
              {
                title: 'Actualización del calendario',
                description: 'Se ha modificado la fecha del examen final de Lengua',
                time: 'Hace 3 días',
                type: 'info'
              },
            ].map((notif, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted">
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 h-2 w-2 rounded-full ${
                      notif.type === 'success'
                        ? 'bg-success'
                        : 'bg-primary'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{notif.title}</p>
                    <p className="text-sm text-muted-foreground">{notif.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
