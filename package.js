Package.describe({
  name: "ccorcos:react-ionic",
  version: "0.0.1",
  summary: "React with ionic",
  git: "https://github.com/ccorcos/",
});


Package.onUse(function(api) {
  api.use([
    "ccorcos:react"
  ], ['client', 'server']);

  api.imply([
    "ccorcos:react"
  ], ['client', 'server']);

  api.addFiles([
    "src/ionic.jsx"
  ], ['client', 'server']);

  api.imply([
    "pagebakers:ionicons"
  ], 'client');
  
  api.addFiles([
    "src/ionic.css"
  ], 'client');

  api.export("Ionic");
});