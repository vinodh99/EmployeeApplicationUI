import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Modal,
  Menu,
  List,
  Form,
  Icon,
  Button,
  Layout,
  Row,
  Col,
  Card,
  Badge
} from "antd";
import { Link } from "react-router-dom";
import { getPro, getEmpInfo } from "../../redux/actions/Get_List";
import Moment from "react-moment";

const { Header, Content, Footer } = Layout;

class MTSA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: "mail",
      data: {
        clientProjectName: "",
        startDate: "",
        endDate: "",
        listOfEmployees: [{ employeeId: "", employeeName: "" }],
        activeTimesheetStartDate: "",
        activeTimesheetEndDate: "",
        notes: "",
        projectId: "",
        clientProjectId: "",
        vendorId: "",
        vendorName: ""
      },
      loading: false,
      visible1: false,
      visible2: false
    };
  }
  componentDidMount() {
    this.onShow();
  }
  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  handleOk1 = e => {
    console.log(e);
    this.setState({
      visible1: false
    });
  };

  handleCancel1 = e => {
    console.log(e);
    this.setState({
      visible1: false
    });
  };

  handleOk2 = e => {
    console.log(e);
    this.setState({
      visible2: false
    });
  };

  handleCancel2 = e => {
    console.log(e);
    this.setState({
      visible2: false
    });
  };

  onShow = e => {
    const { clientProjectName, startDate, endDate } = this.state.data;
    this.props.dispatch(
      getPro({
        clientProjectName: clientProjectName,
        startDate: startDate,
        endDate: endDate
      })
    );
    this.props.history.push("/mTSA");
  };
  onList = e => {
    const {
      listOfEmployees: [{ employeeId, employeeName }],
      activeTimesheetStartDate,
      activeTimesheetEndDate,
      notes
    } = this.state.data;
    this.props.dispatch(
      getEmpInfo({
        listOfEmployees: [
          {
            employeeId: employeeId,
            employeeName: employeeName
          }
        ],
        activeTimesheetStartDate: activeTimesheetStartDate,
        activeTimesheetEndDate: activeTimesheetEndDate,
        notes: notes
      })
    );
    this.state.visible1 = true;
    this.props.history.push("/mTSA");
  };

  onDetails = e => {
    const {
      listOfEmployees: [{ employeeId }],
      projectId,
      clientProjectId,
      vendorId,
      vendorName
    } = this.state.data;
    this.props.dispatch(
      getEmpInfo({
        listOfEmployees: [{ employeeId: employeeId }],
        projectId: projectId,
        clientProjectId: clientProjectId,
        vendorId: vendorId,
        vendorName: vendorName
      })
    );
    this.state.visible2 = true;
    this.props.history.push("/mTSA");
  };

  render() {
    const data1 = Array.from(this.props.empList);
    const { data } = this.state;

    return (
      <div>
        <Layout>
          <Header>
            <Row>
              <Col xs={22} sm={22} md={22} lg={22} xl={22}>
                <Menu
                  onClick={this.handleClick}
                  selectedKeys={[this.state.current]}
                  mode="horizontal"
                >
                  <Menu.Item>
                    <Link to={{ pathname: "/home" }}>
                      {" "}
                      <img
                        src="https://rsrit.com/wp-content/uploads/2017/12/logo_dark.png"
                        width="200px"
                        height="60px"
                      />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="mail">
                    <Link to={{ pathname: "/home" }}>
                      <Icon type="mail" />
                      Home
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="timesheet">
                    <Link to={{ pathname: "/createNewRequest" }}>
                      <Icon type="clock-circle" />
                      Time Sheet
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Manager Approval">
                    <Link to={{ pathname: "/mTSA" }}>
                      <Icon type="ordered-list" />
                      Manager TimeSheet Approval
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="project">
                    <Link to={{ pathname: "/project" }}>
                      <Icon type="project" />
                      Project
                    </Link>
                  </Menu.Item>
                </Menu>
              </Col>
              <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                <Link to={{ pathname: "/login" }}>
                  {" "}
                  <Button size="large">
                    <Icon type="logout" />
                    Logout
                  </Button>
                </Link>
              </Col>
            </Row>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 500
            }}
          >
            <Col span={10}>
              <Card title="Project List" span={4}>
                <Form span={4}>
                  {/* <Button type="primary" onClick={this.onShow} value={data}>
                    View List
                  </Button> */}
                  <List
                    bordered
                    dataSource={data1}
                    renderItem={item => (
                      <List.Item>
                        <Card
                          onClick={this.onList}
                          value={item.clientProjectName}
                        >
                          <Badge count={item.listOfEmployees.length} />
                          <b>
                            {"Project Name: "}
                            {item.clientProjectName}
                          </b>
                          <br />
                          {"Date: "}
                          <Moment format="MM/DD/YYYY">{item.startDate}</Moment>
                          {" - "}
                          <Moment format="MM/DD/YYYY">{item.endDate}</Moment>
                          <br />
                        </Card>
                      </List.Item>
                    )}
                  />
                </Form>
              </Card>
            </Col>

            <Col span={8}>
              <Modal
                title="Employee List"
                visible={this.state.visible1}
                onOk={this.handleOk1}
                onCancel={this.handleCancel1}
              >
                <Form span={4}>
                  <List
                    bordered
                    dataSource={data1}
                    renderItem={item2 => (
                      <List.Item>
                        <Card onClick={this.onDetails} value={data}>
                          {"Employee ID: "}
                          {item2.listOfEmployees[0].employeeId}
                          <br />
                          {"Employee Name: "}
                          {item2.listOfEmployees[0].employeeName}
                          <br />
                          {"Timesheet Date: "}
                          <Moment format="MM/DD/YYYY">
                            {item2.activeTimesheetStartDate}
                          </Moment>
                          {" - "}
                          <Moment format="MM/DD/YYYY">
                            {item2.activeTimesheetEndDate}
                          </Moment>
                        </Card>
                      </List.Item>
                    )}
                  />
                </Form>
              </Modal>
            </Col>
            <Col span={8}>
              <Modal
                title="Employee Details"
                visible={this.state.visible2}
                onOk={this.handleOk2}
                onCancel={this.handleCancel2}
              >
                <Form span={4}>
                  <List
                    bordered
                    dataSource={data1}
                    renderItem={item2 => (
                      <List.Item>
                        <Card>
                          {"Employee Id: "}
                          {item2.listOfEmployees[0].employeeId}
                          <br />
                          {"Project Id: "}
                          {item2.projectId}
                          <br />
                          {"Client Id: "}
                          {item2.clientProjectId}
                          <br />
                          {"Vendor Id: "}
                          {item2.vendorId}
                          <br />
                          {"Vendor Name: "}
                          {item2.vendorName}
                        </Card>
                      </List.Item>
                    )}
                  />
                </Form>
              </Modal>{" "}
            </Col>
          </Content>

          <Footer>
            <center>
              <Icon type="copyright" />
              Reliable Software 2018
            </center>
          </Footer>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log("STATE" + JSON.stringify(state.empList.result));
  return {
    empList: state.empList.result
  };
}

export default connect(mapStateToProps)(MTSA);
