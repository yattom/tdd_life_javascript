var drawnAliveCellsCount;
var drawnDeadCellsCount;
var drawnCount;
var test9AliveCells = function() {
  var cells = {
    "0,0": 1, "1,0": 1, "2,0": 1,
    "0,1": 1, "1,1": 1, "2,1": 1,
    "0,2": 1, "1,2": 1, "2,2": 1,
  };
  draw(cells);
  console.assert(drawnAliveCellsCount == 9, '生きたセルを9つ描画した');
}

var testAliveAndDeadCells = function() {
  var cells = {
    "0,0": 1, "1,0": 0, "2,0": 0,
    "0,1": 0, "1,1": 1, "2,1": 0,
    "0,2": 0, "1,2": 0, "2,2": 1,
  };
  draw(cells);
  console.assert(drawnAliveCellsCount == 3, '生きたセルを3つ描画した');
  console.assert(drawnDeadCellsCount == 6, '死んだセルを6つ描画した');
}

var testDraw2Steps = function() {
  processGameOfLife({}, 2);
  console.assert(drawnCount == 3, '3世代分描画した');
}

var testInNextStepTheCellIsDeadByUnderpopulation = function() {
  var cells = {
    "0,0": 1, "1,0": 0, "2,0": 0,
    "0,1": 0, "1,1": 1, "2,1": 0,
    "0,2": 0, "1,2": 0, "2,2": 1,
  };
  var currentCells = generateNextStepCells(cells);
  console.assert(currentCells["0,0"] == 0, 'セルが孤立死する');
}

var testInNextStepTheCellIsDeadByOverpopulation = function() {
  var cells = {
    "0,0": 1, "1,0": 0, "2,0": 1,
    "0,1": 0, "1,1": 1, "2,1": 0,
    "0,2": 1, "1,2": 0, "2,2": 1,
  };
  var currentCells = generateNextStepCells(cells);
  console.assert(currentCells["1,1"] == 0, 'セルが過密死する');
}

var testInNextStepTheCellIsReproduced = function() {
  var cells = {
    "0,0": 1, "1,0": 0, "2,0": 1,
    "0,1": 0, "1,1": 0, "2,1": 0,
    "0,2": 0, "1,2": 0, "2,2": 1,
  };
  var currentCells = generateNextStepCells(cells);
  console.assert(currentCells["1,1"] == 1, 'セルが誕生する');
}

var testInNextStepTheCellIsAlive = function() {
  var cells = {
    "0,0": 1, "1,0": 0, "2,0": 0,
    "0,1": 0, "1,1": 1, "2,1": 0,
    "0,2": 0, "1,2": 0, "2,2": 1,
  };
  var currentCells = generateNextStepCells(cells);
  console.assert(currentCells["1,1"] == 1, 'セルが生存する');
}

onload = function() {
  var tests = [
    test9AliveCells,
    testAliveAndDeadCells,
    testDraw2Steps,
    testInNextStepTheCellIsDeadByUnderpopulation,
    testInNextStepTheCellIsDeadByOverpopulation,
    testInNextStepTheCellIsReproduced,
    testInNextStepTheCellIsAlive
  ];

  for(var i = 0; i < tests.length; i++) {
    drawnAliveCellsCount = 0;
    drawnDeadCellsCount = 0;
    drawnCount = 0;
    tests[i]();
  }
  console.log(tests.length + " tests run.");
};
function processGameOfLife(initialCells, steps) {
  var nextStepCells;
  var cells = initialCells
  draw(initialCells);
  for (var i = 0; i < steps; i++) {
    nextStepCells = generateNextStepCells(cells);
    draw(nextStepCells);
    cells = nextStepCells;
  }
  return cells;
}
function generateNextStepCells(cells) {
  nextCells = {};
  for(var key in cells) {
    var a = key.split(',');
    var col = parseInt(a[0]);
    var row = parseInt(a[1]);
    var aliveCells = countAliveCells(cells, col, row);
    if (aliveCells == 3 || (cells[key] == 1 && aliveCells == 2)) {
      nextCells[key] = 1;
    } else {
      nextCells[key] = 0;
    }
  }
  return nextCells;
}
function countAliveCells(cells, col, row) {
  var aliveCells = 0;
  var neighbours = [[-1, -1], [-1, 0], [-1, 1],
                    [ 0, -1],          [ 0, 1],
                    [ 1, -1], [ 1, 0], [ 1, 1]];
  for(var i = 0; i < neighbours.length; i++) {
    var dcol = neighbours[i][0];
    var drow = neighbours[i][1];
    if(cells[(col + dcol) + ',' + (row + drow)] == 1) {
      aliveCells++;
    }
  }
  return aliveCells;
}
function drawAliveCell(col, row, ctx, cell) {
  ctx.beginPath();
  var startAngle = 0;
  var endAngle = 360 * Math.PI / 180;
  ctx.arc(50 + 50 * col, 50 + 50 * row, 20, startAngle, endAngle, true);
  ctx.stroke();
  if ( cell == 1) {
    ctx.fillStyle = 'rgb(0,0,0)';
    drawnAliveCellsCount += 1;
  } else {
    ctx.fillStyle = 'rgb(255,255,255)';
    drawnDeadCellsCount += 1;
  }
  ctx.fill();
}
function draw(cells) {
  /* canvas要素のノードオブジェクト */
  var canvas = document.getElementById('canvassample');
  /* canvas要素の存在チェックとCanvas未対応ブラウザの対処 */
  if ( ! canvas || ! canvas.getContext ) {
    return false;
  }
  /* 2Dコンテキスト */
  var ctx = canvas.getContext('2d');

  for(var col = 0; col < 3; col++) {
    for(var row = 0; row < 3; row++) {
      var cell = cells[col + ',' + row]
      drawAliveCell(col, row, ctx, cell);
    }
  }
  drawnCount += 1;
}

var cells = {
    "0,0": 0, "1,0": 0, "2,0": 0,
    "0,1": 1, "1,1": 1, "2,1": 1,
    "0,2": 0, "1,2": 0, "2,2": 0,
};
function buttonclick() {
  cells = processGameOfLife(cells, 1);
}
