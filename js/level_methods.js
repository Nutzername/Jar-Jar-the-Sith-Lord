function replaceLevelSpriteXY(x, y, item) {
    line_nr = y / size.tile.target.h - line_offset_y
    replaceLevelSprite(x / size.tile.target.w, line_nr, item)
}

function replaceLevelSprite(pos, line, item) {
    current_level.level[line] = current_level.level[line].replaceAt(pos, item);
}

function getLevelSpriteXY(x, y) {
    line_nr = y / size.tile.target.h - line_offset_y;
    return getLevelSprite(x / size.tile.target.w, line_nr);
}

function getLevelSprite(pos, line) {
    return current_level.level[line].charAt(pos);
}

function getIndicesOf(searchStr, str) {
    var startIndex = 0, searchStrLen = searchStr.length;
    var index, indices = [];
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}

function getLevelSpritePositions(type) {
    var positions = []
    current_level.level.forEach(function (linecontent, pos_y) {
            getIndicesOf(type, linecontent).forEach(function (pos_x) {
                    positions.push({x:pos_x, y:pos_y})
                }
            )
        }
    )
    return positions
}

function getLastLevelSpritePosition(type, x) {
    var pos
    positions = getLevelSpritePositions(type)
    positions.sort(function (a, b) {
        return a.x - b.x
    });
    positions.forEach(function (position) {
        if (!pos || (pos.x < position.x && position.x * size.tile.target.w <= x)) {
            pos = position
        }
    })
    return pos
}

var blocks = {};
blocks['#'] = {sx:5, sy:0, collide:true, solid:true};
blocks['x'] = {sx:0, sy:0, collide:true, solid:true};
blocks['H'] = {sx:2, sy:4, collide:true, solid:true};
blocks['k'] = {sx:2, sy:6, collide:true, solid:true};
blocks['A'] = {sx:11, sy:0};
blocks['B'] = {sx:11, sy:1};
blocks['C'] = {sx:12, sy:0};
blocks['D'] = {sx:12, sy:1};
blocks['E'] = {sx:3, sy:6};
blocks['F'] = {sx:4, sy:6};
blocks['G'] = {sx:5, sy:6};
blocks['I'] = {sx:9, sy:5};
blocks['J'] = {sx:9, sy:4, collide:true, solid:true};
blocks['K'] = {sx:7, sy:5, collide:true, solid:true};
blocks['L'] = {sx:0, sy:2, collide:true, type:'exit'};
blocks['M'] = {sx:1, sy:2, collide:true, type:'exit'};
blocks['N'] = {sx:0, sy:3, collide:true, type:'exit'};
blocks['O'] = {sx:1, sy:3, collide:true, type:'exit'};
blocks['P'] = {sx:4, sy:4};
blocks['Q'] = {sx:5, sy:4};
blocks['R'] = {sx:4, sy:5};
blocks['S'] = {sx:5, sy:5};
blocks['T'] = {sx:6, sy:4};
blocks['U'] = {sx:6, sy:5};
blocks['z'] = {sx:9, sy:9, collide:true, solid:true};
blocks['8'] = {sx:0, sy:6, collide:true, solid:true};
blocks['c'] = {sx:8, sy:9, collide:true, type:'coin' };
blocks['µ'] = {sx:13, sy:13, collide:true, solid:true, type:'hidden_block'};
blocks['y'] = {sx:13, sy:13, type:'respawn'};
blocks['~'] = {sx:9, sy:0, collide:true, type:'trampoline'};
blocks['ß'] = {sx:1, sy:11, collide:true, solid:true};
blocks['?'] = {sx:0, sy:11, collide:true, solid:true, type:'block_coin'};
blocks['e'] = {sx:1, sy:6, collide:true, type:'exit'};
blocks['h'] = {sx:12, sy:6, collide:true, deadly:true};
blocks['@'] = {sx:9, sy:2, collide:true, deadly:true};
blocks['´'] = {sx:10, sy:2, collide:true, deadly:true};
blocks['p'] = {sx:0, sy:12, deadly:true, solid:true, type:'enemy_mushroom', speed_x:4};
blocks['/'] = {sx:0, sy:1};
blocks['^'] = {sx:1, sy:0};
blocks['ü'] = {sx:1, sy:1};
blocks['g'] = {sx:3, sy:1, collide:true, solid:true};
blocks['`'] = {sx:2, sy:1};
blocks['{'] = {sx:2, sy:0};
blocks['='] = {sx:3, sy:0};
blocks['}'] = {sx:4, sy:0};
blocks['1'] = {sx:0, sy:7};
blocks['2'] = {sx:1, sy:7};
blocks['3'] = {sx:2, sy:7};
blocks['4'] = {sx:0, sy:8};
blocks['5'] = {sx:1, sy:8};
blocks['6'] = {sx:2, sy:8};
blocks['b'] = {sx:13, sy:4};
blocks['\''] = {sx:2, sy:3};
blocks['°'] = {sx:10, sy:1};
blocks['|'] = {sx:3, sy:4};
blocks['*'] = {sx:1, sy:4};
blocks['W'] = {sx:0, sy:4, collide:true, solid:true};
blocks['X'] = {sx:2, sy:4};
blocks['l'] = {sx:7, sy:3};
blocks['j'] = {sx:2, sy:5};
blocks['('] = {sx:0, sy:9};
blocks[')'] = {sx:0, sy:10};
blocks['['] = {sx:1, sy:9};
blocks[']'] = {sx:1, sy:10};
blocks['j'] = {sx:2, sy:5};
blocks['Z'] = {sx:9, sy:9};
blocks['f'] = {sx:2, sy:2};


function getLevelObject(character) {
    var object = blocks[character];
    return object
}

function prerenderLevelObjects() {
    for (char in blocks) {
        var block = blocks[char]
        var canvas = document.createElement('canvas')
        canvas.width = size.tile.target.w
        canvas.height = size.tile.target.h
        canvas.getContext("2d").drawImage(
            spriteMap,
            block.sx * (size.tile.source.w + 1) + 0.5,
            block.sy * (size.tile.source.h + 1) + 0.5,
            size.tile.source.w - 0.8,
            size.tile.source.h - 0.8,
            0,
            0,
            size.tile.target.w,
            size.tile.target.h);
        block.sprite = new Image();
        try {
            block.sprite.src = canvas.toDataURL("image/png");
        }
        catch (err) {
            // image loading fails locally in chromium
        }
    }
}

Object.prototype.cloneBlock = function () {
    return {sx:this.sx, sy:this.sy, collide:this.collide, deadly:this.deadly,
        solid:this.solid, speed_x:this.speed_x, type:this.type, x:this.x, y:this.y};
};
