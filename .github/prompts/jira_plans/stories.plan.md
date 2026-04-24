# JIRA Stories Plan

This plan provides a template and guidelines for creating well-structured JIRA stories with proper descriptions, acceptance criteria, and technical details.

---

## How to Use

1. **Story Type Selection**: Choose the appropriate type (User Story, Task, Bug, Enhancement).
2. **Fill Required Fields**: Replace placeholders (`{{}}`) with specific values.
3. **Write Clear Acceptance Criteria**: Use the provided format to ensure stories are testable.
4. **Link Related Work**: Reference epics, parent tasks, and dependent stories.
5. **Estimate & Assign**: Add story points and assign to the appropriate team member.

---

## Story Template: User Story

### Title
`{{Feature Name}} - {{Action}} {{Object}}`

**Example:** `Dashboard - Display user expense summary`

### Description

```
As a {{user role}}
I want to {{action/capability}}
So that {{business value/benefit}}

## Context
{{Brief explanation of the context, why this matters, any background}}

## Technical Considerations
- {{Technical constraint or consideration}}
- {{Integration point if applicable}}
- {{Performance requirement if applicable}}
```

### Acceptance Criteria

```
- [ ] Given {{initial state}}, when {{user action}}, then {{expected outcome}}
- [ ] Given {{initial state}}, when {{user action}}, then {{expected outcome}}
- [ ] The {{component/feature}} displays {{specific data}} in {{format}}
- [ ] {{Error/edge case}} is handled gracefully with {{error message/behavior}}
- [ ] {{Performance metric}} is met (e.g., loads in < 2 seconds)
- [ ] Component is {{responsive/accessible/tested}} with {{coverage level}}
```

### Definition of Done

```
- [ ] Code review approved
- [ ] Unit tests written and passing (>80% coverage)
- [ ] Integration tests passing (if applicable)
- [ ] Documentation updated
- [ ] QA tested and verified
- [ ] No console errors or warnings
- [ ] Performance meets requirements
- [ ] Accessibility checked (WCAG 2.1 AA)
```

### Example (User Story)

**Title:** `Dashboard - Display user expense summary`

**Description:**
```
As a user
I want to see a summary of my total expenses at a glance
So that I can quickly understand my financial status

## Context
Users are currently navigating to multiple pages to see their expense breakdown. 
A dashboard summary will improve user engagement and provide a quick overview on login.

## Technical Considerations
- Data should be fetched from `/api/expenses/summary` endpoint
- Summary should update in real-time when expenses are added/modified
- Support mobile responsiveness (320px+)
```

**Acceptance Criteria:**
```
- [ ] Given a user with multiple expenses, when they view the dashboard, then total expenses are displayed
- [ ] Given a new expense is created, when the dashboard is open, then the summary updates without page refresh
- [ ] The summary displays: Total Amount, Number of Transactions, Period (This Month/All Time)
- [ ] If no expenses exist, a helpful message "No expenses yet" is shown
- [ ] The component loads in under 1 second on a 4G connection
- [ ] The component is responsive and displays correctly on mobile (320px) and desktop (1920px)
- [ ] Clicking on the summary navigates to the detailed expenses view
```

---

## Story Template: Task

### Title
`{{Action}} - {{Specific Work Item}}`

**Example:** `Refactor - Consolidate API client utility functions`

### Description

```
## Summary
{{Brief description of the task}}

## Details
{{Detailed explanation of what needs to be done}}

## Steps/Subtasks
1. {{Step 1}}
2. {{Step 2}}
3. {{Step 3}}

## Technical Considerations
- {{Consideration 1}}
- {{Consideration 2}}
```

### Acceptance Criteria

```
- [ ] {{Deliverable 1}} is complete
- [ ] {{Deliverable 2}} is complete
- [ ] All tests pass
- [ ] Code follows project standards
- [ ] {{Verification method}}
```

---

## Story Template: Bug

### Title
`{{Component/Page}} - {{Issue Description}}`

**Example:** `Login Form - Password field not visible on mobile`

### Description

```
## Summary
{{One-line description of the bug}}

## Steps to Reproduce
1. {{Step 1}}
2. {{Step 2}}
3. {{Step 3}}

## Expected Behavior
{{What should happen}}

## Actual Behavior
{{What actually happens}}

## Environment
- Browser: {{Browser and version}}
- OS: {{Operating system}}
- Device: {{Desktop/Mobile}}
- App Version: {{Version}}

## Screenshots/Videos
{{Attach if applicable}}

## Severity
{{Critical/High/Medium/Low}}
```

### Acceptance Criteria

```
- [ ] Bug is reproduced locally
- [ ] Root cause is identified
- [ ] Fix is implemented
- [ ] Fix is tested on {{browsers/devices}}
- [ ] Related tests pass
- [ ] No regression in other features
- [ ] User-facing error messages are clear
```

---

## Story Template: Enhancement

### Title
`{{Component/Feature}} - {{Enhancement Description}}`

**Example:** `Expense Form - Add category autocomplete`

### Description

```
## Current State
{{How it works now}}

## Proposed Enhancement
{{What we want to improve}}

## Benefits
- {{Benefit 1}}
- {{Benefit 2}}
- {{Benefit 3}}

## Technical Approach (Optional)
{{Suggested implementation approach if known}}

## Dependencies
- {{Related story/component}}
- {{Required library or API}}
```

### Acceptance Criteria

```
- [ ] Enhancement is implemented as specified
- [ ] {{Performance improvement metric}} is achieved
- [ ] User experience is improved (specify how)
- [ ] No existing functionality is broken
- [ ] Tests cover new behavior
```

---

## Best Practices

### Titles
✅ **Good:** `Dashboard - Display monthly expense breakdown`
✅ **Good:** `API - Add expense filtering endpoint`
❌ **Bad:** `Fix dashboard`
❌ **Bad:** `Something with expenses`

### Descriptions
✅ **Good:** Clear, concise, with context and "why"
✅ **Good:** Include technical constraints and acceptance criteria
❌ **Bad:** Vague or missing business context
❌ **Bad:** Too lengthy without clear structure

### Acceptance Criteria
✅ **Good:** `Given user has 5 expenses, when filtering by "Food", then only food expenses show`
✅ **Good:** Testable and measurable
❌ **Bad:** `Make it work`
❌ **Bad:** `Should look better`

### Story Points Estimation Guide
- **1 point:** Trivial fix, documentation update
- **2 points:** Simple feature, minor refactor
- **3 points:** Small feature with some complexity
- **5 points:** Moderate feature, needs testing
- **8 points:** Complex feature, multiple components
- **13+ points:** Break into smaller stories

### Fields to Always Fill
- **Title**: Clear and descriptive
- **Description**: Context, "why", acceptance criteria
- **Type**: User Story, Task, Bug, Enhancement
- **Priority**: Critical, High, Medium, Low
- **Story Points**: If using estimation
- **Component/Label**: Dashboard, Form, API, etc.
- **Acceptance Criteria**: Testable conditions

---

## Linking Stories

### Parent-Child Relationships
- Epic → Stories → Tasks
- **Example:** Epic "User Authentication" → Story "Add social login" → Task "Integrate Google OAuth"

### Dependencies
- Use "Blocked by" or "Depends on" links
- **Example:** Story A "depends on" Story B being completed first

### Related Stories
- Use "Related to" for stories affecting similar areas

---

## Anti-Patterns to Avoid

❌ **Too Large:** Story spans multiple weeks → Break into smaller stories
❌ **Vague Acceptance Criteria:** "User can manage expenses" → Be specific
❌ **Missing Context:** No explanation of why this matters → Add context
❌ **Mixed Concerns:** Story does 3+ unrelated things → Split into separate stories
❌ **No Clear DoD:** "Done when we think it's done" → Use Definition of Done template

---

## Example: Complete User Story

**Title:** `Expense List - Add search and filter by date range`

**Type:** User Story

**Priority:** High

**Story Points:** 5

**Description:**
```
As a user managing multiple expenses
I want to search expenses by keyword and filter by date range
So that I can quickly find specific transactions

## Context
Users with 100+ expenses struggle to find specific transactions using only 
category filtering. Adding search and date range filtering will improve usability.

## Technical Considerations
- Search should be case-insensitive and search: description, category, merchant name
- Date range picker should use existing date UI library (date-fns)
- API endpoint: GET /api/expenses?search={{query}}&startDate={{date}}&endDate={{date}}
- Search results should update in real-time as user types
```

**Acceptance Criteria:**
```
- [ ] User can enter search text in a search field
- [ ] Results filter in real-time as user types
- [ ] User can select a date range using a date picker
- [ ] Filtered results respect both search AND date range (AND logic, not OR)
- [ ] Empty state message shows when no results match filters
- [ ] Search is case-insensitive (searching "food" matches "Food" and "FOOD")
- [ ] Date range includes full day (midnight to 23:59:59)
- [ ] Component loads in < 500ms even with 1000+ expenses
- [ ] Search input clears when user clicks X button
- [ ] Filters persist when navigating back from detail view
```

**Definition of Done:**
```
- [ ] Feature branch created and code pushed
- [ ] Unit tests written (search logic, filter logic, edge cases)
- [ ] Integration test verifies API calls with filters
- [ ] Code review approved by 1+ team member
- [ ] QA tested on Chrome, Firefox, Safari, Mobile Safari
- [ ] Accessibility verified (keyboard navigation, screen reader)
- [ ] Documentation updated if applicable
- [ ] No console errors/warnings
- [ ] Performance verified (loads in < 500ms)
- [ ] Merged to main and deployed to staging
```

**Linked Issues:**
- Epic: `User Dashboard & Transaction Management`
- Depends on: `Expense API - Add search endpoint`
- Related: `Expense List - Add category filter`

---
