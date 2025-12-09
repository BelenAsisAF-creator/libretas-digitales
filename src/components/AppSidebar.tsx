import {
  GraduationCap,
  LayoutDashboard,
  FileText,
  Users,
  CheckSquare,
  BarChart3,
  BookOpen,
  Calendar,
  Settings,
  Bell,
  Clock,
  Shield
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const menuByRole = {
  student: [
    { title: 'Panel de Control', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Mi Perfil', url: '/student/profile', icon: Users },
    { title: 'Calificaciones', url: '/student/grades', icon: FileText },
    { title: 'Asistencias', url: '/student/attendance', icon: Calendar },
  ],
  teacher: [
    { title: 'Panel de Control', url: '/docente/dashboard', icon: LayoutDashboard },
    { title: 'Mis Materias', url: '/docente/materias', icon: BookOpen },
    { title: 'Historial', url: '/docente/historial', icon: Clock },
  ],
  registrar: [
    { title: 'Panel de Control', url: '/bedelia/dashboard', icon: LayoutDashboard },
    { title: 'Validar Planillas', url: '/bedelia/validaciones', icon: CheckSquare },
    { title: 'Gestión de Usuarios', url: '/bedelia/usuarios', icon: Users },
    { title: 'Notificaciones', url: '/bedelia/notificaciones', icon: Bell },
  ],
  admin: [
    { title: 'Panel de Control', url: '/superadmin/dashboard', icon: LayoutDashboard },
    { title: 'Reportes Académicos', url: '/superadmin/reportes', icon: BarChart3 },
    { title: 'Administración Académica', url: '/superadmin/academico', icon: BookOpen },
    { title: 'Gestión de Roles', url: '/superadmin/roles', icon: Shield },
  ],
};

export const AppSidebar = () => {
  const { user } = useAuth();
  const { open } = useSidebar();
  
  const menuItems = user ? menuByRole[user.role] : [];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="px-3 py-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            {open && (
              <div>
                <h2 className="text-sm font-semibold text-sidebar-foreground">
                  Campus Académico
                </h2>
                <p className="text-xs text-sidebar-foreground/60">
                  Terciario Urquiza
                </p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : ''
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
