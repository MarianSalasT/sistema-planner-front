import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useBoards } from '@/hooks/api/useBoards';

export default function BoardPage() {
    const { id } = useParams();
    const location = useLocation();
    const board = location.state?.board;
    const [currentBoard, setCurrentBoard] = useState(board);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    if (loading) {
        return <LoadingScreen message="Cargando tablero..." />;
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm">
                    <div className="flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                        </svg>
                        <p className="font-medium">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Render the board
    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Header section with board info */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{currentBoard.title}</h1>
                            <p className="text-gray-600 mt-1">{currentBoard.description}</p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {/* Board metadata */}
                            <div className="text-right">
                                <div className="text-sm text-gray-500">Creado el</div>
                                <div className="text-sm font-medium">
                                    {new Date(currentBoard.created_at).toLocaleDateString('es-ES', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </div>
                            </div>
                            
                            {/* Board owner */}
                            <div className="flex items-center border-l border-gray-200 pl-4">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-sm bg-gradient-to-r from-indigo-400 to-indigo-600">
                                    {currentBoard.owner.name.charAt(0)}
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-800">{currentBoard.owner.name}</p>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                                        Propietario
                                    </span>
                                </div>
                            </div>
                            
                            {/* Collaborators section */}
                            <div className="flex items-center border-l border-gray-200 pl-4">
                                <div>
                                    <span className="text-sm text-gray-500 block">Colaboradores</span>
                                    <div className="flex -space-x-2 mt-1">
                                        {currentBoard.users
                                            .filter(user => user.id !== currentBoard.owner_id)
                                            .slice(0, 3)
                                            .map(user => (
                                                <div 
                                                    key={user.id} 
                                                    className="h-8 w-8 rounded-full ring-2 ring-white flex items-center justify-center text-white font-medium bg-gradient-to-r from-blue-300 to-blue-500"
                                                    title={`${user.name} (${user.pivot.role})`}
                                                >
                                                    {user.name.charAt(0)}
                                                </div>
                                            ))}
                                            
                                        {currentBoard.users.length > 4 && (
                                            <div className="h-8 w-8 rounded-full ring-2 ring-white bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium">
                                                +{currentBoard.users.length - 4}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Board actions */}
                            <div>
                                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm text-sm font-medium transition-colors">
                                    Configurar tablero
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Board content - columns and cards */}
            <div className="flex-grow overflow-x-auto p-6">
                <div className="flex h-full space-x-4">
                    {currentBoard.columns.map(column => (
                        <div 
                            key={column.id} 
                            className="flex-shrink-0 w-80 bg-gray-100 rounded-lg shadow-sm overflow-hidden flex flex-col"
                        >
                            {/* Column header */}
                            <div className="bg-white p-3 border-b border-gray-200 flex items-center justify-between">
                                <h3 className="font-medium text-gray-800">{column.title}</h3>
                                <div className="flex items-center space-x-2">
                                    <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
                                        {column.cards.length}
                                    </span>
                                    <button className="text-gray-500 hover:text-gray-700">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            {/* Cards container */}
                            <div className="flex-grow overflow-y-auto p-3 space-y-3">
                                {column.cards.map(card => (
                                    <div 
                                        key={card.id} 
                                        className="bg-white rounded-md shadow p-3 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                                    >
                                        <h4 className="font-medium text-gray-800 mb-2">{card.title}</h4>
                                        {card.description && (
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{card.description}</p>
                                        )}
                                        <div className="flex justify-between items-center">
                                            <div className="text-xs text-gray-500">
                                                {new Date(card.created_at).toLocaleDateString('es-ES', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                })}
                                            </div>
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-xs font-medium">
                                                {currentBoard.owner.name.charAt(0)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                                {/* Add card button */}
                                <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:text-indigo-600 hover:border-indigo-300 flex items-center justify-center transition-colors">
                                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    Añadir tarjeta
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    {/* Add new column button */}
                    <div className="flex-shrink-0 w-80">
                        <button className="w-full h-16 bg-white rounded-lg border-2 border-dashed border-gray-300 text-gray-500 hover:text-indigo-600 hover:border-indigo-300 flex items-center justify-center transition-colors shadow-sm">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            Añadir columna
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
