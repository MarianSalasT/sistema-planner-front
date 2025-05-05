import React from 'react';
import { BookOpen, FileText, Info, ArrowRight, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
    const navigate = useNavigate();
    // Lista de manuales de usuario ejemplo
    const userManuals = [
        { 
            id: 1, 
            title: 'Guía de inicio rápido', 
            description: 'Aprende a utilizar el sistema en pocos minutos', 
            url: "https://docs.google.com/document/d/1TALPtu6WDrJmsHdqw1oeDNq-BZXibN4FvUpA6hPI0IY/edit?usp=sharing",
            icon: BookOpen 
        },
        { 
            id: 2, 
            title: 'Manual de tableros', 
            description: 'Gestiona tus tableros y tareas de manera eficiente', 
            url: "https://docs.google.com/document/d/1TALPtu6WDrJmsHdqw1oeDNq-BZXibN4FvUpA6hPI0IY/edit?usp=sharing",
            icon: FileText 
        },
        { 
            id: 3, 
            title: 'Preguntas frecuentes', 
            description: 'Respuestas a las dudas más comunes', 
            url: "https://docs.google.com/document/d/1TALPtu6WDrJmsHdqw1oeDNq-BZXibN4FvUpA6hPI0IY/edit?usp=sharing",
            icon: Info 
        },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Sección de bienvenida */}
            <div className="mb-10">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-full h-full opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid-pattern)" />
                            <defs>
                                <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                        </svg>
                    </div>
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">¡Bienvenido al Sistema Planner!</h1>
                            <p className="text-lg opacity-90 max-w-2xl">
                                Organiza tus proyectos, gestiona tareas y colabora con tu equipo en tiempo real.
                                Este sistema ha sido diseñado para facilitar la gestión de proyectos del Ministerio de Transporte.
                            </p>
                            <div className="mt-6 flex items-center gap-4">
                                <button 
                                    onClick={() => navigate('/boards')}
                                    className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center cursor-pointer gap-2">
                                    Ver tableros <ArrowRight className="size-4" />
                                </button>
                                <button className="bg-indigo-400 bg-opacity-25 hover:bg-opacity-40 transition-colors text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                                    <Bell className="size-4" /> Notificaciones
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección de manuales */}
            <div className="mb-8">
                <div className="flex items-center mb-6">
                    <div className="w-1 h-6 bg-indigo-600 rounded-full mr-3"></div>
                    <h2 className="text-xl font-bold text-gray-800">Manuales de usuario</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userManuals.map((manual) => (
                        <div key={manual.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                            <div className="flex items-center mb-4">
                                <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg">
                                    <manual.icon className="size-6" />
                                </div>
                                <h3 className="text-lg font-semibold ml-4 text-gray-800 group-hover:text-indigo-600 transition-colors">
                                    {manual.title}
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-4 flex-grow">
                                {manual.description}
                            </p>
                            <button 
                                onClick={() => window.open(manual.url, '_blank')}
                                className="mt-auto text-indigo-600 font-medium inline-flex items-center cursor-pointer gap-1 hover:gap-2 transition-all">
                                Ver manual <ArrowRight className="size-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}