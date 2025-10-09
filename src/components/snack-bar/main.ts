export const SNACK_BAR_TAG = 'y-snack-bar';

class SnackBarProps {
  duration?: number = undefined;
  open: boolean = false;
}

type PropEventSource<Type> = {
    on<Key extends string & keyof Type>
        (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void;
};

class Observer<Type> {
  on<Key extends string & keyof Type>
  (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void {
    // TODO (yuri): Implement event listener registration
  }
  log(...args: any[]) {
    console.log(...args);
  }
}

function makeObserver<Type>(): Type & Observer<Type> {
  return new Observer<Type>() as Type & Observer<Type>;
};


class SnackBarElement extends HTMLElement {
  private _timeout: ReturnType<typeof setTimeout> | null = null;

  observer = makeObserver<SnackBarProps>();

  static get observedAttributes() {
    const propsKeys = Object.getOwnPropertyNames(new SnackBarProps());
    console.log('observedAttributes', propsKeys);
    return propsKeys;
  }

  constructor() {
    console.log('SnackBarElement constructor');
    super();
    //const shadowRoot = this.attachShadow({ mode: 'open' });
    this.innerHTML = `
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
      <div class="container">${this.innerHTML}</div>
    `;

    this.observer.on('openChanged', (newProps) => {
      console.log('Props changed:', newProps);
    });
  }

  getContainer(): Element {
    return this.querySelector('.container')!;
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

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    // TODO (yuri): This is not working yet
    this.observer.log('attributeChangedCallback', { name, oldValue, newValue });
  }
}

export function open(message: string, duration?: number) {
  let snackBar = document.querySelector(SNACK_BAR_TAG) as SnackBarElement | null;
  if (!snackBar) {
    snackBar = document.createElement(SNACK_BAR_TAG) as SnackBarElement;
    document.body.appendChild(snackBar);
  }
  snackBar.open(message, duration);
}

customElements.define(SNACK_BAR_TAG, SnackBarElement);
