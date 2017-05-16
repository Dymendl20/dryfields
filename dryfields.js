window.onload = function () {
    var field1 = new Field();
    var field2 = new Field();
    var field3 = new Field();
    var fields = [field1, field2, field3]
    var user = new User();
    var view = new GameView(fields);
    var gameController = new GameController(fields, user, view);
}