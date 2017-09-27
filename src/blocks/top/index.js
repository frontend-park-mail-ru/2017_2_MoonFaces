(function () {

    const topContainer = document.getElementById('top-template');

    let topPlayers = require('./top.pug');

    let data = {users:[
        {name: 'John', score: '82'},
        {name: 'Billy', score: '33'},
        {name: 'Klark', score: '28'},
        {name: 'Bob', score: '16'},
        {name: 'Kerson', score: '10'}
    ]};


    topContainer.innerHTML += topPlayers(data);

})();
