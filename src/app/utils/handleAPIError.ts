import { message } from "antd";

export function onApiError(error: any) {
	message.error(error);
}
