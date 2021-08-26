
let AppView = function(model) {
     AppView = this;
   this.model = model;
    this.cellsize = 30, this.halfcellsize = 15, this.radius = 10, this.cross = 10, this.crosswin = 5;
    this.color = {canvas: '#white', border: '#06b838', winline: '#8f05ff'};
    this.init = function() {
        let body = document.getElementsByTagName('body')[0];
        let div = document.createElement('div');
        div.className = 'scoreboard';
         let element = document.createElement('input');
         div.className = 'gameboard';
         body.appendChild(div);
        let canvas = document.createElement('canvas');
        div.appendChild(canvas);
        AppView.canvas = canvas;
       AppView.ctx = AppView.canvas.getContext('2d');
        AppView.canvas.height = 451;
        AppView.canvas.width = 451;
    };

    this.renderBoard = function() {
        this.ctx.fillStyle = this.color.canvas;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.width);
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color.border;
        this.ctx.lineWidth = 1;
        for (var x = 0.5; x < this.canvas.width; x += this.cellsize) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
        }
        for (var y = 0.5; y < this.canvas.height; y += this.cellsize) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
        }
        this.ctx.stroke();
    };

    this.renderMove = function(nm) {
        n = nm.n || this.model.n;
        m = nm.m || this.model.m;
        if (this.model.matrix[n][m] === 1)
            this.renderX(n, m);
        else
            this.renderO(n, m);
    };
    this.renderWinLine = function()
    {
        let ctx = this.ctx;
        let cellsize = this.cellsize;
        let halfcellsize = this.halfcellsize;
        let crosswin = this.crosswin;
        let m1 = this.model.winLine[0];
        let n1 = this.model.winLine[1];
        let m2 = this.model.winLine[2];
        let n2 = this.model.winLine[3];
        r = this.model.winLine[4] || 1;
        ctx.beginPath();
        ctx.strokeStyle = this.color.winline;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.moveTo(m1 * cellsize + halfcellsize - crosswin * (m1 !== m2), n1 * cellsize + halfcellsize - crosswin * (n1 !== n2) * r);
        ctx.lineTo(m2 * cellsize + halfcellsize + crosswin * (m1 !== m2), n2 * cellsize + halfcellsize + crosswin * (n1 !== n2) * r);
        ctx.stroke();
    };

    this.renderX = function(n, m)
    {
        let ctx = this.ctx;
        ctx.beginPath();
        let x = m * this.cellsize + this.halfcellsize;
        let y = n * this.cellsize + this.halfcellsize;
        ctx.fillRect(x - this.halfcellsize + 1, y - this.halfcellsize + 1, this.cellsize - 2, this.cellsize - 2);
        ctx.strokeStyle = '#fc5603';
        ctx.lineWidth = 3;
        ctx.moveTo(x - this.cross, y - this.cross);
        ctx.lineTo(x + this.cross, y + this.cross);
        ctx.moveTo(x - this.cross, y + this.cross);
        ctx.lineTo(x + this.cross, y - this.cross);
        ctx.stroke();
    };

    this.renderO = function(n, m)
    {
        let ctx = this.ctx;
         ctx.beginPath();
         x = m * this.cellsize + this.halfcellsize;
         y = n * this.cellsize + this.halfcellsize;
        ctx.fillRect(x - this.halfcellsize + 1, y - this.halfcellsize + 1, this.cellsize - 2, this.cellsize - 2);
        ctx.strokeStyle = '#03c6fc';
        ctx.lineWidth = 3;
        ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    };

    this.setStyleCursor = function(x, y) {
        var n = Math.floor(y / this.cellsize);
        var m = Math.floor(x / this.cellsize);
        if (n < this.model.size && m < this.model.size && this.model.matrix[n][m] == 0)
            this.canvas.style.cursor = 'pointer';
        else
            this.canvas.style.cursor = 'default';
        return {n: n, m: m};
    };

    this.setStyleCursorDefault = function() {
        this.canvas.style.cursor = 'default';
    };
    const refreshButton = document.querySelector('.refresh-button');

    const refreshPage = () => {
      location.reload();
    }
    
    refreshButton.addEventListener('click', refreshPage)
    this.init();
};