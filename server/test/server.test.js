const expect  = require("expect");
const request = require("supertest");

const {app}  = require("./../server");
const {Todo} = require("./../model/todo");
const {User} = require("./../model/user");

beforeEach( done => {
    Todo.remove({}).then(() => done());
});

describe("POST /todos", () => {
    it('should create a new todo', (done) => {
        var text = "Test todo text";

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text.toBe(text));
            })
            .end((e, res) => {
                if (e) {
                    return done(e);
                }

                Todo.find().then( todos => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                }).catch( e => done(e));
            });
    });
});