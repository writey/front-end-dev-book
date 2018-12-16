(function init(window) {
  const App = window.App || {};

  function Truck(truckId, db, db2) {
    this.truckId = truckId;
    this.db = db;
    db.getAll().then(() => {
      this.db = db;
    }, () => {
      this.db = db2;
    });
  }
  Truck.prototype.createOrder = function createOrder(order) {
    console.log(`Adding order for ${order.emailAddress}`);
    return this.db.add(order.emailAddress, order);
  };

  Truck.prototype.deliverOrder = function deliverOrder(customerId) {
    console.log(`Delivering order for ${customerId}`);
    return this.db.remove(customerId);
  };

  Truck.prototype.printOrders = function printOrders(printFn) {
    console.log(`Truck # ${this.truckId} has pending orders:`);
    return this.db.getAll().then((orders) => {
      Object.keys(orders).forEach((id) => {
        console.log(id);
        if (printFn) {
          printFn(orders[id]);
        }
      });
    });
  };

  Truck.prototype.getOrder = function getOrder(customerId) {
    console.log(`get order for ${customerId}`);
    return this.db.get(customerId);
  };

  App.Truck = Truck;
  window.App = App;
}(window));
