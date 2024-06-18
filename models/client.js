module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define("Client", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name required",
        },
      },
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: "Dob is invalid",
        },
      },
    },
    primary_language: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Primary language required",
        },
      },
    },
    secondary_language: {
      type: DataTypes.STRING,
    },
    funding_source: {
      type: DataTypes.INTEGER,
      references: {
        model: "FundingSources",
        key: "id",
      },
      validate: {
        isInt: {
          msg: "Funding source is invalid",
        },
      },
    },
  });

  Client.associate = function (models) {
    Client.belongsTo(models.FundingSource, {
      as: "fundingSource",
      foreignKey: "funding_source",
    });
  };

  return Client;
};
