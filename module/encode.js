
// FUNCIONES BASE64 encode/decode 

// var cadena = Base64.encode('w00t');
//   var cadena = Base64.decode('dzAwdA==');
//   var cadena = Base64._utf8_encode('w00t');
//   var cadena = Base64._utf8_decode('dzAwdA==');
//
var Base64 = {
	$keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	encode : function (string) {
		var $output = "";
		var $chr1, $chr2, $chr3, $enc1, $enc2, $enc3, $enc4;
		var $i = 0;
		var $str = Base64._utf8_encode(string);
		while ($i < $str.length) {

			$chr1 = $str.charCodeAt($i++);
			$chr2 = $str.charCodeAt($i++);
			$chr3 = $str.charCodeAt($i++);

			$enc1 = $chr1 >> 2;
			$enc2 = (($chr1 & 3) << 4) | ($chr2 >> 4);
			$enc3 = (($chr2 & 15) << 2) | ($chr3 >> 6);
			$enc4 = $chr3 & 63;

			if (isNaN($chr2)) {
				$enc3 = $enc4 = 64;
			} else if (isNaN($chr3)) {
				$enc4 = 64;
			}

			$output = $output +
			this.$keyStr.charAt($enc1) + this.$keyStr.charAt($enc2) +
			this.$keyStr.charAt($enc3) + this.$keyStr.charAt($enc4);

		}

		return $output;
	},
	decode : function (string) {
		var $output = "";
		var $chr1, $chr2, $chr3;
		var $enc1, $enc2, $enc3, $enc4;
		var $i = 0;

		var $str = string.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while ($i < $str.length) {

			$enc1 = this.$keyStr.indexOf($str.charAt($i++));
			$enc2 = this.$keyStr.indexOf($str.charAt($i++));
			$enc3 = this.$keyStr.indexOf($str.charAt($i++));
			$enc4 = this.$keyStr.indexOf($str.charAt($i++));

			$chr1 = ($enc1 << 2) | ($enc2 >> 4);
			$chr2 = (($enc2 & 15) << 4) | ($enc3 >> 2);
			$chr3 = (($enc3 & 3) << 6) | $enc4;

			$output = $output + String.fromCharCode($chr1);

			if ($enc3 != 64) {
				$output = $output + String.fromCharCode($chr2);
			}
			if ($enc4 != 64) {
				$output = $output + String.fromCharCode($chr3);
			}

		}

		$output = Base64._utf8_decode($output);

		return $output;

	},
	_utf8_encode : function (string) {
		var $str = string.replace(/\r\n/g,"\n");
		var $utftext = "";

		for (var $n = 0; $n < $str.length; $n++) {

			var $c = $str.charCodeAt($n);

			if ($c < 128) {
				$utftext += String.fromCharCode($c);
			}
			else if(($c > 127) && ($c < 2048)) {
				$utftext += String.fromCharCode(($c >> 6) | 192);
				$utftext += String.fromCharCode(($c & 63) | 128);
			}
			else {
				$utftext += String.fromCharCode(($c >> 12) | 224);
				$utftext += String.fromCharCode((($c >> 6) & 63) | 128);
				$utftext += String.fromCharCode(($c & 63) | 128);
			}

		}

		return $utftext;
	},
	_utf8_decode : function (utftext) {
		var $str = "";
		var $i = 0;
		var $c = 0;
                var $c1 = 0;
                var $c2 = 0;

		while ( $i < utftext.length ) {

			$c = utftext.charCodeAt($i);

			if ($c < 128) {
				$str += String.fromCharCode($c);
				$i++;
			}
			else if(($c > 191) && ($c < 224)) {
				$c2 = utftext.charCodeAt($i+1);
				$str += String.fromCharCode((($c & 31) << 6) | ($c2 & 63));
				$i += 2;
			}
			else {
				$c2 = utftext.charCodeAt($i+1);
				$c3 = utftext.charCodeAt($i+2);
				$str += String.fromCharCode((($c & 15) << 12) | (($c2 & 63) << 6) | ($c3 & 63));
				$i += 3;
			}

		}

		return $str;
	}

};