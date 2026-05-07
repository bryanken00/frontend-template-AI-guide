import { Card, Row, Col, Statistic } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
  return (
    <div>
      <h1
        className="text-2xl font-bold mb-6"
        style={{ color: "var(--color-text-dark)" }}
      >
        Dashboard
      </h1>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Patients"
              value={1234}
              prefix={<UserOutlined />}
              valueStyle={{ color: "var(--color-success)" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Appointments Today"
              value={28}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: "var(--color-primary-color)" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Revenue This Month"
              value={45678}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: "var(--color-error)" }}
            />
          </Card>
        </Col>
      </Row>

      <Card className="mt-6">
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: "var(--color-text-dark)" }}
        >
          Recent Activity
        </h2>
        <p style={{ color: "var(--color-text-secondary)" }}>
          No recent activity to display
        </p>
      </Card>
    </div>
  );
};

export default Dashboard;
