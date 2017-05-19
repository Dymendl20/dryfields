window.onload = function() {
    var config = new Config();
    config.getCurrencies(function() {
        var fields = [new Field(), new Field(), new Field()];
        var user = new User();
        var view = new GameView(fields, user, config);
        var gameController = new GameController(fields, user, view, config);
    });
}