import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const attendanceData = [
  { subject: 'Matemática', date: '2024-03-15', status: 'present' },
  { subject: 'Matemática', date: '2024-03-22', status: 'present' },
  { subject: 'Lengua', date: '2024-03-20', status: 'present' },
  { subject: 'Lengua', date: '2024-03-27', status: 'absent' },
  { subject: 'Historia', date: '2024-04-01', status: 'present' },
  { subject: 'Historia', date: '2024-04-08', status: 'present' },
];

export default function StudentAttendance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mis Asistencias</h1>
        <p className="text-muted-foreground">Registro de asistencias a clases</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registro de Asistencias</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Materia</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map((attendance, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{attendance.subject}</TableCell>
                  <TableCell>{new Date(attendance.date).toLocaleDateString('es-AR')}</TableCell>
                  <TableCell>
                    <Badge variant={attendance.status === 'present' ? 'default' : 'destructive'}>
                      {attendance.status === 'present' ? 'Presente' : 'Ausente'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
