class UserRepository {
  constructor(model) {
    this.model = model;
  }

  async create(name, password) {
    try {
      // eslint-disable-next-line new-cap
      const userRecord = new this.model({
        name,
        password,
      });

      await userRecord.save();

      return {
        id: userRecord.id,
        name: userRecord.name,
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      throw new Error('Error creating user');
    }
  }

  async findOne(query) {
    try {
      const userRecord = await this.model.findOne({
        [query.field]: query.value,
      });

      return {
        id: userRecord.id,
        name: userRecord.name,
        password: userRecord.password,
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      throw new Error('User is not registered');
    }
  }

  async findById(id) {
    console.log(id);

    try {
      const userRecord = await this.model.findById(id);

      return userRecord;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      throw new Error('No user found');
    }
  }

  async update(userId, query) {
    try {
      const userRecord = await this.model.findByIdAndUpdate(userId, {
        [query?.field]: query?.value,
      });

      return {
        id: userRecord.id,
        name: userRecord.name,
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      throw new Error('Error updating user');
    }
  }
}

module.exports = UserRepository;
