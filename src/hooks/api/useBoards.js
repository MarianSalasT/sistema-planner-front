import { useState, useEffect, useCallback } from 'react';
import { getMyBoards, createBoard as createBoardApi, getMyDeletedBoards, updateBoard as updateBoardApi, deleteBoard as deleteBoardApi, restoreBoard as restoreBoardApi, permanentlyDeleteBoard as permanentlyDeleteBoardApi } from '@/api/boardsApi';

export const useBoards = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBoards = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getMyBoards();
            setBoards(data.boards);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBoards();
    }, [fetchBoards]);

    return { boards, loading, error, refetch: fetchBoards };
};

export const useDeletedBoards = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDeletedBoards = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getMyDeletedBoards();
            setBoards(data.boards);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDeletedBoards();
    }, [fetchDeletedBoards]);

    return { boards, loading, error, refetch: fetchDeletedBoards };
};

export const useCreateBoard = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const createBoardFn = async (boardData) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);
            const response = await createBoardApi(boardData);
            setSuccess(true);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }   
    };

    return { createBoard: createBoardFn, loading, error, success };
};

export const useUpdateBoard = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const updateBoardFn = async (boardId, boardData) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);
            const response = await updateBoardApi(boardId, boardData);
            setSuccess(true);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateBoard: updateBoardFn, loading, error, success };
};

export const useDeleteBoard = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const deleteBoardFn = async (boardId) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);
            const response = await deleteBoardApi(boardId);
            setSuccess(true);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { deleteBoard: deleteBoardFn, loading, error, success };
};

export const useRestoreBoard = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const restoreBoardFn = async (boardId) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);
            const response = await restoreBoardApi(boardId);
            setSuccess(true);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { restoreBoard: restoreBoardFn, loading, error, success };
};

export const usePermanentlyDeleteBoard = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const permanentlyDeleteBoardFn = async (boardId) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);
            const response = await permanentlyDeleteBoardApi(boardId);
            setSuccess(true);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { permanentlyDeleteBoard: permanentlyDeleteBoardFn, loading, error, success };
};