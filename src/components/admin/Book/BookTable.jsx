import { Button, Col, Popconfirm, Row, Space, Table } from "antd"
import InputSearch from "./BookInputSearch"
import { ExportOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { callFetchBooks } from "../../../services/api"
import BookViewDetail from "./BookViewDetail"

const BookTable = () => {

  const [dataBooks, setDataBooks] = useState([])

  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(4)
  const [total, setTotal] = useState(0)

  const [sortQuery, setSortQuery] = useState("sort=-updatedAt")

  const [query, setQuery] = useState(`current=${current}&pageSize=${pageSize}&${sortQuery}`)

  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [dataViewDetail, setDataViewDetail] = useState(null);



  useEffect(() => {
    fetchBooks()
  }, [current, pageSize, query])

  const fetchBooks = async () => {
    const response = await callFetchBooks(query)
    if (response && response.data) {
      setDataBooks(response.data.result)
      setTotal(response.data.meta.total)
    }
  }

  const onChange = (pagination, filters, sorter) => {
    if (pagination.current !== current) {
      setCurrent(pagination.current)
      setQuery(`current=${pagination.current}&pageSize=${pagination.pageSize}&${sortQuery}`)
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize)
      setCurrent(1)
      setQuery(`current=1&pageSize=${pagination.pageSize}&${sortQuery}`)
    }

    if (sorter.field) {
      sorter.order === 'ascend' ? setSortQuery(`sort=${sorter.field}`) : setSortQuery(`sort=-${sorter.field}`)
      setQuery(`current=${current}&pageSize=${pageSize}&${sortQuery}`)
    }

  }

  const handleFilter = (queryExtra) => {
    // console.log(">>check query", query);
    setQuery(`current=${current}&pageSize=${pageSize}&${sortQuery}${queryExtra}`);
  }


  // change button color: https://ant.design/docs/react/customize-theme#customize-design-token
  const renderHeader = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Table List Books</span>
        <span style={{ display: 'flex', gap: 15 }}>
          <Button
            icon={<ExportOutlined />}
            type="primary"
          // onClick={() => { exPortData(data) }}
          >Export</Button>

          <Button
            icon={<PlusOutlined />}
            type="primary"
          // onClick={() => setOpenModalCreate(true)}
          >Thêm mới</Button>
          <Button type='ghost'
          // onClick={() => {
          //   setFilter("");
          //   setSortQuery("")
          // }}
          >
            <ReloadOutlined />
          </Button>
        </span>
      </div>
    )
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      sorter: true,
      render: (text, record, index) => {
        return (
          <a href="#"
            onClick={() => {
              setDataViewDetail(record);
              setOpenViewDetail(true);
            }}
          >
            {record._id}
          </a>
        )
      }
    },
    {
      title: 'Tên sách',
      dataIndex: 'mainText',
      sorter: true,
    },
    {
      title: 'Thể loại',
      dataIndex: 'category',
      sorter: true
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      sorter: true
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      sorter: true
    },
    {
      title: 'Action',
      render: (text, record) => (
        <Space size="middle">
          <Button
          // onClick={() => {
          //   setDataUpdate(record);
          //   setOpenModalUpdate(true);
          // }}
          >
            Edit
          </Button>
          <Popconfirm
            placement="leftTop"
            title={"Xác nhận xóa người dùng này?"}
            description="Bạn có chắc chắn muốn xóa người dùng này?"
            okText="Yes"
            cancelText="No"
          // onConfirm={() => { handleDeleteUser(record._id) }}
          >
            <span><Button>Delete</Button></span>
          </Popconfirm>
        </Space>
      ),
    }
  ];

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch
            handleFilter={handleFilter}
          />
        </Col>
        <Col span={24}>
          <Table
            title={renderHeader}
            className='def'
            rowKey="_id"
            columns={columns}
            dataSource={dataBooks}
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

      <BookViewDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}

      />
    </>
  )
}

export default BookTable