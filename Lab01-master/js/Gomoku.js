

(new function() {
    var App = this;
    this.files = [ 'js/Model.js', 'js/Graphics.js', 'js/Gomokucontrol.js', 'js/MouseController.js'];
    this.model;
    this.view;
    this.controller;

    this.init = function() {
        this.model = new AppModel();
        this.view = new AppView(this.model);
        this.controller = new AppController(this.model, this.view);
    };

    return function() {
        var head = document.getElementsByTagName('head')[0];
        for (var i in App.files)
        {
            var script = document.createElement('script');
            script.src = App.files[i];
            script.onload = App.start;
            head.appendChild(script);
        }
        window.onload = App.init;
    };
})();