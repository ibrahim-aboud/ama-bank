export default class ModelError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ModelError";
    this.status = status;
  }
}
