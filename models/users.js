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
         *
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

    updateUser: `
         UPDATE Users
         SET 
             username = ?,
             email = ?,
             password = ?,
             name = ?,
             last_name = ?,
             phonenumber = ?,
             road_id = ?,
             is_active = ?
         WHERE
             id = ?
  `,

    deleteRow:`
       UPDATE
          Users
       SET
            is_active = 0
       WHERE
          id = ?
    `,
}

module.exports = usersModel;