const { createServer } = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT;
const hostname = "selectr.ca";

app.prepare().then(() => {
	createServer((req, res) => {
		if (!dev && req.headers["x-forwarded-proto"] != "https") {
			res.writeHead(302, {
				Location: `https://${hostname}${req.url}`,
			});
			res.end();
		} else {
			handle(req, res);
		}
	}).listen(port, () => {
		console.log(`Ready on port ${port}`);
	});
});
