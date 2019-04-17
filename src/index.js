import "./styles.css";
import { debug } from "util";

window.mario = (function() {
  return {
    init: function() {
      this.gridWidth = 10;
      this.gridHeight = 3;
      this.buildTiles(this.gridWidth, this.gridHeight);
      //this.getGridValue();
    },
    getGridValue: function() {
      this.gridWidth = prompt("Please, enter grid width", 0);
      this.gridHeight = prompt("Please, enter grid height", 0);

      if (
        typeof parseInt(this.gridWidth, 10) !== "number" ||
        this.gridWidth === 0
      ) {
        this.gridWidth = prompt("Please, enter a valid grid width", 0);
      }
      if (
        typeof parseInt(this.gridHeight, 10) !== "number" ||
        this.gridHeight === 0
      ) {
        this.gridHeight = prompt("Please, enter a valid grid height", 0);
      }

      // console.log(`${this.gridWidth} ${this.gridHeight}`);
      this.gridWidth = parseInt(this.gridWidth, 10);
      this.gridHeight = parseInt(this.gridHeight, 10);
      this.buildTiles(this.gridWidth, this.gridHeight);
    },
    buildMatrix: function(m, n) {
      let result = [];
      const marioLocationY = Math.floor(Math.random() * n);
      // console.log(`Mario Locatioin gen: ${marioLocationY}`);
      for (var i = 0; i < n; i++) {
        let fillLocation = Math.floor(Math.random() * m);
        let fillArray = new Array(m).fill(0);
        fillArray.fill(1, fillLocation, fillLocation + 1);

        if (marioLocationY === i) {
          // console.log(`Mario Locatioin test: ${marioLocationY}`);
          let marioLocationX = Math.floor(Math.random() * m);
          let newX, newXStop;

          if (marioLocationX !== fillLocation) {
            newX = marioLocationX;
            newXStop = marioLocationX + 1;
          } else if (marioLocationX === 9) {
            newX = marioLocationX - 1;
            newXStop = marioLocationX;
          } else {
            newX = marioLocationX + 1;
            newXStop = marioLocationX + 2;
          }
          fillArray.fill(2, newX, newXStop);
          console.log(`Mario Locatioin : ${newX}, ${marioLocationY}`);
          this.marioPosition = [newX, marioLocationY];
        }
        result.push(fillArray);
      }
      //console.table(result);
      return result;
    },
    buildTiles: function(width, height) {
      this.board = this.buildMatrix(width, height);
      console.table(this.board);
      this.renderTiles(this.board);
      this.keycodeEvents(width, height);
    },
    renderTiles: function(board) {
      const markup = this.board
        .map(row =>
          row
            .map(
              col =>
                `<span class="field ${
                  col === 0 ? "grass" : col === 2 ? "mario" : "mushroom"
                }"></span>`
            )
            .join("")
        )
        .join("<span class='clear'></span>");

      document.getElementById("app").innerHTML = markup;
    },
    keycodeEvents: function(width, height) {
      const self = this;

      let boardWidth = width;
      let boardHeight = height;

      this.marioStomach = [];
      this.counter = 0;
      document.addEventListener("keydown", function(event) {
        event.preventDefault();
        let marioPosition = [...self.marioPosition];
        if (event.keyCode === 37 || 38 || 39 || 40) {
          // console.table(self.board);

          // console.log(`Mario move: ${keyMap[event.keyCode]}`);
          // console.log(marioPosition);
          self.counter = self.counter + 1;
          switch (event.keyCode) {
            case 37:
              marioPosition[0] =
                marioPosition[0] > 0 ? marioPosition[0] - 1 : marioPosition[0];
              console.log(`left: ${marioPosition}`);
              self.reRenderBoard(marioPosition);
              break;

            case 38:
              marioPosition[1] =
                marioPosition[1] > 0 ? marioPosition[1] - 1 : marioPosition[1];
              console.log(`up: ${marioPosition}`);
              self.reRenderBoard(marioPosition);
              break;

            case 39:
              console.log(boardWidth);
              marioPosition[0] =
                marioPosition[0] < boardWidth - 1
                  ? marioPosition[0] + 1
                  : marioPosition[0];
              console.log(`right: ${marioPosition}`);
              self.reRenderBoard(marioPosition);
              break;

            case 40:
              marioPosition[1] =
                marioPosition[1] < boardHeight - 1
                  ? marioPosition[1] + 1
                  : marioPosition[1];
              console.log(`down: ${marioPosition}`);
              self.reRenderBoard(marioPosition);
              break;
            default:
              break;
          }
        }
      });
    },
    reRenderBoard: function(marioPositionNew) {
      console.log(this.marioPosition);

      if (this.board[marioPositionNew[1]][marioPositionNew[0]] === 1) {
        this.marioStomach.push(
          this.board[marioPositionNew[1]][marioPositionNew[0]]
        );
        console.log(this.marioStomach.length);
        console.log(this.gridWidth);
        if (this.marioStomach.length === this.gridHeight) {
          console.log(`Key Count: ${this.counter}`);
        }
      }
      console.log(this.marioStomach);
      this.board[this.marioPosition[1]][this.marioPosition[0]] = 0;
      console.table(this.board);
      this.board[marioPositionNew[1]][marioPositionNew[0]] = 2;
      // console.table(this.board);
      this.marioPosition = marioPositionNew;

      this.renderTiles(this.board);
    }
  };
})();

window.mario.init();
