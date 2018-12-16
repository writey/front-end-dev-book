(function init(window) {
  const App = window.App || {};

  const Validation = {
    isCompanyEmail: function isCompanyEmail(email) {
      return /.+@qq\.com$/.test(email);
    },
    isDecaf: function isDecaf(coffee, strengthLevel) {
      return !(coffee.indexOf('decaf') !== -1 && strengthLevel > 20);
    },
    // isHas: function isHas(email, db) {
    //   db.getAll()
    // },
  };
  App.Validation = Validation;
  window.App = App;
}(window));
