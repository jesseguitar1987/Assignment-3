"use strict";

// Simple in-memory store (resets when server restarts)
const store = {
  entries: [],
  add(entry) {
    this.entries = [entry, ...this.entries];
  },
  all() {
    return this.entries;
  }
};

module.exports = store;