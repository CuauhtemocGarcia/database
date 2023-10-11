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
}

module.exports = usersModel;