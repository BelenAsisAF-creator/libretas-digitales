import { useState } from 'react';
import { CheckSquare, XCircle, Eye, FileText, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const planillasData = [
  { id: '1', docente: 'Prof. González, María', materia: 'Matemática I', comision: '1ro A', tipo: 'Parcial 1', fecha: '05/12/2024', alumnos: 28, estado: 'pendiente' },
  { id: '2', docente: 'Prof. Rodríguez, Juan', materia: 'Física I', comision: '2do B', tipo: 'TP 2', fecha: '04/12/2024', alumnos: 24, estado: 'pendiente' },
  { id: '3', docente: 'Prof. López, Ana', materia: 'Química', comision: '1ro C', tipo: 'Final', fecha: '03/12/2024', alumnos: 30, estado: 'pendiente' },
  { id: '4', docente: 'Prof. Martínez, Carlos', materia: 'Álgebra', comision: '2do A', tipo: 'Parcial 2', fecha: '02/12/2024', alumnos: 22, estado: 'aprobada' },
  { id: '5', docente: 'Prof. Fernández, Laura', materia: 'Programación I', comision: '1ro B', tipo: 'TP 3', fecha: '01/12/2024', alumnos: 26, estado: 'rechazada' },
];

const notasDetalle = [
  { alumno: 'García, Juan Pablo', legajo: '2024001', nota: 8.5, observaciones: '' },
  { alumno: 'López, María Elena', legajo: '2024002', nota: 7, observaciones: '' },
  { alumno: 'Martínez, Carlos Alberto', legajo: '2024003', nota: 6.5, observaciones: 'Recuperatorio' },
  { alumno: 'Rodríguez, Ana Laura', legajo: '2024004', nota: 9, observaciones: '' },
  { alumno: 'Fernández, Diego Armando', legajo: '2024005', nota: 5, observaciones: 'Ausente primera instancia' },
];

export const BedeliaValidaciones = () => {
  const [planillas, setPlanillas] = useState(planillasData);
  const [filtroEstado, setFiltroEstado] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [planillaSeleccionada, setPlanillaSeleccionada] = useState<typeof planillasData[0] | null>(null);
  const [comentarioRechazo, setComentarioRechazo] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAprobar = (id: string) => {
    setPlanillas(prev => prev.map(p => p.id === id ? { ...p, estado: 'aprobada' } : p));
    toast.success('Planilla aprobada correctamente. Se notificó al docente.');
    setDialogOpen(false);
  };

  const handleRechazar = (id: string) => {
    if (!comentarioRechazo.trim()) {
      toast.error('Debe ingresar un motivo de rechazo');
      return;
    }
    setPlanillas(prev => prev.map(p => p.id === id ? { ...p, estado: 'rechazada' } : p));
    toast.success('Planilla rechazada. Se notificó al docente.');
    setComentarioRechazo('');
    setDialogOpen(false);
  };

  const getStatusBadge = (estado: string) => {
    const statusConfig = {
      pendiente: { label: 'Pendiente', className: 'bg-warning/10 text-warning border-warning/20' },
      aprobada: { label: 'Aprobada', className: 'bg-success/10 text-success border-success/20' },
      rechazada: { label: 'Rechazada', className: 'bg-destructive/10 text-destructive border-destructive/20' },
    };
    const config = statusConfig[estado as keyof typeof statusConfig] || statusConfig.pendiente;
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  const planillasFiltradas = planillas.filter(p => {
    const matchEstado = filtroEstado === 'todas' || p.estado === filtroEstado;
    const matchBusqueda = 
      p.materia.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.docente.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.comision.toLowerCase().includes(busqueda.toLowerCase());
    return matchEstado && matchBusqueda;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Validación de Planillas</h1>
        <p className="text-muted-foreground mt-1">
          Revisión y aprobación de notas cargadas por docentes
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Planillas de Notas</CardTitle>
              <CardDescription>
                {planillasFiltradas.length} planillas encontradas
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-8 w-[200px]"
                />
              </div>
              <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="pendiente">Pendientes</SelectItem>
                  <SelectItem value="aprobada">Aprobadas</SelectItem>
                  <SelectItem value="rechazada">Rechazadas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Materia</TableHead>
                  <TableHead>Comisión</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Docente</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Alumnos</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {planillasFiltradas.map((planilla) => (
                  <TableRow key={planilla.id}>
                    <TableCell className="font-medium">{planilla.materia}</TableCell>
                    <TableCell>{planilla.comision}</TableCell>
                    <TableCell>{planilla.tipo}</TableCell>
                    <TableCell>{planilla.docente}</TableCell>
                    <TableCell>{planilla.fecha}</TableCell>
                    <TableCell>{planilla.alumnos}</TableCell>
                    <TableCell>{getStatusBadge(planilla.estado)}</TableCell>
                    <TableCell className="text-right">
                      <Dialog open={dialogOpen && planillaSeleccionada?.id === planilla.id} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setPlanillaSeleccionada(planilla)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Revisar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Detalle de Planilla</DialogTitle>
                            <DialogDescription>
                              {planilla.materia} - {planilla.comision} - {planilla.tipo}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Docente</p>
                                <p className="font-medium">{planilla.docente}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Fecha</p>
                                <p className="font-medium">{planilla.fecha}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Estado</p>
                                {getStatusBadge(planilla.estado)}
                              </div>
                            </div>
                            <div className="rounded-md border max-h-[300px] overflow-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Alumno</TableHead>
                                    <TableHead>Legajo</TableHead>
                                    <TableHead>Nota</TableHead>
                                    <TableHead>Observaciones</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {notasDetalle.map((nota, i) => (
                                    <TableRow key={i}>
                                      <TableCell>{nota.alumno}</TableCell>
                                      <TableCell>{nota.legajo}</TableCell>
                                      <TableCell className="font-medium">{nota.nota}</TableCell>
                                      <TableCell className="text-muted-foreground">{nota.observaciones || '-'}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                            {planilla.estado === 'pendiente' && (
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Comentario (obligatorio para rechazar)</label>
                                <Textarea
                                  placeholder="Ingrese el motivo del rechazo..."
                                  value={comentarioRechazo}
                                  onChange={(e) => setComentarioRechazo(e.target.value)}
                                />
                              </div>
                            )}
                          </div>
                          {planilla.estado === 'pendiente' && (
                            <DialogFooter>
                              <Button 
                                variant="destructive" 
                                onClick={() => handleRechazar(planilla.id)}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Rechazar
                              </Button>
                              <Button onClick={() => handleAprobar(planilla.id)}>
                                <CheckSquare className="h-4 w-4 mr-2" />
                                Aprobar
                              </Button>
                            </DialogFooter>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BedeliaValidaciones;
