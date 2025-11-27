import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const pendingGrades = [
  { teacher: 'Prof. María García', subject: 'Matemática', course: '1° Año A', count: 28, date: '2024-03-15' },
  { teacher: 'Prof. Juan Pérez', subject: 'Lengua', course: '2° Año B', count: 25, date: '2024-03-16' },
  { teacher: 'Prof. Ana Martínez', subject: 'Historia', course: '3° Año A', count: 22, date: '2024-03-17' },
];

export default function RegistrarValidate() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Validar Notas</h1>
        <p className="text-muted-foreground">Revisión y validación de calificaciones</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notas Pendientes de Validación</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Docente</TableHead>
                <TableHead>Materia</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingGrades.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.teacher}</TableCell>
                  <TableCell>{item.subject}</TableCell>
                  <TableCell>{item.course}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.count} notas</Badge>
                  </TableCell>
                  <TableCell>{new Date(item.date).toLocaleDateString('es-AR')}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Revisar</Button>
                      <Button size="sm">Validar</Button>
                    </div>
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
