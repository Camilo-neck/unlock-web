import Papa from "papaparse";
import { IntParser } from "./IntParser";
import { CreateUser } from "@/schemas/user.schema";

export default class CsvParser implements IntParser {
	private reader: FileReader;
	private file: File;

	public constructor(file: File) {
		this.file = file;
		this.reader = new FileReader();
	}

	public async parse(): Promise<CreateUser> {
		console.log('Parsing CSV file');
		return new Promise((resolve, reject) => {
			this.reader.onload = (e) => {
				const data = e.target?.result;
				const result = Papa.parse(data as string, { header: true });
				resolve(result.data.slice(0, result.data.length-1) as CreateUser);
			};
			this.reader.readAsText(this.file);
		});
	}

}