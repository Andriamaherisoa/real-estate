const { buildSchema } = require('graphql');

module.exports = buildSchema(`
enum Status {
    available
    pending
    sold
}

enum AnnonceType {
    rental,
    sale
}

scalar Date

type Annonce {
    _id: ID!
    title: String!
    type: AnnonceType!
    status: Status!
    published: Boolean!
    price: Float!
    description: String!
    availabilityDate: Date
    assessments: [Assessment!]!
}

input AnnonceInput {
    title: String!
    type: AnnonceType!
    status: Status!
    published: Boolean!
    price: Float!
    description: String!
    availabilityDate: Date    
}

input UpdateAnnonceInput {
    title: String!
    type: AnnonceType!
    status: Status!
    published: Boolean!
    price: Float!
    description: String!
    availabilityDate: Date
}  

type Assessment {
    _id: ID!
    text: String!
    annonceId: ID!
    answers: [Answer!]!    
}

input AssessmentInput {
    text: String!
    annonceId: ID!
}

input UpdateAssessmentInput {
    text: String!
} 

type Answer {
    _id: ID!
    assessment: Assessment!
    text: String!
}

type User {
    username: String!
    password: String!    
}

type Query {
    annonces: [Annonce!]!
    getAnnonceById(annonceId: ID!): Annonce!
    assessments: [Assessment!]!        
    answers: [Answer!]!
    users: [User!]!
}

type Mutation {    
    createAnnonce(annonce: AnnonceInput): Annonce!    
    deleteAnnonce(annonceId: ID!): Annonce!   
    updateAnnonce(annonceId: ID!, data: UpdateAnnonceInput!): Annonce! 
    addAssessment(assessment: AssessmentInput!): Annonce
    deleteAssessment(annonceId: ID!, assessmentId: ID!): Annonce!
    updateAssessment(annonceId: ID!, assessmentId: ID!, data: UpdateAssessmentInput!): Annonce!
}

schema {
    query: Query 
    mutation: Mutation
}
`);