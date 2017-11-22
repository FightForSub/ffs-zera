import { addErrorMessage } from 'focus-core/message';

const handleError = (rep) => {
    if (rep) {
        const { message } = rep;
        if (message) {
            addErrorMessage(message);
        } else {
            addErrorMessage('Une erreur inconnue s\'est produite');
        }
    }
}

const errorHandling = {
    400: handleError,
    404: handleError,
    405: handleError,
    409: handleError,
    422: handleError,
    500: handleError
}
export default errorHandling;