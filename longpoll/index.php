<?php
sleep(5);

header('Access-Control-Allow-Origin', '*');
header('Access-Control-Allow-Headers', 'X-Requested-With');
header("Content-Type: application/x-javascript; charset=utf-8");
header($_SERVER['SERVER_PROTOCOL'] . ' OK', true, 200);
print json_encode(array('success' =>true));