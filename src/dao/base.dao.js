/* eslint-disable no-empty */

const tempParam = [{ $match: { isDeleted: false } }];

/**
 * create document
 * @param schema
 * @param body
 */
exports.create = async (schema, body) => {
  try {
    return await schema.create(body);
  } catch (err) {
    return err;
  }
};

/**
 * get all documents
 * @param schema
 */
exports.findAll = async (schema, params = tempParam) => {
  try {
    return await schema.aggregate(params).sort({ createdAt: -1 });
  } catch (err) {}
};

/**
 * Update document by id
 * @param schema
 * @param id
 * @param body
 */

exports.findOneAndUpdate = async (schema, id, body) => {
  try {
    const user = await schema.findByIdAndUpdate(
      id,
      { $set: body },
      { upsert: false, new: false, runValidators: true, context: "query" },
      function (err, result) {
        if (err) {
        } else {
          return result;
        }
      }
    );
    return user;
  } catch (err) {}
};
