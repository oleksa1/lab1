
let AppModel = function() {
    this.m; 
    this.n; 
     this.size = 15;
    this.matrix; 
    this.freeCells; 
    this.winLine; 
    this.patternWin = [0, /(1){5}/, /(2){5}/, /[01]*7[01]*/, /[02]*7[02]*/]; 
    this.setStartData = function(a) { 
     this.who = true;
        this.matrix = [];
        this.winLine = [];
        this.freeCells = this.size * this.size;
        for (var n = 0; n < this.size; n++) {
            this.matrix[n] = [];
            for (var m = 0; m < this.size; m++) {
                this.matrix[n][m] = 0;
            }
        }
        this.step = 0;
        this.playing = true;
    };

    this.setNM = function(a) { 
        this.n = a.n;
        this.m = a.m;
    };

    this.emptyCell = function() { 
        return this.matrix[this.n][this.m] === 0;
    };

    this.moveUser = function() { 
        this.playing = false;    
        return this.move(this.n, this.m, false);
    };

    this.move = function(n, m, aiStep) { 
        this.matrix[n][m] = 2 - this.who; 
        this.who = !this.who; 
        this.freeCells--;
        let t = this.matrix[this.n][this.m]; 
        let s = ['', '', '', ''];
        let nT = Math.min(this.n, 4);
        let nR = Math.min(this.size - this.m - 1, 4);
        let nB = Math.min(this.size - this.n - 1, 4);
        let nL = Math.min(this.m, 4);
        for (let j = this.n - nT; j <= this.n + nB; j++)
            s[0] += this.matrix[j][this.m];
        for (let i = this.m - nL; i <= this.m + nR; i++)
            s[1] += this.matrix[this.n][i];
        for (let i = -Math.min(nT, nL); i <= Math.min(nR, nB); i++)
            s[2] += this.matrix[this.n + i][this.m + i];
        for (var i = -Math.min(nB, nL); i <= Math.min(nR, nT); i++)
            s[3] += this.matrix[this.n - i][this.m + i];
        var k;
        if ((k = s[0].search(this.patternWin[t])) >= 0)
            this.winLine = [this.m, this.n - nT + k, this.m, this.n - nT + k + 4];
        else if ((k = s[1].search(this.patternWin[t])) >= 0)
            this.winLine = [this.m - nL + k, this.n, this.m - nL + k + 4, this.n];
        else if ((k = s[2].search(this.patternWin[t])) >= 0)
            this.winLine = [this.m - Math.min(nT, nL) + k, this.n - Math.min(nT, nL) + k, this.m - Math.min(nT, nL) + k + 4, this.n - Math.min(nT, nL) + k + 4];
        else if ((k = s[3].search(this.patternWin[t])) >= 0)
            this.winLine = [this.m - Math.min(nB, nL) + k, this.n + Math.min(nB, nL) - k, this.m - Math.min(nB, nL) + k + 4, this.n + Math.min(nB, nL) - k - 4, -1];
        this.playing = (this.freeCells !== 0 && this.winLine.length == 0); 
         console.log(++this.step + ': ' + n + ', ' + m);
        return {n: n, m: m};
    };
};