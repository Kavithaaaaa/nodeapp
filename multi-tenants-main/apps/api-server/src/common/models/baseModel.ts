interface BaseModelInterface {
  find: (id) => void;
  findById: (id) => void;
  save: (id) => void;
  findOne: (id) => void;
}

export abstract class BaseModel implements BaseModelInterface {
  private readonly currentModel: any;
  constructor(modelRef: any) {
    this.currentModel = modelRef;
  }
  find(where: object = {}, projection: object = {}) {
    return this.currentModel.find(where, projection);
  }

  findById(id: string) {
    return this.currentModel.findById(id);
  }

  save(data: object) {
    const response = new this.currentModel(data);
    return response.save();
  }

  findOne(condition: object) {
    return this.currentModel.findOne(condition).exec();
  }
}
