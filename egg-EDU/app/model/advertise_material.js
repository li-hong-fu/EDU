module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const AdvertiseMaterial = app.model.define('advertise-relation', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    sort: INTEGER,
    advertise_id:INTEGER,
    materiel_id:INTEGER
  })
  return AdvertiseMaterial;
};