# St. Joseph Cupertino Driving School
## Comprehensive UI/UX Design System & Architectural Blueprint
**Project:** IT12 Capstone Driving Academy Management Suite & Public Web Application  
**Document Type:** Recommended UI Design Specification  
**Version:** 2.0 (LTO LTMS & Data Privacy Act RA 10173 Compliant)

---

## 1. Executive Design Philosophy

The St. Joseph Cupertino Driving School web platform represents a mission-critical, enterprise-grade educational and logistics management system for an LTO-accredited driving academy in Tagum City, Philippines.

### Core Visual Principles
1. **Authoritative & Trustworthy:** Driving education is a government-regulated industry (LTO Memorandum Circular 2021-2287). The UI uses a deep Obsidian Navy foundation paired with vibrant Amber/Gold accents to convey authority, road safety discipline, and institutional prestige.
2. **Glassmorphic Precision:** Layered surfaces using subtle backdrop blurs (`backdrop-blur-md`), delicate 1px borders (`border-slate-200/80` or `border-slate-700/60`), and soft elevation shadows (`shadow-xs` to `shadow-xl`) provide depth without visual noise.
3. **Data Clarity & Ergonomics:** High-density administrative tables and KPI metrics must remain legible under rapid clerical operation. Action buttons maintain distinct boundary clearance to avoid misclicks.
4. **Data Privacy First:** Visual indicators and unobtrusive security toasts reinforce compliance with the **Philippine Data Privacy Act of 2012 (RA 10173)**.

---

## 2. Design Tokens & Color Palette

### 2.1 Color Tokens
| Token Name | Hex Code | Tailwind Equivalent | Primary Usage |
| :--- | :--- | :--- | :--- |
| **Brand Obsidian** | `#0f172a` | `brand-900` / `slate-900` | Primary buttons, headers, dark text, active tabs |
| **Brand Deep Slate** | `#020617` | `brand-950` / `slate-950` | Floating docks, security dialogs, sidebar background |
| **Road Safety Amber** | `#d97706` | `accent-500` / `amber-600` | Focus rings, key action highlights, safety ratings |
| **Caution Gold** | `#fbbf24` | `amber-400` | Badges, warning states, priority dispatch |
| **LTMS Emerald** | `#059669` | `emerald-600` | LTO Synced states, valid accreditations, paid receipts |
| **Revoke Rose** | `#e11d48` | `rose-600` | Danger actions, voided certificates, cancelled sessions |
| **Canvas Neutral** | `#f8fafc` | `slate-50` | Page body background, table alternate row shading |
| **Surface Card** | `#ffffff` | `bg-white` | Primary content panels, modal dialogs, input surfaces |
| **Subtle Border** | `#e2e8f0` | `border-slate-200` | Card perimeters, table dividers, input borders |

### 2.2 Typography Hierarchy
- **Display Headings (`font-display`):** *Plus Jakarta Sans* (`weights: 700, 800`). Used for hero titles, section headlines, KPI numerals, and official certificates.
- **Body & Controls (`font-sans`):** *Inter* (`weights: 400, 500, 600, 700`). Highly legible geometric sans-serif optimized for table rows, form inputs, tooltips, and legal disclaimers.
- **Monospace Telematics (`font-mono`):** System Monospace (`Roboto Mono` / `Courier`). Used for LTO Student Permit numbers, OR receipts, certificate serials, and vehicle license plates.

---

## 3. Recommended Component Patterns

### 3.1 Sticky Glassmorphic Navigation Bar
```
+-----------------------------------------------------------------------------------------------+
| [Logo] ST. JOSEPH CUPERTINO  |  Courses  Safety  Packages  Fleet  | [🛡️ RA 10173] [Staff Portal →] |
+-----------------------------------------------------------------------------------------------+
```
- **Properties:** `sticky top-0 z-50 bg-white/92 backdrop-blur-md border-b border-slate-200/80`
- **Branding:** High-contrast logo with dual-line typography (`ST. JOSEPH CUPERTINO` bold display, `DRIVING SCHOOL • TAGUM` micro-amber subtitle).
- **Security Indicator:** Subtle pill badge displaying active data protection accreditation.

### 3.2 High-Density Administrative Data Table
- **Header:** Sticky `bg-slate-50/90 text-slate-500 text-[11px] uppercase tracking-wider font-bold`.
- **Row Styling:** `h-12 border-b border-slate-100 hover:bg-slate-50/80 transition-colors`.
- **Status Pills:** Pill badges with icon dots (e.g. `● SYNCED TO LTMS` in Emerald, `● PENDING PRACTICAL` in Amber).
- **Action Columns (`no-print-col`):** Grouped icon buttons with explicit 6px gaps (`gap-1.5`) and distinct color codings (Slate for `View`, Rose for `Revoke/Delete`).
- **Pagination Footer:** Dedicated bar displaying `"Showing X of Y records"` with clear numeric page buttons (`[ 1 ] [ 2 ]`) with generous bottom safe margin (`pb-32 sm:pb-36`).

### 3.3 3D Flip Tab Switcher (Portal Authentication)
```
+---------------------------------------------------------------+
|      [ 📝 Student Fill-up Form ]    [ 🔒 Staff Login ]        |
+---------------------------------------------------------------+
```
- **Mechanism:** Perspective-based 3D rotation (`perspective: 1400px; transform-style: preserve-3d;`) providing a physical "card flip" transition between the student admission form and faculty credentials login.
- **Micro-interactions:** Password show/hide peek button (`visibility` / `visibility_off`), anti-copy protection on credential inputs.

### 3.4 Context-Aware Floating Scroll Dock (`ScrollControls.jsx`)
```
Top of Page:                Middle of Page:               Bottom of Page:
   [ ↓ ]                        [ ↑ ]                         [ ↑ ]
  (Down Only)                  [ - - ]                       (Up Only)
                                [ ↓ ]
```
- **Form Factor:** 36px–40px vertical glass capsule (`w-9.5 rounded-full bg-slate-900/90 backdrop-blur-md`).
- **Dynamic Collapse:** Automatically hides the Down button when at the page bottom, preventing overlap with pagination controls. Automatically hides the Up button when at the page top.
- **Safe Zone:** Page containers enforce `pb-32 sm:pb-36` so content terminates at least 120px above the viewport floor.

### 3.5 Real-Time Data Protection Guard (`DataProtectionGuard.jsx`)
- **Compliance:** Republic Act 10173 (Data Privacy Act of 2012).
- **UX Feedback:** Smooth top-sliding notification pill (`fixed top-5 left-1/2 -translate-x-1/2 z-[999999]`):
  - Amber shield icon + Bold title.
  - Explanatory message regarding prohibited bulk copying and scraping of student PII.
  - Automatic fade-out after 3.8s or instant dismissal.

---

## 4. Page-by-Page Design Specifications

### 4.1 Public Landing Page (`src/app/page.jsx`)
1. **Notice Ribbon:** Charcoal top ribbon highlighting LTO accreditation status and official hotline.
2. **Hero Section:**
   - Left Column: Bold value proposition ("Master the Road with Confidence"), trust metrics (LTO Pass Rate: 99.4%, Fleet: 14 Dual-Pedal Vehicles).
   - Right Column: Quick tuition calculator card with direct link to online enrollment.
3. **Course Showcase Cards:** TDC (Theoretical) and PDC (Practical) cards featuring hourly requirements, car type badges, and clear price tags.
4. **Interactive Fleet Gallery:** Dual-control vehicle showcase with click-to-enlarge photo lightbox modal.
5. **Interactive Curriculum Accordion:** Week-by-week driver competency checklist.
6. **Institutional Footer:** Accreditation metadata, emergency hotlines, and RA 10173 data privacy compliance note.

### 4.2 Admissions & Faculty Portal (`src/app/portal/page.jsx`)
1. **Dual Segmented Switcher:** 3D flip card toggle between Student Admission and Faculty Login.
2. **Student Fill-Up Form:**
   - 4-step progressive layout: Personal Information, LTO Requirements, Course Selection, Emergency Contact.
   - Clean field grouping with inline asterisks for required PSA/LTO fields.
   - Print-ready application voucher modal upon submission.
3. **Staff Login:**
   - Centered security card with academy seal, email input, toggleable password field with copy-protection, and instant demo autofill shortcuts.

### 4.3 Management Dashboard Suite (`src/app/dashboard/*`)
- **Persistent Sidebar (`w-64 fixed left-0 top-0 bottom-0 bg-slate-900 text-white`):**
  - Brand header with academy crest.
  - Active route indicator with left amber border strip (`border-l-4 border-amber-500 bg-white/10`).
  - Route modules:
    - 📊 **Operations Suite** (`/dashboard/operations`)
    - 👥 **Student Roster** (`/dashboard/students`)
    - 💳 **Tuition & Cashier** (`/dashboard/tuition`)
    - 📅 **Scheduling & Dispatch** (`/dashboard/scheduling`)
    - 🚗 **Training Fleet** (`/dashboard/fleet`)
    - 📜 **LTO Compliance & Reports** (`/dashboard/reports`)
- **Top Utility Header:** Live search bar with shortcut (`Ctrl+K`), accreditation status pill, public site return link, and registrar profile avatar.
- **Main Container:** Enforced `pb-32 sm:pb-36` bottom breathing room to guarantee zero floating button overlap.

---

## 5. Print Layout & Audit Export Architecture

All tabular records implement dual-mode rendering:
```css
@media print {
  /* Hide all chrome: sidebar, headers, scroll controls, toast modals, buttons */
  aside, header, footer, button, .no-print, [id$="Toast"], #scrollControls {
    display: none !important;
  }
  /* Show official LTO accreditation header & registrar signature roster block */
  .print-header, .print-footer {
    display: block !important;
  }
}
```
- **Government Compliance:** Generated printouts (Receipts, Certificates of Completion, Compliance Rosters) print cleanly on standard Letter/A4 paper with official academic headers, registrar verification lines, and serial barcodes.

---

## 6. Implementation Checklist & Next Milestones

- [x] Modernize visual design tokens (Obsidian Navy, Amber accent, Emerald success).
- [x] Direction-aware compact scroll dock with auto-hiding useless controls.
- [x] Eliminate layout boundary collisions by adding `pb-32 sm:pb-36` content clearance.
- [x] Implement Republic Act 10173 Data Protection Guard & anti-copy clipboard protection.
- [x] Add high-contrast accessible modal dialogs (`ConfirmDialog.jsx`).
- [x] Dark mode toggle (`dark:` utility classes & dynamic theme switcher in `ScrollControls.jsx`).
- [x] Real-time telematics GPS speed telemetry radar stream on operations dashboard.
- [x] SMS notification gateway webhook simulator for student schedule reminders.

---
*Document produced for St. Joseph Cupertino Driving School IT12 Capstone Project.*
