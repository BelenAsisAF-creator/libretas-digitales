import { useAuth } from '@/contexts/AuthContext';
import { StudentDashboard } from '@/components/dashboards/StudentDashboard';
import { TeacherDashboard } from '@/components/dashboards/TeacherDashboard';
import { RegistrarDashboard } from '@/components/dashboards/RegistrarDashboard';
import { AdminDashboard } from '@/components/dashboards/AdminDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'registrar':
      return <RegistrarDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return null;
  }
}
