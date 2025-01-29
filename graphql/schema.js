const { buildSchema } = require("graphql");

exports.schema = buildSchema(`
  type Query {
    users: [User]
    sites: [Site]
    areas: [Area]
    stations: [Station]
    inspectionTemplates: [InspectionTemplate]
  }

  type User {
    id: Int!
    name: String!
    email: String
    role: String
  }

  type Site {
    id: Int!
    name: String!
  }

  type Area {
    id: Int!
    name: String!
  }

  type Station {
    id: Int!
    name: String!
  }

  type InspectionTemplate {
    id: Int!
    result: String!
  }
`);
