'use client';

import { Button, Col, Form, Input, Modal, Row, Table, Typography } from 'antd'
import React, { useState } from 'react'
import { useContextUser } from './domains/users/users.context'
import { DTOUser, IContextUser, IUser } from './domains/users/users.types';
import { ColumnsType } from 'antd/es/table';
import FormUsers from './domains/users/users.form';
import './globals.css';

export interface ModalOptionsUser {
  isVisible: boolean;
  idEditing?: IUser['id'];
  creating: boolean;
}

const INITIAL_MODAL_OPTIONS_USER = {
  isVisible: false,
  idEditing: undefined,
  creating: false
}

const PageUsers = () => {
  const [modalForm] = Form.useForm<IUser>();
  const contextUser: IContextUser = useContextUser();

  const [modalOptions, setModalOptions] = useState<ModalOptionsUser>(INITIAL_MODAL_OPTIONS_USER);
  const [isModalRouteVisible, setIsModalRouteVisible] = useState<boolean>(false);

  const {
    users,
    usersRouted,
    pagination,
    loading,
    loadingModal,
    onChangePagination,
    onChangeSearch,
    getBestRoute,
  } = contextUser;

  const columnsUser: ColumnsType<DTOUser> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telefone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Coordenada X',
      dataIndex: 'coordinate_x',
      key: 'coordinate_x',
    },
    {
      title: 'Coordenada Y',
      dataIndex: 'coordinate_y',
      key: 'coordinate_y',
    },
  ]


  function onClickCreate() {
    setModalOptions({
      isVisible: true,
      idEditing: undefined,
      creating: true,
    })
  }

  function onFinishCallback() {
    modalForm.resetFields();
    setModalOptions(INITIAL_MODAL_OPTIONS_USER);
  }

  function onCancel() {
    modalForm.resetFields();
    setModalOptions(INITIAL_MODAL_OPTIONS_USER);
  }

  async function onClickRoute() {
    setIsModalRouteVisible(true);

    await getBestRoute();
  }

  function onCancelRoutedModal() {
    setIsModalRouteVisible(false);
  }

  return (
    <Col style={{ padding: 10 }}>
      <Typography.Title>
        Serviço de Limpeza
      </Typography.Title>

      <Row style={{ marginBottom: 20, flexFlow: 'nowrap', gap: 20 }} justify="space-between">

        <Input placeholder='Pesquisar' onChange={onChangeSearch} />

        <Button onClick={onClickRoute} disabled={users.length === 0}>
          Roteirizar
        </Button>

        <Button type="primary" onClick={onClickCreate}>
          Criar usuário
        </Button>
      </Row>

      <Col>
        <Table
          onChange={onChangePagination}
          pagination={{
            hideOnSinglePage: true,
            ...pagination,
          }}
          loading={loading}
          rowKey="id"
          dataSource={users}
          columns={columnsUser}
          size="small"
        />
      </Col>

      <Modal
        destroyOnClose title={modalOptions.creating ? 'Criar usuário' : 'Editar usuário'}
        closeIcon={false}
        okText="Criar"
        cancelText="Cancelar"
        onOk={modalForm.submit}
        onCancel={onCancel}
        open={modalOptions.isVisible}
      >
        <FormUsers onFinishCallback={onFinishCallback} formRef={modalForm} idEditing={modalOptions.idEditing} />
      </Modal>

      <Modal
        title="Melhor rota"
        open={isModalRouteVisible}
        onCancel={onCancelRoutedModal}
        closeIcon={true}
        destroyOnClose
        closable
        footer={null}
        width="80%"
      >
        <Table
          loading={loadingModal}
          rowKey="id"
          dataSource={usersRouted}
          columns={columnsUser}
          size="small"
        />
      </Modal>
    </Col>
  )
}

export default PageUsers