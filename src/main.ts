import { fetchCodes } from './fetchAPI';
import Amount from './Amount';
import Code from './Code';
import { createErrMsg, removeErrMsg } from './errMsg';
import processInputs from './processInputs';

const initApp = async () => {
  const codes = await fetchCodes();
  const p = document.querySelector<HTMLParagraphElement>('.error')!;
  if (codes) {
    const inputAmount = document.querySelector<HTMLInputElement>('#amount')!;
    const inputBase = document.querySelector<HTMLInputElement>('#base')!;
    const ulBase = inputBase.nextElementSibling as HTMLUListElement;
    const inputTarget = document.querySelector<HTMLInputElement>('#target')!;
    const ulTarget = inputTarget.nextElementSibling as HTMLUListElement;
    const button = document.querySelector('button')!;
    const amount = new Amount(inputAmount);
    const base = new Code(inputBase, ulBase, document, codes, ulTarget, inputAmount);
    const target = new Code(inputTarget, ulTarget, document, codes, ulBase, inputBase);
    button.addEventListener('click', () => {
      removeErrMsg(p);
      processInputs(amount.value, base.value, target.value);
      button.blur();
    });
    button.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        removeErrMsg(p);
        processInputs(amount.value, base.value, target.value);
        button.blur();
      }
    });
  } else {
    createErrMsg(p, 'Currency codes could not be obtained. Please reload page.');
  }
};

document.addEventListener('DOMContentLoaded', initApp);
