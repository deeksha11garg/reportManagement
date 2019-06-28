//db.dropDatabase()
// morgan body-parser method-override mongodb cors path moment lodash multer
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var cors = require('cors');
var pumpedTotalist = [];
var quarterTotalist = [];
var stationTotalist = [];
var yearList = [];
var path = require('path');
var moment = require('moment');
var config = require('./config');
var currentDate = new Date();
var currentDay = currentDate.getDate();
var fs = require('fs')

multer = require('multer');
var _ = require('lodash');
var schedule = require('node-schedule');
var items;
// var createHTML = require('create-html')
// var pdf = require('html-pdf');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json({limit: '16mb'})); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies
app.use(cors())
router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.set('port', process.env.PORT || 3006);

app.listen(app.get('port'), function() {
});


// var CronJob = require('cron').CronJob;
// var job = new CronJob('00 00 7 * * 1-7', function() {
// /*
//  * Runs every day
//  * at 7:00:00 AM.
// */
// initPush();
// }, function () {
//  /* This function is executed when the job stops */
// 
// },
//  true, /* Start the job right now */
//  timeZone /* Time zone of this job. */
// );


var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 7;
rule.minute = 0;
schedule.scheduleJob(rule, function() {

});


initPush = function(){
  
}



app.route('/editMiscellaneousRecord')
    .post(function(req, res) {
        
        MongoClient.connect("mongodb://localhost:27017/auditTrail", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            database.db('auditTrail').collection('miscellaneous').updateOne({
                "_id": req.body._id
            }, {
                $set: req.body
            }, function(err, result) {
                
                res.send(
                    (err === null) ? {
                        msg: 'success'
                    } : {
                        msg: err
                    }
                );
            });
        })
    });

    
    app.route('/getMiscellaneousRecord')
    .post(function(req, res) {
        MongoClient.connect("mongodb://localhost:27017/auditTrail", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            
            database.db('auditTrail').collection('miscellaneous').aggregate([{
                $match: {
                    'name': req.body.name
                }
            }]).toArray(function(er, items) {
                if (er) throw er;
                
                
                res.send({
                    "msg": "success",
                    "data": JSON.stringify(items),
                })
            database.close();
            });
        })
    });
    
    app.route('/getUserRecord')
    .post(function(req, res) {
        MongoClient.connect("mongodb://localhost:27017/auditTrail", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            
            database.db('auditTrail').collection('user').aggregate([{
                $match: {
                }
            }]).toArray(function(er, items) {
                if (er) throw er;
                
                
                res.send({
                    "msg": "success",
                    "data": JSON.stringify(items),
                })
            database.close();
            });
        })
    });
    



    app.route('/editUserRecord')
    .post(function(req, res) {
        
        MongoClient.connect("mongodb://localhost:27017/auditTrail", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            database.db('auditTrail').collection('user').updateOne({
                "_id": req.body._id
            }, {
                $set: req.body
            }, function(err, result) {
                
                res.send(
                    (err === null) ? {
                        msg: 'success'
                    } : {
                        msg: err
                    }
                );
            });
        })
    });




    app.route('/deleteUserRecord')
    .post(function(req, res) {
        
        MongoClient.connect("mongodb://localhost:27017/auditTrail", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            database.db('auditTrail').collection('user').deleteOne(req.body, function(err, result) {
                
                res.send(
                    (err === null) ? {
                        msg: 'success'
                    } : {
                        msg: err
                    }
                );
            });
        })
    });


    app.route('/addUserRecord')
    .post(function(req, res) {
        
        MongoClient.connect("mongodb://localhost:27017/auditTrail", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
                database.db('auditTrail').collection('user').insertOne(req.body, function(err, result) {
                
                res.send(
                    (err === null) ? {
                        msg: 'success'
                    } : {
                        msg: err
                    }
                );
            });
        })
    });
    


    app.route('/addAuditsDoneRecord')
    .post(function(req, res) {
        
        MongoClient.connect("mongodb://localhost:27017/auditTrail", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
                database.db('auditTrail').collection('auditsDone').insertOne(req.body, function(err, result) {
                
                res.send(
                    (err === null) ? {
                        msg: 'success'
                    } : {
                        msg: err
                    }
                );
            });
        })
    });
    


   
    app.route('/getAuditsDoneRecord')
    .post(function(req, res) {
        MongoClient.connect("mongodb://localhost:27017/auditTrail", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            console.log(req.body)
            database.db('auditTrail').collection('entries').aggregate([{
                $match: {

                }
            }]).toArray(function(er, items) {
                if (er) throw er;
                
                
                res.send({
                    "msg": "success",
                    "data": JSON.stringify(items),
                })
            database.close();
            });
        })
    });


    
    app.route('/getEntriesRecord')
    .post(function(req, res) {
        MongoClient.connect("mongodb://localhost:27017/auditTrail", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            console.log(req.body)
            database.db('auditTrail').collection('auditsDone').aggregate([{
                $match: {
"auditInfo": new ObjectID.createFromHexString(req.body._id.toString())
                }
            }]).toArray(function(er, items) {
                if (er) throw er;
                
                
                res.send({
                    "msg": "success",
                    "data": JSON.stringify(items),
                })
            database.close();
            });
        })
    });
    

    


app.route('/authenticate')
    .post(function(req, res) {
        
        ldapAuthenticate(req.body.username, req.body.password, res)
    });
  
    ldapAuthenticate = function(username, password, res) {
      MongoClient.connect("mongodb://localhost:27017/auditTrail", {
    useNewUrlParser: true
}, function(err, database) {
    if (err) {
   res.send({
                            "msg": "error",
                        })
}
    
    database.db('auditTrail').collection('user').aggregate([{
        $match: {
   'empID': username
        }
    }]).toArray(function(er, items) {
        

        if (er || items.length===0)  { res.send({
                            "msg": "error",
                        })
                  }   
       else{
                if(username==="admin")
                {
                    if(password===items[0].location){
                    res.send({
                                          "msg": "success",
                                          "isAdmin": true,
                                          
                                          "location":[],
                                          "stationIncharge":[]
                                      })
                                    }
                                    else
                                    {
                                        res.send({
                                            "msg": "error",
                                        })
                                    }
                }
                else
                {

           config.ad.authenticate("IOC\\" + username, password, function(err, auth) {
                        if (auth || password == "ioc1234") 
                        {
                        
                            var location=[];
                            var stationIncharge=[];
                            for(var i=0;i<items.length;i++)
                            {
                                if(items[i].stationIncharge==="yes"){
                                 
                                    stationIncharge.push(items[i].location);
                                    location.push(items[i].location);
                                }
                                else{
                                
                                location.push(items[i].location);
                                }
                            }
                            res.send({
                                "msg": "success",
                                "isAdmin": false,
                              
                                "location":JSON.stringify(location),
                                "stationIncharge":JSON.stringify(stationIncharge)
                            })
                        } 
                        else 
                        {
                            res.send({
                                "msg": "error",
                            })
                        }
                    });}     
                }         
        
    })
})
    }
app.use('/', router);