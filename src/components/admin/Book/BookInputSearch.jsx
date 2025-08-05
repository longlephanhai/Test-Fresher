import { Button, Col, Form, Input, Row, theme } from 'antd';

const AdvancedSearchForm = (props) => {

  const { handleFilter } = props;

  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const formStyle = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const onFinish = (values) => {
    const { mainText, author, category } = values;
    let query = "";
    if (mainText) {
      query += `&mainText=/${mainText}/i`;
    }
    if (author) {
      query += `&author=/${author}/i`;
    }
    if (category) {
      query += `&category=/${category}/i`;
    }
    if (query) {
      handleFilter(query);
    }
  };

  return (
    <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            name={`mainText`}
            label={`Tên sách`}
          >
            <Input placeholder="placeholder" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            name={`author`}
            label={`Tác giả`}
          >
            <Input placeholder="placeholder" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            name={`category`}
            label={`Thể loại`}
          >
            <Input placeholder="placeholder" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};


const InputSearch = (props) => {
  return (
    <div>
      <AdvancedSearchForm
        handleFilter={props.handleFilter}
      />
    </div>
  );
};

export default InputSearch;