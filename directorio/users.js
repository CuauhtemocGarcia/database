const {request, response} = require('express');
const usersModel = require('../models/users');
const pool = require('../db');

const listusers = async(req = request, res = response) =>{
    let conn;
    
    try{
        conn = await pool.getConnection();
        const users = await conn.query(usersModel.getUsers, (err) => {
            if (err){
                throw err
            }
            
        });
        res.json(users);
     
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
    
}

const listuserbyid = async(req = request, res = response) =>{
    const {id} = req.params;
    if(isNaN(id)){
        res.status(400).json({msg: 'invalid ID'});
        return;
    }
    let conn;
    
    try{
        conn = await pool.getConnection();
        const [user] = await conn.query(usersModel.getbyid, [id],  (err) => {
            if (err){
                throw err
            }
            
        });
        if (!user){
            res.status(404).json({msg: 'user not found'});
            return;
        }


        res.json(user);
     
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
}

const addUser = async(req = request, res = response) =>{
    

    const {
        username,
        email,
        password,
        name,
        last_name,
        phonenumber = ``,
        road_id,
        is_active = 1

    } = req.body;


    if (!username || !email || !password || !name || !last_name || !road_id){
        res.status(400).json({msg: 'Missing Information'});
        return;
    }

    const user = [username, email, password, name, last_name, phonenumber, road_id, is_active]

    let conn;


    try{

        conn = await pool.getConnection();

        const [usernameuser] = await conn.query(
            usersModel.getByusername,
            [username],
            (err) => {if (err) throw err;}
        );
        if (usernameuser){
            res.status(400).json({msg: `User with username ${username} already exists`});
            return;
        }
      

        const [emailuser] = await conn.query(
            usersModel.getByemail,
            [email],
            (err) => {if (err) throw err;}
        );
        if (emailuser){
            res.status(400).json({msg: `User with email ${email} already exists`});
            return;
        }

        const useradded = await conn.query(usersModel.addrow, 
            [...user], (err) =>{
            if (err) throw err;
        })

        

        if (useradded.affectedRows == 0) throw new Error({message: 'Failed to add user'});
        res.json({msg: 'user added succesfully'});
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }finally{
        if(conn) conn.end();
    }
}

module.exports = {listusers, listuserbyid, addUser};