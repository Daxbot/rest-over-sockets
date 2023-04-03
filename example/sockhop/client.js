const sock=new (require("sockhop").client)();
const client = (require("../../lib/ROSClient.js")).sockhop(sock);


sock.connect().then(()=>{
    return client.get("/apple/3444")
}).then(response => {
    console.log(`Response: ${JSON.stringify(response)}`);
    sock.disconnect();
});
