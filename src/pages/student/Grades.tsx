import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const gradesData = [
  { subject: 'Matemática', exam: 'Parcial 1', grade: 8, date: '2024-03-15', status: 'approved' },
  { subject: 'Matemática', exam: 'Parcial 2', grade: 7, date: '2024-05-10', status: 'approved' },
  { subject: 'Lengua', exam: 'Parcial 1', grade: 9, date: '2024-03-20', status: 'approved' },
  { subject: 'Lengua', exam: 'Parcial 2', grade: 8, date: '2024-05-15', status: 'approved' },
  { subject: 'Historia', exam: 'Parcial 1', grade: 6, date: '2024-04-01', status: 'approved' },
  { subject: 'Historia', exam: 'Parcial 2', grade: 7, date: '2024-06-01', status: 'approved' },
];

export default function StudentGrades() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mis Calificaciones</h1>
        <p className="text-muted-foreground">Historial completo de calificaciones</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calificaciones por Materia</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Materia</TableHead>
                <TableHead>Examen</TableHead>
                <TableHead>Nota</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gradesData.map((grade, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{grade.subject}</TableCell>
                  <TableCell>{grade.exam}</TableCell>
                  <TableCell>
                    <span className="text-lg font-bold">{grade.grade}</span>
                  </TableCell>
                  <TableCell>{new Date(grade.date).toLocaleDateString('es-AR')}</TableCell>
                  <TableCell>
                    <Badge variant={grade.status === 'approved' ? 'default' : 'destructive'}>
                      {grade.status === 'approved' ? 'Aprobado' : 'Desaprobado'}
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
