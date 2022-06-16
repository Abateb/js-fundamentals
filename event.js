export default class Event {
  constructor() {
      this.connections = {};
  }

  disconnect(name) {
      delete this.connections[name];
  }

  connect(name, func) {
      this.connections[name] = func;
  }

  fire(...args) {
      for (let eventName in this.connections) {
          this.connections[eventName](...args);
      }
  }

  disconnectAll() {
      for (let eventName in this.connections) {
          delete this.connections[eventName];
      }
  }
}
