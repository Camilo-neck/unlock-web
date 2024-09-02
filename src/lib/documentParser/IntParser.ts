import { CreateUser } from "@/schemas/user.schema";

export interface IntParser {
	parse(): Promise<CreateUser>;
}