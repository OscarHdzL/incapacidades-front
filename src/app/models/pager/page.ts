export class Page<T> {

  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages:number;
  
  currentPage: number;
  minPage: number;
  maxPage: number;
  totalOfPages : number;
  totalOfRecords : number;  
  pages : number[] = [];
  
  content : T[];

  constructor(){    }
  init( otherpage : Page<any> ){
    this.number = otherpage.number;
    this.numberOfElements = otherpage.numberOfElements;
    this.totalElements = otherpage.totalElements;
    this.totalPages = otherpage.totalPages;    
    this.prepare();
    
    this.content = [];
    if( otherpage.content != null ){
      for(let i=0;i<otherpage.content.length;i++){
        const id: number = otherpage.content[i].id;
        const selected: boolean = false;
        this.content[i] = {selected, ...otherpage.content[i]};     
      } 
    }
  }
  
  prepare(){
    this.currentPage = this.number;
    this.totalOfRecords = this.totalElements;
    this.totalOfPages = this.totalPages;
    
    this.minPage = this.currentPage - 2;
    if (this.minPage < 1) {
      this.minPage = 1;
    }
    this.maxPage = this.currentPage + 2;
    if (this.maxPage > this.totalOfPages) {
      this.maxPage = this.totalOfPages;
    }
    if( (this.maxPage - this.minPage)<5 && this.maxPage < this.totalOfPages ){
      let faltantes = 5-(this.maxPage - this.minPage);
      if( this.totalOfPages >= (this.maxPage+faltantes) ){
        this.maxPage += faltantes;
      }else{
        this.maxPage = this.totalOfPages;
      }
    }
    for (let i = 0; i <= (this.maxPage - this.minPage)+1; i++ ){
      this.pages[i] = this.minPage + i;
    }
    this.pages.splice((this.maxPage - this.minPage)+1, this.pages.length - ((this.maxPage - this.minPage )+1));
  }
}

