import TomSelect from 'tom-select';
import { slugifyTitle, clientFormControls, insertErrorMessage } from './_utils';

export default class ProjectForm {
  form: HTMLFormElement;

  constructor(form: string) {
    this.form = document.getElementById(form) as HTMLFormElement;
  }

  init() {
    try {
      if (!this.form) throw new Error('Form not found, check the class in ProjectForm instantation params')

      this.categoriesSelect();

      this.fetchForm(this.form);
      clientFormControls(this.form);
      slugifyTitle("#project_title", "#project_slug");
    } catch (err) {
      console.warn(err)
    }
  }

  categoriesSelect() {
    const select = document.querySelector<HTMLSelectElement>('#project_categories');
    if (!select) return;

    new TomSelect(select, {})
  }

  fetchForm(form: HTMLFormElement) {
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      try {
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries()) as Record<string, FormDataEntryValue | FormDataEntryValue[]>;
        formObject.categories = formData.getAll('categories').filter(Boolean);
        const url = formObject.id ? `/projects/${formObject.id}` : '/projects';
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
        window.location.assign('/projects');

      } catch (err) {
        console.warn(err)
      }
    })
  }

  deleteProjectFromList() {
    const deleteBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.project-list .delete-btn');
    deleteBtns.length && deleteBtns.forEach((btn: HTMLButtonElement) => {
      const id = btn.dataset.id;
      if (!id) return;

      btn.addEventListener('click', async (e) => {
        await this.deleteProjectEvent(id);
      })
    })
  }

  async deleteProjectEvent(id: string) {
    const shouldDelete = window.confirm('Delete this project?');
    if (!shouldDelete) return;

    const res = await fetch(`/projects/${id}`, { method: 'DELETE' });
    const payload = await res.json();

    if (payload.error) {
      window.alert(payload.error)
    } else {
      const confirmDelete = window.confirm(payload.success)
      if (confirmDelete) window.location.reload();
    }
  }
}
