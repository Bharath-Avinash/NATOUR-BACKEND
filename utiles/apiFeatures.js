class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    // console.log(queryObject);
    const exculedItems = ['page', 'sort', 'limit', 'fields'];
    exculedItems.forEach(el => delete queryObj[el]);
    // console.log(queryString, queryObject);
    let queryStr = JSON.stringify(queryObj);
    // eslint-disable-next-line no-console
   // console.log(queryStr);

    // eslint-disable-next-line no-const-assign
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);
    // JSON.parse(queryStr);
    // eslint-disable-next-line no-console
    //console.log(queryStr);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      console.log(sortBy);
      // eslint-disable-next-line no-undef
      this.query = this.query.sort(sortBy);
    } else {
      // eslint-disable-next-line no-undef
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  fields() {
    if (this.queryString.fields) {
      const queryFields = this.queryString.fields.split(',').join(' ');
      console.log(queryFields);
      // eslint-disable-next-line no-undef
      this.query = this.query.select(queryFields);
    } else {
      // eslint-disable-next-line no-undef
      this.query = this.query.select('-__v');
    }
    return this;
  }

  page() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    // eslint-disable-next-line no-undef
    this.query = this.query.skip(skip).limit(limit);

    // if (this.queryString.page) {
    //const numTours =  this.query.countDocuments();

    //if (skip >= numTours) throw new Error('This page does not exist');
    return this;
  }
}

module.exports = APIFeatures;
