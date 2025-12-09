import { FileText, Calendar, CheckCircle2, XCircle, Clock, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const planillasHistorial = [
  { id: '1', materia: 'Matemática I', comision: '1ro A', tipo: 'Parcial 1', fecha: '05/12/2024', estado: 'pendiente', alumnos: 28 },
  { id: '2', materia: 'Álgebra', comision: '2do A', tipo: 'TP 3', fecha: '03/12/2024', estado: 'aprobado', alumnos: 19 },
  { id: '3', materia: 'Cálculo', comision: '3ro A', tipo: 'Final', fecha: '01/12/2024', estado: 'rechazado', alumnos: 16 },
  { id: '4', materia: 'Física I', comision: '1ro A', tipo: 'Parcial 2', fecha: '28/11/2024', estado: 'aprobado', alumnos: 30 },
  { id: '5', materia: 'Matemática I', comision: '1ro B', tipo: 'TP 2', fecha: '25/11/2024', estado: 'aprobado', alumnos: 24 },
];

const asistenciasHistorial = [
  { id: '1', materia: 'Matemática I', comision: '1ro A', fecha: '06/12/2024', presentes: 26, ausentes: 2 },
  { id: '2', materia: 'Álgebra', comision: '2do A', fecha: '05/12/2024', presentes: 18, ausentes: 1 },
  { id: '3', materia: 'Cálculo', comision: '3ro A', fecha: '04/12/2024', presentes: 14, ausentes: 2 },
  { id: '4', materia: 'Física I', comision: '1ro A', fecha: '03/12/2024', presentes: 28, ausentes: 2 },
  { id: '5', materia: 'Matemática I', comision: '1ro B', fecha: '02/12/2024', presentes: 22, ausentes: 2 },
];

const notificaciones = [
  { id: '1', titulo: 'Planilla aprobada', mensaje: 'La planilla de Álgebra - TP 3 fue aprobada por Bedelía', fecha: '03/12/2024', leida: true },
  { id: '2', titulo: 'Planilla rechazada', mensaje: 'La planilla de Cálculo - Final fue rechazada. Motivo: Notas incompletas', fecha: '02/12/2024', leida: false },
  { id: '3', titulo: 'Recordatorio', mensaje: 'Tiene 3 planillas pendientes de cargar', fecha: '01/12/2024', leida: true },
  { id: '4', titulo: 'Alerta de asistencia', mensaje: '5 alumnos tienen asistencia menor al 75%', fecha: '30/11/2024', leida: false },
];

const getStatusBadge = (estado: string) => {
  const statusConfig = {
    pendiente: { label: 'Pendiente', className: 'bg-warning/10 text-warning border-warning/20' },
    aprobado: { label: 'Aprobado', className: 'bg-success/10 text-success border-success/20' },
    rechazado: { label: 'Rechazado', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  };
  const config = statusConfig[estado as keyof typeof statusConfig] || statusConfig.pendiente;
  return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
};

export const DocenteHistorial = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Historial</h1>
        <p className="text-muted-foreground mt-1">
          Registro de actividad y notificaciones
        </p>
      </div>

      <Tabs defaultValue="planillas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="planillas">
            <FileText className="h-4 w-4 mr-2" />
            Planillas de Notas
          </TabsTrigger>
          <TabsTrigger value="asistencias">
            <Calendar className="h-4 w-4 mr-2" />
            Asistencias
          </TabsTrigger>
          <TabsTrigger value="notificaciones">
            <Clock className="h-4 w-4 mr-2" />
            Notificaciones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="planillas" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Planillas Cargadas</CardTitle>
                  <CardDescription>Historial de notas enviadas</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="todas">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="pendiente">Pendientes</SelectItem>
                      <SelectItem value="aprobado">Aprobadas</SelectItem>
                      <SelectItem value="rechazado">Rechazadas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {planillasHistorial.map((planilla) => (
                  <div 
                    key={planilla.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{planilla.materia} - {planilla.tipo}</p>
                        <p className="text-sm text-muted-foreground">
                          {planilla.comision} • {planilla.alumnos} alumnos • {planilla.fecha}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(planilla.estado)}
                      <Button size="sm" variant="ghost">Ver detalle</Button>
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
              <CardTitle>Asistencias Registradas</CardTitle>
              <CardDescription>Historial de asistencias cargadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {asistenciasHistorial.map((asistencia) => (
                  <div 
                    key={asistencia.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{asistencia.materia}</p>
                        <p className="text-sm text-muted-foreground">
                          {asistencia.comision} • {asistencia.fecha}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <span className="text-sm font-medium">{asistencia.presentes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-destructive" />
                        <span className="text-sm font-medium">{asistencia.ausentes}</span>
                      </div>
                      <Button size="sm" variant="ghost">Ver detalle</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificaciones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
              <CardDescription>Mensajes del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notificaciones.map((notif) => (
                  <div 
                    key={notif.id}
                    className={`p-4 rounded-lg border ${!notif.leida ? 'bg-primary/5 border-primary/20' : 'bg-card'}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{notif.titulo}</p>
                          {!notif.leida && (
                            <Badge variant="default" className="text-xs">Nueva</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notif.mensaje}</p>
                        <p className="text-xs text-muted-foreground mt-2">{notif.fecha}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocenteHistorial;
