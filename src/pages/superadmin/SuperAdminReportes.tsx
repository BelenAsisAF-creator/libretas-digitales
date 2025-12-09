import { useState } from 'react';
import { BarChart3, Download, FileText, TrendingUp, Users, Calendar, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const reportesDisponibles = [
  { id: '1', nombre: 'Rendimiento por Materia', descripcion: 'Notas promedio y aprobación por cada materia', icono: BarChart3 },
  { id: '2', nombre: 'Rendimiento por Carrera', descripcion: 'Estadísticas generales por carrera', icono: TrendingUp },
  { id: '3', nombre: 'Aprobaciones/Reprobaciones', descripcion: 'Distribución de resultados académicos', icono: FileText },
  { id: '4', nombre: 'Asistencias', descripcion: 'Registro de asistencias por período', icono: Calendar },
  { id: '5', nombre: 'Deserción', descripcion: 'Análisis de abandono por carrera', icono: Users },
  { id: '6', nombre: 'Comparativa Cuatrimestral', descripcion: 'Evolución entre períodos', icono: TrendingUp },
];

const datosRendimiento = [
  { materia: 'Matemática I', promedio: 7.2, aprobados: 85, reprobados: 15, asistencia: 88 },
  { materia: 'Programación I', promedio: 7.8, aprobados: 90, reprobados: 10, asistencia: 92 },
  { materia: 'Base de Datos', promedio: 6.9, aprobados: 78, reprobados: 22, asistencia: 85 },
  { materia: 'Redes I', promedio: 7.5, aprobados: 82, reprobados: 18, asistencia: 87 },
  { materia: 'Sistemas Operativos', promedio: 7.0, aprobados: 80, reprobados: 20, asistencia: 84 },
];

export const SuperAdminReportes = () => {
  const [carrera, setCarrera] = useState('todas');
  const [periodo, setPeriodo] = useState('2024-2');
  const [materia, setMateria] = useState('todas');

  const handleGenerarPDF = (reporte: string) => {
    toast.success(`Generando reporte PDF: ${reporte}`);
  };

  const handleGenerarExcel = (reporte: string) => {
    toast.success(`Generando reporte Excel: ${reporte}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reportes Académicos</h1>
        <p className="text-muted-foreground mt-1">
          Generación y análisis de estadísticas del sistema
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros de Búsqueda
          </CardTitle>
          <CardDescription>Seleccione los parámetros del reporte</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Carrera</Label>
              <Select value={carrera} onValueChange={setCarrera}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione carrera" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las carreras</SelectItem>
                  <SelectItem value="programacion">Tecnicatura en Programación</SelectItem>
                  <SelectItem value="redes">Tecnicatura en Redes</SelectItem>
                  <SelectItem value="diseno">Tecnicatura en Diseño</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Período Académico</Label>
              <Select value={periodo} onValueChange={setPeriodo}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-2">2do Cuatrimestre 2024</SelectItem>
                  <SelectItem value="2024-1">1er Cuatrimestre 2024</SelectItem>
                  <SelectItem value="2023-2">2do Cuatrimestre 2023</SelectItem>
                  <SelectItem value="2023-1">1er Cuatrimestre 2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Materia</Label>
              <Select value={materia} onValueChange={setMateria}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione materia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las materias</SelectItem>
                  <SelectItem value="matematica1">Matemática I</SelectItem>
                  <SelectItem value="programacion1">Programación I</SelectItem>
                  <SelectItem value="basedatos">Base de Datos</SelectItem>
                  <SelectItem value="redes1">Redes I</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Comisión</Label>
              <Select defaultValue="todas">
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione comisión" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="1a">1ro A</SelectItem>
                  <SelectItem value="1b">1ro B</SelectItem>
                  <SelectItem value="2a">2do A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="rendimiento" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="rendimiento">Rendimiento</TabsTrigger>
          <TabsTrigger value="asistencias">Asistencias</TabsTrigger>
          <TabsTrigger value="comparativa">Comparativa</TabsTrigger>
          <TabsTrigger value="generar">Generar Reportes</TabsTrigger>
        </TabsList>

        <TabsContent value="rendimiento" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Rendimiento por Materia</CardTitle>
                  <CardDescription>Estadísticas del período seleccionado</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleGenerarPDF('Rendimiento')}>
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleGenerarExcel('Rendimiento')}>
                    <Download className="h-4 w-4 mr-2" />
                    Excel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {datosRendimiento.map((materia, i) => (
                  <div key={i} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium">{materia.materia}</p>
                        <p className="text-sm text-muted-foreground">
                          Promedio: <span className="font-medium">{materia.promedio}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">
                          <span className="text-success font-medium">{materia.aprobados}%</span> aprobados
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {materia.asistencia}% asistencia
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Aprobación</p>
                        <Progress value={materia.aprobados} className="[&>div]:bg-success" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Asistencia</p>
                        <Progress value={materia.asistencia} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="asistencias" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reporte de Asistencias</CardTitle>
              <CardDescription>Análisis de asistencia por materia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {datosRendimiento.map((materia, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">{materia.materia}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32">
                        <Progress 
                          value={materia.asistencia} 
                          className={materia.asistencia < 75 ? '[&>div]:bg-destructive' : '[&>div]:bg-success'}
                        />
                      </div>
                      <span className={`font-medium ${materia.asistencia < 75 ? 'text-destructive' : 'text-success'}`}>
                        {materia.asistencia}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparativa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparativa Cuatrimestral</CardTitle>
              <CardDescription>Evolución del rendimiento académico</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg border">
                  <h4 className="font-medium mb-3">1er Cuatrimestre 2024</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tasa de aprobación</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Asistencia promedio</span>
                      <span className="font-medium">82%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nota promedio</span>
                      <span className="font-medium">6.8</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg border bg-primary/5">
                  <h4 className="font-medium mb-3">2do Cuatrimestre 2024</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tasa de aprobación</span>
                      <span className="font-medium text-success">78% (+3%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Asistencia promedio</span>
                      <span className="font-medium text-success">85% (+3%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nota promedio</span>
                      <span className="font-medium text-success">7.2 (+0.4)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generar" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reportesDisponibles.map((reporte) => (
              <Card key={reporte.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <reporte.icono className="h-5 w-5 text-primary" />
                    {reporte.nombre}
                  </CardTitle>
                  <CardDescription>{reporte.descripcion}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleGenerarPDF(reporte.nombre)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleGenerarExcel(reporte.nombre)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Excel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminReportes;
