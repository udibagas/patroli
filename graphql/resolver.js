const { User, Area, Station, InspectionTemplate } = require("../models");

exports.resolver = {
  users: async () => await User.findAll({ order: [["name", "asc"]] }),
  areas: async () => await Area.findAll({ order: [["name", "asc"]] }),
  stations: async () => await Station.findAll({ order: [["code", "asc"]] }),
  inspectionTemplates: async () => {
    return await InspectionTemplate.findAll({ order: [["result", "asc"]] });
  },
};
