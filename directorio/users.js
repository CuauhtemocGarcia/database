const {request, response} = require('express');
const bcrypt = require('bcrypt');
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
    
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = [username, email, passwordHash, name, last_name, phonenumber, road_id, is_active]

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

/*/Mi modificacion//18-10-2023

const updateUser = async (req, res) => {
    const { id } = req.params;
    const userData = req.body; // actualizacion de datos
  
    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json({ msg: 'No data provided for update' });
    }
  
    let conn;
    try {
      conn = await pool.getConnection();
  
      // Verificacion
      const [existingUser] = await conn.query(usersModel.getbyid, [id]);
      if (!existingUser) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Realiza las validaciones
      
      if (userData.username) {
        const [existingUserByUsername] = await conn.query(
          usersModel.getByusername,
          [userData.username]
        );
        if (existingUserByUsername && existingUserByUsername.id !== id) {
          return res.status(409).json({ msg: 'Username already in use' });
        }
      }
      if (userData.email) {
        const [existingUserByEmail] = await conn.query(
          usersModel.getByemail,
          [userData.email]
        );
        if (existingUserByEmail && existingUserByEmail.id !== id) {
          return res.status(409).json({ msg: 'Email already in use' });
        }
      }
  
      // Realizacion de cambios
      const allowedFields = ['username', 'email', 'password', 'name', 'last_name', 'phonenumber', 'road_id', 'is_active'];
      const updateData = {};
  
      allowedFields.forEach((field) => {
        if (userData[field] !== undefined) {
          updateData[field] = userData[field];
        }
      });
  
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ msg: 'No valid fields to update' });
      }
  
      // utiliza la consultas
      const result = await conn.query(
        usersModel.updateUser,
        [
          updateData.username,
          updateData.email,
          updateData.password, // Actualizar contraseña
          updateData.name,
          updateData.last_name,
          updateData.phonenumber,
          updateData.road_id,
          updateData.is_active,
          id
        ]
      );
  
      if (result.affectedRows === 0) {
        return res.status(500).json({ msg: 'Failed to update user' });
      }
  
      return res.json({ msg: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    } finally {
      if (conn) conn.end();
    }
  };
  
  //HASTA AQUI MI TERMINACION./*/
//UPDATEUSERS//
const updateUser = async (req, res)=>{
  const {
      username,
      email,
      password,
      name,
      last_name,
      phonenumber,
      road_id,
      is_active ,
  } = req.body;

const {id} = req.params;
let newUserData=[
  username,
  email,
  password,
  name,
  last_name,
  phonenumber,
  road_id,
  is_active   
];
let conn;
try{
  conn = await pool.getConnection();
const [userExists] = await conn.query(
  usersModel.getbyid,
  [id],
  (err) => {if (err) throw err;}
);
if (!userExists || userExists.id_active === 0){
  res.status(404).json({msg:'User not found'});
  return;
}
//24-10-2023//
const [usernameUser] = await conn.query(
  usersModel.getByusername,
  [username],
  (err) => {if (err) throw err;}
);
if (usernameUser){
  res.status(409).json({msg:`User with username ${username} already exists`});
  return;
}

const [emailUsers] = await conn.query(
  usersModel.getByemail,
  [email],
  (err)=>{if (err) throw err;}
);
if (emailUsers) {
  res.status(409).json({msg: `USER WHTH EMAIL ${email} already exists`});
  return;
}


const oldUserData = [
  userExists.username,
  userExists.email,
  userExists.password,
  userExists.name,
  userExists.last_name,
  userExists.phonenumber,
  userExists.road_id,
  userExists.is_active  
];

newUserData.forEach((userData, index)=> {
  if (!userData){
      newUserData[index] = oldUserData[index];
  }
})

const userUpdate = await conn.query(
  usersModel.updateUser,
  [...newUserData, id],
  (err) => {if (err) throw err;}
);
if(userUpdate.affecteRows === 0){
  throw new Error ('User not updated');
}
res.json({msg:'User updated successfully'})
}catch (error){
      console.log(error);
      res.status(500).json(error);
  } finally{
      if (conn) conn.end();
  }
};
//termina aqui

const deleteuser = async(req = request, res = response) =>{
    let conn;
    const {id} = req.params;

   

    try{
        conn = await pool.getConnection();
        
        const [userExist] = await conn.query(
            usersModel.getbyid,
            [id],
            (err) => {throw err; }
        )
        if (!userExist || userExist.is_active == 0){
            res.status(404).json({msg: 'USER NOT FOUND'})
            return;
        }
    
        const userDeleted = await conn.query(
            usersModel.deleteRow,
            [id],
            (err) => {if (err) throw err;}
        )
        if(userDeleted.affectedRows == 0){
            throw new Error({msg: 'Failed to delete user'})
        };
    
        res.json({msg: 'USER DELETED SUCCESFULLY'});

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }finally{
        if (conn) conn.end();
    }
}
module.exports = {listusers, listuserbyid, addUser, deleteuser, updateUser};