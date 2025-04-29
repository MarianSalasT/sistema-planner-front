import React from 'react';

export function Unauthorized() {
    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">No tienes permisos para acceder a esta página</h1>
        </div>
    );
}

