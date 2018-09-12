Generate config template file with suffix '.example' for current exist config file.

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
