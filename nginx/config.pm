# Perl NGINX endpoint handler. Takes all environment variable exposed via the
# `nginx.conf` file, bundles these into a JSON object, and returns those to the
# requesting client.

package config;

use nginx;

sub handler {
    my $r = shift;

    if ($r->request_method ne "GET") {
        return DECLINED;
    }

    $r->send_http_header("application/json");

    $r->print("{");
    foreach (sort keys %ENV) {
        $r->print("\"$_\":\"$ENV{$_}\",");
    }
    $r->print("\"_\":0}");

    return OK;
}

1;
__END__