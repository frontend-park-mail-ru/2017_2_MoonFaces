window.addNodeValidation = (inputNode, validationType, secondaryNode = null) => {

    const addError = (node, error) => {
        const errorBlock = document.createElement('div');
        errorBlock.innerHTML = error;
        errorBlock.className = "error-row error-" + node.name;
        node.parentNode.insertBefore(errorBlock, node);
    };

    const removeError = (node) => {
        const element = document.getElementsByClassName('error-' + node.name)[0];
        if (element) {
            element.parentNode.removeChild(element);
        }
    };

    const emailValidation = (inputNode) => {
        let node = inputNode.target;
        removeError(node);
        if (node.value === '') {
            return addError(node, 'Поле не заполнено');
        } else if (!/^\w+@[a-z]+\.[a-z]+$/g.test(node.value)) {
            return addError(node, 'Неверный формат email')
        }
    };

    const loginValidation = (inputNode) => {
        let node = inputNode.target;
        removeError(node);
        if (node.value === '') {
            return addError(node, 'Поле не заполнено');
        } else if (node.value.length < 5) {
            return addError(node, 'Имя пользователя должно быть больше 4-х символов')
        }
    };

    const passwordValidation = (inputNode) => {
        let node = inputNode.target;
        removeError(node);
        if (node.value === '') {
            return addError(node, 'Поле не заполнено');
        } else if (node.value.length < 5) {
            return addError(node, 'Пароль должен быть больше 4-х символов')
        }
    };

    const passwordMatch = (inputNode) => {
        let node = inputNode.target;
        removeError(node);
        if (node.value === '') {
            return addError(node, 'Поле не заполнено');
        } else if (node.value !== node.parentNode.querySelector('[name=password]').value) {
            return addError(node, 'Пароли не совпадают')
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
            break
    }

    inputNode.addEventListener('blur', validation);
};

