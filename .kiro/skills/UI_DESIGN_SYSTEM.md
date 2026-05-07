# UI Design System — Admin Portal Template

## How to use this file

- **Build a new page:** Paste this file as context and say _"Build a [Page Name] page following this design system."_
- **Update an existing page:** Paste this file + the current file and say _"Update this page to follow the design system."_

---

## Theme Configuration

All colors are defined in **`src/index.css`** under the `@theme` block. To rebrand, change the values there — everything else follows automatically.

> 📁 **Reference:** Open [`src/index.css`](src/index.css) to view and edit all available CSS variables.

---

## RULES — follow these exactly, no exceptions

1. Root wrapper is always `<div className="p-6 space-y-5">` — never add `min-h-screen`, `mx-12`, or background gradients on the root.
2. Page header is always a flat `flex items-center justify-between` row — never a colored banner or card.
3. Stat cards are plain `<div>` elements — never Ant Design `<Card>`.
4. Section content cards use Ant Design `<Card className="shadow-lg border-0">` — never `shadow-sm`, never add a border color.
5. The table is wrapped in a plain `<div>` with `rounded-2xl bg-white ring-1 ring-gray-100 overflow-hidden` — never inside a `<Card>`.
6. Search input inside the filter panel always uses Ant Design `<Input prefix={...}>` — never a raw `<input>`.
7. "Clear all" is always a plain `<button>` text link — never an Ant Design `<Button>`.
8. All icons are from `lucide-react` only.
9. Font is **Poppins** — do not override it anywhere.
10. Never use `rounded-3xl` or `rounded-full` on layout containers — only on tags/badges.
11. **Never hardcode color hex values in inline styles.** Always use CSS variables via `var(--color-*)` or `var(--gradient-*)`.

---

## Reusable Components

### StatCard — `src/components/StatCard.jsx`

**Always import from the shared component — never define it inline.**

```jsx
import StatCard from "@/components/StatCard";
// or with relative path:
import StatCard from "../../../../components/StatCard";
```

Props:

| Prop        | Type            | Required | Description                                                                      |
| ----------- | --------------- | -------- | -------------------------------------------------------------------------------- |
| `title`     | `string`        | ✓        | Label above the value (truncates if too long)                                    |
| `value`     | `string/number` | ✓        | The big number                                                                   |
| `icon`      | `ReactNode`     | ✓        | Lucide icon, e.g. `<Users className="w-5 h-5" />`                                |
| `color`     | `string`        | ✓        | Tailwind gradient for bottom bar, e.g. `"from-primary-color to-secondary-color"` |
| `bgColor`   | `string`        | ✓        | Icon box background, e.g. `"bg-primary-pale"`                                    |
| `textColor` | `string`        | ✓        | Icon color, e.g. `"text-primary-color"`                                          |
| `change`    | `string`        | —        | Optional caption below the value                                                 |

Layout: Title and value stack on the left, icon box on the right. A colored 1px bar runs along the bottom.

Usage example:

```jsx
<Row gutter={[16, 16]}>
  <Col xs={24} sm={12} lg={6}>
    <StatCard
      title="Total Users"
      value={42}
      icon={<Users className="w-5 h-5" />}
      color="from-primary-color to-secondary-color"
      bgColor="bg-primary-pale"
      textColor="text-primary-color"
      change="+5 this month"
    />
  </Col>
</Row>
```

---

### DelayButton — `src/components/DelayButton.jsx`

**Use instead of Ant Design `<Button>` for primary actions that trigger API calls (create, refresh, delete).**

```jsx
import DelayButton from "../../../../components/DelayButton";
```

Props: Same as Ant Design `<Button>` plus:

| Prop           | Type      | Required | Description                                      |
| -------------- | --------- | -------- | ------------------------------------------------ |
| `isLoading`    | `boolean` | —        | Shows loading state                              |
| `showSpinIcon` | `boolean` | —        | Shows spin icon instead of default loading style |

Usage example:

```jsx
<DelayButton
  type="primary"
  icon={<PlusOutlined />}
  onClick={handleOpenCreateDrawer}
  size="large"
  style={{
    background: "var(--gradient-primary)",
    border: "none",
    boxShadow:
      "0 4px 12px color-mix(in srgb, var(--color-primary-color) 35%, transparent)",
  }}
>
  Add New User
</DelayButton>
```

---

## Tech Stack

- React + Ant Design + Tailwind CSS + lucide-react
- Font: Poppins (all weights)
- Theme: CSS variables in `src/index.css`

---

## Complete Page Skeleton

This is the exact structure every page follows. Replace the placeholder comments with real content.

```jsx
import {
  DeleteOutlined,
  FilterOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Col,
  Drawer,
  Empty,
  Input,
  Popconfirm,
  Row,
  Select,
  Spin,
  Table,
  Typography,
} from "antd";
import { Search, SomeLucideIcon } from "lucide-react";
import { useState } from "react";
import DelayButton from "../../../../components/DelayButton";
import StatCard from "../../../../components/StatCard";

const { Title, Text } = Typography;

// ─── Page component ───────────────────────────────────────────────────────────
const MyPage = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  // ... other state and hooks

  const hasActiveFilters = false; // derive from filter state

  // Error state — show alert and return early
  if (error) {
    return (
      <div className="p-6">
        <Alert
          message="Error Loading Data"
          description={
            error.message || "Failed to load data. Please try again."
          }
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5">
      {/* 1. PAGE HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <Title level={2} className="mb-1! flex items-center gap-3">
            <div
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl shadow-md"
              style={{ background: "var(--gradient-primary)" }}
            >
              <SomeLucideIcon className="w-5 h-5 text-white" />
            </div>
            Page Title
          </Title>
          <Text
            style={{ color: "var(--color-text-secondary)" }}
            className="text-sm"
          >
            Subtitle / description
          </Text>
        </div>
        {canWrite && (
          <DelayButton
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {}}
            size="large"
            style={{
              background: "var(--gradient-primary)",
              border: "none",
              boxShadow:
                "0 4px 12px color-mix(in srgb, var(--color-primary-color) 35%, transparent)",
            }}
          >
            Add Item
          </DelayButton>
        )}
      </div>

      {/* 2. STAT CARDS */}
      <Row gutter={[16, 16]}>
        {statCards.map((card, i) => (
          <Col xs={24} sm={12} lg={6} key={i}>
            <StatCard {...card} />
          </Col>
        ))}
      </Row>

      {/* 3. ACTION BAR */}
      <div className="flex flex-wrap gap-2 items-center">
        <DelayButton
          icon={<ReloadOutlined />}
          onClick={() => refetch?.()}
          isLoading={isFetching}
          showSpinIcon
          size="middle"
          style={{
            borderColor: "var(--color-primary-color)",
            color: "var(--color-primary-color)",
          }}
        >
          Refresh
        </DelayButton>
        <Button
          icon={<FilterOutlined />}
          onClick={() => setIsFilterVisible(!isFilterVisible)}
          size="middle"
          style={
            isFilterVisible || hasActiveFilters
              ? {
                  borderColor: "var(--color-primary-color)",
                  color: "var(--color-primary-color)",
                  background: "var(--color-primary-pale)",
                }
              : {
                  borderColor: "var(--color-primary-color)",
                  color: "var(--color-primary-color)",
                }
          }
        >
          Filters
          {hasActiveFilters && (
            <span
              className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-white text-[10px] font-bold"
              style={{ background: "var(--color-primary-color)" }}
            >
              !
            </span>
          )}
        </Button>
        {/* Bulk delete — only visible when rows are selected and user has write permission */}
        {hasSelectedRows && canWrite && (
          <Popconfirm
            title="Delete Selected Items"
            description={`Are you sure you want to delete ${selectedRowKeys.length} item(s)?`}
            onConfirm={handleBulkDelete}
            okText="Delete"
            okType="danger"
            cancelText="Cancel"
          >
            <DelayButton
              danger
              icon={<DeleteOutlined />}
              isLoading={isLoading}
              showSpinIcon
              size="middle"
            >
              Delete Selected ({selectedRowKeys.length})
            </DelayButton>
          </Popconfirm>
        )}
      </div>

      {/* 4. FILTER PANEL */}
      {isFilterVisible && (
        <div
          className="rounded-xl p-4"
          style={{
            background:
              "color-mix(in srgb, var(--color-primary-pale) 50%, white)",
            border: "1px solid var(--color-primary-pale)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Search
              </label>
              <Input
                placeholder="Search..."
                prefix={<Search className="w-3.5 h-3.5 text-gray-400" />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="middle"
                className={isSearching ? "bg-yellow-50 border-yellow-300" : ""}
              />
            </div>
            {/* Add <Select> filters here, same label pattern */}
            <div className="flex flex-col">
              <span className="block text-xs font-semibold text-transparent mb-1.5 uppercase tracking-wide select-none">
                &nbsp;
              </span>
              <button
                onClick={handleClearFilters}
                className="text-sm hover:underline cursor-pointer transition-colors font-medium h-8 flex items-center"
                style={{ color: "var(--color-primary-color)" }}
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. TABLE */}
      <div
        className="rounded-2xl bg-white ring-1 ring-gray-100 overflow-hidden"
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0,0,0,0.07), 0 10px 15px -3px rgba(0,0,0,0.07)",
        }}
      >
        {!isLoading && !data?.items?.length ? (
          <div className="flex items-center justify-center py-20">
            <Empty description="No items found">
              {canWrite && (
                <DelayButton
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {}}
                  className="mt-4"
                  style={{
                    background: "var(--gradient-primary)",
                    border: "none",
                  }}
                >
                  Add First Item
                </DelayButton>
              )}
            </Empty>
          </div>
        ) : (
          <Table
            dataSource={data?.items}
            columns={columns}
            rowSelection={canWrite ? rowSelection : null}
            loading={{
              spinning: isLoading,
              indicator: <Spin size="large" style={{ marginTop: 50 }} />,
            }}
            rowKey="id"
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: data?.pagination?.total || 0,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}–${range[1]} of ${total} items`,
              pageSizeOptions: ["10", "20", "50", "100"],
              size: "default",
              responsive: true,
              className: "px-6 py-3",
            }}
            onChange={handleTableChange}
            scroll={{ x: 1200 }}
            size="middle"
            className="border-none"
            rowClassName="hover:bg-primary-pale/30 transition-colors"
          />
        )}
      </div>

      {/* 6. DRAWERS & MODALS (at the bottom of the component) */}
      {/* Create Drawer */}
      <Drawer
        title={
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl"
              style={{ background: "var(--gradient-primary)" }}
            >
              <SomeLucideIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2
                className="text-lg font-bold"
                style={{ color: "var(--color-text-dark)" }}
              >
                Add New Item
              </h2>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Create a new record
              </p>
            </div>
          </div>
        }
        placement="right"
        onClose={handleCloseCreateDrawer}
        open={isCreateDrawerOpen}
        width={720}
        styles={{ body: { paddingBottom: 0 } }}
        footer={null}
      >
        {/* Form component */}
      </Drawer>

      {/* Edit Drawer */}
      <Drawer
        title={
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl"
              style={{ background: "var(--gradient-primary)" }}
            >
              <SomeLucideIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2
                className="text-lg font-bold"
                style={{ color: "var(--color-text-dark)" }}
              >
                Edit Item
              </h2>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Update information
              </p>
            </div>
          </div>
        }
        placement="right"
        onClose={handleCloseEditDrawer}
        open={!!editingItem}
        width={720}
        styles={{ body: { paddingBottom: 0 } }}
        footer={null}
      >
        {/* Form component with existing data */}
      </Drawer>
    </div>
  );
};

export default MyPage;
```

---

## Stat Card Color Themes

Use Tailwind classes that reference your `@theme` variables. Mix across cards on the same page.

| Theme     | `color` (bottom bar)                     | `bgColor`           | `textColor`            |
| --------- | ---------------------------------------- | ------------------- | ---------------------- |
| Primary   | `from-primary-color to-secondary-color`  | `bg-primary-pale`   | `text-primary-color`   |
| Secondary | `from-secondary-color to-secondary-dark` | `bg-secondary-pale` | `text-secondary-color` |
| Success   | `from-emerald-400 to-emerald-600`        | `bg-emerald-100`    | `text-emerald-600`     |
| Warning   | `from-orange-400 to-orange-600`          | `bg-orange-100`     | `text-orange-600`      |
| Amber     | `from-amber-400 to-amber-600`            | `bg-amber-100`      | `text-amber-600`       |
| Rose      | `from-rose-400 to-rose-600`              | `bg-rose-100`       | `text-rose-600`        |

---

## Header Icon Gradient

Always use `var(--gradient-primary)` via inline style on the `w-10 h-10` container:

```jsx
<div
  className="inline-flex items-center justify-center w-10 h-10 rounded-xl shadow-md"
  style={{ background: "var(--gradient-primary)" }}
>
  <LucideIcon className="w-5 h-5 text-white" />
</div>
```

For alternate contexts (settings, finance), define additional gradient variables in `index.css` if needed.

---

## Filter Panel — Select Filter Template

Every `<Select>` filter inside the panel follows this exact pattern:

```jsx
<div>
  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
    Label
  </label>
  <Select
    value={filterValue || undefined}
    onChange={setFilterValue}
    placeholder="All items"
    allowClear
    className="w-full"
    size="middle"
    options={[
      { value: "Option1", label: "Option 1" },
      { value: "Option2", label: "Option 2" },
    ]}
  />
</div>
```

---

## Filter Panel — Grid Sizing

Adjust the grid columns based on the number of filters:

| Filters (incl. search + clear) | Grid classes                                               |
| ------------------------------ | ---------------------------------------------------------- |
| 3–4 items                      | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`                |
| 5–6 items                      | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6` |

---

## Table Column Patterns

```jsx
// ID — monospace, muted
{ title: "ID", render: (id) => <span className="font-mono text-sm font-semibold text-text-muted">{id}</span> }

// Primary + sub-text stacked
{
  title: "Name",
  render: (_, r) => (
    <div className="min-w-0">
      <div className="font-semibold text-text-dark truncate">{r.name}</div>
      <div className="text-xs text-text-secondary mt-0.5">{r.subtitle}</div>
    </div>
  ),
}

// Two-line contact
{
  title: "Contact",
  render: (_, r) => (
    <div className="min-w-0">
      <div className="text-sm text-text-dark">{r.phone}</div>
      <div className="text-xs text-text-secondary truncate">{r.email}</div>
    </div>
  ),
}

// Status tag
{ title: "Status", render: (s) => <Tag color={s === "Active" ? "success" : "default"}>{s}</Tag> }

// Pill tag
<Tag color="blue" className="rounded-full text-xs">Label</Tag>

// Actions dropdown
{
  title: "Actions", key: "actions", fixed: "right", width: 80,
  render: (_, r) => (
    <Dropdown menu={{ items: getActionItems(r) }} trigger={["click"]}>
      <Button type="text" icon={<MoreVertical className="w-4 h-4" />} className="hover:bg-gray-100" />
    </Dropdown>
  ),
}
```

---

## Drawer Pattern

All drawers follow this structure:

```jsx
<Drawer
  title={
    <div className="flex items-center gap-3">
      <div
        className="p-2.5 rounded-xl"
        style={{ background: "var(--gradient-primary)" }}
      >
        <LucideIcon className="w-5 h-5 text-white" />
      </div>
      <div>
        <h2
          className="text-lg font-bold"
          style={{ color: "var(--color-text-dark)" }}
        >
          Drawer Title
        </h2>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Drawer subtitle
        </p>
      </div>
    </div>
  }
  placement="right"
  onClose={handleClose}
  open={isOpen}
  width={720}
  styles={{ body: { paddingBottom: 0 } }}
  footer={null}
>
  {/* Content */}
</Drawer>
```

**Drawer width guidelines:**

| Content type          | Width |
| --------------------- | ----- |
| Standard form         | 720   |
| Wide content / tables | 1000  |

---

## Section Cards (non-table content)

```jsx
<Card
  title={
    <div className="flex items-center gap-2">
      <LucideIcon className="w-5 h-5 text-primary-color" />
      <span>Section Title</span>
    </div>
  }
  className="shadow-lg border-0"
>
  {/* content */}
</Card>;

{
  /* Full height (inside a Row/Col) */
}
<Card title="..." className="shadow-lg border-0 h-full">
  ...
</Card>;
```

---

## Typography

| Element       | Code                                                                             |
| ------------- | -------------------------------------------------------------------------------- |
| Page title    | `<Title level={2} className="mb-1! flex items-center gap-3">`                    |
| Section title | `<Title level={4}>` or `<span>` inside Card `title` prop                         |
| Body          | `<Text>` (Ant Design)                                                            |
| Subtitle      | `<Text className="text-sm" style={{ color: "var(--color-text-secondary)" }}>`    |
| Stat value    | `<p className="text-3xl font-bold" style={{ color: "var(--color-text-dark)" }}>` |
| Meta / label  | `<p className="text-xs" style={{ color: "var(--color-text-muted)" }}>`           |

---

## Spacing & Sizing Cheatsheet

| Thing                  | Value                  |
| ---------------------- | ---------------------- |
| Page padding           | `p-6`                  |
| Section gap            | `space-y-5`            |
| Grid gutter            | `gutter={[16, 16]}`    |
| Header icon container  | `w-10 h-10 rounded-xl` |
| Header icon            | `w-5 h-5`              |
| Stat card icon box     | `p-3 rounded-xl`       |
| Card title icon        | `w-5 h-5`              |
| List item icon         | `w-4 h-4`              |
| Action dropdown icon   | `w-4 h-4`              |
| Item row corners       | `rounded-xl`           |
| Card / wrapper corners | `rounded-2xl`          |
| Drawer icon container  | `p-2.5 rounded-xl`     |

---

## Color Usage Rules

**Always use CSS variables for colors in inline styles:**

```jsx
// ✅ Correct
style={{ color: "var(--color-primary-color)" }}
style={{ background: "var(--gradient-primary)" }}
style={{ borderColor: "var(--color-primary-color)" }}

// ❌ Wrong — never hardcode hex
style={{ color: "#3b82f6" }}
style={{ background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)" }}
```

**For Tailwind classes, use your `@theme` custom colors:**

```jsx
// ✅ Correct — references @theme variables
className = "text-primary-color";
className = "bg-primary-pale";
className = "border-primary-color";

// ❌ Avoid when possible — hardcoded Tailwind palette
className = "text-blue-600";
className = "bg-blue-50";
```

**Box shadow with theme color:**

```jsx
style={{
  boxShadow: "0 4px 12px color-mix(in srgb, var(--color-primary-color) 35%, transparent)",
}}
```

---

## Button Style Reference

| Button type       | Style                                                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Primary action    | `style={{ background: "var(--gradient-primary)", border: "none", boxShadow: "0 4px 12px color-mix(in srgb, var(--color-primary-color) 35%, transparent)" }}` |
| Refresh / outline | `style={{ borderColor: "var(--color-primary-color)", color: "var(--color-primary-color)" }}`                                                                 |
| Filter active     | `style={{ borderColor: "var(--color-primary-color)", color: "var(--color-primary-color)", background: "var(--color-primary-pale)" }}`                        |
| Danger / delete   | Use Ant Design `danger` prop on `<DelayButton>`                                                                                                              |

---

## Table Box Shadow

Always use this exact shadow on the table wrapper:

```jsx
style={{
  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.07), 0 10px 15px -3px rgba(0,0,0,0.07)",
}}
```

---

## Permission-Gated UI Pattern

Wrap write-only actions (create, edit, delete) with a permission check:

```jsx
{
  canWrite && (
    <DelayButton
      type="primary"
      icon={<PlusOutlined />}
      onClick={handleCreate}
      style={{
        background: "var(--gradient-primary)",
        border: "none",
        boxShadow:
          "0 4px 12px color-mix(in srgb, var(--color-primary-color) 35%, transparent)",
      }}
    >
      Add Item
    </DelayButton>
  );
}
```

Apply to:

- Header "Add" button
- Bulk delete button
- Empty state "Add First" button
- Row selection (`rowSelection={canWrite ? rowSelection : null}`)

---

## Conditional Stat Cards

Stat cards can be conditionally rendered based on state:

```jsx
<Row gutter={[16, 16]}>
  <Col xs={24} sm={12} lg={6}>
    <StatCard title="Total" value={total} ... />
  </Col>
  <Col xs={24} sm={12} lg={6}>
    <StatCard title="Active" value={active} ... />
  </Col>
  <Col xs={24} sm={12} lg={6}>
    <StatCard title="Inactive" value={inactive} ... />
  </Col>
  {hasSelectedRows && (
    <Col xs={24} sm={12} lg={6}>
      <StatCard title="Selected" value={selectedCount} ... />
    </Col>
  )}
</Row>
```

---

## Error State Pattern

Always handle error state with an early return before the main layout:

```jsx
if (error) {
  return (
    <div className="p-6">
      <Alert
        message="Error Loading Data"
        description={error.message || "Failed to load data. Please try again."}
        type="error"
        showIcon
      />
    </div>
  );
}
```
