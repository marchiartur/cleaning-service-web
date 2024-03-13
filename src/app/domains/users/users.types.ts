import { FormInstance, TablePaginationConfig } from "antd";
import { ReactNode } from "react";
import { Coordinates } from "../coordinates/coordinates.types";

export interface IUser {
	id?: number | string;
	name: string;
	email: string;
	phone: string;
	coordinates: Coordinates;
}

export interface DTOUser {
	id: number | string;
	name: string;
	email: string;
	phone: string;
	coordinate_x: string;
	coordinate_y: string;
}

export interface IContextUser {
	users: DTOUser[];
	usersRouted: DTOUser[];
	pagination: TablePaginationConfig;
	loading: boolean;
	addUser: (user: IUser) => void;
	onChangePagination: (pagination: TablePaginationConfig) => void;
	onChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
	loadingModal: boolean;
	onCloseModalUsersRouted: () => void;
	getBestRoute: () => Promise<void>;
}

export interface IPropsProviderUser {
	children: ReactNode;
}

export interface IPropsFormUser {
	idEditing?: IUser["id"];
	formRef: FormInstance<IUser>;
	onFinishCallback?: () => void;
}
