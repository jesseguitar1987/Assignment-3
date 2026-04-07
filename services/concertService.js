const Concert = require("../models/Concert");

async function list() {
  return await Concert.find().sort({ createdAt: -1 });
}

async function find(id) {
  return await Concert.findById(id);
}

async function create(data) {
  return await Concert.create(data);
}

async function update(id, data) {
  return await Concert.findByIdAndUpdate(id, data, { new: true });
}

async function remove(id) {
  return await Concert.findByIdAndDelete(id);
}

module.exports = {
  list,
  find,
  create,
  update,
  remove
};