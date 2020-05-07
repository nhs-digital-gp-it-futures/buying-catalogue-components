# buying-catalogue-components
A library of components specifically for Buying Catalogue

# Run
`npm run start`

# To locally link this library
Steps:
1. Go to buying-catalogue-library root and run `npm link`
2. Go to another app e.g. PB and run `npm link buying-catalogue-components`

# To locally unlink this library

Steps:
1. Go to the other app e.g. PB and run `npm unlink --no-save buying-catalogue-components`
2. Still in that app run `npm i`
3. Go to buying-catalogue-library root and run `npm unlink`