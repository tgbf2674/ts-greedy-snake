import snake from './snake';
import Food from './Food';
import scorePanel from './scorePanel';

class gameControl {
  snake: snake;
  food: Food;
  scorePanel: scorePanel;
  direction: string = '';
  isLive = true

  constructor() {
    this.snake = new snake();
    this.food = new Food();
    this.scorePanel = new scorePanel();
    this.init();
  }

  /* game start */
  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    /* 调用run 方法 */
    this.run()
  }

  /* 创建一个键盘按下的响应函数 */
  keydownHandler(event: KeyboardEvent) {
    /* 需要检查event.key的值是否合法 */

    this.direction = event.key;
  }

  /* 控制蛇移动的方法 */
  run() {
    let X = this.snake.X;
    let Y = this.snake.Y;
    /* 根据按键方向修改值 */
    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        Y -=10
        break;
      case 'ArrowDown':
      case 'Down':
        Y +=10
        break;
      case 'ArrowRight':
      case 'Right':
        X += 10
        break;
      case 'ArrowLeft':
      case 'Left':
        X -=10
        break;
    }
    /* 检查蛇是否吃到食物 */
    this.checkEat(X,Y)
    try {
      this.snake.X = X
      this.snake.Y = Y
    }catch (e){
      alert(e.message + 'GAME OVER!')
      this.isLive = false
    }
    this.isLive && setTimeout(this.run.bind(this),300 - (this.scorePanel.level-1)*30)
  }

  checkEat(X: number,Y: number){
    if(X===this.food.X && Y=== this.food.Y){
      this.food.change()
      this.scorePanel.addScore()
      this.snake.addBody()
    }
  }
}

export default gameControl;
