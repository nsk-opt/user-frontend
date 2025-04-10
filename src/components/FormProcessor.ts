import '../../frontend/components/form.css';

import { ApiService } from "../services/ApiService";
import { FormData } from '../types/AuthFormData';

export class FormProcessor {
  private api: ApiService;
  private formContainer: HTMLDivElement;

  constructor(api: ApiService) {
    this.api = api;
    this.formContainer = document.createElement('div');
    this.formContainer.className = 'form-wrapper';
  }

  async drawRegisterForm(container: HTMLDivElement): Promise<void> {
    try {
      container.innerHTML = '';
      this.formContainer.innerHTML = '';
      
      const formElement = await this.renderRegisterForm();
      this.formContainer.appendChild(formElement);
      container.appendChild(this.formContainer);

      this.setupRegisterFormHandlers();
    } catch (error) {
      console.error('Error:', error);
      this.showError(container, 'Ошибка загрузки формы. Пожалуйста, попробуйте позже.');
    }
  }
  
  async drawLoginForm(container: HTMLDivElement): Promise<void> {
    try {
      container.innerHTML = '';
      this.formContainer.innerHTML = '';
      
      const formElement = await this.renderLoginForm();
      this.formContainer.appendChild(formElement);
      container.appendChild(this.formContainer);
      
      this.setupLoginFormHandlers();
    } catch (error) {
      console.error('Error:', error);
      this.showError(container, 'Ошибка загрузки формы. Пожалуйста, попробуйте позже.');
    }
  }

  async drawNewCategoryForm(container: HTMLDivElement): Promise<void> {
    try {
      container.innerHTML = '';
      this.formContainer.innerHTML = '';
      
      const formElement = await this.renderNewCategoryForm();
      this.formContainer.appendChild(formElement);
      container.appendChild(this.formContainer);
      

      //todo
      // this.setupLoginFormHandlers();
    } catch (error) {
      console.error('Error:', error);
      this.showError(container, 'Ошибка загрузки формы. Пожалуйста, попробуйте позже.');
    }
  }


  private async renderNewCategoryForm(): Promise<HTMLElement> {
    const form = document.createElement('div');
    form.className = 'form-container';
    
    form.innerHTML = `
      <h1 class="form-title">Создание категории</h1>
      <div id="form-error" class="error-message" style="display: none;"></div>
      <div id="form-successful" class="successful-message" style="display: none;"></div>

      
      <form id="new-category-form">
        <div class="form-group">
          <label for="title">Название</label>
          <input 
            type="text" 
            id="title" 
            required
          >
        </div>

        <button type="submit" class="submit-btn">Создать</button>
      </form>
    `;
  
    return form;
  }

  private async renderRegisterForm(): Promise<HTMLElement> {
    const form = document.createElement('div');
    form.className = 'form-container';
    
    form.innerHTML = `
      <h1 class="form-title">Регистрация</h1>
      <div id="form-error" class="error-message" style="display: none;"></div>
      <div id="form-successful" class="successful-message" style="display: none;"></div>

      
      <form id="register-form">
        <div class="form-group">
          <label for="username">Логин</label>
          <input 
            type="text" 
            id="username" 
            name="username"
            placeholder="Придумайте логин" 
            required
            minlength="3"
            maxlength="20"
          >
        </div>

        <div class="form-group">
          <label for="password">Пароль</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            placeholder="Придумайте пароль" 
            required
            minlength="6"
          >
        </div>

        <div class="form-group">
          <label for="confirm-password">Повторите пароль</label>
          <input 
            type="password" 
            id="confirm-password" 
            placeholder="Повторите пароль" 
            required
            minlength="6"
          >
        </div>

        <button type="submit" class="submit-btn">Зарегистрироваться</button>
      </form>

      <div class="login-link">
        Уже есть аккаунт? <a href="/auth/login">Войти</a>
      </div>
    `;
  
    return form;
  }

  private async renderLoginForm(): Promise<HTMLElement> {
    const form = document.createElement('div');
    form.className = 'form-container';
    
    form.innerHTML = `
      <h1 class="form-title">Авторизация</h1>
      <div id="form-error" class="error-message" style="display: none;"></div>
      <div id="form-successful" class="successful-message" style="display: none;"></div>

      
      <form id="login-form">
        <div class="form-group">
          <label for="username">Логин</label>
          <input 
            type="text" 
            id="username" 
            name="username"
            placeholder="Введите ваш логин" 
            required
            minlength="3"
            maxlength="20"
          >
        </div>

        <div class="form-group">
          <label for="password">Пароль</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            placeholder="Введите пароль" 
            required
            minlength="6"
          >
        </div>
        <button type="submit" class="submit-btn">Авторизоваться</button>
      </form>

      <div class="login-link">
        Нет аккаунта? <a href="/auth/register">Зарегистрироваться</a>
      </div>
    `;
  
    return form;
  }

  private setupLoginFormHandlers(): void {
    const form = this.formContainer.querySelector('#login-form') as HTMLFormElement;
    const errorElement = this.formContainer.querySelector('#form-error') as HTMLDivElement;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorElement.style.display = 'none';
      this.clearFormMessages();

      const formData = this.getFormData();
      
      try {
        await this.api.authUser(formData)
        this.showFormSuccessful("Успешная авторизация")
      } catch (error) {
        console.error('Registration error:', error);
        this.showFormError(this.getErrorMessage(error));
      }
    });
  }

  private setupRegisterFormHandlers(): void {
    const form = this.formContainer.querySelector('#register-form') as HTMLFormElement;
    const errorElement = this.formContainer.querySelector('#form-error') as HTMLDivElement;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorElement.style.display = 'none';
      this.clearFormMessages();

      if (!this.validateForm()) {
        this.showFormError('Пароли не совпадают');
        return;
      }

      const formData = this.getFormData();
      
      try {
        await this.api.registerUser(formData)
        this.showFormSuccessful("Успешная регистрация, перенаправление на страницу авторизации через 3 секунды..")
        setTimeout(() => window.location.href = '/auth/login', 3000);
      } catch (error) {
        console.error('Registration error:', error);
        this.showFormError(this.getErrorMessage(error));
      }
    });
  }

  private validateForm(): boolean {
    const password = (this.formContainer.querySelector('#password') as HTMLInputElement).value;
    const confirmPassword = (this.formContainer.querySelector('#confirm-password') as HTMLInputElement).value;
    
    return password === confirmPassword;
  }

  private getFormData(): FormData {
    return {
      username: (this.formContainer.querySelector('#username') as HTMLInputElement).value,
      password: (this.formContainer.querySelector('#password') as HTMLInputElement).value
    };
  }

  private showFormError(message: string): void {
    const errorElement = this.formContainer.querySelector('#form-error') as HTMLDivElement;
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }

  private showFormSuccessful(message: string): void {
    const successfulElement = this.formContainer.querySelector('#form-successful') as HTMLDivElement;
    successfulElement.textContent = message;
    successfulElement.style.display = 'block';
  }

  private clearFormMessages() {
    const errorElement = this.formContainer.querySelector('#form-error') as HTMLDivElement;
    const successfulElement = this.formContainer.querySelector('#form-successful') as HTMLDivElement;

    errorElement.textContent = "";
    successfulElement.textContent = "";

    errorElement.style.display = 'none';
    successfulElement.style.display = 'none';

  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Произошла неизвестная ошибка';
  }

  private showError(container: HTMLElement, message: string): void {
    container.innerHTML = `
      <div class="error-message">
        ${message}
      </div>
    `;
  }
}