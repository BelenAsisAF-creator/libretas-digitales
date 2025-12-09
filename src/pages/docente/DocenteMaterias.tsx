import { BookOpen, Users, FileText, CheckSquare, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

const materias = [
  {
    id: '1',
    nombre: 'Matemática I',
    carrera: 'Tecnicatura en Programación',
    comisiones: [
      { id: 'c1', nombre: '1ro A - Turno Mañana', alumnos: 28, asistenciaPromedio: 89 },
      { id: 'c2', nombre: '1ro B - Turno Noche', alumnos: 24, asistenciaPromedio: 82 },
    ]
  },
  {
    id: '2',
    nombre: 'Álgebra',
    carrera: 'Tecnicatura en Programación',
    comisiones: [
      { id: 'c3', nombre: '2do A - Turno Mañana', alumnos: 19, asistenciaPromedio: 95 },
    ]
  },
  {
    id: '3',
    nombre: 'Cálculo',
    carrera: 'Tecnicatura en Redes',
    comisiones: [
      { id: 'c4', nombre: '3ro A - Turno Mañana', alumnos: 16, asistenciaPromedio: 88 },
      { id: 'c5', nombre: '3ro C - Turno Noche', alumnos: 22, asistenciaPromedio: 91 },
    ]
  },
  {
    id: '4',
    nombre: 'Física I',
    carrera: 'Tecnicatura en Programación',
    comisiones: [
      { id: 'c6', nombre: '1ro A - Turno Mañana', alumnos: 30, asistenciaPromedio: 78 },
    ]
  },
];

export const DocenteMaterias = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mis Materias</h1>
        <p className="text-muted-foreground mt-1">
          Gestión de materias y comisiones asignadas
        </p>
      </div>

      <div className="grid gap-6">
        {materias.map((materia) => (
          <Card key={materia.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    {materia.nombre}
                  </CardTitle>
                  <CardDescription>{materia.carrera}</CardDescription>
                </div>
                <Badge variant="secondary">
                  {materia.comisiones.length} {materia.comisiones.length === 1 ? 'comisión' : 'comisiones'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {materia.comisiones.map((comision) => (
                  <div 
                    key={comision.id} 
                    className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{comision.nombre}</p>
                          <p className="text-sm text-muted-foreground">
                            {comision.alumnos} alumnos inscriptos
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => navigate(`/docente/comision/${comision.id}/notas`)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Notas
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => navigate(`/docente/comision/${comision.id}/asistencias`)}
                        >
                          <CheckSquare className="h-4 w-4 mr-1" />
                          Asistencia
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => navigate(`/docente/comision/${comision.id}`)}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Asistencia promedio</span>
                        <span className={`font-medium ${comision.asistenciaPromedio < 75 ? 'text-destructive' : 'text-success'}`}>
                          {comision.asistenciaPromedio}%
                        </span>
                      </div>
                      <Progress 
                        value={comision.asistenciaPromedio} 
                        className={comision.asistenciaPromedio < 75 ? '[&>div]:bg-destructive' : '[&>div]:bg-success'}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocenteMaterias;
