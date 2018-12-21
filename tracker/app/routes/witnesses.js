import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    // let witnessRecord = this.store.createRecord('witness', {
    //   fName: 'x',
    //   lName: 'cl',
    //   email: 'x18752457230@gmail.com',
    // });
    // return [witnessRecord];
    return this.store.findAll('witness');
  }
});
