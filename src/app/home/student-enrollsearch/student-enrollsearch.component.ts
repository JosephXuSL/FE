import { Component, OnInit } from '@angular/core';

//import * as html2canvas from 'html2canvas';
declare let html2canvas: any;

@Component({
  selector: 'pm-student-enrollsearch',
  templateUrl: './student-enrollsearch.component.html',
  styleUrls: ['./student-enrollsearch.component.css']
})
export class StudentEnrollsearchComponent implements OnInit {
  canvas: any;
  image: any;
  validateCode: string;
  constructor() { }
  //nums = ['C', '6', 'Z', 't'];
  nums = Array<string>();

  str = '';

  ngOnInit() {
    this.clickme("");
  }
  clickme(str) {
    //this.clearCanvas()

    this.canvas = document.getElementById("verifyCanvas"); //获取HTML端画布
    var context: CanvasRenderingContext2D = this.canvas.getContext("2d"); //获取画布2D上下文
    context.fillStyle = "white"; //画布填充色
    context.fillRect(0, 0, this.canvas.width, this.canvas.height); //清空画布
    context.fillStyle = "cornflowerblue"; //设置字体颜色
    context.font = "25px Arial"; //设置字体
    var rand = new Array();
    var x = new Array();
    var y = new Array();
    this.rangenum();
    for (var i = 0; i < 4; i++) {
      rand.push(rand[i]);
      rand[i] = this.nums[i]
      x[i] = i * 20 + 10;
      y[i] = Math.random() * 20 + 20;
      context.fillText(rand[i], x[i], y[i]);
    }

    str = rand.join('').toUpperCase();

    this.convertCanvasToImage(this.canvas);
    return str;
  }

  rangenum() {
    this.nums = new Array<string>();
    this.validateCode='';
    for (var i = 0; i < 4; i++) {
      let t = Math.floor(Math.random()*10); 
      this.nums.push(t.toString());
      this.validateCode=this.validateCode+t.toString();
    }
  }
  // 绘制图片
  convertCanvasToImage(canvas) {
    document.getElementById("verifyCanvas").style.display = "none";
    this.image = document.getElementById("code_img");
    this.image.src = canvas.toDataURL("image/png");
    return this.image;
  }
  clearCanvas(): void {
    this.canvas = document.getElementById("verifyCanvas");
    let ctx: CanvasRenderingContext2D = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
