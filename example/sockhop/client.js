const sock=new (require("sockhop").client)();
const client = new (require("../../lib/ROSClient.js"))(sock);

client.connect().then(()=>{

	client.send({

		method: "GET",
		path: "/apple/3444"
	},(response)=>{

		console.log(`Response: ${JSON.stringify(response)}`);
		client.disconnect();
	});
});
