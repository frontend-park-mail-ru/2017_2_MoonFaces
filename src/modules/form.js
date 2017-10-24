class Form {
    constructor(formNode, fields) {
        this.formNode = formNode;
        this.fields = fields;
    }

    addFieldValidation(fieldName, validationType) {
        this.addNodeValidation(this.formNode.querySelector(`[name="${fieldName}"]`), validationType);
    }

    removeError(node){
        const element = document.getElementsByClassName('error-' + node.name)[0];
        if (element) {
            element.parentNode.removeChild(element);
        }
    }

    addNodeValidation(inputNode, validationType) {

        const addError = (node, error) => {
            const errorBlock = document.createElement('div');
            errorBlock.innerHTML = error;
            errorBlock.className = 'error-row error-' + node.name;
            node.parentNode.insertBefore(errorBlock, node);
        };

        const emailValidation = (inputNode) => {
            let node = inputNode.target;
            this.removeError(node);
            if (node.value === '') {
                return addError(node, 'Field is empty');
            } else if (!/.+@.+\..+/i.test(node.value)) {
                return addError(node, 'Incorrect email format');
            }
        };

        const loginValidation = (inputNode) => {
            let node = inputNode.target;
            this.removeError(node);
            if (node.value === '') {
                return addError(node, 'Field is empty');
            } else if (node.value.length < 5) {
                return addError(node, 'Login must contain at least 5 symbols');
            }
        };

        const passwordValidation = (inputNode) => {
            let node = inputNode.target;
            this.removeError(node);
            if (node.value === '') {
                return addError(node, 'Field is empty');
            } else if (node.value.length < 5) {
                return addError(node, 'Password must contain at least 5 symbols');
            }
        };

        const passwordMatch = (inputNode) => {
            let node = inputNode.target;
            this.removeError(node);
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
    }

    onsubmit(callback) {
        this.formNode.addEventListener('submit', function(event) {
            event.preventDefault();

            let formData = {};

            this.fields.forEach(function(field) {
                formData[field] = this.formNode.querySelector(`[name="${field}"]`).value;
            }.bind(this));

            callback(formData);
        }.bind(this));
    }
}

export default Form;