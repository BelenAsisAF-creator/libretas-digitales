import { useState } from 'react';
import { BookOpen, Plus, Edit, Trash2, Users, Calendar, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const carrerasData = [
  { id: '1', nombre: 'Tecnicatura en Programación', codigo: 'TEC-PROG', duracion: '3 años', alumnos: 120, estado: 'activa' },
  { id: '2', nombre: 'Tecnicatura en Redes', codigo: 'TEC-RED', duracion: '3 años', alumnos: 85, estado: 'activa' },
  { id: '3', nombre: 'Tecnicatura en Diseño Digital', codigo: 'TEC-DIS', duracion: '2 años', alumnos: 65, estado: 'activa' },
];

const materiasData = [
  { id: '1', nombre: 'Matemática I', codigo: 'MAT-I', carrera: 'Tecnicatura en Programación', año: 1, cuatrimestre: 1 },
  { id: '2', nombre: 'Programación I', codigo: 'PROG-I', carrera: 'Tecnicatura en Programación', año: 1, cuatrimestre: 1 },
  { id: '3', nombre: 'Base de Datos', codigo: 'BD-I', carrera: 'Tecnicatura en Programación', año: 2, cuatrimestre: 1 },
  { id: '4', nombre: 'Redes I', codigo: 'RED-I', carrera: 'Tecnicatura en Redes', año: 1, cuatrimestre: 1 },
  { id: '5', nombre: 'Sistemas Operativos', codigo: 'SO-I', carrera: 'Tecnicatura en Redes', año: 1, cuatrimestre: 2 },
];

const comisionesData = [
  { id: '1', nombre: '1ro A - Mañana', materia: 'Matemática I', docente: 'Prof. González, María', alumnos: 28, horario: 'Lun-Mie 8:00-10:00' },
  { id: '2', nombre: '1ro B - Noche', materia: 'Matemática I', docente: 'Prof. López, Juan', alumnos: 24, horario: 'Mar-Jue 19:00-21:00' },
  { id: '3', nombre: '2do A - Mañana', materia: 'Programación I', docente: 'Prof. Martínez, Ana', alumnos: 30, horario: 'Lun-Mie 10:00-12:00' },
];

const periodosData = [
  { id: '1', nombre: '2do Cuatrimestre 2024', inicio: '01/08/2024', fin: '30/11/2024', estado: 'activo' },
  { id: '2', nombre: '1er Cuatrimestre 2024', inicio: '01/03/2024', fin: '30/06/2024', estado: 'cerrado' },
  { id: '3', nombre: '2do Cuatrimestre 2023', inicio: '01/08/2023', fin: '30/11/2023', estado: 'cerrado' },
];

export const SuperAdminAcademico = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'carrera' | 'materia' | 'comision' | 'periodo'>('carrera');
  const [busqueda, setBusqueda] = useState('');

  const handleCrear = (tipo: string) => {
    toast.success(`${tipo} creado/a correctamente`);
    setDialogOpen(false);
  };

  const handleEliminar = (tipo: string, nombre: string) => {
    toast.success(`${tipo} "${nombre}" eliminado/a`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Administración Académica</h1>
        <p className="text-muted-foreground mt-1">
          Gestión de carreras, materias, comisiones y períodos
        </p>
      </div>

      <Tabs defaultValue="carreras" className="space-y-4">
        <TabsList>
          <TabsTrigger value="carreras">
            <BookOpen className="h-4 w-4 mr-2" />
            Carreras
          </TabsTrigger>
          <TabsTrigger value="materias">
            <BookOpen className="h-4 w-4 mr-2" />
            Materias
          </TabsTrigger>
          <TabsTrigger value="comisiones">
            <Users className="h-4 w-4 mr-2" />
            Comisiones
          </TabsTrigger>
          <TabsTrigger value="periodos">
            <Calendar className="h-4 w-4 mr-2" />
            Períodos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="carreras" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Carreras</CardTitle>
                  <CardDescription>Gestión de carreras del instituto</CardDescription>
                </div>
                <Dialog open={dialogOpen && dialogType === 'carrera'} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setDialogType('carrera')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Nueva Carrera
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Nueva Carrera</DialogTitle>
                      <DialogDescription>Complete los datos de la carrera</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Nombre</Label>
                        <Input placeholder="Nombre de la carrera" />
                      </div>
                      <div className="space-y-2">
                        <Label>Código</Label>
                        <Input placeholder="TEC-XXX" />
                      </div>
                      <div className="space-y-2">
                        <Label>Duración</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione duración" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">2 años</SelectItem>
                            <SelectItem value="3">3 años</SelectItem>
                            <SelectItem value="4">4 años</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                      <Button onClick={() => handleCrear('Carrera')}>Crear</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Código</TableHead>
                      <TableHead>Duración</TableHead>
                      <TableHead>Alumnos</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {carrerasData.map((carrera) => (
                      <TableRow key={carrera.id}>
                        <TableCell className="font-medium">{carrera.nombre}</TableCell>
                        <TableCell>{carrera.codigo}</TableCell>
                        <TableCell>{carrera.duracion}</TableCell>
                        <TableCell>{carrera.alumnos}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                            Activa
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="icon" variant="ghost"><Edit className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost" onClick={() => handleEliminar('Carrera', carrera.nombre)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materias" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Materias</CardTitle>
                  <CardDescription>Gestión de materias por carrera</CardDescription>
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
                  <Button onClick={() => { setDialogType('materia'); setDialogOpen(true); }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Materia
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Código</TableHead>
                      <TableHead>Carrera</TableHead>
                      <TableHead>Año</TableHead>
                      <TableHead>Cuatrimestre</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {materiasData.map((materia) => (
                      <TableRow key={materia.id}>
                        <TableCell className="font-medium">{materia.nombre}</TableCell>
                        <TableCell>{materia.codigo}</TableCell>
                        <TableCell>{materia.carrera}</TableCell>
                        <TableCell>{materia.año}°</TableCell>
                        <TableCell>{materia.cuatrimestre}° Cuat.</TableCell>
                        <TableCell className="text-right">
                          <Button size="icon" variant="ghost"><Edit className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost"><Trash2 className="h-4 w-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comisiones" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Comisiones</CardTitle>
                  <CardDescription>Gestión de comisiones y horarios</CardDescription>
                </div>
                <Button onClick={() => { setDialogType('comision'); setDialogOpen(true); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Comisión
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Comisión</TableHead>
                      <TableHead>Materia</TableHead>
                      <TableHead>Docente</TableHead>
                      <TableHead>Alumnos</TableHead>
                      <TableHead>Horario</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comisionesData.map((comision) => (
                      <TableRow key={comision.id}>
                        <TableCell className="font-medium">{comision.nombre}</TableCell>
                        <TableCell>{comision.materia}</TableCell>
                        <TableCell>{comision.docente}</TableCell>
                        <TableCell>{comision.alumnos}</TableCell>
                        <TableCell className="text-muted-foreground">{comision.horario}</TableCell>
                        <TableCell className="text-right">
                          <Button size="icon" variant="ghost"><Edit className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost"><Trash2 className="h-4 w-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="periodos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Períodos Académicos</CardTitle>
                  <CardDescription>Gestión de cuatrimestres y años</CardDescription>
                </div>
                <Button onClick={() => { setDialogType('periodo'); setDialogOpen(true); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Período
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Período</TableHead>
                      <TableHead>Fecha Inicio</TableHead>
                      <TableHead>Fecha Fin</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {periodosData.map((periodo) => (
                      <TableRow key={periodo.id}>
                        <TableCell className="font-medium">{periodo.nombre}</TableCell>
                        <TableCell>{periodo.inicio}</TableCell>
                        <TableCell>{periodo.fin}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={periodo.estado === 'activo' 
                              ? 'bg-success/10 text-success border-success/20' 
                              : 'bg-muted text-muted-foreground'
                            }
                          >
                            {periodo.estado === 'activo' ? 'Activo' : 'Cerrado'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="icon" variant="ghost"><Edit className="h-4 w-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminAcademico;
