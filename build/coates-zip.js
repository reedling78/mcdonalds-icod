const fs = require("fs");
const archiver = require("archiver");
const cheerio = require("cheerio");
const pretty = require("pretty");

module.exports = class CoatesZip {
	constructor(options) {
		this.options = options;
	}

	apply(compiler) {
		if (compiler.hooks) {
			const plugin = { name: "CoatesZip" };
			compiler.hooks.afterEmit.tapAsync(plugin, this.afterEmit.bind(this));
		} else {
			compiler.plugin("after-emit", this.afterEmit.bind(this));
		}

		compiler.plugin("done", () => {
			console.log("\n Coates Zip plugin done!");
		});
	}

	afterEmit(compilation, cb) {
		this.start();

		cb();
	}

	async start() {
		const { dist, zip, screens } = this.options;

		// create output folder
		if (!fs.existsSync(zip.path)) {
			fs.mkdirSync(zip.path);
		}

		// create the ocore zip
		this.createCoreZip(dist.content, zip.path, zip.core);

		try {
			let indexFile = await this.readIndexFile(dist.index);

			var $ = cheerio.load(indexFile);

			screens.list.forEach(screen => {
				const redirec = `<script id="redirect">
                          window.location.href = "${screen.url}";
                          window.location.search.replace('orientation=left', '');
                        </script>`;

				if ($("body").find("#redirect").length > 0) {
					$("#redirect").replaceWith(redirec);
				} else {
					$("#app").after(redirec);
				}

				if (screens.alias) {
					screen.folderName = `${screens.alias}-${screen.folderName}`;
				}

				this.createScreenZip(zip.path, screen.folderName, pretty($.html()));
			});
		} catch (err) {
			console.log(err);
		}
	}

	readIndexFile(url) {
		return new Promise((resolve, reject) => {
			fs.readFile(url, "utf8", (err, data) => {
				if (err) {
					reject(err);
				}
				resolve(data);
			});
		});
	}

	createCoreZip(from, outputPath, coreName) {
		// set the output folder
		const output = fs.createWriteStream(`${outputPath}/${coreName}.zip`);
		const archive = archiver("zip", { zlib: { level: 9 } });

		archive.pipe(output);

		archive.append(this.getCoreIndex(), { name: "/index.html" });

		// copy core files to inside the corePath specified
		archive.directory(from, false);

		archive.finalize();
	}

	createScreenZip(outputPath, folderName, template) {
		const output = fs.createWriteStream(`${outputPath}/${folderName}.zip`);
		const archive = archiver("zip");

		output.on("close", () => this.archiveOnClose(archive));

		output.on("end", this.archiveOnEnd);

		archive.on("warning", err => this.archiveOnWarning(err));

		archive.on("error", err => this.archiveOnError(err));

		archive.pipe(output);

		archive.append(template, { name: "index.html" });

		archive.finalize();
	}

	archiveOnClose(archive) {
		//console.log(archive.pointer() + ' total bytes');
		//console.log('archiver has been finalized and the output file descriptor has closed.');
	}

	archiveOnEnd() {
		console.log("Data has been drained");
	}

	archiveOnWarning(err) {
		if (err.code === "ENOENT") {
			console.warn(err);
		} else {
			throw err;
		}
	}

	archiveOnError(err) {
		throw err;
	}

	getCoreIndex() {
		return `<!DOCTYPE html>
            <html>
                <head>
                    <title>Master File</title>
                </head>
                <body>
                    <div>
                        <h1>Master File</h1>
                    </div>
                </body>
            </html>`;
	}
};
