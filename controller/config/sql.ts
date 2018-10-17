const mysql = require('mysql')
import { mysqlConfig } from '.'
const pool = mysql.createPool(mysqlConfig)

interface sqlfn {
  <T>(sql: string, values?: any): Promise<T>
}

let sqlFn: sqlfn 
sqlFn = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        resolve(err)
      } else {
        connection.query(sql, values, (err, rows) => {

          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

export default sqlFn