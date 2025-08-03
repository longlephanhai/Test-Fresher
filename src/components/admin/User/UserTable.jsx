import { useEffect, useState } from 'react';
import { Table, Row, Col, Button, Space } from 'antd';
import InputSearch from './InputSearch';
import { callFetchUsers } from '../../../services/api';
import { render } from 'react-dom';


const UserTable = () => {

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [total, setTotal] = useState(0);

    const [data, setData] = useState([])

    const [sort, setSort] = useState("")



    const fetchData = async () => {
        const query = `current=${current}&pageSize=${pageSize}`;
        const response = await callFetchUsers(query);
        if (response.data) {
            setData(response.data.result);
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
            sorter: true,
            render: (text, record, index) => {
                return (
                    <a href="#" onClick={() => { }}>
                        {record._id}
                    </a>
                )
            }
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
        if (pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
        if (sorter.field) {
            sorter.order === 'ascend' ? setSort(`sort=${sorter.field}`) : setSort(`sort=-${sorter.field}`)
            handleSort(sort);
        }
    };

    const handleFilter = async (query) => {
        const newQuery = `current=${current}&pageSize=${pageSize}${query}`;
        const response = await callFetchUsers(newQuery);
        if (response.data) {
            setData(response.data.result);
            setTotal(response.data.meta.total);
        }
    }

    const handleSort = async (sort) => {
        const newQuery = `current=${current}&pageSize=${pageSize}&${sort}`;
        const response = await callFetchUsers(newQuery);
        if (response.data) {
            setData(response.data.result);
            setTotal(response.data.meta.total);
        }
    }
    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <InputSearch handleFilter={handleFilter} />
                </Col>
                <Col span={24}>
                    <Table
                        className='def'
                        rowKey="_id"
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