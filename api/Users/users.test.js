const User = require('./users-model');
const db = require('../../data/db-config');


beforeAll(async ()=> {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async ()=> {
    await db.seed.run();
})


test('sanity check', ()=>{
    expect(true).toBe(true);
})


describe('_______ GETALL ________', ()=> {
    let users;
    beforeEach(async ()=> {
        users = await User.getAll();
    })
    test('[1] gets all users', async ()=>{
        expect(users.length).toBe(3);
        expect(users).toHaveLength(3);
        expect(users[0].name).toMatch(/mu/);
        expect(users[0]).toEqual({"email": "timur@pizza.com",
                                "id": 1,
                                "name": "Timur",
                                "role_name": "Admin",
                                "surname": "Egemen",
                                });
        expect(users[0]).toMatchObject({"email": "timur@pizza.com",
                                    "id": 1,
                                    "name": "Timur",
                                    "surname": "Egemen",
                                    });
    })

    test('[2] gets Emre users', async ()=>{
        expect(users[1].name).toMatch(/mr/);
        expect(users[1]).toEqual({"email": "emre@pizza.com",
                                "id": 2,
                                "name": "Emre",
                                "role_name": "User",
                                "surname": "Şahiner",
                                });
        expect(users[1]).toMatchObject({"email": "emre@pizza.com",
                                    "id": 2,
                                    "name": "Emre",
                                    "surname": "Şahiner",
                                    });
    })

    test('[3] gets Erdem users', async ()=>{
        expect(users[2].name).toMatch(/rd/);
        expect(users[2]).toEqual({"email": "erdem@pizza.com",
                                "id": 3,
                                "name": "Erdem",
                                "role_name": "User",
                                "surname": "Günay",
                                });
        expect(users[2]).toMatchObject({"email": "erdem@pizza.com",
                                    "id": 3,
                                    "name": "Erdem",
                                    "surname": "Günay",
                                    });
    })
})


describe('_______ GETBYID ________', ()=> {
    test('[4] gets all users', async ()=>{
        const user = await User.getById(1);
        expect(user.name).toMatch(/mu/);
        expect(user).toEqual({"email": "timur@pizza.com",
                                "id": 1,
                                "name": "Timur",
                                "role_name": "Admin",
                                "surname": "Egemen",
                                });
        expect(user).toMatchObject({"email": "timur@pizza.com",
                                    "id": 1,
                                    "name": "Timur",
                                    "surname": "Egemen",
                                    });
    })
})

