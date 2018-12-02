(function (window) {
  const App = window.App || {};
  let launchCount = 0;

  function Spaceship() {
  }

  Spaceship.prototype.blastoff = function () {
    launchCount++;
  };

  Spaceship.prototype.reportLaunchCount = function () {
    console.log(`Total number of launches : ${launchCount}`);
  };

  App.Spaceship = Spaceship;
  window.App = App;
}(window));
