const db = require('../data/db-config');
const request = require('supertest');
const server = require('./server');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const newUser = {
    name: "Halil",
    surname: "Dursun",
    email:    "halil@gimail.com",
    password: "1234"
}

const newAdmin = {
    name: "Erkan",
    surname: "Yolaç",
    email:    "erkan@gimail.com",
    password: "1234",
    role_id: 1
}


beforeAll(async ()=> {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async ()=> {
    await db.seed.run();
})


test('Environment is testing', ()=>{
    expect(process.env.NODE_ENV).toBe("testing");
})


describe('_______ AUTH ________', ()=> {
    describe('/REGISTER', ()=> {
        test.only('[1] registers user has no role_id successfully', async ()=>{
            const res = await request(server).post('/api/auth/register').send(newUser);
            expect(res.body.message).toMatch(/Welcome/);
        })
    })


    describe('/LOGIN', ()=> {
        let token;
        beforeEach(async ()=> {
            await request(server).post('/api/auth/register').send(newAdmin);
            const res = await request(server).post('/api/auth/login').send(newAdmin);
            token = res.body.token;
        })
        
        test.only('[2] token is valid', async ()=>{
            let userInfo;
            jwt.verify(token, JWT_SECRET, (err,decodedJWT)=>{
                if(!err){
                    userInfo = decodedJWT
                }
            })
            expect(userInfo.userId).toBe(4);
        })

        test('[3] admin user gets all users', async ()=>{
            const res = await request(server).get('/api/users/').set('authorization', token);
            expect(res.body).toHaveLength(4);
        })

        test.todo('[4] new test will come here')

        test.skip('[5] skips admin user gets all users', async ()=>{
            const res = await request(server).get('/api/users/').set('authorization', token);
            expect(res.body).toHaveLength(4);
        })
    })
})






