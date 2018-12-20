import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return [
      {
        id: 1,
        location: 'Asilomar',
        SightedAt: new Date('2018-03-07'),
      },
      {
        id: 1,
        location: 'Asilomar',
        SightedAt: new Date('2018-03-07'),
      },
      {
        id: 1,
        location: 'Asilomar',
        SightedAt: new Date('2018-03-07'),
      },
      {
        id: 1,
        location: 'Asilomar',
        SightedAt: new Date('2018-03-07'),
      },
      {
        id: 1,
        location: 'Asilomar',
        SightedAt: new Date('2018-03-07'),
      },
    ];
  }
});
