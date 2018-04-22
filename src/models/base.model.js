export class Base {
  constructor(opts) {
    const { 
      name, 
      createdDate,      
    } = opts

    this.name = name;
    this.createdDate = createdDate;
  }

  getInfo() {
    const { 
      name, 
      createdDate 
    } = this;

    return {
      name,
      createdDate,  
    }
  }
}