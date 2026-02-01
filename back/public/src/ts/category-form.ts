import { slugifyTitle, clientFormControls, insertErrorMessage } from './_utils';

export default class CategoryForm {
  form: HTMLFormElement;

  constructor(form: string) {
    this.form = document.getElementById(form) as HTMLFormElement;
  }

  init() {
    try {
      if (!this.form) throw new Error('Form not found, check the class in CategoryForm instantation params')

      clientFormControls(this.form);
      this.fetchForm(this.form);
      slugifyTitle("#category_name", "#category_slug");
    } catch (err) {
      console.warn(err)
    }
  }

  fetchForm(form: HTMLFormElement) {
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      try {
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries()) as Record<string, FormDataEntryValue | FormDataEntryValue[]>;
        const url = formObject.id ? `/categories/${formObject.id}` : '/categories';
        const method = formObject.id ? 'PATCH' : 'POST';

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formObject)
        })

        const result = await response.json()

        if (!response.ok) {
          const errors = result.error;

          for (const [key, value] of Object.entries(errors) as [string, string][]) {
            insertErrorMessage(key, value)
          }

          throw new Error('Please check errors above and try again')
        }

        window.alert(result.success);
        window.location.assign('/categories');
      } catch (err) {
        console.warn(err)
      }
    })
  }

  deleteCategoryFromList() {
    const deleteBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.category-list .delete-btn');

    deleteBtns.length && deleteBtns.forEach((btn: HTMLButtonElement) => {
      const id = btn.dataset.id;
      if (!id) return;

      btn.addEventListener('click', async (e) => {
        await this.deleteCategoryEvent(id);
      })
    })
  }

  async deleteCategoryEvent(id: string) {
    const shouldDelete = window.confirm('Delete this category?');
    if (!shouldDelete) return;

    const res = await fetch(`/categories/${id}`, { method: 'DELETE' });
    const payload = await res.json();

    if (payload.error) {
      window.alert(payload.error)
    } else {
      const confirmDelete = window.confirm(payload.success)
      if (confirmDelete) window.location.reload();
    }
  }
}