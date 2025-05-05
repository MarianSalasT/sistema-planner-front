"use client"

import React, { useState, useEffect } from 'react';
import { useBoards, useDeletedBoards, useCreateBoard, useUpdateBoard, useDeleteBoard } from '@/hooks/api/useBoards';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useAuth } from '@/contexts/AuthContext';
import { Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreateBoardModal, EditBoardModal, TrashBoardsModal, ConfirmationModal } from '@/components/board-modals';

export function Boards() {
    const { boards, loading, error, refetch: refetchBoards } = useBoards();
    const { 
        boards: deletedBoards, 
        loading: deletedBoardsLoading, 
        error: deletedBoardsError,
        refetch: refetchDeletedBoards
    } = useDeletedBoards();
    const { createBoard, loading: createBoardLoading } = useCreateBoard();
    const { updateBoard, loading: updateBoardLoading } = useUpdateBoard();
    const { deleteBoard, loading: deleteBoardLoading } = useDeleteBoard();
    const { user } = useAuth();	
    const currentUserId = user?.id;
    
    // Estados para los modales
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isTrashModalOpen, setIsTrashModalOpen] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(null);
    
    // Estado para el modal de confirmación de eliminación
    const [confirmDeleteModal, setConfirmDeleteModal] = useState({
        isOpen: false,
        boardId: null
    });

    // Manejadores para los modales
    const handleOpenEditModal = (board) => {
        setSelectedBoard(board);
        setIsEditModalOpen(true);
    };

    const handleCreateSubmit = async (data) => {
        try {
            await createBoard(data);
            refetchBoards(); // Actualizar la lista de tableros
        } catch (error) {
            console.error("Error al crear tablero:", error);
        }
    };

    const handleEditSubmit = async (id, data) => {
        try {
            await updateBoard(id, data);
            refetchBoards(); // Actualizar la lista de tableros
        } catch (error) {
            console.error("Error al actualizar tablero:", error);
        }
    };

    const handleDeleteConfirm = (boardId) => {
        setConfirmDeleteModal({
            isOpen: true,
            boardId
        });
    };

    const executeDelete = async () => {
        if (!confirmDeleteModal.boardId) return;
        
        try {
            await deleteBoard(confirmDeleteModal.boardId);
            refetchBoards(); // Actualizar la lista de tableros
            refetchDeletedBoards();
            setConfirmDeleteModal({ isOpen: false, boardId: null });
        } catch (error) {
            console.error("Error al eliminar tablero:", error);
        }
    };

    const handleBoardRestored = () => {
        refetchBoards();
        refetchDeletedBoards();
    };

    const handleBoardDeleted = () => {
        refetchBoards();
        refetchDeletedBoards();
    };

    if (loading) return (
        <LoadingScreen message="Cargando tableros..." />
    );
    
    if (error) return (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm">
            <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                </svg>
                <p className="font-medium">Error al cargar los tableros: {error.message}</p>
            </div>
        </div>
    );
    
    // Separamos los tableros en dos categorías
    const myBoards = boards?.filter(board => board.owner_id === currentUserId) || [];
    const sharedBoards = boards?.filter(board => board.owner_id !== currentUserId) || [];

    // Función para renderizar un tablero
    const renderBoard = (board) => {
        const isOwner = board.owner_id === currentUserId;
        
        return (
            <div key={board.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 group h-[400px] flex flex-col relative">
                {/* Barra superior con color diferente según si es propietario o invitado */}
                <div className={`h-2 w-full ${isOwner 
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600" 
                    : "bg-gradient-to-r from-emerald-400 to-teal-500"}`}></div>
                
                {/* Encabezado del tablero - altura fija */}
                <div className="p-6 pb-3">
                    <div className="flex justify-between items-start">
                        <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-1">{board.title}</h2>
                        {isOwner && (
                            <div className="relative">
                                <button 
                                    className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 flex-shrink-0"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const dropdown = e.currentTarget.nextElementSibling;
                                        dropdown.classList.toggle('hidden');
                                    }}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                                    </svg>
                                </button>
                                <div className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100">
                                    <div className="py-1">
                                        <button 
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenEditModal(board);
                                                e.currentTarget.parentElement.parentElement.classList.add('hidden');
                                            }}
                                        >
                                            Editar tablero
                                        </button>
                                        <button 
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteConfirm(board.id);
                                                e.currentTarget.parentElement.parentElement.classList.add('hidden');
                                            }}
                                        >
                                            Eliminar tablero
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Descripción - altura fija */}
                <div className="px-6 h-16">
                    <p className="text-gray-600 text-sm line-clamp-2">{board.description}</p>
                </div>
                
                {/* Información del propietario - altura fija */}
                <div className="px-6 py-4">
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-sm flex-shrink-0 ${
                            isOwner 
                                ? "bg-gradient-to-r from-indigo-400 to-indigo-600" 
                                : "bg-gradient-to-r from-emerald-400 to-teal-600"
                        }`}>
                            {board.owner.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-800">{board.owner.name}</p>
                            <div className="flex items-center text-xs text-gray-500">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                    isOwner 
                                        ? "bg-indigo-100 text-indigo-800" 
                                        : "bg-emerald-100 text-emerald-800"
                                }`}>
                                    {isOwner ? "Propietario (tú)" : "Propietario"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Sección de colaboradores - altura fija y mejor alineación */}
                <div className="px-6 py-3 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium text-gray-700">Colaboradores</h3>
                        <span className="text-xs text-gray-500">{board.users.length} miembros</span>
                    </div>
                    
                    {board.users.length > 1 ? (
                        <div className="flex items-center justify-between">
                            <div className="flex -space-x-2">
                                {board.users
                                    .filter(user => user.id !== board.owner_id)
                                    .slice(0, 3)
                                    .map(user => (
                                        <div 
                                            key={user.id} 
                                            className={`h-8 w-8 rounded-full ring-2 ring-white flex items-center justify-center text-white font-medium ${
                                                user.id === currentUserId
                                                    ? "bg-gradient-to-r from-amber-400 to-amber-600"
                                                    : "bg-gradient-to-r from-blue-300 to-blue-500"
                                            }`}
                                            title={`${user.name} (${user.pivot.role})${user.id === currentUserId ? ' - Tú' : ''}`}
                                        >
                                            {user.name.charAt(0)}
                                        </div>
                                    ))}
                                    
                                {board.users.length > 4 && (
                                    <div className="h-8 w-8 rounded-full ring-2 ring-white bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium">
                                        +{board.users.length - 4}
                                    </div>
                                )}
                            </div>
                            
                            {isOwner && (
                                <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                                    Administrar
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center text-sm text-gray-500">
                            <p>Solo tú tienes acceso a este tablero</p>
                        </div>
                    )}
                </div>
                
                {/* Espacio flexible para mantener el footer abajo */}
                <div className="flex-grow"></div>
                
                {/* Footer con fecha y acciones - altura fija */}
                <div className="px-6 py-4 border-t border-gray-100 mt-auto">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-xs text-gray-500 block">Creado el</span>
                            <span className="text-sm font-medium text-gray-700">
                                {new Date(board.created_at).toLocaleDateString('es-ES', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                        
                        <div className="flex space-x-2">
                            {isOwner && (
                                <button 
                                    className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors" 
                                    title="Editar tablero"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenEditModal(board);
                                    }}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                </button>
                            )}
                            <button 
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm transition-all text-sm font-medium"
                                onClick={() => {
                                    // Aquí iría la navegación al tablero
                                    console.log(`Ver tablero ${board.id}`);
                                }}
                            >
                                Ver tablero
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Mis Tableros</h1>
                    <p className="text-gray-600 mt-1">Gestiona y organiza tus proyectos</p>
                </div>
                <div className="flex space-x-3">
                    <Button 
                        variant="outline"
                        className="flex items-center"
                        onClick={() => setIsTrashModalOpen(true)}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Papelera
                    </Button>
                    <Button 
                        className="flex items-center cursor-pointer"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Nuevo Tablero
                    </Button>
                </div>
            </div>
            
            {boards?.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
                    <div className="mx-auto w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No tienes tableros disponibles</h3>
                    <p className="text-gray-600 mb-6">Crea tu primer tablero para comenzar a organizar tus proyectos</p>
                    <Button
                        className="cursor-pointer"
                        size="lg"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        Crear mi primer tablero
                    </Button>
                </div>
            ) : (
                <div className="space-y-10">
                    {/* Sección de Mis Tableros */}
                    {myBoards.length > 0 && (
                        <div>
                            <div className="flex items-center mb-4">
                                <div className="w-1 h-6 bg-indigo-600 rounded-full mr-3"></div>
                                <h2 className="text-xl font-bold text-gray-800">Mis tableros</h2>
                                <span className="ml-3 text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                    {myBoards.length}
                                </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {myBoards.map(board => renderBoard(board))}
                                
                                {/* Tarjeta para crear nuevo tablero - misma altura que las demás */}
                                <div 
                                    className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-300 transition-colors duration-300 flex flex-col items-center justify-center p-6 h-[400px] cursor-pointer"
                                    onClick={() => setIsCreateModalOpen(true)}
                                >
                                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Crear nuevo tablero</h3>
                                    <p className="text-gray-600 text-sm text-center mb-4">Organiza un nuevo proyecto o equipo</p>
                                    <button className="cursor-pointer px-4 py-2 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white border border-indigo-600 rounded-lg transition-all duration-300 font-medium">
                                        Crear tablero
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Sección de Tableros Compartidos */}
                    {sharedBoards.length > 0 && (
                        <div>
                            <div className="flex items-center mb-4">
                                <div className="w-1 h-6 bg-emerald-500 rounded-full mr-3"></div>
                                <h2 className="text-xl font-bold text-gray-800">Tableros compartidos conmigo</h2>
                                <span className="ml-3 text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                    {sharedBoards.length}
                                </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sharedBoards.map(board => renderBoard(board))}
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            {/* Modales */}
            <CreateBoardModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)} 
                onSubmit={handleCreateSubmit} 
            />
            
            <EditBoardModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                board={selectedBoard} 
                onSubmit={handleEditSubmit} 
            />
            
            <TrashBoardsModal 
                isOpen={isTrashModalOpen} 
                onClose={() => setIsTrashModalOpen(false)}
                deletedBoards={deletedBoards}
                loading={deletedBoardsLoading}
                error={deletedBoardsError}
                onBoardRestored={handleBoardRestored}
                onBoardDeleted={handleBoardDeleted}
            />
            
            {/* Modal de confirmación para eliminar */}
            <ConfirmationModal
                isOpen={confirmDeleteModal.isOpen}
                onClose={() => setConfirmDeleteModal({ isOpen: false, boardId: null })}
                onConfirm={executeDelete}
                title="Eliminar tablero"
                description="¿Estás seguro de que deseas eliminar este tablero? Podrás recuperarlo desde la papelera durante los próximos 30 días."
                confirmText="Eliminar tablero"
                isDestructive={true}
                isLoading={deleteBoardLoading}
            />
        </div>
    );
}