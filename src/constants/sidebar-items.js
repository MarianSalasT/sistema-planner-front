import { LayoutDashboard, Calendar, Settings, File, Users, KeyRound, UserRound } from "lucide-react"

export const sidebarItems = [
    {
        'id': 1,
        'title': 'Tableros',
        'url': '/boards',
        'icon': LayoutDashboard
    },
]

export const sidebarAdminItems = [
    {
        'id': 1,
        'title': 'Configuracion',
        'url': '/config',
        'icon': Settings,
        'type': 'collapse',
        'items': [
            {
                'id': 1,
                'title': 'Usuarios',
                'url': '/users',
                'icon': Users
            },
            {
                'id': 2,
                'title': 'Roles',
                'url': '/roles',
                'icon': KeyRound
            }
        ]
    },
    {
        'id': 2,
        'title': 'Registro auditoria',
        'url': '/audit-log',
        'icon': File,
        'type': 'simple'
    },
]
