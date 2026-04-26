export const COMPLAINT_TYPES = {
  supply: [
    { id: "complete_cut", label: "Complete Power Cut", severity: "moderate" },
    { id: "low_voltage", label: "Low Voltage", severity: "minor" },
    {
      id: "voltage_fluctuation",
      label: "Voltage Fluctuation",
      severity: "moderate",
    },
    {
      id: "frequent_tripping",
      label: "Frequent Tripping",
      severity: "moderate",
    },
    { id: "single_phase", label: "Single Phase Fault", severity: "moderate" },
    { id: "high_voltage", label: "High Voltage / Surge", severity: "critical" },
  ],
  infrastructure: [
    {
      id: "transformer_fault",
      label: "Transformer Fault (DP Fault)",
      severity: "moderate",
    },
    { id: "fuse_blown", label: "Fuse Blown", severity: "minor" },
    { id: "short_circuit", label: "Short Circuit", severity: "critical" },
    { id: "sparking", label: "Sparking on Pole / Wire", severity: "critical" },
    { id: "broken_wire", label: "Broken / Snapped Wire", severity: "critical" },
    {
      id: "pole_damaged",
      label: "Pole Damaged / Fallen",
      severity: "critical",
    },
    {
      id: "underground_fault",
      label: "Underground Cable Fault",
      severity: "moderate",
    },
  ],
  safety: [
    { id: "live_wire", label: "Live Wire on Ground", severity: "emergency" },
    {
      id: "transformer_fire",
      label: "Fire on Transformer",
      severity: "emergency",
    },
    {
      id: "electric_fire",
      label: "Fire due to Electric Fault",
      severity: "emergency",
    },
    {
      id: "tree_on_ht",
      label: "Tree Branch on HT Wire",
      severity: "emergency",
    },
    {
      id: "digging_risk",
      label: "Digging Risk Near HT Line",
      severity: "emergency",
    },
    { id: "meter_sparking", label: "Meter Box Sparking", severity: "critical" },
  ],
  scheduled: [
    { id: "maintenance", label: "Scheduled Maintenance", severity: "minor" },
    { id: "load_shedding", label: "Load Shedding", severity: "minor" },
  ],
} as const;

export const SUBSTATIONS = [
  {
    id: "akurdi",
    name: "22/22 kV Akurdi (SS-213013)",
    area: "Akurdi, PCMC",
    feeders: [
      { id: "AKD-301", name: "Feeder 301 – Akurdi I", type: "HV Non-Express" },
      { id: "AKD-302", name: "Feeder 302 – Akurdi II", type: "HV Non-Express" },
      {
        id: "AKD-303",
        name: "Feeder 303 – Yamunanagar",
        type: "Sheddable MIDC",
      },
      {
        id: "AKD-305",
        name: "Feeder 305 – D-III Block",
        type: "Sheddable MIDC",
      },
      { id: "AKD-307", name: "Feeder 307 – Force Motor", type: "HV Express" },
      {
        id: "AKD-308",
        name: "Feeder 308 – Tempo Wollrope",
        type: "HV Express",
      },
    ],
  },
  {
    id: "chinchwad",
    name: "220 kV Chinchwad-1",
    area: "Chinchwad",
    feeders: [
      {
        id: "CHW-F1",
        name: "Feeder 1 – Chinchwad Station",
        type: "HV Non-Express",
      },
      { id: "CHW-F2", name: "Feeder 2 – Pimpri Road", type: "HV Non-Express" },
      {
        id: "CHW-F3",
        name: "Feeder 3 – MIDC Chinchwad",
        type: "Sheddable MIDC",
      },
    ],
  },
  {
    id: "bhosari",
    name: "220 kV Bhosari",
    area: "Bhosari, MIDC",
    feeders: [
      {
        id: "BHS-F1",
        name: "Feeder 1 – Bhosari MIDC Gate",
        type: "HV Express",
      },
      {
        id: "BHS-F2",
        name: "Feeder 2 – Bhosari Village",
        type: "HV Non-Express",
      },
      { id: "BHS-F3", name: "Feeder 3 – EWS Colony", type: "Sheddable MIDC" },
    ],
  },
  {
    id: "pimpri",
    name: "33/11 kV Pimpri",
    area: "Pimpri Town",
    feeders: [
      {
        id: "PMP-F1",
        name: "Feeder 1 – Pimpri Market",
        type: "HV Non-Express",
      },
      { id: "PMP-F2", name: "Feeder 2 – Pimpri Chowk", type: "HV Non-Express" },
    ],
  },
  {
    id: "nigdi",
    name: "33/11 kV Nigdi",
    area: "Nigdi, Pradhikaran",
    feeders: [
      {
        id: "NGD-F1",
        name: "Feeder 1 – Nigdi Sector 23",
        type: "HV Non-Express",
      },
      {
        id: "NGD-F2",
        name: "Feeder 2 – Nigdi Sector 27",
        type: "HV Non-Express",
      },
      { id: "NGD-F3", name: "Feeder 3 – Pradhikaran", type: "HV Non-Express" },
    ],
  },
  {
    id: "kalewadi",
    name: "33/11 kV Kalewadi",
    area: "Kalewadi, Pimpri",
    feeders: [
      {
        id: "KLD-F1",
        name: "Feeder 1 – Kalewadi Phata",
        type: "HV Non-Express",
      },
      { id: "KLD-F2", name: "Feeder 2 – Rahatani", type: "HV Non-Express" },
    ],
  },
  {
    id: "baner",
    name: "33/11 kV Paradigm Baner",
    area: "Baner, Balewadi",
    feeders: [
      { id: "BNR-F1", name: "Feeder 1 – Baner Road", type: "HV Non-Express" },
      { id: "BNR-F2", name: "Feeder 2 – Balewadi", type: "HV Non-Express" },
    ],
  },
  {
    id: "hinjawadi",
    name: "33 kV Hinjawadi IT Park",
    area: "Hinjawadi Phase I / II / III",
    feeders: [
      { id: "HNJ-F1", name: "Feeder 1 – Phase I", type: "HV Express" },
      { id: "HNJ-F2", name: "Feeder 2 – Phase II", type: "HV Express" },
      { id: "HNJ-F3", name: "Feeder 3 – Phase III", type: "HV Express" },
    ],
  },
] as const;

export const DP_NUMBERS = [
  { id: "DP-517-309-0042", area: "Akurdi Naka", capacity: "100 kVA" },
  { id: "DP-517-309-0118", area: "Pimpri Chowk", capacity: "250 kVA" },
  { id: "DP-517-309-0203", area: "Bhosari MIDC Gate", capacity: "400 kVA" },
  { id: "DP-517-309-0311", area: "Chinchwad Station Rd", capacity: "160 kVA" },
  { id: "DP-517-309-0089", area: "Nigdi Pradhikaran", capacity: "250 kVA" },
  { id: "DP-517-309-0156", area: "Thergaon Phata", capacity: "100 kVA" },
  { id: "DP-517-309-0274", area: "Wakad Bridge", capacity: "400 kVA" },
  { id: "DP-517-309-0390", area: "Hinjawadi Phase 1", capacity: "630 kVA" },
] as const;

export const SEVERITY_CONFIG = {
  emergency: {
    label: "Emergency",
    color: "#ef4444",
    bgColor: "#fee2e2",
    pulse: true,
  },
  critical: {
    label: "Critical",
    color: "#f97316",
    bgColor: "#ffedd5",
    pulse: false,
  },
  moderate: {
    label: "Moderate",
    color: "#f59e0b",
    bgColor: "#fef3c7",
    pulse: false,
  },
  minor: { label: "Minor", color: "#22c55e", bgColor: "#dcfce7", pulse: false },
} as const;

export const CATEGORY_CONFIG = {
  supply: { label: "Supply Issue", icon: "Zap" },
  infrastructure: { label: "Equipment Fault", icon: "Wrench" },
  safety: { label: "Safety Hazard", icon: "AlertTriangle" },
  scheduled: { label: "Scheduled Work", icon: "Calendar" },
} as const;
