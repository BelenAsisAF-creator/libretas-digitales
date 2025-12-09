import { useState } from 'react';
import { Users, Plus, Search, Edit, Trash2, RefreshCw, UserX } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const usuariosData = [
  { id: '1', nombre: 'García, Juan Pablo', email: 'jgarcia@terciariourquiza.edu.ar', rol: 'student', estado: 'activo', ultimoAcceso: '06/12/2024' },
  { id: '2', nombre: 'González, María', email: 'mgonzalez@terciariourquiza.edu.ar', rol: 'teacher', estado: 'activo', ultimoAcceso: '06/12/2024' },
  { id: '3', nombre: 'López, Ana', email: 'alopez@terciariourquiza.edu.ar', rol: 'teacher', estado: 'activo', ultimoAcceso: '05/12/2024' },
  { id: '4', nombre: 'Martínez, Carlos', email: 'cmartinez@terciariourquiza.edu.ar', rol: 'student', estado: 'suspendido', ultimoAcceso: '01/12/2024' },
  { id: '5', nombre: 'Rodríguez, Laura', email: 'lrodriguez@terciariourquiza.edu.ar', rol: 'registrar', estado: 'activo', ultimoAcceso: '06/12/2024' },
  { id: '6', nombre: 'Fernández, Diego', email: 'dfernandez@terciariourquiza.edu.ar', rol: 'admin', estado: 'activo', ultimoAcceso: '06/12/2024' },
];

const roleLabels: Record<string, string> = {
  student: 'Alumno',
  teacher: 'Docente',
  registrar: 'Bedelía',
  admin: 'Administrador',
};

export const BedeliaUsuarios = () => {
  const [usuarios, setUsuarios] = useState(usuariosData);
  const [filtroRol, setFiltroRol] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editando, setEditando] = useState<typeof usuariosData[0] | null>(null);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    email: '',
    rol: 'student',
  });

  const handleCrearUsuario = () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.email) {
      toast.error('Complete todos los campos');
      return;
    }
    if (!nuevoUsuario.email.endsWith('@terciariourquiza.edu.ar')) {
      toast.error('El email debe ser del dominio institucional');
      return;
    }
    const nuevo = {
      id: Date.now().toString(),
      ...nuevoUsuario,
      estado: 'activo',
      ultimoAcceso: '-',
    };
    setUsuarios(prev => [...prev, nuevo]);
    setNuevoUsuario({ nombre: '', email: '', rol: 'student' });
    setDialogOpen(false);
    toast.success('Usuario creado correctamente');
  };

  const handleSuspender = (id: string) => {
    setUsuarios(prev => prev.map(u => 
      u.id === id ? { ...u, estado: u.estado === 'activo' ? 'suspendido' : 'activo' } : u
    ));
    toast.success('Estado del usuario actualizado');
  };

  const handleResetPassword = (id: string) => {
    toast.success('Se envió un email para restablecer la contraseña');
  };

  const getStatusBadge = (estado: string) => {
    return estado === 'activo' 
      ? <Badge variant="outline" className="bg-success/10 text-success border-success/20">Activo</Badge>
      : <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Suspendido</Badge>;
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
        <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
        <p className="text-muted-foreground mt-1">
          Administración de usuarios del sistema
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Usuarios Registrados</CardTitle>
              <CardDescription>
                {usuariosFiltrados.length} usuarios encontrados
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
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Usuario
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Usuario</DialogTitle>
                    <DialogDescription>
                      Complete los datos del nuevo usuario
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Nombre Completo</Label>
                      <Input
                        placeholder="Apellido, Nombre"
                        value={nuevoUsuario.nombre}
                        onChange={(e) => setNuevoUsuario(prev => ({ ...prev, nombre: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email Institucional</Label>
                      <Input
                        type="email"
                        placeholder="usuario@terciariourquiza.edu.ar"
                        value={nuevoUsuario.email}
                        onChange={(e) => setNuevoUsuario(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Rol</Label>
                      <Select 
                        value={nuevoUsuario.rol} 
                        onValueChange={(value) => setNuevoUsuario(prev => ({ ...prev, rol: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Alumno</SelectItem>
                          <SelectItem value="teacher">Docente</SelectItem>
                          <SelectItem value="registrar">Bedelía</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCrearUsuario}>
                      Crear Usuario
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Último Acceso</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuariosFiltrados.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell className="font-medium">{usuario.nombre}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>{getRolBadge(usuario.rol)}</TableCell>
                    <TableCell>{getStatusBadge(usuario.estado)}</TableCell>
                    <TableCell>{usuario.ultimoAcceso}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          size="icon" 
                          variant="ghost"
                          onClick={() => handleResetPassword(usuario.id)}
                          title="Resetear contraseña"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost"
                          onClick={() => handleSuspender(usuario.id)}
                          title={usuario.estado === 'activo' ? 'Suspender' : 'Activar'}
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      </div>
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

export default BedeliaUsuarios;
