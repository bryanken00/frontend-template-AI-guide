import { Form, Input, Select, Upload, Button, message, Divider } from "antd";
import { useEffect, useState } from "react";
import {
  Upload as UploadIcon,
  Building2,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import {
  useCreateOrganization,
  useUpdateOrganization,
} from "../../../../services/requests/superadmin/organizations";
import {
  refregion,
  refprovince,
  refcitymun,
  refbrgy,
} from "../../../../assets/address";
import {
  getProvincesByRegion,
  getCitiesByProvince,
  getBarangaysByCity,
} from "../../../../utils/address";
import {
  formatPhoneNumber,
  phoneValidator,
} from "../../../../utils/phoneFormat";
import { validationRules } from "../../../../utils/validation";
import PasswordStrengthIndicator from "../../../../components/PasswordStrengthIndicator";
import { getImageUrl } from "../../../../utils/upload";

const { TextArea } = Input;
const { Option } = Select;

const OrganizationForm = ({ organization = null, onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [logoPreview, setLogoPreview] = useState(
    organization?.logo ? getImageUrl(organization.logo) : null,
  );
  const [logoFile, setLogoFile] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);
  const [ownerPassword, setOwnerPassword] = useState("");

  const createOrganizationMutation = useCreateOrganization();
  const updateOrganizationMutation = useUpdateOrganization();

  const isEditMode = !!organization;

  useEffect(() => {
    if (organization) {
      form.setFieldsValue({
        name: organization.name,
        email: organization.email,
        phone: organization.phone,
        website: organization.website,
        address: organization.address,
        regCode: organization.regCode,
        provCode: organization.provCode,
        citymunCode: organization.citymunCode,
        brgyCode: organization.brgyCode,
        zipCode: organization.zipCode,
        description: organization.description,
        subscriptionPlan: organization.subscriptionPlan,
      });

      // Load cascading address data
      if (organization.regCode) {
        setProvinces(getProvincesByRegion(organization.regCode));
      }
      if (organization.provCode) {
        setCities(getCitiesByProvince(organization.provCode));
      }
      if (organization.citymunCode) {
        setBarangays(getBarangaysByCity(organization.citymunCode));
      }
    }
  }, [organization, form]);

  const handleRegionChange = (value) => {
    setProvinces(getProvincesByRegion(value));
    setCities([]);
    setBarangays([]);
    form.setFieldsValue({
      provCode: undefined,
      citymunCode: undefined,
      brgyCode: undefined,
    });
  };

  const handleProvinceChange = (value) => {
    setCities(getCitiesByProvince(value));
    setBarangays([]);
    form.setFieldsValue({
      citymunCode: undefined,
      brgyCode: undefined,
    });
  };

  const handleCityChange = (value) => {
    setBarangays(getBarangaysByCity(value));
    form.setFieldsValue({ brgyCode: undefined });
  };

  const handleLogoUpload = (info) => {
    const file = info.file;
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setLogoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      // Format phone number before submitting
      if (values.phone) {
        values.phone = formatPhoneNumber(values.phone);
      }

      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      if (isEditMode) {
        await updateOrganizationMutation.mutateAsync({
          organizationId: organization.id,
          organizationData: formData,
        });
      } else {
        await createOrganizationMutation.mutateAsync(formData);
      }

      form.resetFields();
      setLogoPreview(null);
      setLogoFile(null);
      onSuccess?.();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="space-y-6"
      requiredMark={false}
    >
      {/* Logo Upload */}
      <div className="flex justify-center mb-6">
        <Upload
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleLogoUpload}
          accept="image/*"
        >
          <div className="relative cursor-pointer group">
            <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 group-hover:border-purple-400 transition-colors">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <UploadIcon className="w-6 h-6 text-gray-400 mx-auto" />
                  <span className="text-xs text-gray-500 mt-1 block">Logo</span>
                </div>
              )}
            </div>
          </div>
        </Upload>
      </div>

      {/* Organization Information */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
          Organization Information
        </h3>

        <Form.Item
          name="name"
          label="Organization Name"
          rules={[{ required: true, message: "Organization name is required" }]}
        >
          <Input
            prefix={<Building2 className="w-4 h-4 text-gray-400" />}
            placeholder="Enter organization name"
            className="h-11 rounded-xl text-sm"
            size="large"
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              prefix={<Mail className="w-4 h-4 text-gray-400" />}
              placeholder="org@example.com"
              className="h-11 rounded-xl text-sm"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ validator: phoneValidator }]}
          >
            <Input
              prefix={<Phone className="w-4 h-4 text-gray-400" />}
              placeholder="09XXXXXXXXX"
              className="h-11 rounded-xl text-sm"
              size="large"
              maxLength={11}
            />
          </Form.Item>
        </div>

        <Form.Item name="website" label="Website (Optional)">
          <Input
            placeholder="https://www.example.com"
            className="h-11 rounded-xl text-sm"
            size="large"
          />
        </Form.Item>
      </div>

      <Divider className="my-6" />

      {/* Address Information (PH-based) */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
          Address Information
        </h3>

        <Form.Item name="address" label="Street Address">
          <Input
            prefix={<MapPin className="w-4 h-4 text-gray-400" />}
            placeholder="House/Unit No., Street, Subdivision"
            className="h-11 rounded-xl text-sm"
            size="large"
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="regCode"
            label="Region"
            rules={[{ required: true, message: "Region is required" }]}
          >
            <Select
              placeholder="Select Region"
              onChange={handleRegionChange}
              showSearch
              optionFilterProp="children"
              className="h-11 rounded-xl"
              size="large"
            >
              {refregion.map((region) => (
                <Option key={region.regCode} value={region.regCode}>
                  {region.regDesc}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="provCode"
            label="Province"
            rules={[{ required: true, message: "Province is required" }]}
          >
            <Select
              placeholder="Select Province"
              onChange={handleProvinceChange}
              showSearch
              optionFilterProp="children"
              disabled={provinces.length === 0}
              className="h-11 rounded-xl"
              size="large"
            >
              {provinces.map((province) => (
                <Option key={province.provCode} value={province.provCode}>
                  {province.provDesc}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="citymunCode"
            label="City / Municipality"
            rules={[
              { required: true, message: "City/Municipality is required" },
            ]}
          >
            <Select
              placeholder="Select City/Municipality"
              onChange={handleCityChange}
              showSearch
              optionFilterProp="children"
              disabled={cities.length === 0}
              className="h-11 rounded-xl"
              size="large"
            >
              {cities.map((city) => (
                <Option key={city.citymunCode} value={city.citymunCode}>
                  {city.citymunDesc}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="brgyCode"
            label="Barangay"
            rules={[{ required: true, message: "Barangay is required" }]}
          >
            <Select
              placeholder="Select Barangay"
              showSearch
              optionFilterProp="children"
              disabled={barangays.length === 0}
              className="h-11 rounded-xl"
              size="large"
            >
              {barangays.map((brgy) => (
                <Option key={brgy.brgyCode} value={brgy.brgyCode}>
                  {brgy.brgyDesc}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Form.Item name="zipCode" label="Zip Code">
          <Input
            placeholder="Zip Code"
            className="h-11 rounded-xl text-sm"
            size="large"
            maxLength={4}
          />
        </Form.Item>
      </div>

      <Divider className="my-6" />

      {/* Subscription Plan */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
          Subscription Plan
        </h3>

        <Form.Item
          name="subscriptionPlan"
          label="Plan"
          rules={[
            { required: true, message: "Please select a subscription plan" },
          ]}
        >
          <Select
            placeholder="Select a plan"
            className="h-11 rounded-xl"
            size="large"
          >
            <Option value="Basic">Basic</Option>
            <Option value="Standard">Standard</Option>
            <Option value="Premium">Premium</Option>
            <Option value="Enterprise">Enterprise</Option>
          </Select>
        </Form.Item>
      </div>

      {/* Owner Information - Create Mode Only */}
      {!isEditMode && (
        <>
          <Divider className="my-6" />

          <div className="mb-8">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
              Owner Information
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="ownerFirstName"
                label="First Name"
                rules={[
                  { required: true, message: "Owner first name is required" },
                ]}
              >
                <Input
                  placeholder="First name"
                  className="h-11 rounded-xl text-sm"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="ownerLastName"
                label="Last Name"
                rules={[
                  { required: true, message: "Owner last name is required" },
                ]}
              >
                <Input
                  placeholder="Last name"
                  className="h-11 rounded-xl text-sm"
                  size="large"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="ownerEmail"
              label="Owner Email"
              rules={[
                { required: true, message: "Owner email is required" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                prefix={<Mail className="w-4 h-4 text-gray-400" />}
                placeholder="owner@example.com"
                className="h-11 rounded-xl text-sm"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="ownerPassword"
              label="Password"
              rules={[validationRules.strongPassword()]}
            >
              <Input.Password
                placeholder="Create a strong password"
                className="h-11 rounded-xl text-sm"
                size="large"
                onChange={(e) => setOwnerPassword(e.target.value)}
              />
            </Form.Item>

            <PasswordStrengthIndicator password={ownerPassword} />
          </div>
        </>
      )}

      {/* Form Actions */}
      <div className="flex gap-3 pt-4">
        <Button onClick={onCancel} className="flex-1 h-11 rounded-xl">
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={
            createOrganizationMutation.isPending ||
            updateOrganizationMutation.isPending
          }
          className="flex-1 h-11 rounded-xl border-0"
          style={{
            background: "linear-gradient(135deg, #9333ea 0%, #ec4899 100%)",
          }}
        >
          {isEditMode ? "Update Organization" : "Create Organization"}
        </Button>
      </div>
    </Form>
  );
};

export default OrganizationForm;
