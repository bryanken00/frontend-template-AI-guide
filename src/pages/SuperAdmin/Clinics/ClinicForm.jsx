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
  useCreateClinic,
  useUpdateClinic,
} from "../../../services/requests/superadmin/clinics";
import {
  refregion,
  refprovince,
  refcitymun,
  refbrgy,
} from "../../../assets/address";
import {
  getProvincesByRegion,
  getCitiesByProvince,
  getBarangaysByCity,
} from "../../../utils/address";
import { formatPhoneNumber, phoneValidator } from "../../../utils/phoneFormat";
import { validationRules } from "../../../utils/validation";
import PasswordStrengthIndicator from "../../../components/PasswordStrengthIndicator";
import { getImageUrl } from "../../../utils/upload";
import { message as antMessage } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const ClinicForm = ({ clinic = null, onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [logoPreview, setLogoPreview] = useState(
    clinic?.logo ? getImageUrl(clinic.logo) : null,
  );
  const [logoFile, setLogoFile] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);
  const [ownerPassword, setOwnerPassword] = useState("");

  const createClinicMutation = useCreateClinic();
  const updateClinicMutation = useUpdateClinic();

  const isEditMode = !!clinic;

  useEffect(() => {
    if (clinic) {
      form.setFieldsValue({
        clinicName: clinic.name,
        phone: clinic.phone,
        email: clinic.email,
        address: clinic.address,
        regCode: clinic.regCode,
        provCode: clinic.provCode,
        citymunCode: clinic.citymunCode,
        brgyCode: clinic.brgyCode,
        zipCode: clinic.zipCode,
        status: clinic.status,
        subscriptionPlan: clinic.subscriptionPlan,
        website: clinic.website,
      });
      setLogoPreview(clinic.logo ? getImageUrl(clinic.logo) : null);
      setLogoFile(null);

      // Load cascading data for edit mode
      if (clinic.regCode) {
        const provinceList = getProvincesByRegion(clinic.regCode);
        setProvinces(provinceList);
      }
      if (clinic.provCode) {
        const cityList = getCitiesByProvince(clinic.provCode);
        setCities(cityList);
      }
      if (clinic.citymunCode) {
        const brgyList = getBarangaysByCity(clinic.citymunCode);
        setBarangays(brgyList);
      }
    } else {
      form.resetFields();
      form.setFieldsValue({
        status: "Active",
      });
      setLogoPreview(null);
      setLogoFile(null);
      setProvinces([]);
      setCities([]);
      setBarangays([]);
    }
  }, [clinic, form]);

  const handleRegionChange = (regCode) => {
    const provinceList = getProvincesByRegion(regCode);
    setProvinces(provinceList);
    setCities([]);
    setBarangays([]);
    form.setFieldsValue({
      provCode: undefined,
      citymunCode: undefined,
      brgyCode: undefined,
    });
  };

  const handleProvinceChange = (provCode) => {
    const cityList = getCitiesByProvince(provCode);
    setCities(cityList);
    setBarangays([]);
    form.setFieldsValue({
      citymunCode: undefined,
      brgyCode: undefined,
    });
  };

  const handleCityChange = (citymunCode) => {
    const brgyList = getBarangaysByCity(citymunCode);
    setBarangays(brgyList);
    form.setFieldsValue({
      brgyCode: undefined,
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // Create FormData
      const formData = new FormData();

      // Append all fields
      formData.append("name", values.clinicName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("address", values.address);
      formData.append("citymunCode", values.citymunCode);
      formData.append("provCode", values.provCode);
      formData.append("regCode", values.regCode);
      formData.append("status", values.status);

      // Optional fields
      if (values.website) formData.append("website", values.website);
      if (values.brgyCode) formData.append("brgyCode", values.brgyCode);
      if (values.zipCode) formData.append("zipCode", values.zipCode);
      if (values.subscriptionPlan)
        formData.append("subscriptionPlan", values.subscriptionPlan);

      // Append logo file if selected
      if (logoFile) {
        formData.append("logo", logoFile);
      }

      if (isEditMode) {
        await updateClinicMutation.mutateAsync({
          clinicId: clinic.clinicId,
          clinicData: formData,
        });
      } else {
        // For create, add owner information
        formData.append("ownerFirstName", values.ownerFirstName);
        formData.append("ownerLastName", values.ownerLastName);
        formData.append("ownerEmail", values.ownerEmail);
        formData.append("ownerPhone", values.ownerPhone);
        formData.append("ownerPassword", values.ownerPassword);

        await createClinicMutation.mutateAsync(formData);
      }

      form.resetFields();
      setLogoPreview(null);
      setLogoFile(null);
      setProvinces([]);
      setCities([]);
      setBarangays([]);
      onSuccess();
    } catch (error) {
      if (error.errorFields) return; // Form validation errors
      console.error("Form submission error:", error);
    }
  };

  const handleLogoChange = (info) => {
    const file = info.file.originFileObj || info.file;

    if (!file) return;

    // Validate file
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      antMessage.error("You can only upload image files!");
      return;
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      antMessage.error("Image must be smaller than 5MB!");
      return;
    }

    // Store file for later upload with form submission
    setLogoFile(file);

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => setLogoPreview(e.target.result);
    reader.readAsDataURL(file);

    antMessage.success("Logo selected! It will be uploaded when you save.");
  };

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-white to-slate-50 flex flex-col p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {isEditMode ? "Edit Clinic" : "Create New Clinic"}
          </h2>
        </div>
        <p className="text-sm text-slate-500 ml-11">
          {isEditMode
            ? "Update clinic details and settings"
            : "Register a new healthcare facility"}
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        className="flex-1 space-y-1"
      >
        {/* Basic Information Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
            Basic Information
          </h3>

          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Logo Upload */}
            <Form.Item name="logo" label="" className="col-span-1">
              <div className="relative">
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  beforeUpload={() => false}
                  onChange={handleLogoChange}
                  className="clinic-logo-upload"
                  showUploadList={false}
                >
                  <div className="w-full aspect-square flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl border-2 border-dashed border-slate-200 hover:border-purple-400 hover:bg-purple-50 transition-all cursor-pointer">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="clinic-logo"
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <>
                        <UploadIcon className="w-8 h-8 text-slate-300 mb-2" />
                        <span className="text-xs font-medium text-slate-500">
                          Upload Logo
                        </span>
                      </>
                    )}
                  </div>
                </Upload>
                <span className="text-xs text-slate-500 text-center mt-2 block">
                  PNG or JPG (Max 5MB)
                </span>
              </div>
            </Form.Item>

            {/* Clinic Name */}
            <Form.Item
              name="clinicName"
              label="Clinic Name"
              className="col-span-2"
              rules={[{ required: true, message: "Clinic name is required" }]}
            >
              <Input
                placeholder="St. Luke's Medical Center"
                className="h-11 rounded-xl text-sm"
                prefix={<Building2 className="w-4 h-4 text-slate-400 mr-2" />}
                size="large"
              />
            </Form.Item>
          </div>

          <Form.Item name="website" label="Website (Optional)">
            <Input
              placeholder="https://www.clinic.com"
              className="h-11 rounded-xl text-sm"
              size="large"
            />
          </Form.Item>
        </div>

        <Divider className="my-6" />

        {/* Owner Information - Create Mode Only */}
        {!isEditMode && (
          <>
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
                    placeholder="Juan"
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
                    placeholder="Dela Cruz"
                    className="h-11 rounded-xl text-sm"
                    size="large"
                  />
                </Form.Item>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="ownerEmail"
                  label="Email Address"
                  rules={[
                    { required: true, message: "Owner email is required" },
                    { type: "email", message: "Enter a valid email" },
                  ]}
                >
                  <Input
                    placeholder="owner@clinic.com"
                    className="h-11 rounded-xl text-sm"
                    prefix={<Mail className="w-4 h-4 text-slate-400 mr-2" />}
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="ownerPhone"
                  label="Phone Number"
                  rules={[{ validator: phoneValidator }]}
                >
                  <Input
                    placeholder="09XX XXX XXXX"
                    className="h-11 rounded-xl text-sm"
                    prefix={<Phone className="w-4 h-4 text-slate-400 mr-2" />}
                    size="large"
                    maxLength={11}
                    onBlur={(e) => {
                      const formatted = formatPhoneNumber(e.target.value);
                      form.setFieldsValue({ ownerPhone: formatted });
                    }}
                  />
                </Form.Item>
              </div>

              <Form.Item
                name="ownerPassword"
                label="Temporary Password"
                rules={[validationRules.strongPassword(8)]}
              >
                <Input.Password
                  placeholder="Enter temporary password"
                  className="h-11 rounded-xl text-sm"
                  size="large"
                  onChange={(e) => setOwnerPassword(e.target.value)}
                />
              </Form.Item>

              <PasswordStrengthIndicator password={ownerPassword} />

              <p className="text-xs text-slate-500 mt-3">
                This will be the clinic owner's admin account credentials.
              </p>
            </div>

            <Divider className="my-6" />
          </>
        )}

        {/* Contact Information Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
            Contact Information
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ validator: phoneValidator }]}
            >
              <Input
                placeholder="09XX XXX XXXX"
                className="h-11 rounded-xl text-sm"
                prefix={<Phone className="w-4 h-4 text-slate-400 mr-2" />}
                size="large"
                maxLength={11}
                onBlur={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  form.setFieldsValue({ phone: formatted });
                }}
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input
                placeholder="clinic@example.com"
                className="h-11 rounded-xl text-sm"
                prefix={<Mail className="w-4 h-4 text-slate-400 mr-2" />}
                size="large"
              />
            </Form.Item>
          </div>
        </div>

        <Divider className="my-6" />

        {/* Address Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
            Location
          </h3>

          <Form.Item
            name="address"
            label="Street Address"
            rules={[{ required: true, message: "Street address is required" }]}
          >
            <Input
              placeholder="1234 Medical Ave, Building A"
              className="h-11 rounded-xl text-sm"
              prefix={<MapPin className="w-4 h-4 text-slate-400 mr-2" />}
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
                placeholder="Select region"
                className="h-11 rounded-xl text-sm"
                size="large"
                showSearch
                optionFilterProp="children"
                onChange={handleRegionChange}
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
                placeholder="Select province"
                className="h-11 rounded-xl text-sm"
                size="large"
                showSearch
                optionFilterProp="children"
                onChange={handleProvinceChange}
                disabled={!provinces.length}
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
              label="City/Municipality"
              rules={[
                { required: true, message: "City/Municipality is required" },
              ]}
            >
              <Select
                placeholder="Select city/municipality"
                className="h-11 rounded-xl text-sm"
                size="large"
                showSearch
                optionFilterProp="children"
                onChange={handleCityChange}
                disabled={!cities.length}
              >
                {cities.map((city) => (
                  <Option key={city.citymunCode} value={city.citymunCode}>
                    {city.citymunDesc}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="brgyCode" label="Barangay (Optional)">
              <Select
                placeholder="Select barangay"
                className="h-11 rounded-xl text-sm"
                size="large"
                showSearch
                optionFilterProp="children"
                disabled={!barangays.length}
                allowClear
              >
                {barangays.map((brgy) => (
                  <Option key={brgy.brgyCode} value={brgy.brgyCode}>
                    {brgy.brgyDesc}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item name="zipCode" label="Zip Code (Optional)">
            <Input
              placeholder="1000"
              className="h-11 rounded-xl text-sm"
              size="large"
            />
          </Form.Item>
        </div>

        <Divider className="my-6" />

        {/* Subscription & Status Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
            Subscription & Status
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="subscriptionPlan"
              label="Subscription Plan (Optional)"
            >
              <Select
                placeholder="Select a plan"
                className="h-11 rounded-xl text-sm"
                size="large"
                allowClear
              >
                <Option value="Basic">
                  <span className="font-medium">Basic</span> — ₱2,999/month
                </Option>
                <Option value="Standard">
                  <span className="font-medium">Standard</span> — ₱5,999/month
                </Option>
                <Option value="Premium">
                  <span className="font-medium">Premium</span> — ₱9,999/month
                </Option>
                <Option value="Enterprise">
                  <span className="font-medium">Enterprise</span> — Custom
                  pricing
                </Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              initialValue="Active"
              rules={[{ required: true, message: "Please select a status" }]}
            >
              <Select
                placeholder="Select status"
                className="h-11 rounded-xl text-sm"
                size="large"
              >
                <Option value="Active">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Active
                  </span>
                </Option>
                <Option value="Inactive">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-slate-300 rounded-full"></span>
                    Inactive
                  </span>
                </Option>
                <Option value="Suspended">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    Suspended
                  </span>
                </Option>
                <Option value="Pending">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Pending
                  </span>
                </Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        {/* Description - Create Mode Only */}
        {!isEditMode && (
          <>
            <Divider className="my-6" />
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
                Additional Information
              </h3>

              <Form.Item name="description" label="Description (Optional)">
                <TextArea
                  rows={3}
                  placeholder="Brief description about your clinic, services, specialties..."
                  className="rounded-xl text-sm"
                  maxLength={500}
                  showCount
                />
              </Form.Item>
            </div>
          </>
        )}
      </Form>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end gap-3">
        <Button
          onClick={onCancel}
          className="h-11 px-6 rounded-xl font-medium text-slate-700 border-slate-200 hover:bg-slate-50"
          size="large"
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={
            createClinicMutation.isPending || updateClinicMutation.isPending
          }
          className="h-11 px-8 rounded-xl font-medium border-none text-white"
          style={{
            background: "linear-gradient(135deg, #9333ea 0%, #ec4899 100%)",
          }}
          size="large"
        >
          {isEditMode ? "Update Clinic" : "Create Clinic"}
        </Button>
      </div>
    </div>
  );
};

export default ClinicForm;
