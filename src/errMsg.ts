export const createErrMsg = (p: HTMLParagraphElement, msg: string) => {
  p.textContent = msg;
  p.style.display = 'block';
};

export const removeErrMsg = (p: HTMLParagraphElement) => {
  p.textContent = '';
  p.style.display = 'none';
};
