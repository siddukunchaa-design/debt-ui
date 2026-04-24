# Dynamic Page Plan (Reusable)

This single plan file provides a template and instructions to create any page in this React + Vite project. Use it to scaffold pages consistently.

---

## How to use
1. Copy the "Page Template" section into a new folder under `src/pages/` named after your page (e.g., `src/pages/Dashboard/`).
2. Replace `{{PageName}}` with the page name (PascalCase) and `{{page-name}}` with the kebab-case class name.
3. Register the page route in `src/routes/AppRoutes.tsx` (see Routing section).

---

## Folder Structure (recommended)
- src/
  - assets/
  - components/
  - pages/
    - {{PageName}}/
      - {{PageName}}.tsx
      - {{PageName}}.module.css   # or .css / Tailwind classes
  - routes/
    - AppRoutes.tsx
  - context/
  - services/
  - styles/

---

## Page Template
Copy this template and replace placeholders.

File: `src/pages/{{PageName}}/{{PageName}}.tsx`

```tsx
import React, { useEffect, useState } from 'react'
import './{{PageName}}.module.css'

export default function {{PageName}}() {
  // local state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // optional: fetch data on mount
  }, [])

  return (
    <div className="{{page-name}} page-container">
      <header className="page-header">
        <h1>{{PageTitle}}</h1>
      </header>

      <main className="page-body">
        {/* TODO: add page content */}
      </main>

      {error && <div role="alert" className="error">{error}</div>}
    </div>
  )
}
```

File: `src/pages/{{PageName}}/{{PageName}}.module.css`

```css
.{{page-name}} {
  padding: 1rem;
}

.page-header h1 {
  font-size: 1.75rem;
}
```

Notes:
- If you use Tailwind CSS in this project, omit the CSS file and use Tailwind utility classes inside the JSX.
- Keep the root `div` className consistent: use `{{page-name}}` so tests and layout hooks can target pages predictably.

---

## Routing
- Add an import and route entry in `src/routes/AppRoutes.tsx` (or `src/App.tsx` if routes live there):

```tsx
import {{PageName}} from '../pages/{{PageName}}/{{PageName}}'

// in <Routes>
<Route path="/{{route-path}}" element={<ProtectedRoute><{{PageName}}/></ProtectedRoute>} />
```

Replace `{{route-path}}` with the URL path (e.g., `upload-customer-list`).

---

## Data & Services
- Page code should call functions in `src/services/` (or `src/api/client.ts`) rather than calling fetch in the component.
- Example: `services/customers.ts` exports `uploadCustomerList(file)` and `fetchCustomers()`.

---

## Accessibility & Testing Requirements
Each page should meet these acceptance criteria:
- Renders without runtime errors
- Has a clear heading (h1) describing the page
- Keyboard navigable elements (buttons, inputs)
- ARIA roles and labels where appropriate
- Unit tests / smoke tests:
  - Mounts with mocked dependencies
  - Shows loading, success and error states

---

## Example: Dashboard, Login, UploadCustomerList
Below are quick mappings you can use by replacing the placeholders in the template above.

- Dashboard
  - PageName: `Dashboard`
  - page-name: `dashboard`
  - route-path: `` (root) or `dashboard`
  - Purpose: show debt summary and navigation

- Login
  - PageName: `Login`
  - page-name: `login`
  - route-path: `login`
  - Purpose: authentication interface (Firebase / OAuth)

- UploadCustomerList
  - PageName: `UploadCustomerList`
  - page-name: `upload-customer-list`
  - route-path: `upload-customer-list`
  - Purpose: drag-and-drop upload for Excel files, client validation, POST to `/api/upload/customer-list`

---

## Acceptance Checklist (copy into PR description)
- [ ] Page files added under `src/pages/{{PageName}}/`
- [ ] Route registered in `AppRoutes.tsx`
- [ ] Uses `services/` for API calls (no fetch inline)
- [ ] Loading, success, and error states implemented
- [ ] Mobile responsive layout
- [ ] Basic unit tests present (mounts and key behaviors)

---

## Scaffolding Script (optional)
If you want, create a small Node script to scaffold a page from this template (replaces placeholders) and wire up routes automatically.

---

Created: 2026-04-21
