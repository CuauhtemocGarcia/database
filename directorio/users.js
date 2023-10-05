const {request, response} = require('express');

const listusers = (req = request, res = response) =>{
    res.json({msg: "Hola usuario, llevame con tu lider..."})
}

module.exports = {listusers};