var drawnAliveCellsCount;
var drawnDeadCellsCount;
var test_9_alive_cells = function() {
  cells = {
    "0,0": 1, "1,0": 1, "2,0": 1,
    "0,1": 1, "1,1": 1, "2,1": 1,
    "0,2": 1, "1,2": 1, "2,2": 1,
  };
  draw(cells);
  console.assert(drawnAliveCellsCount == 9, '生きたセルを9つ描画した');
};

var test_alive_and_dead_cells = function() {
  // 生き死に混ざったセルの描画テスト
  cells = {
    "0,0": 1, "1,0": 0, "2,0": 0,
    "0,1": 0, "1,1": 1, "2,1": 0,
    "0,2": 0, "1,2": 0, "2,2": 1,
  };
  draw(cells);
  console.assert(drawnAliveCellsCount == 3, '生きたセルを3つ描画した');
  console.assert(drawnDeadCellsCount == 6, '死んだセルを6つ描画した');
};

onload = function() {
  var tests = [
    test_9_alive_cells,
    test_alive_and_dead_cells
  ];

  for(var i = 0; i < tests.length; i++) {
    drawnAliveCellsCount = 0;
    drawnDeadCellsCount = 0;
    tests[i]();
  }
};
function drawAliveCell(col, row, ctx, cell) {
  ctx.beginPath();
  var startAngle = 0;
  var endAngle = 360 * Math.PI / 180;
  ctx.arc(50 + 50 * col, 50 + 50 * row, 20, startAngle, endAngle, true);
  ctx.stroke();
  if ( cell == 1) {
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fill();
    drawnAliveCellsCount += 1;
  } else {
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fill();
    drawnDeadCellsCount += 1;
  }
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

}
