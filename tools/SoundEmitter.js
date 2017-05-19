/*
 * Event Emitter Javascript natif
 */
function SoundEmitter() {
    EventEmitter.call(this);
    this.sounds = {};
}

SoundEmitter.prototype = Object.create(EventEmitter.prototype);
SoundEmitter.prototype.conscructor = SoundEmitter;

SoundEmitter.prototype.addSound = function(eventName, sound) {
    // On vérifie le type des arguments
    if (typeof sound !== 'function' || typeof eventName !== 'string') return

    this.events[eventName] = this.events[eventName] || []
    this.events[eventName].push(sound)
}

SoundEmitter.prototype.removeSound = function(eventName, sound) {
    // On vérifie l'existence de l'événement
    if (!this.events[eventName]) return

    // On boucle sur les fonctions liées à cet événement
    for (var i = 0; i < this.events[eventName].length; i++) {
        // Si on trouve la fonction demandée, on la supprime.
        // Elle ne sera plus executée lorsque l'objet émettra l'événement
        if (this.events[eventName][i] == sound) {
            this.events[eventName].splice(i, 1)
            break
        }
    }
}

EventEmitter.prototype.emit = function(eventName, data) {
    // console.log('emit: ' + eventName, data);
    if (!this.events[eventName] && !this.sounds[eventName]) return
    if (this.events[eventName]) {
        this.events[eventName].forEach(function(fn) {
            fn(data)
        })
    }
    if (this.sounds[sound]) {
        this.sounds[sound].forEach(function(s) {
            var audio = new Audio(s);
            audio.play();
        })
    }
}