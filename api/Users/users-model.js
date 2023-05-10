const db = require('../../data/db-config');

function getAll() {
    return db('Users as u')
                .leftJoin('Roles as r', 'u.role_id', 'r.id')
                .select('u.id',
                        'u.email',
                        'u.name',
                        'u.surname',
                        'r.name as role_name')
}

function getById(id) {
    return db('Users as u')
                .leftJoin('Roles as r', 'u.role_id', 'r.id')
                .select('u.id',
                        'u.email',
                        'u.name',
                        'u.surname',
                        'r.name as role_name')
                .where('u.id', id)
                .first();
}

function getByFilter(filter) {
    return db('Users as u')
                .leftJoin('Roles as r', 'u.role_id', 'r.id')
                .select('u.id',
                        'u.email',
                        'u.name',
                        'u.surname',
                        'u.password',
                        'r.name as role_name')
                .where(filter)
}

async function create(user) {
    const [id] = await db('Users').insert(user);
    const newUser = await getById(id); 
    return newUser;
}

function update(user,id) {
    return db('Users').where('id',id).update(user);
}

function remove(id) {
    return db('Users').where('id',id).delete();
}

module.exports = {
    getAll,
    getById,
    getByFilter,
    create,
    update,
    remove,
}