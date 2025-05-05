import api from '@/lib/api';

export const getMyBoards = async () => {
    try {
        const response = await api.get('/boards/my-boards');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los tableros del usuario:', error);
        throw error;
    }
};

export const getMyDeletedBoards = async () => {
    try {
        const response = await api.get('/boards/my-deleted');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los tableros eliminados del usuario:', error);
        throw error;
    }
};

export const createBoard = async (boardData) => {
    try {
        const response = await api.post('/boards', boardData);
        return response.data;
    } catch (error) {
        console.error('Error al crear un tablero:', error);
        throw error;
    }
};

export const updateBoard = async (boardId, boardData) => {
    try {
        const response = await api.put(`/boards/${boardId}`, boardData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el tablero:', error);
        throw error;
    }
};

export const deleteBoard = async (boardId) => {
    try {
        const response = await api.delete(`/boards/${boardId}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el tablero:', error);
        throw error;
    }
};

export const restoreBoard = async (boardId) => {
    try {
        const response = await api.post(`/boards/${boardId}/restore`);
        return response.data;
    } catch (error) {
        console.error('Error al restaurar el tablero:', error);
        throw error;
    }
};

export const permanentlyDeleteBoard = async (boardId) => {
    try {
        const response = await api.delete(`/boards/${boardId}/force-delete`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar permanentemente el tablero:', error);
        throw error;
    }
};









