var drawnAliveCellsCount;
var drawnDeadCellsCount;
var drawnCount;
var test9AliveCells = function() {
  cells = {
    "0,0": 1, "1,0": 1, "2,0": 1,
    "0,1": 1, "1,1": 1, "2,1": 1,
    "0,2": 1, "1,2": 1, "2,2": 1,
  };
  draw(cells);
  console.assert(drawnAliveCellsCount == 9, '生きたセルを9つ描画した');
}

var testAliveAndDeadCells = function() {
  // 生き死に混ざったセルの描画テスト
  cells = {
    "0,0": 1, "1,0": 0, "2,0": 0,
    "0,1": 0, "1,1": 1, "2,1": 0,
    "0,2": 0, "1,2": 0, "2,2": 1,
  };
  draw(cells);
  console.assert(drawnAliveCellsCount == 3, '生きたセルを3つ描画した');
  console.assert(drawnDeadCellsCount == 6, '死んだセルを6つ描画した');
}

var testGenerateNextStep = function() {
  var initialCells = {
    "0,0": 1, "1,0": 0, "2,0": 0,
    "0,1": 0, "1,1": 1, "2,1": 0,
    "0,2": 0, "1,2": 0, "2,2": 1,
  };
  processGameOfLife(initialCells, 2);
  console.assert(drawnCount == 2, '2世代分描画した');
}

onload = function() {
  var tests = [
    test9AliveCells,
    testAliveAndDeadCells,
    testGenerateNextStep
  ];

  for(var i = 0; i < tests.length; i++) {
    drawnAliveCellsCount = 0;
    drawnDeadCellsCount = 0;
    drawnCount = 0;
    tests[i]();
  }
};
function processGameOfLife(initialCells, steps) {
  for (var i = 0; i < steps; i++) {
    draw(initialCells);
  }
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
