export class data {
    constructor() {
        this.id = 1;
        this.toDoList = [];
        this.storeKeyList = 'ToDoAppList';
        this.storeKeyId = 'ToDoAppId';
    }
    init() {
        this.getData();
    }
    getData() {
        let list = localStorage.getItem(this.storeKeyList);
        let id = localStorage.getItem(this.storeKeyId);
        if (list) this.toDoList = JSON.parse(list)
        if (id) this.id = parseInt(id);
    }
    setData() {
        localStorage.setItem(this.storeKeyList, JSON.stringify(this.toDoList));
        localStorage.setItem(this.storeKeyId, JSON.stringify(this.id));
    }
    addToDoItem(text, cat) {
        text = text.trim();
        if (text == '') return;
        let item = {
            id: this.id,
            desc: text,
            cat: cat,
            completed: false,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        }
        this.id++;
        this.toDoList.push(item);
        this.setData();
    }
    markToDoItem(id) {
        for (let i = 0; i < this.toDoList.length; i++) {
            if (this.toDoList[i].id == id) {
                this.toDoList[i].completed = !this.toDoList[i].completed;
            }
        }
        this.setData();
    }
    deleteToDoItem(id) {
        this.toDoList = this.toDoList.filter(item =>item.id != id);
        this.setData();
    }
    getCats() {
        let cats = ['All'];
        this.toDoList.forEach(item => {
            if (!cats.includes(item.cat) && item.cat) cats.push(item.cat);
        });
        return cats;
    }
    filterByCat(cat) {
        let list = this.toDoList.filter(item => item.cat == cat);
        if(list.length==0) return this.toDoList;
        return list;
    }
    getCompletedTasksByCat(){
        let cats = this.getCats();
        let ret = [];
        cats.forEach(cat=>{
            let list = this.filterByCat(cat);
            let obj = {
                cat: cat=='All'?'Overall':cat,
                completed: 0,
                all: 0
            };
            list.forEach(item=>{
                obj.all++;
                if(item.completed) obj.completed++;
            });
            ret.push(obj);
        });
        return ret;
    }
    getTaskById(id) {
        return this.toDoList.find(item => item.id == id);
    }
}