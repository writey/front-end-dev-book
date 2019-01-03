import Route from '@ember/routing/route';
import {alias} from '@ember/object/computed';

export default Route.extend({
  model() {
    return Ember.RSVP.hash({
      sighting: this.store.createRecord('sighting'),
      cryptids: this.store.findAll('cryptid'),
      witnesses: this.store.findAll('witness'),
    });
  },
  sighting: alias('controller.model.sighting'),
  actions: {
    willTransition() {
      const sighting = this.get('controller.model.sighting');
      if(sighting.get('hasDirtyAttributes')){
        sighting.deleteRecord();
      }
    },
    create() {
      // const self = this;
      this.send('flash', {alertType: "success", message: "New sighting"});
      this.get('sighting').save();
      // .then(function (){
      //   self.transitionToRoute('sightings');
      // });
    },
    cancel() {
        this.get('sighting').deleteRecord();
        this.transitionToRoute('sightings');
    },
  },
});
