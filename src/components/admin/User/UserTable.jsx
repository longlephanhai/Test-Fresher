import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Button, Space } from 'antd';
import InputSearch from './InputSearch';
import { callFetchAccount, callFetchUsers } from '../../../services/api';

// https://stackblitz.com/run?file=demo.tsx
const UserTable = () => {

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [total, setTotal] = useState(0);

    const [data, setData] = useState([])

    const fetchData = async () => {
        const query = `current=${current}&pageSize=${pageSize}`;
        const response = await callFetchUsers(query);
        if (response.data) {
            setData(response.data.result);
            setCurrent(response.data.meta.current);
            setPageSize(response.data.meta.pageSize);
            setTotal(response.data.meta.total);
        }
    }
    useEffect(() => {
        fetchData()
    }, [current, pageSize])

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            sorter: true
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            sorter: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            sorter: true
        },
        {
            title: 'Action',
            render: (text, record) => (
                <Space size="middle">
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </Space>
            ),
        }
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        if (pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
    };

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <InputSearch />
                </Col>
                <Col span={24}>
                    <Table
                        className='def'
                        columns={columns}
                        dataSource={data}
                        onChange={onChange}
                        pagination={
                            {
                                current: current,
                                pageSize: pageSize,
                                showSizeChanger: true,
                                total: total,
                                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                            }
                        }
                    />
                </Col>
            </Row>
        </>
    )
}


export default UserTable;