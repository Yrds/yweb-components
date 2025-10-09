class SnackBarElement extends HTMLElement {
  private _timeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
        .container {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #333;
          color: white;
          padding: 16px;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          pointer-events: none;
        }
        .container.show {
          opacity: 1;
          pointer-events: auto;
        }
      </style>
      <div class="container"></div>
    `;
  }

  getContainer(): Element {
    return this.shadowRoot!.querySelector('.container')!;
  }

  open(message: string, duration: number = 3000) {
    const container = this.getContainer();
    container.textContent = message;
    container.classList.add('show');

    if (this._timeout) {
      clearTimeout(this?._timeout);
    }

    this._timeout = setTimeout(() => {
      this.close();
    }, duration);
  }

  close() {
    const container = this.getContainer();
    container.classList.remove('show');
  }
}

customElements.define('y-snack-bar', SnackBarElement);
