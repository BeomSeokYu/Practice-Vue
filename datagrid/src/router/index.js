import { createRouter, createWebHistory } from 'vue-router'
import Datagrid from '@/pages/datagrid'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Datagrid
        }
    ]
});

export default router;