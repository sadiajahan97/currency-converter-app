export default class {
  private _value?: string;
  constructor(readonly input: HTMLInputElement) {
    this.input.addEventListener('blur', this._twoDecimalPlaces.bind(this));
    this.input.addEventListener('input', this._validateInput.bind(this));
  }

  get value() {
    return this._value;
  }

  private _twoDecimalPlaces() {
    const pattern = /^\d*\.\d$/;
    if (pattern.test(this.input.value)) {
      this.input.value = (+this.input.value).toFixed(2);
    }
  }

  private _validateInput() {
    const pattern = /^\d*\.\d{3,}$/;
    if (pattern.test(this.input.value)) {
      this._value = (Math.trunc(+this.input.value * 100) / 100).toFixed(2);
      this.input.value = this._value;
    } else {
      this._value = this.input.value;
    }
  }
}
