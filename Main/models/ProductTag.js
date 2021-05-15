const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns id, product_id,& tag_id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // This references the `product` model, which we set in `Product.js` as its `modelName` property

    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id",
      },
      // This references the `tag` model, which we set in `Tag`.js` as its `modelName` property

      tag_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "tag",
          key: "id",
        },
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

module.exports = ProductTag;
