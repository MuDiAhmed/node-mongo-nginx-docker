function updateDate(schema, options) {
  schema.pre(
    ["findOneAndUpdate", "update", "updateOne", "updateMany"],
    { query: true, document: false },
    function() {
      if (!schema.paths.updateAt) return;
      this.set({ updateAt: Date.now() });
    }
  );
}

module.exports = updateDate;
