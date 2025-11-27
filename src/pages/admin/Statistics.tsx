import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminStatistics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Estadísticas</h1>
        <p className="text-muted-foreground">Análisis y métricas del sistema</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estadísticas Generales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Funcionalidad en desarrollo</p>
        </CardContent>
      </Card>
    </div>
  );
}
