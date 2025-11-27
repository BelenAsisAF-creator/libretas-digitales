import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function TeacherAttendance() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Registro de Asistencias</h1>
          <p className="text-muted-foreground">Tomar asistencia de estudiantes</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tomar Asistencia
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asistencias Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Funcionalidad en desarrollo</p>
        </CardContent>
      </Card>
    </div>
  );
}
