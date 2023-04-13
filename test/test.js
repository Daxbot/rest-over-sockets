const assert=require("assert");
const expect = require("chai").expect; // eslint-disable-line node/no-unpublished-require
const Restos=require("../index.js");


describe("REST methods",()=>{


    (["GET", "POST", "DELETE", "PUT", "PATCH"]).forEach((method)=>{

        it(method, async ()=>{

            let restos=new Restos();

            // Set up a route
            restos[method.toLowerCase()]("/apple/:id", (req, res)=>{

                res
                    .set('Content-Type', 'application/json')
                    .status(200)
                    .data("Apple", req.params.id, { flavor: "sweet" })
                    .send();
            });


            // Transmit a payload to the server
            await restos.receive({
                method: method,
                path: "/apple/3444"
            },(response)=>{
                assert.deepEqual(response, {"status":200,"headers":{"Content-Type":"application/json"},"data":[{"type":"Apple","id":"3444","attributes":{"flavor":"sweet"}}]});
            });

        });
    });
});

describe("Middleware",()=>{

    it("can attach", async () => {
        let restos=new Restos();

        // Set up a route
        restos.use("/apple", (req, res, next)=>{
            req.id = 1;
            return next();
        });
        restos.get("/apple/:id", (req, res)=>{
            return res
                .set('Content-Type', 'application/json')
                .status(200)
                .send({ id: req.id });
        });

        // Transmit a payload to the server
        const response = await new Promise(res => restos.receive({
            method: "GET",
            path: "/apple/3444"
        },res))

        expect(response.data.id).to.equal(1);
    });
});

describe("Parameters",()=>{

    it("params", async () => {
        let restos=new Restos();

        // Set up a route
        restos.get("/apple/:id", (req, res)=>{
            return res
                .set('Content-Type', 'application/json')
                .status(200)
                .send(req.params);
        });

        // Transmit a payload to the server
        const response = await new Promise(res => restos.receive({
            method: "GET",
            path: "/apple/3444"
        },res))

        expect(response.data.id).to.equal("3444");
    });

    it("empty query", async () => {
        let restos=new Restos();

        // Set up a route
        restos.get("/apple/:id", (req, res)=>{
            return res
                .set('Content-Type', 'application/json')
                .status(200)
                .send(req.query);
        });

        // Transmit a payload to the server
        const response = await new Promise(res => restos.receive({
            method: "GET",
            path: "/apple/3444"
        },res))

        expect(response.data).to.be.an("object");
        expect(Object.keys(response.data).length).to.equal(0);
    });

    it("query", async () => {
        let restos=new Restos();

        // Set up a route
        restos.get("/apple/:id", (req, res)=>{
            return res
                .set('Content-Type', 'application/json')
                .status(200)
                .send(req.query);
        });

        // Transmit a payload to the server
        const response = await new Promise(res => restos.receive({
            method: "GET",
            path: "/apple/3444?limit=15"
        },res))

        expect(response.data.limit).to.equal("15");
    });
});

describe("Restos class",()=>{

    describe("receive()", ()=>{

        it("throws if no callback provided",()=>{

            let r=new Restos();
            assert.rejects(
                r.receive
            );

        });

        it("returns 400 error if missing .path or .method", async ()=>{

            let r=new Restos();
            await r.receive({method: "POST"},(response)=>{

                assert.deepEqual(response, {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                    errors:
                    [ { title: 'Bad Request', detail: "Request path must be type 'string', got 'object'" } ] });
            });


            await r.receive({path: "/something"},(response)=>{

                assert.deepEqual(response, {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                    errors:
                    [ { title: 'Bad Request', detail: "Request method must be type 'string', got 'object'" } ] });
            });


        });

        it("returns 404 error if path not found",async ()=>{

            let r=new Restos();

            await r.receive({path: "/something", method: "GET"},(response)=>{

                assert.deepEqual(response, {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                    errors:
                    [ { title: 'Not Found', detail: 'The page or resource you are looking for does not exist' } ] });
            });


        });



        it("returns 500 error if route throws an exception",async ()=>{

            let r=new Restos();

            // Set up a route that will throw an error
            r.post("/throw/an/error", (req, res)=>{ // eslint-disable-line no-unused-vars

                throw new Error("This is an error");
            });

            await r.receive({path: "/throw/an/error", method: "POST"},(response)=>{

                assert.deepEqual(response, {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' },
                    errors:
                    [ { title: 'Internal Error', detail: 'This is an error' } ]
                });
            });
        });
    });
});
