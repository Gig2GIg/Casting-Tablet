const requirePlugin = require.context(
  // The relative path of the plugins folder
  '.',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base plugin filenames
  /\.js$/,
);

requirePlugin.keys().forEach(requirePlugin);
