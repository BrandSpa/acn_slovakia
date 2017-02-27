<?php
echo exec("curl -O 'http://www.kokkonen.net/tjko/src/jpegoptim-1.4.4.tar.gz'");
echo exec("tar xvjf jpegoptim-1.4.4.tar.gz");
echo exec("cd jpegoptim-1.4.4 && ./configure && make && make strip && make install");
echo exec("rm -R jpegoptim-1.4.4 && jpegoptim-1.4.4.tar.gz");
