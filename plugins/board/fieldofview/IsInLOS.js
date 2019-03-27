import CONST from './const.js';
import AngleBetween from '../../utils/math/angle/Between.js';
import AreTileXYArrayEqual from '../utils/AreTileXYArrayEqual.js';

const INFINITY = CONST.INFINITY;

var IsInLOS = function (chess, visiblePoints) {
    // chess: chess object or tileXY
    if ((visiblePoints !== INFINITY) && (visiblePoints <= 0)) {
        return false;
    }

    var board = this.board;
    var targetTileXY = board.chessToTileXYZ(chess);
    if (!this.isInCone(targetTileXY)) {
        return false;
    }

    var myTileXYZ = this.chessData.tileXYZ;
    if (this.debugGraphics) {
        console.log('Visible test from (' + myTileXYZ.x + ',' + myTileXYZ.y + ') to (' + targetTileXY.x + ',' + targetTileXY.y + ')');
    }

    var out = board.tileXYToWorldXY(myTileXYZ.x, myTileXYZ.y, true);
    var startX = out.x,
        startY = out.y;
    out = board.tileXYToWorldXY(targetTileXY.x, targetTileXY.y, true);
    var endX = out.x,
        endY = out.y;
    var lineAngle = AngleBetween(startX, startY, endX, endY),
        offsetX, offsetY, isVisivle;

    // Shift a small distance
    lineAngle += (Math.PI / 2);
    offsetX = 0.005 * Math.cos(lineAngle);
    offsetY = 0.005 * Math.sin(lineAngle);
    var x0 = startX + offsetX,
        y0 = startY + offsetY,
        x1 = endX + offsetX,
        y1 = endY + offsetY;
    board.lineToTileXYArray(x0, y0, x1, y1, globTileXYArray0);
    if (this.debugGraphics) {
        console.log('Line 0: ' + JSON.stringify(globTileXYArray0));
        this.debugGraphics.lineBetween(x0, y0, x1, y1);
    }
    isVisivle = this.isPathVisible(globTileXYArray0, visiblePoints);
    if (isVisivle) {
        globTileXYArray0.length = 0;
        return true;
    }

    // Shift a small distance
    lineAngle += Math.PI;
    offsetX = 0.005 * Math.cos(lineAngle);
    offsetY = 0.005 * Math.sin(lineAngle);
    var x0 = startX + offsetX,
        y0 = startY + offsetY,
        x1 = endX + offsetX,
        y1 = endY + offsetY;
    board.lineToTileXYArray(x0, y0, x1, y1, globTileXYArray1);
    if (this.debugGraphics) {
        console.log('Line 1: ' + JSON.stringify(globTileXYArray1));
        this.debugGraphics.lineBetween(x0, y0, x1, y1);
    }
    // No need do visible checking if path is the same as previous one
    if (!AreTileXYArrayEqual(globTileXYArray0, globTileXYArray1)) {
        isVisivle = this.isPathVisible(globTileXYArray1, visiblePoints);
    }
    globTileXYArray0.length = 0;
    globTileXYArray1.length = 0;
    return isVisivle;
}

var globTileXYArray0 = [],
    globTileXYArray1 = [];
export default IsInLOS;