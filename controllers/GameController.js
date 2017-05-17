function GameController(fields, user, view) {
    EventEmitter.call(this);
    this.fields = fields;
    this.user = user;
    this.view = view;
    this.gameOverTimer = 0;
    this.init();
}

GameController.prototype = Object.create(EventEmitter.prototype);
GameController.prototype.conscructor = GameController;


GameController.prototype.init = function() {
    this.interval = setInterval(this.gardening.bind(this), 1000)
    this.loseCondition();
    this.watering();
    this.view.on('harvest'), (function(data) {
        console.log('bite')
        this.user.money += this.user.harvestGain;
        this.fields[data.number - 1].harvestProgress = 0;
    }).bind(this)

    this.view.on('water-bought', (function(data) {
        if (this.user.money > 0) {
            this.user.water += parseInt(data.quantity);
            this.user.money -= parseFloat(this.fields[0].waterPrice * data.quantity)
        }
    }).bind(this))
    this.view.on('watered', (function(data) {
        this.fields[data.number - 1].waterSupplie++;
        console.log(this.fields[data.number - 1].waterSupplie);
        this.user.water--;
    }).bind(this))
}

GameController.prototype.gardening = function() {
    this.watering();
    this.waterComsuption();
    this.loseCondition();
    this.fields.forEach(function(field) {
        field.update();
        field.fieldReady();
    }, this);
    this.user.update();
}

GameController.prototype.waterComsuption = function() {
    this.gameOverTimer += 1
    this.fields.forEach(function(field) {
        if (field.harvestProgress < 100) {
            field.waterSupplie -= Math.floor(parseFloat(field.consumption));
            if (field.waterSupplie < 0) {
                field.waterSupplie = 0;
            }
            field.consumption = Math.pow(parseFloat(this.gameOverTimer), 2) / 800000 + 1
            if (field.consumption > 2) {
                field.consumption = 2;
            }
        }
    }, this);
}

GameController.prototype.watering = function() {
    this.fields.forEach(function(field) {
        if (field.waterSupplie > 0 && field.harvestProgress < 100) {
            field.harvestProgress += 10;
        }

        if (field.waterSupplie <= 0 && field.harvestProgress < 100) {
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
    // ouvrir la fenètre permettant de rentrer son nom et envoyer le score au serveur
}


GameController.prototype.update = function(label, data) {

    if (label == 'recolte_mure') {
        this.view.setRecolter(data.recolter);
    }
}