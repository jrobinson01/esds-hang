# esds-hang
Demoing an issue with es-dev-server hanging on certain timely requests

### setup
`yarn install`

`yarn start:mocks`

open https://localhost:8000?mock=foo
The app sends a request like below every 9 seconds:

```javascript
const response = await fetch(`/api?mock=foo`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({a:'test',b:'foo'}),
      });
```

observe that sometimes the third or fourth (it's kind of random) request will just hang until the browser times out.
