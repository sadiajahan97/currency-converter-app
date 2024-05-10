export default class {
  private _value?: string;
  constructor(
    readonly input: HTMLInputElement,
    readonly ul: HTMLUListElement,
    readonly document: Document,
    readonly codes: string[],
    readonly otherUl: HTMLUListElement,
    readonly prevInput: HTMLInputElement
  ) {
    this._create();
    this.input.addEventListener('click', this._show.bind(this));
    this.input.addEventListener('input', this._filter.bind(this));
    this.ul.addEventListener('click', this._select.bind(this));
    this.ul.addEventListener('mouseover', this._removeFocus.bind(this));
    this.document.addEventListener('click', this._hide.bind(this));
    this.document.addEventListener('keydown', this._addKeyboardNav.bind(this));
  }

  get value() {
    return this._value;
  }

  private _create() {
    const docFrag = document.createDocumentFragment();
    this.codes.forEach(code => {
      const li = document.createElement('li');
      li.role = 'option';
      li.style.display = 'list-item';
      li.textContent = code;
      docFrag.append(li);
    });
    this.ul.append(docFrag);
  }

  private _removeOtherFocus() {
    const listItemsArray = Array.from(this.otherUl.children) as HTMLLIElement[];
    listItemsArray.forEach(li => {
      if (li.classList.contains('focused')) {
        li.classList.remove('focused');
      }
    });
  }

  private _show(event: MouseEvent) {
    event.stopPropagation();
    this._removeOtherFocus();
    this.otherUl.scrollTop = 0;
    this.otherUl.style.display = 'none';
    this.ul.style.display = 'block';
  }

  private _removeFocus() {
    const listItemsArray = Array.from(this.ul.children) as HTMLLIElement[];
    listItemsArray.forEach(li => {
      if (li.classList.contains('focused')) {
        li.classList.remove('focused');
      }
    });
  }

  private _filterListItems() {
    const codeSearch = this.input.value.toUpperCase();
    const listItemsArray = Array.from(this.ul.children) as HTMLLIElement[];
    listItemsArray.forEach(li => {
      li.style.display = li.textContent!.startsWith(codeSearch) ? 'list-item' : 'none';
    });
  }

  private _filter() {
    this._removeFocus();
    this.ul.scrollTop = 0;
    this._filterListItems();
    this.ul.style.display = 'block';
  }

  private _select(event: MouseEvent) {
    event.stopPropagation();
    if (event.target instanceof HTMLLIElement) {
      this._value = event.target.textContent!;
      this.input.value = this._value;
      this._removeFocus();
      this.ul.scrollTop = 0;
      this._filterListItems();
      this.ul.style.display = 'none';
    }
  }

  private _hide(event: MouseEvent) {
    if (event.target !== this.input && event.target !== this.ul) {
      this._removeFocus();
      this.ul.scrollTop = 0;
      this.ul.style.display = 'none';
    }
  }

  private _addKeyboardNav(event: KeyboardEvent) {
    switch (event.target) {
      case this.prevInput:
        if (event.key === 'Tab') {
          this.ul.style.display = 'block';
        }
        break;
      case this.input:
        let listItemsArray = Array.from(this.ul.children) as HTMLLIElement[];
        listItemsArray = listItemsArray.filter(li => li.style.display === 'list-item');
        let focusedIndex = -1;
        listItemsArray.forEach((li, i) => {
          if (li.classList.contains('focused')) {
            focusedIndex = i;
          }
        });
        switch (event.key) {
          case 'Tab':
            this._removeFocus();
            this.ul.scrollTop = 0;
            this.ul.style.display = 'none';
            break;
          case 'ArrowUp':
            focusedIndex = focusedIndex > 0 ? focusedIndex - 1 : listItemsArray.length - 1;
            break;
          case 'ArrowDown':
            focusedIndex = focusedIndex < listItemsArray.length - 1 ? focusedIndex + 1 : 0;
            break;
          case 'Enter':
            if (focusedIndex !== -1) {
              this._value = listItemsArray[focusedIndex].textContent!;
              this.input.value = this._value;
              focusedIndex = -1;
              this._removeFocus();
              this.ul.scrollTop = 0;
              this._filterListItems();
              this.ul.style.display = 'none';
            }
        }
        listItemsArray.forEach((li, i) => {
          li.classList.remove('focused');
          if (i === focusedIndex) {
            li.classList.add('focused');
            li.scrollIntoView({
              behavior: 'instant',
              block: 'nearest',
            });
          }
        });
    }
  }
}
