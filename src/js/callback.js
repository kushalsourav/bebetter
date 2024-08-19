export const getData = (data) => {
    console.log("this is ",data)
}

export class GetData {
    constructor() {
       this.data = ''
    }
    getData (input){
      this.data = input
    }
    retiveData(){
        console.log(this.data)
       return this.data
    }
}


export const instance = new GetData()