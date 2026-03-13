# DevLink Component Inventory

## Test

| Prop | Type | Default |
|---|---|---|
| `as` | `React.ElementType` | `_Builtin.Block` |
| `text` | `React.ReactNode` | `"This is a test component from WebFlow."` |

**Data attributes:** none

---

## SelectBox

| Prop | Type | Default |
|---|---|---|
| `as` | `React.ElementType` | `_Builtin.Block` |
| `label` | `React.ReactNode` | `"Claude put label for SelectBox here."` |

**Data attributes:**

| Attribute | Value | On Element |
|---|---|---|
| `data-insertion-point` | `"single_select"` | `.single-select-wrapper` div |

---

## ConfigurationGroup

| Prop | Type | Default |
|---|---|---|
| `as` | `React.ElementType` | `_Builtin.Block` |
| `groupName` | `React.ReactNode` | `"Claude put label for group name here."` |
| `selectBoxLabel` | `React.ReactNode` | `"Claude put label for SelectBox here."` |

**Data attributes:**

| Attribute | Value | On Element |
|---|---|---|
| `data-insertion-point` | `"configuration_group"` | wrapper div around SelectBox |

**Composes:** SelectBox

---

## PositionSelector

| Prop | Type | Default |
|---|---|---|
| `as` | `React.ElementType` | `_Builtin.Block` |
| `text1` | `React.ReactNode` | `"Choose Position:"` |
| `text2` | `React.ReactNode` | `"4"` |
| `text3` | `React.ReactNode` | `"5"` |
| `text4` | `React.ReactNode` | `"6"` |
| `text5` | `React.ReactNode` | `"1"` |
| `text6` | `React.ReactNode` | `"2"` |
| `text7` | `React.ReactNode` | `"3"` |
| `link1` | `Types.Basic.Link` | `{ href: "#" }` |
| `link2` | `Types.Basic.Link` | `{ href: "#" }` |
| `link3` | `Types.Basic.Link` | `{ href: "#" }` |
| `link4` | `Types.Basic.Link` | `{ href: "#" }` |
| `link5` | `Types.Basic.Link` | `{ href: "#" }` |
| `link6` | `Types.Basic.Link` | `{ href: "#" }` |

**Data attributes:**

| Attribute | Value | On Element |
|---|---|---|
| `data-pos-selector` | `"pos4"` | Link button (row 1, col 1) |
| `data-pos-selector` | `"pos5"` | Link button (row 1, col 2) |
| `data-pos-selector` | `"pos6"` | Link button (row 1, col 3) |
| `data-pos-selector` | `"pos1"` | Link button (row 2, col 1) |
| `data-pos-selector` | `"pos2"` | Link button (row 2, col 2) |
| `data-pos-selector` | `"pos3"` | Link button (row 2, col 3) |

**Note:** Grid layout is 3x2 with positions 4-5-6 on top row, 1-2-3 on bottom row.

---

## TabGroup

| Prop | Type | Default |
|---|---|---|
| `as` | `React.ElementType` | `_Builtin.TabsWrapper` |
| `text1` | `React.ReactNode` | `"Block Config"` |
| `text2` | `React.ReactNode` | `"Unit Config"` |
| `text3` | `React.ReactNode` | `"Output"` |
| `title` | `React.ReactNode` | `"Building Block Configuration"` |
| `positionSelectorText1` | `React.ReactNode` | `"Choose Position:"` |
| `configurationGroupSelectBoxLabel` | `React.ReactNode` | `"Claude put label for SelectBox here."` |
| `configurationGroupGroupName` | `React.ReactNode` | `"Claude put label for ConfigurationGroup here."` |

**Data attributes:**

| Attribute | Value | On Element |
|---|---|---|
| `data-w-tab` | `"Tab 1"` | Tab 1 link + pane (Block Config) |
| `data-w-tab` | `"Tab 2"` | Tab 2 link + pane (Unit Config) |
| `data-w-tab` | `"Tab 3"` | Tab 3 link + pane (Output) |

**Composes:** PositionSelector, ConfigurationGroup (both inside Tab 1 pane). Tabs 2 and 3 are empty panes.

---

## Composition Hierarchy

```
TabGroup
├── Tab 1 (Block Config)
│   ├── PositionSelector
│   └── ConfigurationGroup
│       └── SelectBox
├── Tab 2 (Unit Config) — empty
└── Tab 3 (Output) — empty
```
