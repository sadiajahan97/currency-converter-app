import { fetchConversion } from './fetchAPI';
import { createErrMsg } from './errMsg';

export default async (amount?: string, base?: string, target?: string) => {
  const tdRate = document.querySelector<HTMLTableCellElement>('#rate')!;
  const tdResult = document.querySelector<HTMLTableCellElement>('#result')!;
  const p = document.querySelector<HTMLParagraphElement>('.error')!;
  if (amount && base && target) {
    const conversion = await fetchConversion(amount, base, target);
    if (conversion) {
      const [rate, result] = conversion;
      tdRate.textContent = `${rate.toFixed(2)} ${target}/${base}`;
      tdResult.textContent = `${result.toFixed(2)} ${target}`;
    } else {
      tdRate.textContent = '';
      tdResult.textContent = '';
      createErrMsg(p, 'Conversion failed. Please try again.');
    }
  } else {
    tdRate.textContent = '';
    tdResult.textContent = '';
    createErrMsg(p, 'Please complete all required inputs before proceeding.');
  }
};
