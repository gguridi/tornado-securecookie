# tornado-securecookie

[![Build Status](https://travis-ci.org/gguridi/tornado-securecookie.svg?branch=master)](https://travis-ci.org/gguridi/tornado-securecookie)
[![codecov](https://codecov.io/gh/gguridi/tornado-securecookie/branch/master/graph/badge.svg)](https://codecov.io/gh/gguridi/tornado-securecookie)

This package enables the creation of signed cookies to be able to send them
to third-party services. This package is intended for testing purposes only as
the secret has to be passed as string.

The package also enables the decoding of the signed cookie to test third-party
services that might encode them for us.

## Dependencies

Dependencies are only needed to be able to test the package. In order to install
the required dependencies please type:

```bash
npm install
```

## Installation

To install this package in your project simply type:

```bash
npm install tornado-securecookie
```

## Testing

To test the package:

```bash
npm test
```
