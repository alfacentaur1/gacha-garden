export default class FieldsState {
    static _instance = null;

    constructor() {
        if (FieldsState._instance) {
            return FieldsState._instance;
        }
        //init fields with null
        this.field1 = new Array(9).fill(null);
        this.field2 = new Array(9).fill(null);
        
        FieldsState._instance = this;
    }

    static get instance() {
        if (!FieldsState._instance) {
            new FieldsState();
        }
        return FieldsState._instance;
    }
}