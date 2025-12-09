import { useState } from 'react';
import { ArrowLeft, Save, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const alumnosData = [
  { id: '1', nombre: 'García, Juan Pablo', legajo: '2024001', presente: true, asistenciaTotal: 92 },
  { id: '2', nombre: 'López, María Elena', legajo: '2024002', presente: true, asistenciaTotal: 88 },
  { id: '3', nombre: 'Martínez, Carlos Alberto', legajo: '2024003', presente: false, asistenciaTotal: 72 },
  { id: '4', nombre: 'Rodríguez, Ana Laura', legajo: '2024004', presente: true, asistenciaTotal: 95 },
  { id: '5', nombre: 'Fernández, Diego Armando', legajo: '2024005', presente: true, asistenciaTotal: 85 },
  { id: '6', nombre: 'González, Lucía Victoria', legajo: '2024006', presente: false, asistenciaTotal: 68 },
  { id: '7', nombre: 'Pérez, Martín José', legajo: '2024007', presente: true, asistenciaTotal: 90 },
  { id: '8', nombre: 'Sánchez, Valentina', legajo: '2024008', presente: true, asistenciaTotal: 78 },
];

export const DocenteAsistencias = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [alumnos, setAlumnos] = useState(alumnosData);

  const handleAsistenciaChange = (alumnoId: string, presente: boolean) => {
    setAlumnos(prev => 
      prev.map(a => a.id === alumnoId ? { ...a, presente } : a)
    );
  };

  const handleGuardar = () => {
    const presentes = alumnos.filter(a => a.presente).length;
    const ausentes = alumnos.length - presentes;
    toast.success(`Asistencia guardada: ${presentes} presentes, ${ausentes} ausentes`);
    navigate('/docente/materias');
  };

  const marcarTodos = (presente: boolean) => {
    setAlumnos(prev => prev.map(a => ({ ...a, presente })));
  };

  const presentes = alumnos.filter(a => a.presente).length;
  const ausentes = alumnos.length - presentes;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Registro de Asistencias</h1>
          <p className="text-muted-foreground mt-1">
            Matemática I - 1ro A Turno Mañana
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fecha</p>
                <Input 
                  type="date" 
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{presentes}</p>
                <p className="text-sm text-muted-foreground">Presentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{ausentes}</p>
                <p className="text-sm text-muted-foreground">Ausentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Acciones rápidas</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => marcarTodos(true)}>
                  Todos presentes
                </Button>
                <Button size="sm" variant="outline" onClick={() => marcarTodos(false)}>
                  Todos ausentes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Alumnos</CardTitle>
          <CardDescription>
            Active el switch para marcar como presente. Los alumnos con asistencia menor al 75% están resaltados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Alumno</TableHead>
                  <TableHead className="w-[100px]">Legajo</TableHead>
                  <TableHead className="w-[150px]">Asistencia Total</TableHead>
                  <TableHead className="w-[120px] text-center">Presente</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alumnos.map((alumno, index) => (
                  <TableRow 
                    key={alumno.id}
                    className={alumno.asistenciaTotal < 75 ? 'bg-destructive/5' : ''}
                  >
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {alumno.nombre}
                        {alumno.asistenciaTotal < 75 && (
                          <Badge variant="destructive" className="text-xs">
                            Riesgo
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{alumno.legajo}</TableCell>
                    <TableCell>
                      <span className={alumno.asistenciaTotal < 75 ? 'text-destructive font-medium' : ''}>
                        {alumno.asistenciaTotal}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={alumno.presente}
                        onCheckedChange={(checked) => handleAsistenciaChange(alumno.id, checked)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancelar
        </Button>
        <Button onClick={handleGuardar}>
          <Save className="h-4 w-4 mr-2" />
          Guardar Asistencia
        </Button>
      </div>
    </div>
  );
};

export default DocenteAsistencias;
