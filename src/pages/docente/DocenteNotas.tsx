import { useState } from 'react';
import { ArrowLeft, Save, Send, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const alumnosData = [
  { id: '1', nombre: 'García, Juan Pablo', legajo: '2024001', nota: '', observaciones: '' },
  { id: '2', nombre: 'López, María Elena', legajo: '2024002', nota: '', observaciones: '' },
  { id: '3', nombre: 'Martínez, Carlos Alberto', legajo: '2024003', nota: '', observaciones: '' },
  { id: '4', nombre: 'Rodríguez, Ana Laura', legajo: '2024004', nota: '', observaciones: '' },
  { id: '5', nombre: 'Fernández, Diego Armando', legajo: '2024005', nota: '', observaciones: '' },
  { id: '6', nombre: 'González, Lucía Victoria', legajo: '2024006', nota: '', observaciones: '' },
  { id: '7', nombre: 'Pérez, Martín José', legajo: '2024007', nota: '', observaciones: '' },
  { id: '8', nombre: 'Sánchez, Valentina', legajo: '2024008', nota: '', observaciones: '' },
];

export const DocenteNotas = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tipoEvaluacion, setTipoEvaluacion] = useState('');
  const [fechaEvaluacion, setFechaEvaluacion] = useState('');
  const [alumnos, setAlumnos] = useState(alumnosData);

  const handleNotaChange = (alumnoId: string, nota: string) => {
    const notaNum = parseFloat(nota);
    if (nota !== '' && (isNaN(notaNum) || notaNum < 1 || notaNum > 10)) {
      return;
    }
    setAlumnos(prev => 
      prev.map(a => a.id === alumnoId ? { ...a, nota } : a)
    );
  };

  const handleObservacionChange = (alumnoId: string, observaciones: string) => {
    setAlumnos(prev => 
      prev.map(a => a.id === alumnoId ? { ...a, observaciones } : a)
    );
  };

  const handleGuardarBorrador = () => {
    toast.success('Borrador guardado correctamente');
  };

  const handleEnviarBedelia = () => {
    if (!tipoEvaluacion || !fechaEvaluacion) {
      toast.error('Complete el tipo de evaluación y la fecha');
      return;
    }
    const sinNota = alumnos.filter(a => a.nota === '').length;
    if (sinNota > 0) {
      toast.error(`Hay ${sinNota} alumnos sin nota cargada`);
      return;
    }
    toast.success('Planilla enviada a Bedelía para validación');
    navigate('/docente/materias');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Carga de Notas</h1>
          <p className="text-muted-foreground mt-1">
            Matemática I - 1ro A Turno Mañana
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Datos de la Evaluación
          </CardTitle>
          <CardDescription>Complete la información de la evaluación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Evaluación *</Label>
              <Select value={tipoEvaluacion} onValueChange={setTipoEvaluacion}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="parcial1">Parcial 1</SelectItem>
                  <SelectItem value="parcial2">Parcial 2</SelectItem>
                  <SelectItem value="tp">Trabajo Práctico</SelectItem>
                  <SelectItem value="final">Examen Final</SelectItem>
                  <SelectItem value="recuperatorio">Recuperatorio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fecha">Fecha de Evaluación *</Label>
              <Input 
                id="fecha" 
                type="date" 
                value={fechaEvaluacion}
                onChange={(e) => setFechaEvaluacion(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Estado</Label>
              <div className="pt-2">
                <Badge variant="outline" className="bg-muted">Borrador</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Alumnos</CardTitle>
          <CardDescription>
            Ingrese las notas (1-10) para cada alumno. Las notas deben ser números entre 1 y 10.
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
                  <TableHead className="w-[120px]">Nota (1-10)</TableHead>
                  <TableHead>Observaciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alumnos.map((alumno, index) => (
                  <TableRow key={alumno.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{alumno.nombre}</TableCell>
                    <TableCell className="text-muted-foreground">{alumno.legajo}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        step="0.5"
                        value={alumno.nota}
                        onChange={(e) => handleNotaChange(alumno.id, e.target.value)}
                        className="w-20"
                        placeholder="-"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={alumno.observaciones}
                        onChange={(e) => handleObservacionChange(alumno.id, e.target.value)}
                        placeholder="Opcional"
                        className="max-w-xs"
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
        <Button variant="outline" onClick={handleGuardarBorrador}>
          <Save className="h-4 w-4 mr-2" />
          Guardar Borrador
        </Button>
        <Button onClick={handleEnviarBedelia}>
          <Send className="h-4 w-4 mr-2" />
          Enviar a Bedelía
        </Button>
      </div>
    </div>
  );
};

export default DocenteNotas;
