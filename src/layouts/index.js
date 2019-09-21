import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

const requireLayouts = require.context(
  // The relative path of the layouts folder
  '.',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base layouts filenames
  /[a-z]\w+\.(vue)$/,
  // Generates a lazy-loadable chunk for each import
  'lazy',
);

requireLayouts.keys().forEach((fileName) => {
  // Get name of layout
  const layoutName = upperFirst(
    camelCase(
      // Strip the leading `./` and extension from the filename
      `${fileName.replace(/^\.\/(.*)\.\w+$/, '$1')}Layout`,
    ),
  );

  // Lazy load layout
  Vue.component(
    layoutName,
    // Look for the layout options on `.default`, which will
    // exist if the layout was exported with `export default`,
    // otherwise fall back to module's root.
    () => requireLayouts(fileName),
  );
});
