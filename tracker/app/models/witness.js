import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  fName: DS.attr('string'),
  lName: DS.attr('string'),
  email: DS.attr('string'),
  sightings: DS.attr('sighting'),
  fullName: Ember.computed('fName', 'lName', function () {
    return this.get('fName') + '' + this.get('lName');
  }),
  disPlayInfo: Ember.computed('fName', 'email', function () {
    return `${this.get('fName')} - ${this.get('email')}`;
  })
});
