# XRemote Web

XRemote Web is a web app for streaming your Xbox One/Series on your browser.

## Develop

Once you cloned the project, install node dependencies:

```
npm install
```

**Optional**: The project heavily rely on [`@yowari/xremote`](https://www.npmjs.com/package/@yowari/xremote) package.
If you need to develop the web app and adapt the package you can clone the source library and link it to the web app:

```
cd ..
git clone https://github.com/yowari/xremote-js.git
cd xremote-js
npm install
npm build -- --watch
npm link
cd ../xremote-web
npm link @yowari/xremote
```

In the project directory, you can run:

```
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

You can also run the automated tests using:

```
npm test
```

### Auth

It can be painful to develop with live reload and loose the auth token every time the page reloads.
To get a better developper experience, you need to edit `src/providers/client-provider/client-provider.tsx`
and hard code the token:

```typescript
function ClientProvider({ children }: ClientProviderProps): JSX.Element {
  const client = useRef(new XRemoteClient());
  client.current.gstoken = 'my-gstoken'; // add this line
  ...
```

Do not forget to remove it when pushing your code.
