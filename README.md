<p align="center">
  <img src="https://cdn.rawgit.com/alexdevero/electron-react-webpack-boilerplate/master/docs/images/electron-react-webpack-boilerplate.png" width="135" align="center">
  <br>
  <br>
</p>

## Building Management System

Electron, React, PostCSS and Webpack app.

### Table of contents

- [Install](#install)
- [Pre-Usage](#pre-usage)
- [Usage](#usage)
- [API-Endpoints] (#API-Endpoints)

### Install

#### Clone this repo

```
git clone https://github.com/sajad321/sapi-frontend.git
```

#### Install dependencies

```
npm install
```

or

```
yarn
```

### Pre-Usage

#### Make Backend Ready

First you need to have a backend of python ready to start then copy it to a folder named py_dist under the name main.exe,
Second you need to download Wix Toolset and change the environment variables of path to the bin of the Wix

### Usage

#### Run the app

```
npm run start
```

or

```
yarn start
```

#### Build the app (automatic)

```
npm run package
```

or

```
yarn package
```

#### Build the app (manual)

```
npm run build
```

or

```
yarn build
```

#### Test the app (after `npm run build` || `yarn run build`)

```
npm run prod
```

```
yarn prod
```

### API-Endpoints

GET `/main`

```
offices_number
total_revenue
yearly_revenue
total_expenses
yearly_expneses
total_money
yearly_money
```

GET `/offices`

```
id
name
date_of_receipt
date_of_claiming [every month counting]
amount
notes
```

POST `/offices`

```
name
data_of_receipt
amount
notes
```

PATCH `/offices/<id>`

```
name
data_of_receipt
amount
notes
```

GET `/expenses`

```
id
expense_number
expense_type
amount
```

POST `/expenses`

- every added expense will get the total money cut

```
expense_number
expense_type
amount
```

PATCH `/expenses/<id>`

```
expense_number
expense_type
amount
```
