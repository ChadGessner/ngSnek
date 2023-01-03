import { isExpressionFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  grid: number[] = [];
  currentSnekIndex:number[] = [102,103,104,105];
  apple:any= null;
  score:number = 0;
  hadSnac:boolean = false;
  isGameOver:boolean = false;
  constructor() { 
    this.getGrid();
  }
  getGrid = () => {
    this.getApple();
    for(let i = 0; i < 924; i++){
      if(i === this.apple){
        this.grid.push(2);
        continue;
      }
      if(this.isWall(i)){
        this.grid.push(3);
        continue;
      }
      if(this.currentSnekIndex.some(index => index === i)){
        
        this.grid.push(1);
        continue;
      }
      this.grid.push(0);
    }
  }
  isWall = (index:number):boolean => {
    return index >= 0 && index <= 32 || index % 33 === 0 || index % 33 - 32 === 0 || index >= 892;
  }
  currentSnekIndexListener = (event:number[]) => {
    this.currentSnekIndex.length = 0;
    this.currentSnekIndex = event;
    this.isGameOver = this.currentSnekIndex.some(s => this.isWall(s));
    this.grid.length = 0; 
    this.getGrid();
    
  }
  addSnek = () => {
    console.log(this.hadSnac);
    return this.hadSnac;
  }
  addScore = (isSnac:boolean):void => {
    this.score = isSnac ? this.score + 1 : this.score;
    this.hadSnac = isSnac;
  }
  getApple = ():void => {
    if(this.apple === null){
      this.apple = Math.floor(Math.random() * 419);
    }
    this.addScore(this.currentSnekIndex.some(index => index === this.apple));
    while(this.currentSnekIndex.some(index => index === this.apple) || this.isWall(this.apple)) {
      this.apple = Math.floor(Math.random() * 419);
    }
    
  }
  ngOnInit(): void {
  }

}
