const server=new (require("sockhop").server)();
const restos=new (require("../../"))();

server.listen();
server.on("request", (req,res,meta)=> {
    if ( req.type !== "ROSRequest" ) return; // ignore other types
    restos.receive(req.data, (obj) => res.send(obj))
});


restos.get("/apple/:id", (req, res)=>{
        res
        .set('Content-Type', 'text/json')
        .status(200)
        .json([{ type:"Apple", id:req.params.id, attributes:{ flavor: "sweet" }}])
});

