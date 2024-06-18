module.exports = (sequelize, DataTypes) => {
  const FundingSource = sequelize.define("FundingSource", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required",
        },
      },
    },
  });

  FundingSource.associate = function (models) {
    FundingSource.hasMany(models.Client, {
      as: "clients",
      foreignKey: "funding_source",
    });
  };

  return FundingSource;
};
