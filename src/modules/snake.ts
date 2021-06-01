class snake {
  head: HTMLElement;
  bodies: HTMLCollection;
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('#snake >div')! as HTMLElement;
    this.bodies = this.element.getElementsByTagName('div');
  }

  get X() {
    return this.head.offsetLeft;
  }

  get Y() {
    return this.head.offsetTop;
  }

  set X(value) {
    if (this.X ===value){
      return
    }
    if(value < 0 || value> 290){
      throw new Error("蛇撞墙了")
    }
    if(this.bodies[1]&& (this.bodies[1] as HTMLElement).offsetLeft ===value){
      if(value >this.X){
        value = this.X -10
      }else{
        value = this.X +10
      }
    }
    this.moveBody()
    this.head.style.left = value + 'px';
    this.checkHeadBody()
  }

  set Y(value) {
    if(this.Y ===value){
      return
    }
    if(value < 0 || value> 290){
      throw new Error("蛇撞墙了")
    }
    if(this.bodies[1]&& (this.bodies[1] as HTMLElement).offsetTop ===value){
      if(value >this.Y){
        value = this.Y -10
      }else{
        value = this.Y +10
      }
    }
    this.moveBody()
    this.head.style.top = value + 'px';
    this.checkHeadBody()
  }

  /* 蛇增加身体 */
  addBody() {
    this.element.insertAdjacentHTML('beforeend',"<div></div>");
  }
  /* 添加一个蛇身体移动的方法 */
  moveBody(){
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前边身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      // 将值设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }
  checkHeadBody(){
    for (let i = 1;i<this.bodies.length;i++){
      if (this.X ===(this.bodies[i] as HTMLElement).offsetLeft && this.Y=== (this.bodies[i] as HTMLElement).offsetTop){
        throw new Error('撞到自己了')
      }
    }
  }
}

export default snake
