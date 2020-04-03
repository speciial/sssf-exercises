"use strict";
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLNonNull
} = require("graphql");

const connectionType = require("../models/connectionTypeSchema");
const currentType = require("../models/currentTypeSchema");
const level = require("../models/levelSchema");
const connection = require("../models/connectionSchema");
const station = require("../models/stationSchema");

const gql_connectionType = new GraphQLObjectType({
    name: "connectionType",
    description: "Type of connection",
    fields: () => ({
        id: { type: GraphQLID },
        FormalName: { type: GraphQLString },
        Title: { type: GraphQLString }
    })
});

const gql_currentType = new GraphQLObjectType({
    name: "currentType",
    description: "Current type",
    fields: () => ({
        id: { type: GraphQLID },
        Description: { type: GraphQLString },
        Title: { type: GraphQLString }
    })
});

const gql_level = new GraphQLObjectType({
    name: "level",
    description: "Level",
    fields: () => ({
        id: { type: GraphQLID },
        Comments: { type: GraphQLString },
        IsFastChargeCapable: { type: GraphQLBoolean },
        Title: { type: GraphQLString }
    })
});

const gql_connection = new GraphQLObjectType({
    name: "connection",
    description: "Connection",
    fields: () => ({
        id: { type: GraphQLID },
        ConnectionType: {
            type: gql_connectionType,
            resolve: async (parent, args) => {
                try {
                    return await connectionType.findById(
                        parent.ConnectionTypeID
                    );
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        LevelType: {
            type: gql_level,
            resolve: async (parent, args) => {
                try {
                    return await level.findById(parent.LevelID);
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        CurrentType: {
            type: gql_currentType,
            resolve: async (parent, args) => {
                try {
                    return await currentType.findById(parent.CurrentTypeID);
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        Quantity: { type: GraphQLInt }
    })
});

const gql_geoJSON = new GraphQLObjectType({
    name: "geoJSON",
    description: "Location type",
    fields: () => ({
        id: { type: GraphQLID },
        type: { type: GraphQLString },
        coordinates: { type: new GraphQLList(GraphQLFloat) }
    })
});

const gql_station = new GraphQLObjectType({
    name: "station",
    description: "Station",
    fields: () => ({
        id: { type: GraphQLID },
        Location: { type: gql_geoJSON },
        Connections: {
            type: new GraphQLList(gql_connection),
            resolve: async (parent, args) => {
                try {
                    return await connection.find({ _id: parent.Connections });
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        Title: { type: GraphQLString },
        AddressLine1: { type: GraphQLString },
        Town: { type: GraphQLString },
        StateOrProvince: { type: GraphQLString },
        Postcode: { type: GraphQLString }
    })
});

const gql_coords = new GraphQLInputObjectType({
    name: "coord",
    description: "Set of Coordinates",
    fields: () => ({
        lat: { type: GraphQLFloat },
        lng: { type: GraphQLFloat }
    })
});

const gql_bounds = new GraphQLInputObjectType({
    name: "bounds",
    description: "Query bounds for geo spatial query",
    fields: () => ({
        _southWest: { type: gql_coords },
        _northEast: { type: gql_coords }
    })
});

const gql_connectioninput = new GraphQLInputObjectType({
    name: "connectioninput",
    fields: () => ({
        ConnectionTypeID: { type: GraphQLID },
        CurrentTypeID: { type: GraphQLID },
        LevelID: { type: GraphQLID },
        Quantity: { type: GraphQLInt }
    })
});

const gql_locationinput = new GraphQLInputObjectType({
    name: "locationinput",
    fields: () => ({
        type: { type: GraphQLString, defaultValue: "Point" },
        coordinates: {
            type: new GraphQLList(GraphQLFloat)
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        stations: {
            type: new GraphQLList(gql_station),
            description: "Gets list of stations based on parameters",
            args: {
                start: { type: GraphQLInt, defaultValue: 0 },
                limit: { type: GraphQLInt, defaultValue: 10 },
                bounds: { type: gql_bounds, defaultValue: null }
            },
            resolve: async (parent, args) => {
                try {
                    if (args.bounds != null) {
                        const bottomLeft = args.bounds._southWest;
                        const topRight = args.bounds._northEast;
                        const polygon = {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [bottomLeft.lng, topRight.lat],
                                    [topRight.lng, topRight.lat],
                                    [topRight.lng, bottomLeft.lat],
                                    [bottomLeft.lng, bottomLeft.lat],
                                    [bottomLeft.lng, topRight.lat]
                                ]
                            ]
                        };

                        return await station
                            .find({
                                Location: {
                                    $geoWithin: {
                                        $geometry: polygon
                                    }
                                }
                            })
                            .skip(args.start)
                            .limit(args.limit);
                    } else {
                        return await station
                            .find({})
                            .skip(args.start)
                            .limit(args.limit);
                    }
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        station: {
            type: gql_station,
            description: "Get a station by id",
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: async (parent, args) => {
                try {
                    return await station.findById(args.id);
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        connectiontypes: {
            type: new GraphQLList(gql_connectionType),
            description: "Gets all connection types",
            resolve: async (parent, args) => {
                try {
                    return await connectionType.find();
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        currenttypes: {
            type: new GraphQLList(gql_currentType),
            description: "Gets all current types",
            resolve: async (parent, args) => {
                try {
                    return await currentType.find();
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        leveltypes: {
            type: new GraphQLList(gql_level),
            description: "Gets all level types",
            resolve: async (parten, args) => {
                try {
                    return await level.find();
                } catch (error) {
                    return new Error(error);
                }
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Mutations...",
    fields: {
        addStation: {
            type: gql_station,
            description: "Add a new station",
            args: {
                Connections: {
                    type: new GraphQLNonNull(
                        new GraphQLList(gql_connectioninput)
                    )
                },
                Location: {
                    type: new GraphQLNonNull(gql_locationinput)
                },
                Title: { type: new GraphQLNonNull(GraphQLString) },
                AddressLine1: { type: new GraphQLNonNull(GraphQLString) },
                Town: { type: new GraphQLNonNull(GraphQLString) },
                StateOrProvince: { type: new GraphQLNonNull(GraphQLString) },
                Postcode: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args, { req, res, checkAuth }) => {
                try {
                    checkAuth(req, res);
                    var connections = [];
                    await args.Connections.map(conn => {
                        const newConnection = new connection(conn);
                        newConnection.save();
                        connections.push(newConnection);
                    });
                    args.Connections = connections;
                    const newStation = new station(args);
                    return await newStation.save();
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        modifyStation: {
            type: gql_station,
            description: "Modify an existing station",
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                Connections: {
                    type: new GraphQLList(gql_connectioninput)
                },
                Location: {
                    type: gql_locationinput
                },
                Title: { type: GraphQLString },
                AddressLine1: { type: GraphQLString },
                Town: { type: GraphQLString },
                StateOrProvince: { type: GraphQLString },
                Postcode: { type: GraphQLString }
            },
            resolve: async (parent, args, { req, res, checkAuth }) => {
                try {
                    checkAuth(req, res);

                    const oldStation = await station.findById(args.id);
                    await oldStation.Connections.map(async connectionID => {
                        await connection.findByIdAndDelete(connectionID);
                    });

                    var updatedConnections = await Promise.all(
                        args.Connections.map(async conn => {
                            const c = new connection(conn);
                            await c.save();
                            return c._id;
                        })
                    );
                    args.Connections = updatedConnections;

                    const updatedStation = await station.findByIdAndUpdate(
                        { _id: args.id },
                        args,
                        { new: true },
                        (error, doc) => {
                            if (error) {
                                console.log(error);
                                return new Error(error);
                            }
                        }
                    );
                    return updatedStation;
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        deleteStation: {
            type: gql_station,
            description: "Delete a station",
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: async (parent, args, { req, res, checkAuth }) => {
                try {
                    checkAuth(req, res);
                    const delStation = await station.findByIdAndDelete(args.id);
                    await delStation.Connections.map(conn => {
                        connection.findByIdAndDelete(conn);
                    });
                    return delStation;
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
