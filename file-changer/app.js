'use strict';

const net = require('net');
const socket = new net.Socket();

let config = {
  port: 3000,
  host: 'localhost',
};

const fs = require('fs');
const util = require('util');
const faker = require('faker');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

//= require('../file-changer/data/data.txt')

/**
 * this is async/await function to read,write and save data after 
 * it has been altered with faker lorem sentence 
 * @param {string} path  it takes the path for text file to read
 */
socket.on('connect', () =>{
  console.log('app.js connected');
});

const alterFile = async() => {
  try {
    await readFile('');
    //console.log(contents);
    await writeFile(file, faker.lorem.sentence());
    console.log(`${file} saved`);
    //console.log(contents); 
  } catch (error) {
    throw error;
  }
};



let file = process.argv.slice(2).shift();
alterFile(file);



module.exports= alterFile;





