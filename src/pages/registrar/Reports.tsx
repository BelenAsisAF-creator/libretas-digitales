import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

const reportTypes = [
  { name: 'Reporte de Calificaciones', description: 'Listado completo de calificaciones por período' },
  { name: 'Reporte de Asistencias', description: 'Estadísticas de asistencia por curso' },
  { name: 'Reporte de Estudiantes', description: 'Información académica de estudiantes' },
  { name: 'Reporte de Docentes', description: 'Actividad y desempeño docente' },
];

export default function RegistrarReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reportes</h1>
        <p className="text-muted-foreground">Generación de informes académicos</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {reportTypes.map((report, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {report.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{report.description}</p>
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Generar Reporte
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
