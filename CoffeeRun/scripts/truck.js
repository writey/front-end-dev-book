(function (window) {
  const App = window.App || {};

  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }

  Truck.prototype.createOrder = function createOrder(order) {
    console.log(`Adding order for ${order.emailAddress}`);
    this.db.add(order.emailAddress, order);
  };

  Truck.prototype.deliverOrder = function deliverOrder(customerId) {
    console.log(`Delivering order for ${customerId}`);
    this.db.remove(customerId);
  };

  Truck.prototype.printOrders = function printOrders() {
    const customerIdArray = Object.keys(this.db.getAll());
    console.log(`Truck # ${this.truckId} has pending orders:`);
    customerIdArray.forEach((id) => {
      console.log(this.db.get(id));
    });
  };

  App.Truck = Truck;
  window.App = App;
}(window));
