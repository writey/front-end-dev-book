(function (window) {
  const App = window.App;
  const Truck = App.Truck;
  const DataStore = App.DataStore;
  const myTruck = new Truck('KITT', new DataStore());
  window.myTruck = myTruck;
}(window));
