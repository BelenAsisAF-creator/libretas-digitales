import { useState } from 'react';
import { Users, Shield, Search, Edit, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const usuariosData = [
  { id: '1', nombre: 'García, Juan Pablo', email: 'jgarcia@terciariourquiza.edu.ar', rol: 'student', estado: 'activo' },
  { id: '2', nombre: 'González, María', email: 'mgonzalez@terciariourquiza.edu.ar', rol: 'teacher', estado: 'activo' },
  { id: '3', nombre: 'López, Ana', email: 'alopez@terciariourquiza.edu.ar', rol: 'teacher', estado: 'activo' },
  { id: '4', nombre: 'Rodríguez, Laura', email: 'lrodriguez@terciariourquiza.edu.ar', rol: 'registrar', estado: 'activo' },
  { id: '5', nombre: 'Fernández, Diego', email: 'dfernandez@terciariourquiza.edu.ar', rol: 'admin', estado: 'activo' },
  { id: '6', nombre: 'Pérez, Carlos', email: 'cperez@terciariourquiza.edu.ar', rol: 'student', estado: 'suspendido' },
];

const roleLabels: Record<string, string> = {
  student: 'Alumno',
  teacher: 'Docente',
  registrar: 'Bedelía',
  admin: 'Administrador',
};

const permisos = [
  { id: 'ver_notas', nombre: 'Ver notas', descripcion: 'Acceso a visualizar calificaciones' },
  { id: 'cargar_notas', nombre: 'Cargar notas', descripcion: 'Permite cargar calificaciones' },
  { id: 'validar_notas', nombre: 'Validar notas', descripcion: 'Aprobar o rechazar planillas' },
  { id: 'gestion_usuarios', nombre: 'Gestión de usuarios', descripcion: 'Crear, editar y suspender usuarios' },
  { id: 'reportes', nombre: 'Reportes', descripcion: 'Generar reportes académicos' },
  { id: 'admin_academica', nombre: 'Administración académica', descripcion: 'Gestión de carreras, materias y comisiones' },
];

export const SuperAdminRoles = () => {
  const [usuarios, setUsuarios] = useState(usuariosData);
  const [busqueda, setBusqueda] = useState('');
  const [filtroRol, setFiltroRol] = useState('todos');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<typeof usuariosData[0] | null>(null);
  const [nuevoRol, setNuevoRol] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCambiarRol = () => {
    if (!usuarioSeleccionado || !nuevoRol) return;
    
    setUsuarios(prev => prev.map(u => 
      u.id === usuarioSeleccionado.id ? { ...u, rol: nuevoRol } : u
    ));
    toast.success(`Rol de ${usuarioSeleccionado.nombre} cambiado a ${roleLabels[nuevoRol]}`);
    setDialogOpen(false);
    setUsuarioSeleccionado(null);
    setNuevoRol('');
  };

  const handleRevocarAcceso = (id: string, nombre: string) => {
    setUsuarios(prev => prev.map(u => 
      u.id === id ? { ...u, estado: 'suspendido' } : u
    ));
    toast.success(`Acceso revocado para ${nombre}`);
  };

  const getRolBadge = (rol: string) => {
    const colors: Record<string, string> = {
      student: 'bg-primary/10 text-primary border-primary/20',
      teacher: 'bg-warning/10 text-warning border-warning/20',
      registrar: 'bg-success/10 text-success border-success/20',
      admin: 'bg-destructive/10 text-destructive border-destructive/20',
    };
    return <Badge variant="outline" className={colors[rol]}>{roleLabels[rol]}</Badge>;
  };

  const usuariosFiltrados = usuarios.filter(u => {
    const matchRol = filtroRol === 'todos' || u.rol === filtroRol;
    const matchBusqueda = 
      u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.email.toLowerCase().includes(busqueda.toLowerCase());
    return matchRol && matchBusqueda;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestión de Roles y Permisos</h1>
        <p className="text-muted-foreground mt-1">
          Administración de roles de usuario y permisos del sistema
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {Object.entries(roleLabels).map(([key, label]) => (
          <Card key={key}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{usuarios.filter(u => u.rol === key).length}</p>
                  <p className="text-sm text-muted-foreground">{label}s</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Usuarios del Sistema</CardTitle>
              <CardDescription>Gestión de roles por usuario</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar usuario..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-8 w-[200px]"
                />
              </div>
              <Select value={filtroRol} onValueChange={setFiltroRol}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="student">Alumnos</SelectItem>
                  <SelectItem value="teacher">Docentes</SelectItem>
                  <SelectItem value="registrar">Bedelía</SelectItem>
                  <SelectItem value="admin">Administradores</SelectItem>
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
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol Actual</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuariosFiltrados.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell className="font-medium">{usuario.nombre}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>{getRolBadge(usuario.rol)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={usuario.estado === 'activo' 
                          ? 'bg-success/10 text-success border-success/20' 
                          : 'bg-destructive/10 text-destructive border-destructive/20'
                        }
                      >
                        {usuario.estado === 'activo' ? 'Activo' : 'Suspendido'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Dialog open={dialogOpen && usuarioSeleccionado?.id === usuario.id} onOpenChange={setDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setUsuarioSeleccionado(usuario);
                                setNuevoRol(usuario.rol);
                              }}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Cambiar Rol
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Cambiar Rol de Usuario</DialogTitle>
                              <DialogDescription>
                                Usuario: {usuario.nombre}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Rol Actual</Label>
                                <p className="text-sm">{getRolBadge(usuario.rol)}</p>
                              </div>
                              <div className="space-y-2">
                                <Label>Nuevo Rol</Label>
                                <Select value={nuevoRol} onValueChange={setNuevoRol}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="student">Alumno</SelectItem>
                                    <SelectItem value="teacher">Docente</SelectItem>
                                    <SelectItem value="registrar">Bedelía</SelectItem>
                                    <SelectItem value="admin">Administrador</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              {nuevoRol === 'admin' && (
                                <div className="flex items-center gap-2 p-3 rounded-lg bg-warning/10 text-warning">
                                  <AlertTriangle className="h-4 w-4" />
                                  <p className="text-sm">Los administradores tienen acceso total al sistema</p>
                                </div>
                              )}
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                              <Button onClick={handleCambiarRol}>Confirmar Cambio</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        {usuario.estado === 'activo' && (
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="text-destructive"
                            onClick={() => handleRevocarAcceso(usuario.id, usuario.nombre)}
                          >
                            Revocar
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Permisos por Rol
          </CardTitle>
          <CardDescription>Configuración de permisos del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Permiso</TableHead>
                  <TableHead className="text-center">Alumno</TableHead>
                  <TableHead className="text-center">Docente</TableHead>
                  <TableHead className="text-center">Bedelía</TableHead>
                  <TableHead className="text-center">Admin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {permisos.map((permiso) => (
                  <TableRow key={permiso.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{permiso.nombre}</p>
                        <p className="text-xs text-muted-foreground">{permiso.descripcion}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox 
                        checked={permiso.id === 'ver_notas'} 
                        disabled 
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox 
                        checked={['ver_notas', 'cargar_notas'].includes(permiso.id)} 
                        disabled 
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox 
                        checked={['ver_notas', 'validar_notas', 'gestion_usuarios'].includes(permiso.id)} 
                        disabled 
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox checked disabled />
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

export default SuperAdminRoles;
