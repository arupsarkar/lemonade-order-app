const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const pg = require('pg');
const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({
  connectionString: connectionString,
});

router.use(bodyParser.urlencoded({
  extended: true
}));

router.use(bodyParser.json());
/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/getAccounts', (req, res, next) => {

  pool.connect(function (err, conn, done){
    // watch for any connect issues
    if (err) console.log(err);
    conn.query('SELECT Id, sfid, name, loyalty_points__c from salesforce.Account',
      function(err, result) {
        done();
        if (err) {
          res.status(400).json({error: err.message});
        } else {
          res.json(result.rows);
        }
      }
    );
  })
});

router.post('/submitOrders', (req, res, next) => {
  pool.connect(function (err, conn, done){
    // watch for any connect issues
    if (err) console.log(err);
    conn.query('INSERT INTO salesforce.Drink_Order__c (Account__c, Flavor__c, Size__c, Price__c) VALUES ($1, $2, $3, $4)',
      [req.body.sfid.trim(), req.body.flavor.trim(), req.body.size.trim(), req.body.price.trim()],
      function(err, result) {
        done();
        if (err) {
          res.status(400).json({error: err.message});
        } else {
          res.json(result);
        }
      }
    );
  })
});

module.exports = router;
