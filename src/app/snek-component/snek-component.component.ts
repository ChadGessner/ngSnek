import { Component, OnInit, Output, EventEmitter, HostListener, Input } from '@angular/core';


@Component({
  selector: 'app-snek-component',
  templateUrl: './snek-component.component.html',
  styleUrls: ['./snek-component.component.css']
})
export class SnekComponentComponent implements OnInit {
  snake:number[] = [102,103,104,105];
  key:string = 's';
  interval:any = null;
  count:number = 105;
  xX:string = 'Press Start!';
  keyChanged:boolean = false;
  isStarted:boolean = false;
  hadSnakArray:string[] = [
    'OMM NOM NOM NOM!',
    'Alright! An Apple!',
    'Tastes Appleeeey!',
    'Thank you that was yummy!'
  ];
  @Input()isDead:boolean = false;
  @Input() hadSnak:boolean = false;
  @HostListener('document:keypress', ['$event'])
  
  handleKeyboardEvent(event: KeyboardEvent) {
    if(this.checkKeys(event.key) && !this.keyChanged){
      this.key = event.key;
      this.keyChanged = true;
    }
  }
  
  @Output() timeEvent: EventEmitter<number[]> = new EventEmitter();
  constructor() { }
  onStart = ():void => {
    if(this.xX === '' && this.isStarted){
      return;
    }
    this.isStarted = true;
    if(this.xX === 'GAME OVER!'){
      this.snake = [102,103,104,105];
      this.count = 105;
      this.key = 's';
    }
    this.xX = 'Can Snek Has Snak?';
    this.interval = setInterval(()=>{
      
      this.snekMove();
      this.timeEvent.emit(this.snake);
    },100)
  }
  checkKeys = (eventKey:string):boolean => {
    switch(eventKey){
      case 'w':
        return this.key !== 's';
      case 'd':
        return this.key !== 'a';
      case 's':
        return this.key !== 'w';
      case 'a':
        return this.key !== 'd';
      default:
        return true;
    }
  }
  onStop = ():void => {
    this.isStarted = false;
    clearInterval(this.interval);
  }
  checkXX = ():void => {
    if(this.snake.some(s => s === this.count) || this.isDead){
      this.xX = 'GAME OVER!';
      clearInterval(this.interval);
    }
  }
  onHadSnak = ():void => {
    if(this.hadSnak){
      this.xX = this.hadSnakArray[
        Math.floor(Math.random() * this.hadSnakArray.length)
      ];
    }
    
  }
  snekMove = ():void => {
    this.onHadSnak();
    let shortCount = this.hadSnak ? 0 : 1;
    let short = this.snake.slice(shortCount, this.snake.length);
    this.snake.length = 0;
    this.snake = this.snake.concat(short);
    
    
    this.count += this.countControl();
    this.checkXX();
    this.snake.push(this.count);
    this.hadSnak = false;
    this.keyChanged = false;
  }
  countControl = ():number => {
    
    switch(this.key){
      
      case 'w':
        return -33;
      case 's':
        return 33;
      case 'a':
        return -1;
      case 'd':
        return 1;
      default:
        return 1;
    }
  }
  ngOnInit(): void {
  }

}
