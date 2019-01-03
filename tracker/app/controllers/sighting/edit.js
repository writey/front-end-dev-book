import Controller from '@ember/controller';
// import Ember from 'ember';
import {alias} from '@ember/object/computed';

export default Controller.extend({
  sighting: alias('model.sighting'),
  actions: {
    update() {
      if(this.get('sighting').get('hasDirtyAttributes')) {
        this.get('sighting').save().then(() => this.transitionToRoute('sightings'));
      }
    },
    cancel() {
      if(this.get('sighting').get('hasDirtyAttributes')) {
        this.get('sighting').rollbackAttrbutes();
      }
      this.transitionToRoute('sightings');
    },
    delete() {
      const self = this;
      if(window.confirm("Are you sure you want to delete this sighting?")) {
        self.get('sighting').destroyRecord().then(() => self.transitionToRoute('sightings'));
      }
    },
  }
});
