import React from 'react';

export function LoadingSpinner({ size = 'default', className = '' }) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    default: 'h-8 w-8 border-3', 
    lg: 'h-12 w-12 border-4',
    xl: 'h-16 w-16 border-4'
  };

  const sizeClass = sizeClasses[size] || sizeClasses.default;

  return (
    <div className={className} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div 
        className={`animate-spin rounded-full ${sizeClass} border-solid border-primary border-t-transparent`}
        role="status"
        aria-label="Cargando"
      />
    </div>
  );
} 