import { FormRule } from "antd";

export const FORM_RULE_REQUIRED: FormRule = {
	required: true,
	message: "Campo obrigatório",
};

export function formRuleMaxLength(max: number): FormRule {
	return {
		max,
		message: "O tamanho máximo é de ${maxLength}",
	};
}
