// 打造一个可以链接数据库的方法

const mysql = require('mysql2/promise');
const { database } = require('../config/index.js');

// 创建连接池
const pool = mysql.createPool({
    host: database.HOST,
    user: database.USERNAME,
    password: database.PASSWORD,
    database: database.DATABASE,
    port: database.PORT
}); 

// 封装一个可以连接数据库的方法
const allService = {
    async query(sql) {
        try {
            // 从连接池中获取一个连接
            const connection = await pool.getConnection();
            // 对连接执行相关操作
            const [rows, fields] = await connection.query(sql);        
            // 释放连接
            connection.release();
            // 返回查询结果
            return Promise.resolve(rows);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

// 登录
const userLogin = (username, password) => {
    const _sql = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
    return allService.query(_sql);
}

module.exports = {
    allService,
    userLogin
}