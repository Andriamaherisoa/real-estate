const { GraphQLScalarType } = require('graphql');

const Annonce = require('./../../models/annonce');
const Assessment = require('../../models/assessment');
const Answer = require('../../models/answer');
const User = require('./../../models/user');

module.exports = {
    annonces: async () => {
        try {
            const annonces = await Annonce.find();
            if(!annonces) {                
                throw new Error('Empty annonces found!');                
            }            
            return annonces;            
        }catch(error) {
            throw error;
        }
    },
    getAnnonceById: async ({ annonceId }) => {        
        try {
            const annonce = await Annonce.findById(annonceId);
            if(!annonce) {
                throw new Error('Empty annonce found!');
            }
            
            return annonce;            
        }catch(error) {
            throw error;
        }
    },
    assessments: async () => {
        try {
            const assessments = await Assessment.find();
            return assessments.map(a => {
                return {
                    ...a._doc,
                    _id: a.id,
                    createdAt: new Date(a._doc.createdAt).toISOString(),                    
                }
            });
        }catch(error) {
            throw error;
        }
    },         
    answers: async () => {
        try {
            const answers = await Answer.find();
            return answers.map(a => {
                return {
                    ...a._doc,
                    _id: a.id,
                    createdAt: new Date(a._doc.createdAt).toISOString(),                    
                }
            });
        }catch(error) {
            throw error;
        }
    }, 
    users: async () => {
        try {
            const users = await User.find();
            return users.map(user => {
                return {
                    ...user._doc,
                    _id: a.id,
                    createdAt: new Date(a._doc.createdAt).toISOString(),                    
                }
            });
        }catch(error) {
            throw error;
        }
    },
    createAnnonce: async args => {        
        try {            
            const annonce = new Annonce({
                ...args.annonce
            });
            const newAnnonce = await annonce.save();
            return {
                ...newAnnonce._doc, 
                _id: newAnnonce.id
            };
        }catch(error) {
            throw error;
        }
    },
    deleteAnnonce: async args => {        
        try {
            const deletedAnnonce = await Annonce.findByIdAndDelete(args.annonceId);
            if(!deletedAnnonce) {
                throw new Error("Annonce not found!");
            }

            return deletedAnnonce;
        } catch(error) {
            throw error;
        }              
    },
    updateAnnonce: async args => {        
        try {
            const { annonceId, data } = args;
            const updatedAnnonce = await Annonce.findByIdAndUpdate(annonceId, data, { new: true });
            if(!updatedAnnonce) {
                throw new Error("Annonce not found!");
            }

            return updatedAnnonce;
        } catch(error) {
            throw error;
        }
    },
    addAssessment: async ({ assessment }) => {                                
        try {
            const annonce = await Annonce.findById(assessment.annonceId);            

            if(!annonce) {                
                throw new Error('Annonce not found!');
            }            

            annonce.assessments.push({ 
                ...assessment,
                annonceId: annonce._id,
                answers: []
            });            
            const newAnnonce = await annonce.save();                                    
            return newAnnonce;
        } catch(error) {
            throw error;
        }        
    },
    deleteAssessment: async ({ annonceId, assessmentId }) => {        
        try {
            let updatedAnnonce = await Annonce.findById(annonceId);
            if(!updatedAnnonce) {
                throw new Error("Annonce not found!");
            }
            const index = updatedAnnonce.assessments.findIndex(q => q._id === assessmentId);

            if(index === -1) {
                throw new Error("Assessment not found!");
            }

            updatedAnnonce.assessments.splice(index, 1);
            await updatedAnnonce.save();
            return updatedAnnonce;
        } catch(error) {
            throw error;
        }   
    },
    updateAssessment: async ({ annonceId, assessmentId, data }) => {        
        try {   
            let updatedAnnonce = await Annonce.findById(annonceId);     
            if(!updatedAnnonce) {
                throw new Error("Annonce not found!");
            }    
            const index = updatedAnnonce.assessments.updateOne({
                _id: assessmentId
            }, {
                ...data
            })
            if(index === -1) {
                throw new Error("Assessment not found!");
            }            
            updatedAnnonce.assessments[index] = {
                ...updatedAnnonce.assessments[index],
                ...data
            };            
            await updatedAnnonce.save();                        
            return updatedAnnonce;
        } catch(error) {
            throw error;
        }
    },
    resolverMap : {
        Date: new GraphQLScalarType({
          name: 'Date',
          description: 'Date custom scalar type',
          parseValue(value) {
            return new Date(value); // value from the client
          },
          serialize(value) {
            return value.getTime(); // value sent to the client
          },
          parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
              return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
          },
        }),
    }    
}