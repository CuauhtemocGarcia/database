const usersModel = {
    getUsers: `
    SELECT 
    * 
    FROM 
    Users`,
    
    getbyid:`
    SELECT
    *
    FROM
    Users
    WHERE
    id= ?
    `,
    addrow:`
    INSERT INTO
       Users(
        username,
        email,
        password,
        name,
        last_name,
        phonenumber,
        road_id,
        is_active

       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    getByusername:`
    SELECT 
         id
     FROM
     Users
     WHERE
     username= ?
    `,
    getByemail:`
    SELECT
        id
    FROM
        Users
    WHERE
       email= ?
    `,
}

module.exports = usersModel;