import slug from 'slug';

export function slugifyTitle(titleInputElem: string, slugInputElem: string) {
  const titleInput = document.querySelector(titleInputElem) as HTMLInputElement;
  const slugInput = document.querySelector(slugInputElem) as HTMLInputElement;

  titleInput?.addEventListener('input', () => {
    slugInput.value = slug(titleInput.value);
  })
}

export function clientFormControls(form: HTMLFormElement) {
  const inputs = form?.querySelectorAll('input, textarea') as NodeListOf<HTMLInputElement>;

  inputs?.forEach((input) => {
    input?.addEventListener('blur', (e: Event) => {
      const fieldName = input.getAttribute('name');
      if (!fieldName) return;
      if (input.value === "") insertErrorMessage(fieldName, 'This field cannot be empty')
    })
  })
}

export function insertErrorMessage(key: string, value: string) {
  const errorField = document.querySelector(`.form__${key}`) as HTMLElement | null;
  const header = document.querySelector('.main-header');
  const errorMsg = document.createElement('div');

  errorMsg.classList.add('error', `error__${key}`);
  errorMsg.innerText = value;
  if (errorField && !errorField.querySelector('.error')) {
    errorField.append(errorMsg);
  } else {
    header?.appendChild(errorMsg)
  }

  console.warn(`${key}: ${value}`);

  removeErrorMessages(errorMsg);
}

function removeErrorMessages(errorMsg: HTMLElement) {
  const input = errorMsg.previousElementSibling as HTMLInputElement;
  if (input) {
    input.addEventListener('focus', () => {
      errorMsg.remove();
    })
  } else {
    const form = document.querySelector('.form');
    form?.addEventListener('submit', () => { errorMsg.remove() })
  }
}