import BaseView from '../../modules/baseView';

class TopView extends BaseView {

    getTemplate() {
        const template =require('./top.pug');
        let data = {users:[
            {name: 'John', score: '82'},
            {name: 'Billy', score: '33'},
            {name: 'Klark', score: '28'},
            {name: 'Bob', score: '16'},
            {name: 'Kerson', score: '10'}
        ]};
        return template(data);
    }

}

export default TopView;