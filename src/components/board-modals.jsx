"use client"

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, RotateCcw, AlertCircle, Info } from 'lucide-react';
import { 
  useRestoreBoard, 
  usePermanentlyDeleteBoard 
} from '@/hooks/api/useBoards';
import { LoadingIndicator } from '@/components/LoadingScreen';

// Modal para crear un nuevo tablero
export function CreateBoardModal({ isOpen, onClose, onSubmit }) {           
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Resetear el formulario cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setError(null);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('El título es obligatorio');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit({ title, description });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ha ocurrido un error al crear el tablero');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Crear nuevo tablero</DialogTitle>
          <DialogDescription>
            Crea un nuevo tablero para organizar tus proyectos y tareas.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Nombre del tablero"
              autoFocus
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Describe el propósito de este tablero"
              rows={4}
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creando...' : 'Crear tablero'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Modal para editar un tablero existente
export function EditBoardModal({ isOpen, onClose, board, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Actualizar los campos cuando cambia el tablero seleccionado
  useEffect(() => {
    if (board && isOpen) {
      setTitle(board.title);
      setDescription(board.description);
      setError(null);
    }
  }, [board, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!board) return;
    if (!title.trim()) {
      setError('El título es obligatorio');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(board.id, { title, description });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ha ocurrido un error al actualizar el tablero');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!board) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Editar tablero</DialogTitle>
          <DialogDescription>
            Modifica los detalles de tu tablero.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="edit-title">Título</Label>
            <Input 
              id="edit-title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Nombre del tablero"
              autoFocus
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-description">Descripción</Label>
            <Textarea 
              id="edit-description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Describe el propósito de este tablero"
              rows={4}
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Modal de confirmación
export function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description, 
  confirmText, 
  isDestructive = false,
  isLoading = false
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="pt-4">
          {isDestructive && (
            <div className="bg-amber-50 text-amber-800 p-3 rounded-md flex items-start mb-4">
              <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>Esta acción no se puede deshacer.</p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button 
            type="button" 
            variant={isDestructive ? "destructive" : "default"} 
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Procesando...' : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Modal para ver y gestionar la papelera
export function TrashBoardsModal({ 
  isOpen, 
  onClose, 
  deletedBoards = [], 
  loading: deletedBoardsLoading = false, 
  error: deletedBoardsError = null,
  onBoardRestored,
  onBoardDeleted
}) {
  const { restoreBoard, loading: restoreBoardLoading } = useRestoreBoard();
  const { permanentlyDeleteBoard, loading: permanentDeleteLoading } = usePermanentlyDeleteBoard();
  const [error, setError] = useState(null);
  const [restoringId, setRestoringId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  
  // Estados para los modales de confirmación
  const [confirmRestoreModal, setConfirmRestoreModal] = useState({
    isOpen: false,
    boardId: null
  });
  
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({
    isOpen: false,
    boardId: null
  });

  // Resetear errores cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setError(null);
    }
  }, [isOpen]);

  const handleRestoreConfirm = (boardId) => {
    setConfirmRestoreModal({
      isOpen: true,
      boardId
    });
  };

  const handleDeleteConfirm = (boardId) => {
    setConfirmDeleteModal({
      isOpen: true,
      boardId
    });
  };

  const executeRestore = async () => {
    if (!confirmRestoreModal.boardId) return;
    
    setRestoringId(confirmRestoreModal.boardId);
    setError(null);
    
    try {
      await restoreBoard(confirmRestoreModal.boardId);
      onBoardRestored();
      setConfirmRestoreModal({ isOpen: false, boardId: null });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al restaurar el tablero');
    } finally {
      setRestoringId(null);
    }
  };

  const executeDelete = async () => {
    if (!confirmDeleteModal.boardId) return;
    
    setDeletingId(confirmDeleteModal.boardId);
    setError(null);
    
    try {
      await permanentlyDeleteBoard(confirmDeleteModal.boardId);
      onBoardDeleted();
      setConfirmDeleteModal({ isOpen: false, boardId: null });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar permanentemente el tablero');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center">
              <Trash2 className="h-5 w-5 mr-2" />
              Papelera de tableros
            </DialogTitle>
            <DialogDescription>
              Tableros eliminados en los últimos 30 días. Después de este período, serán eliminados permanentemente.
            </DialogDescription>
          </DialogHeader>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start mt-4">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          
          {deletedBoardsError && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start mt-4">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>{deletedBoardsError.message || 'Error al cargar los tableros eliminados'}</p>
            </div>
          )}
          
          <div className="flex-1 overflow-y-auto py-4">
            {deletedBoardsLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-gray-600">Cargando tableros eliminados...</span>
              </div>
            ) : deletedBoards && deletedBoards.length > 0 ? (
              <div className="space-y-4">
                {deletedBoards.map((board) => (
                  <div key={board.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{board.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{board.description}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <span>Eliminado el {new Date(board.deleted_at).toLocaleDateString('es-ES')}</span>
                          <span className="mx-2">•</span>
                          <span>Propietario: {board.owner.name}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRestoreConfirm(board.id)}
                          disabled={restoringId === board.id || deletingId === board.id}
                          className="flex items-center"
                        >
                          <RotateCcw className="h-4 w-4 mr-1" />
                          {restoringId === board.id ? 'Restaurando...' : 'Restaurar'}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteConfirm(board.id)}
                          disabled={restoringId === board.id || deletingId === board.id}
                        >
                          {deletingId === board.id ? 'Eliminando...' : 'Eliminar'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Trash2 className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No hay tableros en la papelera</h3>
                <p className="text-gray-500 mt-1">Los tableros eliminados aparecerán aquí</p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button onClick={onClose}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Modal de confirmación para restaurar */}
      <ConfirmationModal
        isOpen={confirmRestoreModal.isOpen}
        onClose={() => setConfirmRestoreModal({ isOpen: false, boardId: null })}
        onConfirm={executeRestore}
        title="Restaurar tablero"
        description="¿Estás seguro de que deseas restaurar este tablero? Volverá a aparecer en tu lista de tableros."
        confirmText="Restaurar"
        isLoading={restoringId === confirmRestoreModal.boardId}
      />
      
      {/* Modal de confirmación para eliminar permanentemente */}
      <ConfirmationModal
        isOpen={confirmDeleteModal.isOpen}
        onClose={() => setConfirmDeleteModal({ isOpen: false, boardId: null })}
        onConfirm={executeDelete}
        title="Eliminar permanentemente"
        description="¿Estás seguro de que deseas eliminar permanentemente este tablero? Esta acción no se puede deshacer."
        confirmText="Eliminar permanentemente"
        isDestructive={true}
        isLoading={deletingId === confirmDeleteModal.boardId}
      />
    </>
  );
}