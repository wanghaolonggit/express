var mysql = require('mysql')
var dbConf = require('../conf/db.js')
var pool = mysql.createPool(dbConf.mysql[process.env.NODE_ENV])
pool.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});

var db = {
    query: function(sql, options, callback) {
        pool.getConnection(function(err, conn) {
            if (err) {
                console.log('pool getconnection failed')
                callback(err, null, null);
            } else {
                conn.query(sql, options, function(err, results, fields) {
                    // 注意：网上有例子是在这里release connection to connection pool，但是放在这里面不会被释放.
                    // 因为这个function的执行是在router那边了，
                    // 当这样连接池的连接数就会随着请求的次数增加而被占满，那么后续的请求在连数据库时就拿不到想要的连接
                    // conn.release(); 
                    callback(err, results, fields)
                })
                conn.release();
            }
        })
    }
}

module.exports = db
