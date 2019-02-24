import { useContext } from 'react';

import { UserContext } from '@/providers/user';

function useUserGrade() {
    const { profile } = useContext(UserContext);
    const grade = (profile || {}).grade || 0;

    return grade;
}

function useIsAuthenticated() {
    return useUserGrade() >= 1000;
}

function useIsAdmin() {
    return useUserGrade() >= 3000;
}

function useIsModo() {
    return useUserGrade() >= 2000;
}

export {
    useIsAuthenticated,
    useIsAdmin,
    useIsModo
}