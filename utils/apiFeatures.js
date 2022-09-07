class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }


  // FUNCTIONALITY => FILTERING
  // DOES => Creates a new object containing all the key-value pairs from the query parameters.
  filter() {
    // DOES => Creates a shallow hard copy of the queryString object. First takes all the fields out of the object using destructuring and then creates a new object containing all the key-value pairs from the query.
    const queryObj = {...this.queryString};
    // DOES => Removes all the fields in the array from the queryObj.
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach(el => delete queryObj[el]);
    // DOES => Advance filtering. Allows to use greater and lower than operators adding a "$" to the query to match the mongoDB operators.
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte?|lte?)\b/g, match => `$${match}`);
    // DOES => Builds the query.
    this.query = this.query.find(JSON.parse(queryStr));
    // NOTE => We need to return the entire object in order to be able to chain other methods.
    return this;
  }


  // FUNCTIONALITY => SORTING
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("_id");
    }
    return this;
  }

  // FUNCTIONALITY => FIELD LIMITING
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-reference");
    }
    return this;
  }

  // FUNCTIONALITY => PAGINATION
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 30;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

}
module.exports = APIFeatures