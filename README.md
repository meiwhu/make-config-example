[![travis-icon]][travis-link]

Generate config template file with suffix '.example' by current exist config file.

# Usage
```sh
# install as global
npm i -g make-config-example

# auto recognize file type
make-config-example -i <filename>

# set config file type specifically
make-config-example -i <filename> -t <type>

# version
make-config-example -V

# help
make-config-example -h
```

# Current Support Type
```sh
.env
.json
```

# Test
```sh
npm run test
```

[travis-icon]:https://travis-ci.org/meiwhu/make-config-example.svg?branch=master
[travis-link]:https://travis-ci.org/meiwhu/make-config-example