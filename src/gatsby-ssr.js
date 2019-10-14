const React = require("react");

export const onPreRenderHTML = (
  { reporter, getHeadComponents, replaceHeadComponents, pathname },
  pluginOptions
) => {
  if (process.env.NODE_ENV !== `production`) {
    reporter.warn("non production environment");
    return null;
  }

  if (!pluginOptions.paymentPointer) {
    reporter.warn(
      `Payment Pointer is not defined, add it to your gatsby-config.js file.`
    );
    return null;
  }

  if (pluginOptions.excludedPaths && pluginOptions.excludedPaths.length > 0) {
    const excludedPaths = pluginOptions.excludedPaths;
    let isExcluded = excludedPaths.filter(path => pathname.match(path)).length > 0;
  
    if (isExcluded) {
      return null;
    }
  }

  const headComponents = getHeadComponents();

  const webMonetizationTag = (
    <meta name="monetization" content={pluginOptions.paymentPointer} />
  );

  headComponents.push(webMonetizationTag);

  replaceHeadComponents(headComponents);
};
