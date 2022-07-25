const sock=new (require("sockhop").client)();
const client = new (require("../../lib/ROSClient.js"))(sock);


client.sockhop.connect().then(()=>{
    return client.get("/apple/3444")
}).then(response => {
    console.log(`Response: ${JSON.stringify(response)}`);
    client.sockhop.disconnect();
});
