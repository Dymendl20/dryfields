/*
 * Event Emitter Javascript natif
 */
function EventEmitter() {
  this.events = {}
}

/*
 * La méthode .on() permet de lier des fonctions à des événements de l'objet
 */
EventEmitter.prototype.on = function(eventName, fn) {
  // On vérifie le type des arguments
  if (typeof fn !== 'function' || typeof eventName !== 'string') return

  // On ajoute l'événement à l'objet
  this.events[eventName] = this.events[eventName] || []
  // On lie la fonction au déclenchement de l'événement
  this.events[eventName].push(fn)
}

/*
 * La méthode .off() permet de supprimer des fonctions liées à un événement de l'objet
 */
EventEmitter.prototype.off = function(eventName, fn) {
  // On vérifie l'existence de l'événement
  if (!this.events[eventName]) return

  // On boucle sur les fonctions liées à cet événement
  for (var i = 0; i < this.events[eventName].length; i++) {
    // Si on trouve la fonction demandée, on la supprime.
    // Elle ne sera plus executée lorsque l'objet émettra l'événement
    if (this.events[eventName][i] == fn) {
      this.events[eventName].splice(i, 1)
      break
    }
  }
}

/*
 * La méthode .emit() permet à l'objet d'émettre des événements.
 * Lorsqu'un événement est émis, toutes les fonctions liées à celui-ci sont éxecutées
 */
EventEmitter.prototype.emit = function(eventName, data) {
  console.log('emit: ' + eventName, data);
  if (!this.events[eventName]) return

  this.events[eventName].forEach(function(fn) {
    fn(data)
  })
}
