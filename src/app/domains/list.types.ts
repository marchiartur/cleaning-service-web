import { IUser } from "./users/users.types";

export interface IListPaginated<T> {
	page: number;
	pageSize: number;
	totalPages: number;
	totalCount: number;
	data: T[];
}

export interface IPaginationRequest {
	page?: number;
	pageSize?: number;
	totalPages?: number;
}
