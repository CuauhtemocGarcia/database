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
}

module.exports = usersModel;