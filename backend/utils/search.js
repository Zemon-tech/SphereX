const createSearchQuery = (searchTerm, filters = {}) => {
  const query = {};

  if (searchTerm) {
    query.$or = [
      { title: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
      { tags: { $in: [new RegExp(searchTerm, 'i')] } }
    ];
  }

  // Add filters
  Object.keys(filters).forEach(key => {
    if (filters[key]) {
      query[key] = filters[key];
    }
  });

  return query;
};

module.exports = { createSearchQuery }; 