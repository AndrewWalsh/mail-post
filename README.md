# mail-post

[![Build Status][travis-image]][travis-url]
[![Appveyor Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coverage-image]][coverage-url]

Send bulk email campaigns easily using Electron & Serverless.

### Download

[![Apple](/docs/images/apple.png)](https://github.com/AndrewGHC/mail-post/releases)
[![Windows](/docs/images/windows.png)](https://github.com/AndrewGHC/mail-post/releases)
[![Linux](/docs/images/linux.png)](https://github.com/AndrewGHC/mail-post/releases)

[travis-image]: https://travis-ci.org/AndrewGHC/mail-post.svg?branch=master
[travis-url]: https://travis-ci.org/AndrewGHC/mail-post

[appveyor-image]: https://ci.appveyor.com/api/projects/status/github/AndrewGHC/mail-post?svg=true
[appveyor-url]: https://ci.appveyor.com/project/AndrewGHC/mail-post/branch/master

[coverage-image]: https://coveralls.io/repos/github/AndrewGHC/mail-post/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/AndrewGHC/mail-post?branch=master

### Development

```
git clone https://github.com/AndrewGHC/mail-post.git
cd mail-post
yarn
```

Following this, you will have the ability to run key scripts:

`npm run package`: Package the application to ./release (os specific).

`npm run dev`: Run the application in dev mode.

`npm run start`: Run the application in production mode, without packaging.

Helper scripts:

`npm run create-db`: Create local sqlite dbs (only the production db is used in the package).
