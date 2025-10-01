import {
  GraduationCap,
  LayoutDashboard,
  FileText,
  Users,
  CheckSquare,
  BarChart3,
  BookOpen,
  Calendar,
  Settings
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
    { title: 'Panel de Control', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Cargar Notas', url: '/teacher/grades', icon: FileText },
    { title: 'Asistencias', url: '/teacher/attendance', icon: CheckSquare },
    { title: 'Mis Cursos', url: '/teacher/courses', icon: BookOpen },
  ],
  registrar: [
    { title: 'Panel de Control', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Validar Notas', url: '/registrar/validate', icon: CheckSquare },
    { title: 'Gestión de Usuarios', url: '/registrar/users', icon: Users },
    { title: 'Reportes', url: '/registrar/reports', icon: BarChart3 },
  ],
  admin: [
    { title: 'Panel de Control', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Gestión de Roles', url: '/admin/roles', icon: Users },
    { title: 'Reportes Académicos', url: '/admin/reports', icon: BarChart3 },
    { title: 'Estadísticas', url: '/admin/statistics', icon: BarChart3 },
    { title: 'Configuración', url: '/admin/settings', icon: Settings },
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
                  Libreta Digital
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
