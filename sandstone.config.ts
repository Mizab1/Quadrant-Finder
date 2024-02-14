import type { SandstoneConfig } from "sandstone";

export default {
  name: "Quadrant Finder",
  description: ["A datapack by ", { text: "Mizab", color: "gold" }],
  formatVersion: 26,
  namespace: "quadrant_finder",
  packUid: "ih9fSZqF",
  // saveOptions: { path: './.sandstone/output/datapack' },
  saveOptions: { world: "Testing 4" },
  onConflict: {
    default: "warn",
  },
} as SandstoneConfig;
