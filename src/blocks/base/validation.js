window.addNodeValidation = (inputNode, validationType) => {

    const addError = (node, error) => {
        const errorBlock = document.createElement('div');
        errorBlock.innerHTML = error;
        errorBlock.className = 'error-row error-' + node.name;
        node.parentNode.insertBefore(errorBlock, node);
    };

    const removeError = (node) => {
        const element = document.getElementsByClassName('error-' + node.name)[0];
        if (element) {
            element.parentNode.removeChild(element);
        }
    };

    window.addError = addError;
    window.removeError = removeError;

    const emailValidation = (inputNode) => {
        let node = inputNode.target;
        removeError(node);
        if (node.value === '') {
            return addError(node, 'Field is empty');
        } else if (!/.+@.+\..+/i.test(node.value)) {
            return addError(node, 'Incorrect email format');
        }
    };

    const loginValidation = (inputNode) => {
        let node = inputNode.target;
        removeError(node);
        if (node.value === '') {
            return addError(node, 'Field is empty');
        } else if (node.value.length < 5) {
            return addError(node, 'Login must contain at least 5 symbols');
        }
    };

    const passwordValidation = (inputNode) => {
        let node = inputNode.target;
        removeError(node);
        if (node.value === '') {
            return addError(node, 'Field is empty');
        } else if (node.value.length < 5) {
            return addError(node, 'Password must contain at least 5 symbols');
        }
    };

    const passwordMatch = (inputNode) => {
        let node = inputNode.target;
        removeError(node);
        if (node.value === '') {
            return addError(node, 'Field is empty');
        } else if (node.value !== node.parentNode.querySelector('[name=password]').value) {
            return addError(node, 'Passwords does not match');
        }
    };

    let validation;

    switch (validationType) {
    case 'login':
        validation = loginValidation;
        break;
    case 'email':
        validation = emailValidation;
        break;
    case 'password':
        validation = passwordValidation;
        break;
    case 'passwordMatch':
        validation = passwordMatch;
        break;
    }

    inputNode.addEventListener('blur', validation);
};

