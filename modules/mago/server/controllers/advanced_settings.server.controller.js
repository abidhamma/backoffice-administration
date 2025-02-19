'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    logHandler = require(path.resolve('./modules/mago/server/controllers/logs.server.controller')),
    winston = require('winston'),
    db = require(path.resolve('./config/lib/sequelize')).models,
    merge = require('merge'),
    DBModel = db.advanced_settings;

/**
 * Create
 */
exports.create = function(req, res) {

    logHandler.add_log(req.token.id, req.ip.replace('::ffff:', ''), 'created', JSON.stringify(req.body));
    req.body.company_id = req.token.company_id; //save record for this company
    DBModel.create(req.body).then(function(result) {
        if (!result) {
            return res.status(400).send({message: 'fail create data'});
        } else {
            return res.jsonp(result);
        }
    }).catch(function(err) {
        winston.error("Creating a setting record failed with error: ", err);
        return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
        });
    });
};

/**
 * Show current
 */
exports.read = function(req, res) {
    if(req.advancedsettings.company_id === req.token.company_id) res.json(req.advancedsettings);
    else return res.status(404).send({message: 'User not authorized to access these data'});
};

/**
 * Update
 */
exports.update = function(req, res) {

    if(req.advancedsettings.company_id === req.token.company_id){
        var updateData = req.advancedsettings;

        var new_advancedsetting = {}; //temporary timestamps will be stored here
        new_advancedsetting = merge(req.body, new_advancedsetting); //merge values left @req.body with values stored @temp object into a new object

        updateData.updateAttributes(new_advancedsetting).then(function(result) {
            req.app.locals.advancedsettings[result.id - 1] = result.toJSON(); //refresh advanced settings in app memory
            logHandler.add_log(req.token.id, req.ip.replace('::ffff:', ''), 'created', JSON.stringify(new_advancedsetting), req.token.company_id); //write new values in logs
            res.json(result);
            return null;
        }).catch(function(err) {
            winston.error("Updating a setting record failed with error: ", err);
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        });
    }
    else{
        res.status(404).send({message: 'User not authorized to access these data'});
    }

};

/**
 * Delete
 */
exports.delete = function(req, res) {
    var deleteData = req.advancedsettings;

    DBModel.findById(deleteData.id).then(function(result) {
        if (result) {
            if (result && (result.company_id === req.token.company_id)) {
                result.destroy().then(function() {
                    return res.json(result);
                }).catch(function(err) {
                    winston.error("Deleting a setting record failed with error: ", err);
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                });
                return null;
            }
            else{
                return res.status(400).send({message: 'Unable to find the Data'});
            }
        } else {
            return res.status(400).send({
                message: 'Unable to find the Data'
            });
        }
    }).catch(function(err) {
        winston.error("Finding a setting record failed with error: ", err);
        return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
        });
    });
};

/**
 * List
 */
exports.list = function(req, res) {

    var qwhere = {},
        final_where = {},
        query = req.query;

    //start building where
    final_where.where = qwhere;
    if(parseInt(query._start)) final_where.offset = parseInt(query._start);
    if(parseInt(query._end)) final_where.limit = parseInt(query._end)-parseInt(query._start);
    if(query._orderBy) final_where.order = query._orderBy + ' ' + query._orderDir;
    final_where.include = [];
    //end build final where

    final_where.where.company_id = req.token.company_id; //return only records for this company

    DBModel.findAndCountAll(

        final_where

    ).then(function(results) {
        if (!results) {
            return res.status(404).send({
                message: 'No data found'
            });
        } else {

            res.setHeader("X-Total-Count", results.count);
            res.json(results.rows);
        }
    }).catch(function(err) {
        winston.error("Getting a list of the advanced settings failed with error: ", err);
        res.jsonp(err);
    });
};

/**
 * middleware
 */
exports.dataByID = function(req, res, next, id) {

    if ((id % 1 === 0) === false) { //check if it's integer
        return res.status(404).send({
            message: 'Data is invalid'
        });
    }

    DBModel.find({
        where: {
            id: id
        },
        include: []
    }).then(function(result) {
        if (!result) {
            return res.status(404).send({
                message: 'No data with that identifier has been found'
            });
        } else {
            req.advancedsettings = result;
            next();
            return null;
        }
    }).catch(function(err) {
        winston.error("Getting a specific setting failed with error: ", err);
        return next(err);
    });

};