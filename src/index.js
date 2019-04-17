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
      this.buildTiles(
        parseInt(this.gridWidth, 10),
        parseInt(this.gridHeight, 10)
      );
    },
    buildMatrix: function(m, n) {
      let result = [];
      const marioLocation = Math.floor(Math.random() * n);
      console.log(marioLocation);
      for (var i = 0; i < n; i++) {
        let fillLocation = Math.floor(Math.random() * m);
        let fillArray = new Array(m).fill(0);
        fillArray.fill(1, fillLocation, fillLocation + 1);
        if (marioLocation - 1 === i) {
          console.log(marioLocation);
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
      this.keycodeEvents();
    },
    keycodeEvents: function() {
      const self = this;
      const keyMap = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
      };

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

      document.addEventListener("keydown", function(event) {
        if (event.keyCode === 37 || 38 || 39 || 40) {
          console.log(`Mario move: ${keyMap[event.keyCode]}`);
          console.table(self.board);
          console.log(getIndexOfK(self.board, 2));
          //document.querySelector(".mario").innerHTML = keyMap[event.keyCode];
        }
      });
    }
  };
})();

window.mario.init();
