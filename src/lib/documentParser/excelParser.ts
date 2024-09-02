import * as XLSX from 'xlsx';
import { IntParser } from './IntParser';
import { CreateUser } from '@/schemas/user.schema';

export default class ExcelParser implements IntParser {
	private reader: FileReader;
	private file: File;

	public constructor(file: File) {
		this.file = file;
		this.reader = new FileReader();
	}

	public async parse(): Promise<CreateUser> {
		console.log('Parsing Excel file');
		return new Promise((resolve, reject) => {
			this.reader.onload = (e) => {
				const data = e.target?.result;
				const workbook = XLSX.read(data, { type: 'binary' });
				const sheetName = workbook.SheetNames[0];
				const sheet = workbook.Sheets[sheetName];
				const json: CreateUser = XLSX.utils.sheet_to_json(sheet);
				resolve(json);
			};
			this.reader.readAsBinaryString(this.file);
		});
	}
}