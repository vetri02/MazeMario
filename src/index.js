import "./styles.css";
import { debug } from "util";

window.mario = (function() {
  return {
    init: function() {
      this.buildTiles(10, 10);
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
      const marioLocation = Math.floor(Math.random() * n);
      // console.log(marioLocation);
      for (var i = 0; i < n; i++) {
        let fillLocation = Math.floor(Math.random() * m);
        let fillArray = new Array(m).fill(0);
        fillArray.fill(1, fillLocation, fillLocation + 1);
        if (marioLocation === i) {
          // console.log(marioLocation);
          let marioFillLocation = Math.floor(Math.random() * m);
          if (marioFillLocation !== fillLocation) {
            fillArray.fill(2, marioFillLocation, marioFillLocation + 1);
          } else {
            fillArray.fill(2, marioFillLocation + 1, marioFillLocation + 2);
          }
        }
        result.push(fillArray);
      }
      //console.table(result);
      return result;
    },
    buildTiles: function(width, height) {
      // console.log(width, height);
      this.board = this.buildMatrix(width, height);
      const markup = this.board
        .map(row =>
          row
            .map(
              col =>
                `<span class="field ${
                  col === 0 ? "grass" : col === 2 ? "mario" : "wall"
                }"></span>`
            )
            .join("")
        )
        .join("<span class='clear'></span>");

      document.getElementById("app").innerHTML = markup;
      this.keycodeEvents(width, height);
    },
    keycodeEvents: function(width, height) {
      const self = this;

      let boardWidth = width;
      let boardHeight = height;
      console.log(boardWidth);

      function getIndexOfK(arr, k) {
        if (!arr) {
          return [];
        }

        for (var i = 0; i < arr.length; i++) {
          var index = arr[i].indexOf(k);
          if (index > -1) {
            return [i, index];
          }
        }

        return [];
      }

      const keyMap = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
      };

      let marioPosition = getIndexOfK(self.board, 2);

      document.addEventListener("keydown", function(event) {
        if (event.keyCode === 37 || 38 || 39 || 40) {
          // console.table(self.board);

          console.log(`Mario move: ${keyMap[event.keyCode]}`);
          console.log(marioPosition);
          switch (event.keyCode) {
            case 37:
              marioPosition[1] =
                marioPosition[1] > 0 ? marioPosition[1] - 1 : marioPosition[1];
              console.log(`left: ${marioPosition}`);
              break;

            case 38:
              marioPosition[0] =
                marioPosition[0] > 0 ? marioPosition[0] - 1 : marioPosition[0];
              console.log(`up: ${marioPosition}`);
              break;

            case 39:
              console.log(boardWidth);
              marioPosition[1] =
                marioPosition[1] < boardWidth - 1
                  ? marioPosition[1] + 1
                  : marioPosition[1];
              console.log(`right: ${marioPosition}`);
              break;

            case 40:
              marioPosition[0] =
                marioPosition[0] < boardHeight - 1
                  ? marioPosition[0] + 1
                  : marioPosition[0];
              console.log(`down: ${marioPosition}`);
              break;
            default:
              break;
          }
          //document.querySelector(".mario").innerHTML = keyMap[event.keyCode];
        }
      });
    }
  };
})();

window.mario.init();
