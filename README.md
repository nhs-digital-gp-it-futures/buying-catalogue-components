# buying-catalogue-components

A library of components specifically for Buying Catalogue

## Run

`npm run build`
`npm run start`

## Holding page

1. Edit file `app/views/holding.njk`
2. Run project, click link from root or navigate to `/holding`
3. Use a tool to save the page offline such as the `Save Page WE` chrome extension
    - Remove references to `savepage` including JS, meta and icon tags pointing to relative URLs

## To locally link this library

Steps:

1. Go to buying-catalogue-components root and run `npm link`
2. Go to another app e.g. PB and run `npm link buying-catalogue-components`

## To locally unlink this library

Steps:

1. Go to the other app e.g. PB and run `npm unlink --no-save buying-catalogue-components`
2. Still in that app run `npm i`
3. Go to buying-catalogue-components root and run `npm unlink`
