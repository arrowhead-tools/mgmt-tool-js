#!/bin/sh

# Run script for NGINX Docker image.

write_environs_with_prefix_as_js_to() {
  PREFIX=$1
  TARGET=$2
  printf 'window.$ENV = {\n' > "${TARGET}"
  for V in $(env); do
    if [ "$V" != "${V#${PREFIX}}" ]; then
      KV=$(printf '%s' "$V" | sed -e 's@=@: "@g')
      printf '  %s",\n' "${KV}" >> "${TARGET}"
    fi
  done
  printf '};\n' >> "${TARGET}"
}

write_environs_with_prefix_as_js_to "ARROWHEAD_" "/usr/share/nginx/html/env.js"

# Start NGINX.
nginx -g "daemon off;"
