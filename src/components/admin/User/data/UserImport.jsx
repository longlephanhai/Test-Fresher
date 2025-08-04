import { Descriptions, Modal, notification, Table } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import * as XLSX from 'xlsx';
import { useState } from "react";
import { callBulkCreateUser } from "../../../../services/api";
import template from './template.xlsx?url'

const { Dragger } = Upload;
const UserImport = (props) => {
  const { setOpenModalImport, openModalImport } = props;

  const [dataExcel, setDataExcel] = useState([])

  // https://stackoverflow.com/questions/51514757/action-function-is-required-with-antd-upload-control-but-i-dont-need-it
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  const propsUpload = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    accept: ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    // https://stackoverflow.com/questions/11832930/html-input-file-accept-attribute-file-type-csv

    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    customRequest: dummyRequest,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        // message.success(`${info.file.name} file uploaded successfully.`);

        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj;
          let reader = new FileReader();
          reader.onload = function (e) {
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, { type: 'array' });
            // find the name of your sheet in the workbook first
            let worksheet = workbook.Sheets['Sheet1'];

            // convert to json format
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
              header: ["fullName", "email", "phone"],
              range: 1 //skip header row
            });

            if (jsonData && jsonData.length > 0) {
              setDataExcel(jsonData);
            }
          };
          reader.readAsArrayBuffer(file);
        }
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const handleSubmit = async () => {
    const data = dataExcel.map(item => {
      item.password = '123456';
      return item;
    })
    const res = await callBulkCreateUser(data);
    if (res.data) {
      notification.success({
        description: `Success: ${res.data.countSuccess}, Error: ${res.data.countError}`,
        message: "Upload thành công",
      })
      setDataExcel([]);
      setOpenModalImport(false);
      props.fetchUser();
    } else {
      notification.error({
        description: res.message,
        message: "Đã có lỗi xảy ra",
      })
    }
  }

  return (
    <>
      <Modal title="Import data user"
        width={"50vw"}
        open={openModalImport}
        onOk={() => handleSubmit()}
        onCancel={() => {
          setOpenModalImport(false);
          setDataExcel([]);
        }}
        okText="Import data"
        okButtonProps={{
          disabled: dataExcel.length < 1
        }}
        //do not close when click outside
        maskClosable={false}
      >
        <Dragger {...propsUpload} >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single upload. Only accept .csv, .xls, .xlsx
            &nbsp; <a
              onClick={(e) => e.stopPropagation()}
              href={template} download>Download Sample File</a>
          </p>
        </Dragger>
        <div style={{ paddingTop: 20 }}>
          <Table
            dataSource={dataExcel}
            title={() => <span>Dữ liệu upload:</span>}
            columns={[
              { dataIndex: 'fullName', title: 'Tên hiển thị' },
              { dataIndex: 'email', title: 'Email' },
              { dataIndex: 'phone', title: 'Số điện thoại' },
            ]}
          />
        </div>
      </Modal>
    </>
  )
}

export default UserImport;