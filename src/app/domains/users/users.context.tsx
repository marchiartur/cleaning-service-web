'use client';

import React, { createContext, useState, useContext } from "react";
import { IContextUser, IPropsProviderUser, DTOUser, IUser } from "./users.types";
import { onApiError } from "~/app/utils/handleAPIError";
import { v4 } from "uuid";
import ServiceUser from "./users.service";
import { TablePaginationConfig, message } from "antd";
import { useDidMount } from "~/app/hooks/useDidMount";

let timeoutId: NodeJS.Timeout;

const ContextUser = createContext<IContextUser | undefined>(undefined);

export const useContextUser = () => {
	const context = useContext(ContextUser);

	if (!context) {
		throw new Error("useContextUser must be used within a ProviderUser");
	}

	return context;
};

export const ProviderUser: React.FC<IPropsProviderUser> = ({ children }) => {
	const [users, setUsers] = useState<DTOUser[]>([]);
	const [usersRouted, setUsersRouted] = useState<DTOUser[]>([]);

	const [pagination, setPagination] = useState<TablePaginationConfig>({ pageSize: 10, defaultPageSize: 10, current: 1, total: 0 });
	const [filter, setFilter] = useState('');
	const [loading, setLoading] = useState<boolean>(true);
	const [loadingModal, setLoadingModal] = useState<boolean>(false);

	const serviceUser = new ServiceUser();

	async function addUser(user: IUser): Promise<boolean> {
		try {
			const response = await serviceUser.add(user);

			const newUser = response?.status === 200 ? response?.data : { ...user, id: v4() };

			setUsers(previousState => {
				const formatted = [...previousState];

				formatted.unshift({
					...newUser,
					coordinate_x: user.coordinates.x,
					coordinate_y: user.coordinates.y,
				});

				return formatted
			});

			return true;
		} catch (error) {
			onApiError(error);

			return false;
		}
	}

	async function getUsers(requestPagination?: TablePaginationConfig, requestFilter?: string) {
		try {
			const newPagination = requestPagination ?? pagination;

			const response = await serviceUser.get({
				page: newPagination.current,
				pageSize: requestPagination?.pageSize
			}, requestFilter ?? filter);

			setUsers(response.data.data);
			setPagination({
				current: response.data.page,
				pageSize: response.data.pageSize,
				total: response.data.totalCount,
			})
		} catch (error) {
			message.error('Erro ao carregar os usuários. Tente novamente.');
		} finally {
			setLoading(false);
		}
	}

	async function onChangePagination(newPagination: TablePaginationConfig) {
		await getUsers(newPagination);
	}

	async function getBestRoute() {
		try {
			setLoadingModal(true);

			const response = await serviceUser.getBestRoute();

			setUsersRouted(response.data);
		} catch (error) {
			message.error('Erro ao . Tente novamente.');
		} finally {
			setLoadingModal(false);
		}
	}

	const setters = {
		addUser,
	}

	const getters = {
		getUsers,
		getBestRoute,
	}

	async function onChangeSearch(event: React.ChangeEvent<HTMLInputElement>) {
		clearTimeout(timeoutId);

		timeoutId = setTimeout(async () => {
			setFilter(event.target.value);
			await getUsers(pagination, event.target.value);
		}, 500);
	}

	function onMount() {
		async function request() {
			await getUsers();
		}

		return () => request();
	}

	useDidMount(onMount);

	function onCloseModalUsersRouted() {
		setUsersRouted([]);
	}

	const value: IContextUser = {
		users,
		pagination,
		loading,
		usersRouted,
		loadingModal,
		...setters,
		...getters,
		onChangePagination,
		onChangeSearch,
		onCloseModalUsersRouted,
		getBestRoute,
	}

	return (
		<ContextUser.Provider
			value={value}
		>
			{children}
		</ContextUser.Provider>
	);
};
