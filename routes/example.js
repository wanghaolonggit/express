var express = require("express");
var router = express.Router();
var util = require("util");
var mysql = require('mysql');
var db = require('../database/mysql.js');

router.get("/status/:name", function(req, res, next) {
    //地址栏中的star_name 与 SQL 结合
    var sql = util.format(
        `select review from star_fans_status where star_id in(
            select id from star_base_info where name=%s
        )`,
        mysql.escape(req.params.name)
    );
    
    //打印SQL
    console.log(sql);

    //执行SQL，并调用回调函数
    db.query(sql, function(err, rows, fields) {
        if (err) {
            console.log("[query] - :" + err);
            res.jsonp({'success': false, 'data': {}});
            return;
        }

        if (!Object.keys(rows).length > 0) {
            res.jsonp({'success': true, 'data': {}});
            return;
        }

        res.jsonp({
            'success': true,
            // 'data': JSON.parse(rows[0])
            'data': rows
        });
    });
});

module.exports = router;

