const uuidv4 = require("uuid/v4");

class Model {
  constructor() {
  }

  get type() {
    return 'Model';
  }

  get key() {
    return this.id;
  }

  get attributes() {
    return ['id'];
  }

  get jsonAttributes() {
    return this.attributes;
  }

  beforeSave() {}

  async save() {
    this.beforeSave();
    if (!this.id) {
      this.id = uuidv4();
    }

    return this.dataClient.put(this.key, this.toJSON());
  }

  async delete() {
    return this.dataClient.remove(this.key);
  }

  updateAttributes(dict) {
    for (const [key, value] of Object.entries(dict)) {
      this[key] = value;
    }
    return this;
  }

  toDict() {
    let dict = {};
    if (this.attributes) {
      this.attributes.forEach(a => {
        dict[a] = this[a];
      });
    }

    return dict;
  }

  toJSON() {
    return JSON.stringify(this.toDict());
  }

  get related() {
    return {};
  }

  serialize() {
    return JSON.stringify({...this.toDict(), ...this.related});
  }

  static fromJSON(json) {
    let obj = new this();
    let dict = JSON.parse(json);
    for (const [key, value] of Object.entries(dict)) {
      obj[key] = value;
    }
    return obj;
  }

  static async find(key) {
    let json = await this.dataClient.get(key);
    return json ? this.fromJSON(json) : null;
  }

  static async deleteAll() {
    return this.dataClient.clear();
  }
}

module.exports = Model;
