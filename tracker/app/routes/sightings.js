import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    let record1 = this.store.createRecord('sighting', {
      location: 'Asilomar1',
      sightedAt: new Date('2018-03-28'),
      isNew: true,
    });
    let record2 = this.store.createRecord('sighting', {
      location: 'Asilomar2',
      sightedAt: new Date('2018-03-28'),
    });
      let record3 = this.store.createRecord('sighting', {
        location: 'Asilomar3',
        sightedAt: new Date('2018-03-28'),
    });
    return [record1, record2, record3];
  }
});
