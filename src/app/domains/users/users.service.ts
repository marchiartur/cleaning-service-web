import axios, { AxiosResponse } from "axios";
import { DTOUser, IUser } from "./users.types";
import { IListPaginated, IPaginationRequest } from "../list.types";

class ServiceUser {
	private url: string = process.env.REACT_APP_API_BASE_URL + "/users";

	async get(
		pagination: IPaginationRequest,
		filter: string
	): Promise<AxiosResponse<IListPaginated<DTOUser>>> {
		const response = await axios.get(this.url, {
			params: {
				filter,
				...pagination,
			},
		});

		return response;
	}

	async getBestRoute(): Promise<AxiosResponse<DTOUser[]>> {
		const response = await axios.get(this.url + "/best-route");

		return response;
	}

	async add(user: IUser): Promise<AxiosResponse<DTOUser>> {
		const response = await axios.post(this.url, user);

		return response;
	}
}

export default ServiceUser;
