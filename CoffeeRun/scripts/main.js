(function init(window) {
  // 用于选择form表单的变量
  const FORM_SELECTOR = '[data-coffee-order="form"]';
  // 用于选择checklist的变量
  const CHECKLIST_SELECTOR = '[data-coffer-order="checklist"]';
  // 服务器地址
  const SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
  // 初始化App
  const App = window.App;
  // 初始化服务器数据
  // 初始化Truck
  const Truck = App.Truck;
  const DataStore = App.DataStore;
  const FormHandler = App.FormHandler;
  const CheckList = App.CheckList;
  const Validation = App.Validation;
  const RemoteDateStore = App.RemoteDateStore;
  // 新建formHandler对象
  const formHandler = new FormHandler(FORM_SELECTOR);
  const checklist = new CheckList(CHECKLIST_SELECTOR);
  const remoDS = new RemoteDateStore(SERVER_URL);
  const myTruck = new Truck('KITT', remoDS, new DataStore());
  window.myTruck = myTruck;
  // 执行提交拦截方法 参数为一个一个函数
  formHandler.addSubmitHandler(data => myTruck.createOrder.call(myTruck, data)
    .then(() => {
      checklist.addRow.call(checklist, data);
    }));
  formHandler.addInputHandler(Validation.isCompanyEmail);
  formHandler.addHasEmailHandler(Validation.isHas);
  formHandler.addCoffeeInputHandler(Validation.isDecaf);
  formHandler.addCoffeeRange(Validation.isDecaf);
  checklist.addClickHandler(myTruck.deliverOrder.bind(myTruck),
    formHandler.formJSON.bind(formHandler));
  myTruck.printOrders(checklist.addRow.bind(checklist));
}(window));
