(function () {
    'use strict';


    /**
     * Модуль, предоставляющий методы для выполнения HTTP-запросов
     * @module Http
     */
    class Http {
        /**
         * Выполняет GET-запрос по указанному адресу
         * @param {string} address - адрес запроса
         */
        static Get(address) {
            address = window.remoteBackendUrl + address;
            return fetch(address, {
                method: 'get',
                mode: 'cors',
                credentials: 'include'
            }).then(function (response) {
                if (response.status >= 400) {
                    throw response;
                }
                return response.json();
            });
        }

        /**
         * Выполняет POST-запрос по указанному адресу
         * @param {string} address - адрес запроса
         * @param {*} body - тело запроса (объект)
         */
        static Post(address, body) {
            address = window.remoteBackendUrl + address;
            return new Promise((resolve, reject) => fetch(address, {
                    method: 'post',
                    mode: 'cors',
                    credentials: 'include',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(response => {
                    if (response.status >= 400) {
                        reject(response.json());
                    }else{
                        resolve(response.json());
                    }
                }).catch(error => {
                    console.log(error);
                })
            );
        }
    }

    window.Http = Http;

})();