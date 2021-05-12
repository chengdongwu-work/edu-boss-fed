/*
 * @Author: cdw
 * @Date: 2021-05-11 15:25:23
 * @LastEditTime: 2021-05-11 15:40:35
 * @LastEditors: cdw
 * @Description: TODO
 * @FilePath: /edu-boss-fed/test-serve/app.js
 */
const express = require('express')
const app = express()
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')

app.use(express.static(path.join(__dirname, '../dist')))

app.use('/boss', createProxyMiddleware({
  target: 'http://eduboss.lagou.com',
  changeOrigin: true
}))

app.use('/front', createProxyMiddleware({
  target: 'http://edufront.lagou.com',
  changeOrigin: true
}))

app.listen(3000, () => {
  console.log('runging')
})
