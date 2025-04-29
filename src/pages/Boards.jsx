import React from 'react';
import { UserInfo } from '@/components/UserInfo';

export function Boards() {
    return (
        <div className="flex flex-col h-screen px-2 py-4 gap-2">
            <div>Boards</div>  
            <div className="h-24 bg-gray-100">
                <UserInfo />
            </div>
        </div>
    );
}


