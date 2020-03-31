// schema/schema.js
"use strict";
const _ = require("lodash");
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} = require("graphql");

const category = require("../models/categorySchema");
const species = require("../models/speciesSchema");
const animal = require("../models/animalSchema");

const animalType = new GraphQLObjectType({
    name: "animal",
    description: "Animal name and species",
    fields: () => ({
        id: { type: GraphQLID },
        animalName: { type: GraphQLString },
        species: {
            type: speciesType,
            resolve: async (parent, args) => {
                try {
                    return await species.findById(parent.species);
                } catch (error) {
                    return new Error(error);
                }
            }
        }
    })
});

const speciesType = new GraphQLObjectType({
    name: "species",
    description: "Species name and category",
    fields: () => ({
        id: { type: GraphQLID },
        speciesName: { type: GraphQLString },
        category: {
            type: categoryType,
            resolve: async (parent, args) => {
                try {
                    return category.findById(parent.category);
                } catch (error) {
                    return new Error(error);
                }
            }
        }
    })
});

const categoryType = new GraphQLObjectType({
    name: "category",
    description: "Category name",
    fields: () => ({
        id: { type: GraphQLID },
        categoryName: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        animals: {
            type: new GraphQLList(animalType),
            description: "Get all animals",
            resolve: async (parent, args) => {
                try {
                    return await animal.find();
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        animal: {
            type: animalType,
            args: { id: { type: GraphQLID } },
            resolve: async (parent, args) => {
                try {
                    return await animal.findById(args.id);
                } catch (error) {
                    return new Error(error);
                }
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "MutationType",
    description: "Mutations...",
    fields: {
        addCategory: {
            type: categoryType,
            description: "Add animal category like Fish, Mammal, etc.",
            args: {
                categoryName: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args, { req, res, checkAuth }) => {
                try {
                    checkAuth(req, res);
                    const newCategory = new category(args);
                    return await newCategory.save();
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        addSpecies: {
            type: speciesType,
            description: "Add animal species",
            args: {
                speciesName: { type: new GraphQLNonNull(GraphQLString) },
                category: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: async (parent, args, { req, res, checkAuth }) => {
                try {
                    checkAuth(req, res);
                    const newSpecies = new species(args);
                    return await newSpecies.save();
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        addAnimal: {
            type: animalType,
            description: "Add an animal",
            args: {
                animalName: { type: new GraphQLNonNull(GraphQLString) },
                species: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: async (parent, args, { req, res, checkAuth }) => {
                try {
                    checkAuth(req, res);
                    const newAnimal = new animal(args);
                    return await newAnimal.save();
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        modifyAnimal: {
            type: animalType,
            description: "Modify an animal",
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                animalName: { type: GraphQLString },
                species: { type: GraphQLID }
            },
            resolve: async (parent, args, { req, res, checkAuth }) => {
                try {
                    checkAuth(req, res);
                    return await animal.findByIdAndUpdate(args.id, args, {
                        new: true
                    });
                } catch (error) {
                    return new Error(error);
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
