import {
  Card,
  Col,
  Row,
  Statistic,
  Typography,
  Table,
  Tag,
  Avatar,
  Progress,
} from "antd";
import {
  Users,
  Building2,
  Activity,
  TrendingUp,
  ShieldCheck,
  Database,
  Server,
  AlertCircle,
  MapPin,
  CheckCircle,
  Clock,
  UserPlus,
  FileText,
  Settings,
  CreditCard,
} from "lucide-react";

const { Title, Text } = Typography;

const Dashboard = () => {
  const stats = [
    {
      title: "Total Organizations",
      value: 48,
      icon: <Building2 className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      change: "+8 this month",
    },
    {
      title: "Active Organizations",
      value: 45,
      icon: <CheckCircle className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      change: "93.8% active rate",
    },
    {
      title: "Total Branches",
      value: 156,
      icon: <MapPin className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      change: "+12 this month",
    },
    {
      title: "Monthly Revenue",
      value: "$24K",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      change: "+12.5% growth",
    },
  ];

  const systemStats = [
    {
      title: "Database Status",
      value: "Healthy",
      icon: <Database className="w-5 h-5" />,
      status: "success",
    },
    {
      title: "Server Load",
      value: "45%",
      icon: <Server className="w-5 h-5" />,
      status: "success",
    },
    {
      title: "Active Sessions",
      value: "234",
      icon: <Users className="w-5 h-5" />,
      status: "success",
    },
    {
      title: "Alerts",
      value: "2",
      icon: <AlertCircle className="w-5 h-5" />,
      status: "warning",
    },
  ];

  const recentOrganizations = [
    {
      key: "1",
      name: "Acme Corporation",
      city: "New York",
      branches: 5,
      status: "active",
      subscription: "Premium",
      createdAt: "2024-01-15",
    },
    {
      key: "2",
      name: "TechStart Inc.",
      city: "San Francisco",
      branches: 3,
      status: "active",
      subscription: "Standard",
      createdAt: "2024-02-20",
    },
    {
      key: "3",
      name: "Global Services Ltd.",
      city: "Chicago",
      branches: 8,
      status: "active",
      subscription: "Enterprise",
      createdAt: "2023-11-10",
    },
    {
      key: "4",
      name: "StartUp Hub",
      city: "Austin",
      branches: 2,
      status: "inactive",
      subscription: "Basic",
      createdAt: "2024-03-05",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "organization",
      icon: <Building2 className="w-4 h-4" />,
      color: "blue",
      title: "New organization registered",
      description: "Acme Corporation joined the platform",
      time: "5 minutes ago",
    },
    {
      id: 2,
      type: "user",
      icon: <UserPlus className="w-4 h-4" />,
      color: "green",
      title: "New admin user created",
      description: "John Smith added to TechStart Inc.",
      time: "15 minutes ago",
    },
    {
      id: 3,
      type: "subscription",
      icon: <CreditCard className="w-4 h-4" />,
      color: "purple",
      title: "Subscription upgraded",
      description: "Global Services upgraded to Enterprise plan",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "document",
      icon: <FileText className="w-4 h-4" />,
      color: "orange",
      title: "Document submitted",
      description: "StartUp Hub submitted compliance documents",
      time: "2 hours ago",
    },
    {
      id: 5,
      type: "system",
      icon: <Settings className="w-4 h-4" />,
      color: "gray",
      title: "System maintenance completed",
      description: "Database optimization finished successfully",
      time: "3 hours ago",
    },
  ];

  const subscriptionData = [
    { plan: "Basic", count: 8, color: "#d1d5db", revenue: "$12K" },
    { plan: "Standard", count: 15, color: "#3b82f6", revenue: "$45K" },
    { plan: "Premium", count: 18, color: "#a855f7", revenue: "$108K" },
    { plan: "Enterprise", count: 7, color: "#f59e0b", revenue: "$77K" },
  ];

  const organizationColumns = [
    {
      title: "Organization",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Avatar
            size={32}
            icon={<Building2 className="w-4 h-4" />}
            className="bg-blue-100 text-blue-600"
          />
          <div>
            <div className="font-medium text-gray-900">{text}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {record.city}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Branches",
      dataIndex: "branches",
      key: "branches",
      align: "center",
      render: (count) => <span className="font-medium">{count}</span>,
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
      render: (plan) => {
        const colors = {
          Basic: "default",
          Standard: "blue",
          Premium: "purple",
          Enterprise: "gold",
        };
        return <Tag color={colors[plan]}>{plan}</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "success" : "default"}>
          {status === "active" ? "Active" : "Inactive"}
        </Tag>
      ),
    },
  ];

  const getActivityColor = (type) => {
    const colors = {
      organization: "bg-blue-100 text-blue-600",
      user: "bg-green-100 text-green-600",
      subscription: "bg-purple-100 text-purple-600",
      document: "bg-orange-100 text-orange-600",
      system: "bg-gray-100 text-gray-600",
    };
    return colors[type] || colors.system;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Title level={2} className="mb-2! flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            SuperAdmin Dashboard
          </Title>
          <Text className="text-gray-600">
            System overview and management console
          </Text>
        </div>
      </div>

      {/* Main Stats */}
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <Text className="text-gray-600 text-sm block mb-2">
                    {stat.title}
                  </Text>
                  <Statistic
                    value={stat.value}
                    valueStyle={{
                      fontSize: "28px",
                      fontWeight: "bold",
                      color: "#1f2937",
                    }}
                  />
                </div>
                <div
                  className={`${stat.bgColor} ${stat.textColor} p-4 rounded-2xl`}
                >
                  {stat.icon}
                </div>
              </div>
              <Text className="text-xs text-gray-500">{stat.change}</Text>
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${stat.color}`}
              ></div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* System Status */}
      <Card
        title={
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-600" />
            <span>System Status</span>
          </div>
        }
        className="shadow-lg border-0"
      >
        <Row gutter={[16, 16]}>
          {systemStats.map((stat, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div
                  className={`p-3 rounded-xl ${
                    stat.status === "success"
                      ? "bg-green-100 text-green-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {stat.icon}
                </div>
                <div>
                  <Text className="text-gray-600 text-sm block">
                    {stat.title}
                  </Text>
                  <Text className="text-lg font-semibold">{stat.value}</Text>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Recent Organizations & Subscription Overview */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>Recent Organizations</span>
              </div>
            }
            className="shadow-lg border-0"
            extra={
              <Text className="text-blue-600 cursor-pointer hover:underline">
                View All
              </Text>
            }
          >
            <Table
              columns={organizationColumns}
              dataSource={recentOrganizations}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-600" />
                <span>Subscription Overview</span>
              </div>
            }
            className="shadow-lg border-0 h-full"
          >
            <div className="space-y-4">
              {subscriptionData.map((sub, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: sub.color }}
                      ></div>
                      <Text className="font-medium">{sub.plan}</Text>
                    </div>
                    <Text className="text-gray-600">
                      {sub.count} organizations
                    </Text>
                  </div>
                  <Progress
                    percent={(sub.count / 48) * 100}
                    strokeColor={sub.color}
                    showInfo={false}
                    size="small"
                  />
                  <Text className="text-xs text-gray-500">{sub.revenue}</Text>
                </div>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <Text className="font-semibold">Total Revenue</Text>
                  <Text className="text-lg font-bold text-purple-600">
                    $242K
                  </Text>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity & System Alerts */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                <span>Recent Activity</span>
              </div>
            }
            className="shadow-lg border-0 h-full"
            extra={
              <Text className="text-blue-600 cursor-pointer hover:underline">
                View All
              </Text>
            }
          >
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <div
                    className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}
                  >
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Text className="block font-medium text-gray-900">
                      {activity.title}
                    </Text>
                    <Text className="text-sm text-gray-600 block truncate">
                      {activity.description}
                    </Text>
                    <Text className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span>System Alerts</span>
              </div>
            }
            className="shadow-lg border-0 h-full"
            extra={
              <Text className="text-blue-600 cursor-pointer hover:underline">
                View All
              </Text>
            }
          >
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl border border-orange-200">
                <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <Text className="block font-medium text-gray-900">
                    Payment Pending
                  </Text>
                  <Text className="text-sm text-gray-600">
                    2 organizations have pending subscription payments
                  </Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    Requires attention
                  </Text>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <Text className="block font-medium text-gray-900">
                    Document Verification
                  </Text>
                  <Text className="text-sm text-gray-600">
                    3 organizations awaiting document verification
                  </Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    Review required
                  </Text>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                <Activity className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <Text className="block font-medium text-gray-900">
                    System Update Available
                  </Text>
                  <Text className="text-sm text-gray-600">
                    New version 2.5.0 is ready to install
                  </Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    Optional update
                  </Text>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
