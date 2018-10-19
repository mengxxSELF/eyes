/*
 * @Author: 孟闲闲 
 * @Date: 2018-10-17 16:29:29 
 * @Last Modified by: mxx
 * @Last Modified time: 2018-10-19 19:09:49
 */
import axios from 'axios'

interface LoginFn {
  (name: string, pwd: string): any
}

let userLogin: LoginFn
userLogin = (name: string, pwd: string) => {
  return new Promise((resolve, reject) => {
    axios.get(`/login?name=${name}&password=${pwd}`)
      .then(function (response) {
        console.log(response)
        const { data } = response
        resolve(data)
      })
      .catch(function (error) {
        console.log(error)
      })
  })
} 

let userRegister: LoginFn
userRegister = (name: string, pwd: string) => {
  return new Promise((resolve, reject) => {
    axios.get(`/register?name=${name}&password=${pwd}`)
      .then(function (response) {
        // console.log(response)
        const { data } = response
        resolve(data)
      })
      .catch(function (error) {
        console.log(error)
      })
  })
} 

export {
  userLogin,
  userRegister
}