import { Users, FileText, CheckSquare, BookOpen } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export const TeacherDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel de Control - Docente</h1>
        <p className="text-muted-foreground mt-1">
          Gestión de cursos y calificaciones
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Cursos Activos"
          value="4"
          icon={BookOpen}
          description="1er Cuatrimestre"
        />
        <StatCard
          title="Total Estudiantes"
          value="87"
          icon={Users}
        />
        <StatCard
          title="Notas Pendientes"
          value="12"
          icon={FileText}
          description="Por cargar"
        />
        <StatCard
          title="Asistencias Hoy"
          value="3"
          icon={CheckSquare}
          description="Cursos con clase"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mis Cursos</CardTitle>
            <CardDescription>Cursos del ciclo lectivo actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Matemática I - 1ro A', students: 28, attendance: 89 },
                { name: 'Matemática II - 2do B', students: 24, attendance: 92 },
                { name: 'Álgebra - 3ro A', students: 19, attendance: 95 },
                { name: 'Cálculo - 3ro C', students: 16, attendance: 88 },
              ].map((course, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{course.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {course.students} estudiantes
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Ver Curso
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Asistencia promedio</span>
                      <span className="font-medium">{course.attendance}%</span>
                    </div>
                    <Progress value={course.attendance} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Gestión de notas y asistencias</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Cargar Notas Nuevas
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <CheckSquare className="mr-2 h-4 w-4" />
              Tomar Asistencia
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Ver Notas Pendientes de Aprobación
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              Planificaciones del Cuatrimestre
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                action: 'Notas cargadas',
                description: 'Matemática I - Parcial 1 (28 alumnos)',
                time: 'Hace 3 horas',
                status: 'Pendiente de aprobación'
              },
              {
                action: 'Asistencia tomada',
                description: 'Álgebra - 3ro A (19 alumnos)',
                time: 'Hace 1 día',
                status: 'Completado'
              },
              {
                action: 'Notas aprobadas',
                description: 'Cálculo - TP 2 (16 alumnos)',
                time: 'Hace 2 días',
                status: 'Aprobado'
              },
            ].map((activity, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activity.status === 'Completado' ? 'bg-success/10 text-success' :
                    activity.status === 'Aprobado' ? 'bg-success/10 text-success' :
                    'bg-warning/10 text-warning'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
