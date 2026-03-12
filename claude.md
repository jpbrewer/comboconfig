# Claude.md — Window & Door Unit Configurator (comboconfig)

## Project Overview

This is a single-page Next.js application (App Router, TypeScript) that allows customers to configure a pre-assembled window/door unit. The arrangement of building blocks has already been determined on a prior page. Via an API call, a JSON will be input into this page that will set up a configuration that will be edited on the page. This page handles the **design configuration** of each individual building block and the unit as a whole, then passes the final configured data to a BigCommerce cart via a custom API/webhook. When you read the code, you will see that there are three main parts to the page:

- SVGViewer, which will have a rendering of the combination unit. This pipeline is handled outside the scope of this project.

- On the right side is the ConfigPanel, which will be mainly what we're working on.

- At the lower left is the DataGrid, which will largely be a recap of data from the inbound JSON.

The layout uses CSS Grid: SVGViewer (top-left), DataGrid (bottom-left), and ConfigPanel spanning the full height of the right column.

The app is hosted on **Webflow Cloud**.

---

## Architecture

### Tech Stack
- **Framework**: Next.js (App Router, TypeScript)
- **Components**: React components created and styled in Webflow, exported via DevLink
- **Data source**: Incoming JSON passed from the previous step (arrangement selection page)
- **SVG pipeline**: A separate set of JavaScript files that will be shared with the previous selector page
- **Cart integration**: BigCommerce via custom API/webhook

### Directory Structure
```
src/
  app/             # Next.js App Router — pages and route logic
  components/      # Layout and wrapper components (e.g. ConfigPageLayout, SVGViewer, ConfigPanel, DataGrid)
  types/           # TypeScript interfaces and types (create as needed)
  lib/             # Business logic, helpers, data utilities (create as needed)
devlink/           # ⛔ READ-ONLY. Auto-synced from Webflow. Never modify.
data/              # Static JSON files (product catalog, option definitions, etc.) (create as needed)
public/            # Static assets
```

---

## The DevLink Rule — CRITICAL

The `/devlink` folder contains React components exported from Webflow. It is **one-way synced** from Webflow and must never be modified by Claude under any circumstances.

- ✅ Claude **can** use DevLink components as-is in page logic
- ✅ Claude **can** request that props or slots be added to a component — but must ask the human to make that change in Webflow and re-sync
- ✅ Claude **can** ask Human to create additional components in WebFlow for export via DevLink and use in the project
- ✅ Claude **can** compose DevLink components with logic wrappers, state, and handlers
- ⛔ Claude **must never** edit, create, or delete any file inside `/devlink`
- ⛔ Claude **must never** work around missing props by patching DevLink files directly

When a component needs a new prop or structural change, Claude should say:
> "To do this, we need to add a `[propName]` prop to the `[ComponentName]` component in Webflow. Once that's synced via DevLink, I can wire it up here." --or--
> "I need you to create a new component that you might call `[ComponentName]` with a prop `[propName]` and here are other details you need to know..."

---

## Data Model

### Incoming JSON Structure

The app receives a JSON object from the previous step. Key top-level fields:

| Field | Type | Description |
|---|---|---|
| `job_id` | number | Unique job identifier |
| `assembly_template` | string | Assembly template code (e.g. `"G"`) |
| `assembly_no` | number | Assembly number |
| `build_objects` | array | The building blocks to configure (see below) |
| `solution_grid` | object | Display/summary data keyed by position (e.g. `pos2`, `pos5`) |
| `opening_width` / `opening_height` | number | Rough opening dimensions in inches |
| `unit_width` / `unit_height` | number | Final unit dimensions in inches |
| `jamb_depth` | number | Jamb depth in inches |
| `location` | string | `"interior"` or `"exterior"` |
| `door_bore` | string \| null | Door bore specification |
| `hardware_color` | string \| null | Hardware color |
| `building_block_svgs` | object | SVG strings keyed by position (with muntins) |
| `building_block_svgs_no_muntins` | object | SVG strings keyed by position (without muntins) |
| `assembly_svg` | string | Full assembly SVG (with muntins) |
| `assembly_svg_no_muntins` | string | Full assembly SVG (without muntins) |

> ⚠️ This JSON is preliminary and will gain additional fields over time. Always treat unknown fields gracefully — never strip or overwrite unrecognized keys when writing the output JSON.

### The `build_objects` Array

Each element represents one configurable building block:

```ts
interface BuildObject {
  block_pos: "pos1" | "pos2" | "pos3" | "pos4" | "pos5" | "pos6"; // pos7 = head_detail, always ignored
  construction: BuildingBlockType;
  width: number;   // inches
  height: number;  // inches
  cols: number;    // number of glass light columns
  rows: number;    // number of glass light rows
  sr_top: number;    // stile/rail size — top (inches)
  sr_bottom: number; // stile/rail size — bottom (inches)
  sr_left: number;   // stile/rail size — left (inches)
  sr_right: number;  // stile/rail size — right (inches)
}
```

### Building Block Types

```ts
type BuildingBlockType =
  | "single_door"
  | "double_door"
  | "cased_opening"
  | "sidelite"
  | "transom"
  | "flanker"
  | "head_detail"; // ⛔ Never render or expose to configurator — ignored entirely
```

**Rules:**
- `pos7` is always a `head_detail` if it exists — skip it silently
- `head_detail` construction type must never appear in the configurator UI regardless of position
- Valid configurable positions are `pos1` through `pos6`

---

## Page Structure

The page has **three tabs**:

### Tab 1 — Building Block Configuration
- A **selector** at the top lets the user choose which building block to configure (identified by position label and construction type, e.g. "Left Sidelite — pos1")
- Upon selection, configuration options appear for that block:
  - `cols` — number of glass light columns
  - `rows` — number of glass light rows
  - `sr_top`, `sr_bottom`, `sr_left`, `sr_right` — stile/rail sizes
- Changes update the in-memory configuration state; they do not mutate the source JSON directly

### Tab 2 — Unit Configuration
- Configuration options that apply to the entire unit, not individual blocks
- Examples: jamb size, wood type, and other unit-level options
- These fields will be defined and added incrementally

### Tab 3 — Output
- This tab will contain options and buttons to move the configuration to the cart, email it to the customer, create a quote, etc 

---

## State Management

- Use **React `useState` / `useReducer`** — no external state library
- Maintain a single **configuration state object** derived from (but separate from) the incoming JSON
- The incoming JSON is the **initial state only** — user changes are tracked in React state
- Never mutate the original JSON object

### Suggested shape:
```ts
interface ConfiguratorState {
  unitConfig: UnitConfig;           // Tab 2 fields
  blockConfigs: Record<string, BuildObject>; // keyed by block_pos
}
```

---

## Development Approach

This project is built **incrementally**. The order of development is:

1. **Configuration UI** — build the block selector and per-block configuration panel using DevLink components
2. **Unit configuration tab** — add unit-level options also using DevLink components 
3. **Data in** — wire up the incoming JSON as the initial state source
4. **Data out** — serialize the final configuration and send to BigCommerce via custom API/webhook

At each stage, Claude should keep scope tight and avoid building ahead unless asked.

---

## Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Type check
npx tsc --noEmit
```

---

## Key Conventions

- **TypeScript strictly** — no `any` types; define interfaces in `src/types/`
- **No external state libraries** — useState/useReducer only
- **Styling** — Claude may create and edit CSS Modules for page layout and structural styling (e.g. grid zones, positioning). All React component visual design and styling is handled in Webflow and exported via DevLink — Claude must not restyle DevLink components
- **Preserve unknown JSON fields** — when outputting the final configured JSON, spread unknown fields through; never drop data Claude didn't explicitly handle
- **Measurements are in inches** as decimal numbers (e.g. `4.5625` = 4-9/16")
- **Positions are strings** — always reference as `"pos1"` through `"pos6"`, never as integers
- Component files go in `src/components/`, `src/app/`, or `src/lib/` — never in `/devlink`

---

## BigCommerce Integration (Future)

The configured output will be sent to BigCommerce via a **custom API/webhook**. The exact endpoint and payload schema are TBD. When this is implemented:
- Serialize the full configuration state back into a JSON structure compatible with the incoming format (plus any new fields added during configuration)
- Do not drop any fields from the original incoming JSON
- Add a clearly defined output serializer function in `src/lib/`

---

## Notes for Claude

- The incoming JSON is preliminary and will evolve -- see ./example.json. When new fields appear, ask the human what they mean before assuming.
- SVG fields (`assembly_svg`, `building_block_svgs`, etc.) It should largely be treated as a black box by you, and will probably be handled by the SVG pipeline. .
- The `solution_grid` object uses different position keys (e.g. `pos13`, `pos46`) that encode the same building block being used in multiple positions in multiple quantities — this is **display/summary data only**, not the source of truth for building block configuration. The JSON array is the source of truth. The solution-grid is a viewport into that truth that includes summary information and not intended to be machine readable. 
- Always ask before adding new dependencies or packages.
