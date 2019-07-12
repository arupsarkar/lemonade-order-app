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
    conn.query('SELECT Id, Name, Loyalty_Points__c from salesforce.Account',
      function(err, result) {
        done();
        if (err) {
          res.status(400).json({error: err.message});
        } else {
          // this will still cause jquery to display 'Record updated!'
          // eventhough it was inserted
          res.json(result);
        }
      }
    );
  })
});

router.post('/submitOrders', (req, res, next) => {
  try{
    console.log('Success: API Debug submitOrders() ', JSON.stringify(res));
    res.status(200).json({'success': 'Data saved.'})
  }catch (err) {
    console.log('Error: API Debug submitOrders() ', JSON.stringify(err));
    res.status(400).json(err)
  }
});

module.exports = router;
