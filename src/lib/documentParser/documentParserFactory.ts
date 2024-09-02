import ExcelParser from "./excelParser";
import CsvParser from "./csvParser";
import JsonParser from "./jsonParser";
import { IntParser } from "./IntParser";

export default class DocumentParserFactory {
	public static createParser(file: File): IntParser {
		const extension = file.name.split('.').pop();
		switch (extension) {
			case 'xlsx':
				return new ExcelParser(file);
			case 'csv':
				return new CsvParser(file);
			case 'json':
				return new JsonParser(file);
			default:
				throw new Error('Unsupported file type');
		}
	}
}