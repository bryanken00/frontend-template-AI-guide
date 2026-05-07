# API Service Guide

## Folder Structure

```
src/services/
├── api/                          # Raw API calls (axios)
│   ├── axios.js                  # Axios instance + interceptors
│   ├── [portal]/                 # admin/ or superadmin/
│   │   ├── [module].js           # If module has NO sub-modules
│   │   └── [module]/             # If module HAS sub-modules
│   │       ├── [submodule].js
│   │       └── [submodule].js
│   │
│   ├── admin/
│   │   ├── auth.js
│   │   ├── user.js
│   │   ├── roles.js
│   │   ├── permissions.js
│   │   └── user-permissions.js
│   └── superadmin/
│       ├── auth.js
│       └── organizations.js
│
└── requests/                     # React Query hooks (same structure as api/)
    ├── [portal]/
    │   ├── [module].js
    │   └── [module]/
    │       ├── [submodule].js
    │       └── [submodule].js
    │
    ├── admin/
    │   ├── auth.js
    │   └── user.js
    └── superadmin/
        ├── auth.js
        └── organizations.js
```

---

## Rules

1. **`api/` files** — Raw axios calls only. No React hooks, no state, no UI logic.
2. **`requests/` files** — React Query hooks (`useQuery`, `useMutation`). Import from the corresponding `api/` file.
3. **No try/catch** — Let errors propagate to React Query's `onError` handlers.
4. **Folder mirrors** — `api/` and `requests/` always have the same folder structure.
5. **File naming** — Use the module name in lowercase (e.g., `user.js`, `roles.js`, `organizations.js`).

---

## Step-by-Step: Adding a New API Module

### 1. Create the API file

**Location:** `src/services/api/[portal]/[module].js`

```js
import { createAxiosInstanceWithInterceptor, userTypeAuth } from "../axios";

const api = createAxiosInstanceWithInterceptor("data", userTypeAuth.admin);

export const getItemsApi = async (filters = {}) => {
  const response = await api.get("/api/v1/admin/items", { params: filters });
  return response.data;
};

export const getItemByIdApi = async (itemId) => {
  const response = await api.get(`/api/v1/admin/items/${itemId}`);
  return response.data;
};

export const createItemApi = async (itemData) => {
  const response = await api.post("/api/v1/admin/items", itemData);
  return response.data;
};

export const updateItemApi = async (itemId, itemData) => {
  const response = await api.put(`/api/v1/admin/items/${itemId}`, itemData);
  return response.data;
};

export const deleteItemApi = async (itemId) => {
  const response = await api.delete(`/api/v1/admin/items/${itemId}`);
  return response.data;
};
```

---

### 2. Create the React Query hooks file

**Location:** `src/services/requests/[portal]/[module].js`

```js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import {
  getItemsApi,
  getItemByIdApi,
  createItemApi,
  updateItemApi,
  deleteItemApi,
} from "../../api/admin/items";

// Query: Get all items
export const useGetItems = (filters = {}) => {
  return useQuery({
    queryKey: ["items", filters],
    queryFn: () => getItemsApi(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Query: Get single item
export const useGetItemById = (itemId) => {
  return useQuery({
    queryKey: ["items", itemId],
    queryFn: () => getItemByIdApi(itemId),
    enabled: !!itemId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Mutation: Create item
export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createItemApi,
    onSuccess: () => {
      message.success("Item created successfully");
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "Failed to create item");
    },
  });
};

// Mutation: Update item
export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, itemData }) => updateItemApi(itemId, itemData),
    onSuccess: (data, variables) => {
      message.success("Item updated successfully");
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["items", variables.itemId] });
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "Failed to update item");
    },
  });
};

// Mutation: Delete item
export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItemApi,
    onSuccess: () => {
      message.success("Item deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "Failed to delete item");
    },
  });
};
```

---

## Patterns

### API file pattern (no try/catch)

```js
// ✅ Correct — clean, errors propagate naturally
export const getItemsApi = async (filters = {}) => {
  const response = await api.get("/api/v1/admin/items", { params: filters });
  return response.data;
};

// ❌ Wrong — unnecessary try/catch that just re-throws
export const getItemsApi = async (filters = {}) => {
  try {
    const response = await api.get("/api/v1/admin/items", { params: filters });
    return response.data;
  } catch (error) {
    throw error;
  }
};
```

### Multipart form data (file uploads)

```js
export const createItemWithFileApi = async (itemData) => {
  const response = await api.post("/api/v1/admin/items", itemData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
```

### Query key conventions

| Pattern         | Example                            |
| --------------- | ---------------------------------- |
| List all        | `["items", filters]`               |
| Single item     | `["items", itemId]`                |
| Nested resource | `["items", itemId, "permissions"]` |
| Invalidate all  | `queryKey: ["items"]`              |

---

## Checklist when adding a new API module

- [ ] Created `src/services/api/[portal]/[module].js` with all CRUD functions
- [ ] Created `src/services/requests/[portal]/[module].js` with React Query hooks
- [ ] No try/catch wrappers
- [ ] Used consistent query keys
