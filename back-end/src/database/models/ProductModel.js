module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(4, 2), allowNull: false },
    urlImage: { type: DataTypes.STRING, allowNull: false },
  }, {
    timestamps: false,
    tableName: 'products', 
    underscored: true,
  });

  return Product;
};