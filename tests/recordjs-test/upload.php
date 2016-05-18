<?php

function bytesToSize1024($bytes, $precision = 2) {
    $unit = array('B','KB','MB');
    return @round($bytes / pow(1024, ($i = floor(log($bytes, 1024)))), $precision).' '.$unit[$i];
}

print_r($_POST);
print_r($_FILES);

$sFileName = $_FILES['data']['name'];
$sFileType = $_FILES['data']['type'];
$sFileSize = bytesToSize1024($_FILES['data']['size'], 1);
//echo $_FILES['image_file']['tmp_name'];
if (move_uploaded_file($_FILES['data']['tmp_name'], "uploads/".$_FILES['data']['name'].".wav")) {
	//$cmd = "ffmpeg/ffmpeg -y -i uploads/" . $_FILES['image_file']['name'] . " test.wav";
	//exec($cmd);
}
echo <<<EOF
<p>Your file: {$sFileName} has been successsfully received.</p>
<p>Type: {$sFileType}</p>
<p>Size: {$sFileSize}</p>
<p>You can play back the audio <a href="wave_form.php">here</a></p>
EOF;
?>