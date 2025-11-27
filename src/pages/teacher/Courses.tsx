import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

const coursesData = [
  { name: 'Matemática - 1° Año', students: 28, career: 'Profesorado de Educación Primaria' },
  { name: 'Matemática - 2° Año', students: 25, career: 'Profesorado de Educación Primaria' },
  { name: 'Didáctica de la Matemática', students: 22, career: 'Profesorado de Educación Primaria' },
];

export default function TeacherCourses() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mis Cursos</h1>
        <p className="text-muted-foreground">Gestión de cursos asignados</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {coursesData.map((course, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{course.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{course.students} estudiantes</span>
              </div>
              <p className="text-sm text-muted-foreground">{course.career}</p>
              <Button className="w-full">Ver Detalles</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
