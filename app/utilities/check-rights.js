import UserStore from 'focus-core/user/built-in-store';

const getGrade = () => {
    return (UserStore.getProfile() | {}).grade || 0;
}

const isAdmin = () => {
    return getGrade() >= 3000;
}

const isModo = () => {
    return getGrade() >= 2000;
}

export {
    isAdmin,
    isModo
}