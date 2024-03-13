import { Form, Input, InputNumber } from 'antd';
import React from 'react'
import { IPropsFormUser, IUser } from './users.types';
import { useContextUser } from './users.context';
import { FORM_RULE_REQUIRED, formRuleMaxLength } from '~/app/utils/form';

const FormUsers = ({ formRef, onFinishCallback }: IPropsFormUser) => {
    const { addUser } = useContextUser();

    function onFinish() {
        const user: IUser = formRef.getFieldsValue();

        addUser(user);

        onFinishCallback?.();
    }

    return (
        <Form<IUser>
            name="users"
            form={formRef}
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                name="name"
                label="Nome"
                messageVariables={{ maxLength: '130' }}
                rules={[FORM_RULE_REQUIRED, formRuleMaxLength(100)]}
            >
                <Input maxLength={100} placeholder='Nome' />
            </Form.Item>

            <Form.Item
                name='email'
                label='E-mail'
                rules={[
                    FORM_RULE_REQUIRED,
                    {
                        type: 'email',
                        message: 'E-mail não é válido'
                    }
                ]}
            >
                <Input maxLength={500} type="email" placeholder='E-mail' />
            </Form.Item>

            <Form.Item
                name='phone'
                label='Telefone'
                rules={[
                    FORM_RULE_REQUIRED
                ]}
            >
                <Input maxLength={500} type="phone" placeholder='Telefone' />
            </Form.Item>

            <Form.Item
                name={['coordinates', 'x']}
                label='Coordenada X'
                rules={[
                    FORM_RULE_REQUIRED
                ]}
            >
                <InputNumber maxLength={100} min={0} placeholder='Coordenada X' />
            </Form.Item>

            <Form.Item
                name={['coordinates', 'y']}
                label='Coordenada Y'
                rules={[
                    FORM_RULE_REQUIRED
                ]}
            >
                <InputNumber maxLength={100} min={0} placeholder='Coordenada Y' />
            </Form.Item>
        </Form>
    )
}

export default FormUsers;