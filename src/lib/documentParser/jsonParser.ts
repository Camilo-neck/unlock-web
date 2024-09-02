import { IntParser } from "./IntParser";

export default class JsonParser implements IntParser {
	private reader: FileReader;
	private file: File;

	public constructor(file: File) {
		this.file = file;
		this.reader = new FileReader();
	}

	public async parse(): Promise<any> {
		console.log('Parsing JSON file');
		return new Promise((resolve, reject) => {
			this.reader.onload = (e) => {
				const data = e.target?.result;
				resolve(JSON.parse(data as string));
			};
			this.reader.readAsText(this.file);
		});
	}

}