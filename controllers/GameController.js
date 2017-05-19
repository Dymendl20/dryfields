function GameController(fields, user, view, config) {
    EventEmitter.call(this);
    this.fields = fields;
    this.user = user;
    this.view = view;
    this.config = config;
    this.gameOverTimer = 0;
    this.init();
}

GameController.prototype = Object.create(EventEmitter.prototype);
GameController.prototype.conscructor = GameController;


GameController.prototype.init = function() {
    this.interval = setInterval(this.gardening.bind(this), 1000)
    this.loseCondition();
    this.watering();
    this.view.on('harvest', (function(data) {
        this.user.setHarvests(this.user.harvests + 1)
        this.user.setMoney(this.user.money + this.config.harvestGain);
        this.fields[data.number - 1].harvestProgress = 0;
        $('#eau-qty').attr({
            max: this.user.money / this.config.waterPrice
        }).val(0);
    }).bind(this))

    this.view.on('water-bought', (function(data) {
        this.user.setWater(this.user.water + parseInt(data.quantity));
        this.user.setMoney(this.user.money - parseFloat(this.config.waterPrice * data.quantity));
        $('#eau-qty').attr({
            max: this.user.money / this.config.waterPrice
        }).val(0);
    }).bind(this))
    this.view.on('watered', (function(data) {
        if (this.user.water > 0) {
            var field = this.fields[data.number - 1];
            field.setWater(field.waterSupplie + 1);
            this.user.setWater(this.user.water - 1);
        }
    }).bind(this))
    this.view.on('pause', (function() {
        clearInterval(this.interval);
        this.interval = null;
    }).bind(this))
    this.view.on('unpause', (function() {
        this.fields.forEach(function(field) {
            $('#recolt-chp' + field.id).prop("disabled", false);
            $('#irrig-chp' + field.id).prop("disabled", false);
        });
        this.interval = setInterval(this.gardening.bind(this), 1000);
    }).bind(this))
}

GameController.prototype.gardening = function() {
    this.config.getCurrencies((function() {
        this.gameOverTimer += 1
        console.log(this.gameOverTimer);
        this.waterComsuption();
        this.watering();
        this.loseCondition();
        this.fields.forEach(function(field) {
            field.update();
            field.fieldReady();
        }, this);
        this.user.update();
    }).bind(this));
}

GameController.prototype.waterComsuption = function() {

    this.fields.forEach(function(field) {
        if (field.harvestProgress < 100) {
            field.setWater(field.waterSupplie - field.consumption);
            if (field.waterSupplie < 0) {
                field.waterSupplie = 0;
            }
            // field.consumption = Math.pow(parseFloat(this.gameOverTimer), 2) / 800000 + 1;
            field.consumption = field.consumption + 0.01;
            if (field.consumption > 2) {
                field.consumption = 2;
            }
        }
        console.log('Consomation :' + field.consumption)
    }, this);
}

GameController.prototype.watering = function() {
    this.fields.forEach(function(field) {
        if (field.waterSupplie >= field.consumption && field.harvestProgress <= 100) {
            field.harvestProgress += 10;
        }

        if (field.waterSupplie < field.consumption && field.harvestProgress < 100) {
            field.harvestProgress = 0;

        }
        if (field.harvestProgress >= 100) {
            field.harvestProgress = 100;
        }
    }, this);
}



GameController.prototype.loseCondition = function() {
    var lostCount = 0;
    this.fields.forEach(function(field) {
        if (field.harvestProgress === 0) {
            lostCount++
        }
    });
    if (lostCount >= this.fields.length) {
        this.gameOver();
    }

    if (this.gameOverTimer > 900) {
        this.gameOver();
    }
}

GameController.prototype.gameOver = function() {
    clearInterval(this.interval);
    console.log('Game Over');
    // ouvrir la fenêtre permettant de rentrer son nom et envoyer le score au serveur
    this.view.showScore();
    var audio = new Audio('sounds/bon_cassez_vous.mp3');
    console.log(audio)
    audio.play();
}