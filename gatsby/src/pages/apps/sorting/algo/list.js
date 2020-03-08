/**
 * 
 * 
 * @export
 * @class List
 * @description - A list to hold any kind of data
 */
export default class List {
    //Either no args or an array
    constructor(arr) {
        try{
            //setting empty array
            if(arguments.length === 0) 
                this._list = [];
            //Setting Whatever args passed
            else
                this.list = arr;
        } catch(e ) {
            throw e;
        } 
    }
    //getter
    get list() {
        //returns a shallow copy
        return [...this._list]
    }
    //setter
    set list(arr) {
        console.log();
        // If an array is passed a shallow copy is stored
        if(arr instanceof Array) {
            //Private data _list
            this._list = [...arr];
        } 
        //Invalid args Passed, Throw Error Invalid Args
        else throw new TypeError("Invalid Argument type. Array or No Args Expected.");
    }
    //swaps positions in the list
    swap(i,j) {
        let length = this.list.length;
        //if the indexes are greater or equal to length they don't lie in the List.
        if( i >= length || j >= length)
            throw new TypeError("The values passed don't lie within the list length")
        //Swapping
        let temp = this._list[i];
        this._list[i] = this._list[j];
        this._list[j] = temp;
    }

    at(index)  {
        let length = this.list.length;
        //if the indexes are greater or equal to length they don't lie in the List.
        if( index >= length )
           return undefined;
        return this._list[index];
    }

    storeAt(index,val) {
        this._list[index] = val;

    }
}
