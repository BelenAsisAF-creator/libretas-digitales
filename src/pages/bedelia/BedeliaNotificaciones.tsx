import { useState } from 'react';
import { Bell, Send, Users, BookOpen, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const notificacionesEnviadas = [
  { id: '1', titulo: 'Cierre de cuatrimestre', destinatarios: 'Todos los docentes', fecha: '05/12/2024', estado: 'enviada' },
  { id: '2', titulo: 'Recordatorio de inscripciones', destinatarios: 'Todos los alumnos', fecha: '03/12/2024', estado: 'enviada' },
  { id: '3', titulo: 'Actualización del sistema', destinatarios: 'Todos', fecha: '01/12/2024', estado: 'enviada' },
];

export const BedeliaNotificaciones = () => {
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [destinatarios, setDestinatarios] = useState('todos');
  const [enviarEmail, setEnviarEmail] = useState(false);

  const handleEnviar = () => {
    if (!titulo.trim() || !mensaje.trim()) {
      toast.error('Complete el título y el mensaje');
      return;
    }
    toast.success('Notificación enviada correctamente');
    setTitulo('');
    setMensaje('');
    setDestinatarios('todos');
    setEnviarEmail(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notificaciones Institucionales</h1>
        <p className="text-muted-foreground mt-1">
          Envío de comunicados globales
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Nueva Notificación
            </CardTitle>
            <CardDescription>Redacte un comunicado para enviar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                placeholder="Asunto de la notificación"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Mensaje</Label>
              <Textarea
                placeholder="Escriba el contenido del comunicado..."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <Label>Destinatarios</Label>
              <Select value={destinatarios} onValueChange={setDestinatarios}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los usuarios</SelectItem>
                  <SelectItem value="alumnos">Solo alumnos</SelectItem>
                  <SelectItem value="docentes">Solo docentes</SelectItem>
                  <SelectItem value="bedelia">Solo bedelía</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="email" 
                checked={enviarEmail}
                onCheckedChange={(checked) => setEnviarEmail(checked as boolean)}
              />
              <Label htmlFor="email" className="text-sm font-normal">
                Enviar también por email
              </Label>
            </div>
            <Button className="w-full" onClick={handleEnviar}>
              <Send className="h-4 w-4 mr-2" />
              Enviar Notificación
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notificaciones Enviadas</CardTitle>
            <CardDescription>Historial de comunicados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notificacionesEnviadas.map((notif) => (
                <div 
                  key={notif.id}
                  className="p-4 rounded-lg border bg-card"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{notif.titulo}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{notif.destinatarios}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">{notif.fecha}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      Enviada
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BedeliaNotificaciones;
