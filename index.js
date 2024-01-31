
const app = require("./app");
const server = require("http").Server(app);
server.listen(process.env.APP_PORT, () => {
	console.log(`server running ${process.env.APP_PORT}`);
});
