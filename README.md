# gatsby-plugin-web-monetization

Add Web Monetization Meta Tag on your Gatsby site.

## Install

`npm install --save gatsby-plugin-web-monetization`

## How to use

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-web-monetization`,
      options: {
        paymentPointer: `YOUR_ILP_PAYMENT_POINTER`,
        excludedPaths: ['exclude', 'path'] // Optional
      }
    }
  ]
};
```

## Options

### `paymentPointer`

The Payment Pointer, you can find it in yuor ILP wallet.

### `excludedPaths`

Array of strings (or `RegExp`) that indicates the pathnames where the meta tag won't be added.
