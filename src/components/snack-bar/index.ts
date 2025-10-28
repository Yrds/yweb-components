export const SNACK_BAR_TAG = 'y-snack-bar';
export const SNACK_CONTAINER_TAG = 'y-snack-container';

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

  getSnackContainer() {
    return document.body.querySelector(SNACK_CONTAINER_TAG)
      ?? this.createSnackContainer();
  }

  createSnackContainer() {
    const container = document.createElement(SNACK_CONTAINER_TAG);

    container.innerHTML = `
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
      <div class="content"></div>
    `;

    //container.attachShadow({ mode: 'open' });

    document.body.appendChild(container);
    return container;
  }

  constructor() {
    super();
    //const shadowRoot = this.attachShadow({ mode: 'open' });
    // TODO (yuri): I want to split this in two different components
    // - the container which will be created once (this component)
    // - the message which will be created each time open() is called (y-snack-bar-message)
    //
    // The container will handle the animation in and out
    // The message will be created and destroyed each time
  }
  getContent() {
    return this.querySelector<HTMLTemplateElement>('#snack-content');
  }

  open(duration: number = 3000) {
    const container = this.getSnackContainer();

    const content = this.getContent().content;

    container.querySelector('.content')
      //.shadowRoot
      .appendChild(content.cloneNode(true));
  }

  close() {
    const container = this.getSnackContainer();
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
  snackBar.open(duration);
}

customElements.define(SNACK_BAR_TAG, SnackBarElement);
