import {LitElement, html} from 'lit-element';

export default class MyApp extends LitElement {
  static get properties() {
    return {
      name: {
        type: String
      },
      successCount: {
        type: Number
      },
      requestCount: {
        type: Number
      }
    }
  }

  constructor() {
    super();
    this.requestCount = this.successCount = 0;

  }
  connectedCallback() {
    super.connectedCallback();
    // fetch /api/foo and display
    this.loadFoo();
  }

  async loadFoo() {
    this.requestCount += 1;
    this.getElementsByClassName = 'loading...';
    try {
      const response = await fetch(`/api?mock=foo`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({a:'test',b:'foo'}),
      });
      const data = await response.json();
      this.successCount += 1;
      this.name = data.name;
    } catch(e) {
      console.error('error fetching', e);
    }
    setTimeout(() => {
      this.loadBar();
    }, 10000);
  }

  async loadBar() {
    this.requestCount += 1;
    this.name = 'loading...';
    try {
      const response = await fetch(`/api?mock=bar`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({a:'test',b:'foo'}),
      });
      const data = await response.json();
      this.successCount += 1;
      this.name = data.name;
    } catch(e) {
      console.error('error fetching', e);
    }
    setTimeout(() => {
      this.loadFoo();
    }, 10000);
  }

  render() {
    return html`
      <div>Hello, ${this.name}</div>
      <div>${this.successCount} of ${this.requestCount} requests successful.</div>
      `;
  }
}

customElements.define('my-app', MyApp);
