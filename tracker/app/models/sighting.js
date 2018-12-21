import DS from 'ember-data';

export default DS.Model.extend({
    location: DS.attr('string'),
    createAt: DS.attr('date'),
    sightedAt: DS.attr('date'),
    cryptid: DS.belongsTo('cryptid'),
    witnesses: DS.hasMany('witness'),
    isNew: DS.attr('boolean', {defaultValue: false}),
});
