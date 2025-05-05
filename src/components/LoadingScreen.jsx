import React from 'react';
import { LoadingSpinner } from './ui/loading-spinner';

export function LoadingScreen({ message = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <h2 className="text-xl font-medium text-foreground">{message}</h2>
        <p className="text-muted-foreground mt-2">Por favor espere un momento</p>
      </div>
    </div>
  );
}

// Variante más pequeña para usar dentro de componentes
export function LoadingIndicator({ message = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <LoadingSpinner className="mb-2" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
} 