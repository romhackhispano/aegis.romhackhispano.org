// http://www.html5rocks.com/en/tutorials/file/dndfiles/
// http://fileformats.archiveteam.org/wiki/IPS_(binary_patch_format)
function downloadFile(url, done) {
    var request = new XMLHttpRequest();
    request.responseType = 'arraybuffer';
    console.log('request');
    request.onload = function () {
        console.log('load');
        done(new Uint8Array(request.response));
    };
    request.onerror = function () {
        console.log('error');
    };
    request.open('GET', url);
    request.send();
}
var crc32 = function () {
    var crcTable = {};
    var makeCRCTable = function () {
        var c;
        var crcTable = [];
        for (var n = 0; n < 256; n++) {
            c = n;
            for (var k = 0; k < 8; k++) {
                c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
            }
            crcTable[n] = c;
        }
        return crcTable;
    };
    return function (data) {
        var crcTable = crcTable || (crcTable = makeCRCTable());
        var crc = 0 ^ (-1);
        for (var i = 0; i < data.length; i++) {
            crc = (crc >>> 8) ^ crcTable[(crc ^ data[i]) & 0xFF];
        }
        return (crc ^ (-1)) >>> 0;
    };
}();
function readFile(file, done) {
    var reader = new FileReader();
    reader.onload = function (e) {
        //console.log(e);
        done(new Uint8Array(e.target.result));
    };
    reader.onerror = function (e) {
        console.error(e);
    };
    reader.readAsArrayBuffer(file);
}
function applyPatch(originalData, patchData) {
    var patchedData = originalData.slice();
    var pos = 0;
    var EOF = 0x454F46; // EOF characters
    function available() { return patchData.length - pos; }
    function readBytes(count) {
        var out = patchData.subarray(pos, pos + count);
        pos += count;
        return out;
    }
    function readString(count) { return String.fromCharCode.apply(null, readBytes(count)); }
    function readU24_be() { return (patchData[pos++] << 16) | (patchData[pos++] << 8) | (patchData[pos++] << 0); }
    function readU16_be() { return (patchData[pos++] << 8) | (patchData[pos++] << 0); }
    function readU8() { return (patchData[pos++]); }
    if (readString(5) != 'PATCH')
        throw 'Invalid patch data (MAGIC)';
    while (available() > 0) {
        var offset = readU24_be();
        if (offset == EOF) {
            if (available() > 0) {
                var truncatedLength = readU24_be();
                patchedData = patchedData.subarray(0, truncatedLength);
            }
            break;
        }
        if (offset > originalData.length)
            throw 'Invalid patch data (invalid offset : ' + offset + ' > ' + originalData.length + ')';
        var len = readU16_be();
        // RLE
        if (len == 0) {
            var len = readU16_be();
            var byte = readU8();
            patchedData.fill(byte, offset, offset + len);
        }
        else {
            var patch = readBytes(len);
            //console.log('chunk', offset, len, patch);
            patchedData.subarray(offset, offset + len).set(patch);
        }
    }
    return patchedData;
}
function generateDownload(data, name, type) {
    if (type === void 0) { type = 'application/octet-stream'; }
    var a = document.createElement("a");
    var file = new Blob([data], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}
function registerPatching(input, patchUrl, generateName, workingCrcs) {
    if (workingCrcs === void 0) { workingCrcs = []; }
    input.addEventListener('change', function (e) {
        var file = input.files[0];
        readFile(file, function (originalData) {
            var hash = crc32(originalData);
            if (workingCrcs.indexOf(hash) < 0) {
                alert('Unsupported CRC!');
            }
            else {
                downloadFile(patchUrl, function (patchData) {
                    console.log('patching!');
                    var patchedData = applyPatch(originalData, patchData);
                    console.log('patched!');
                    generateDownload(patchedData, generateName, 'application/octet-stream');
                    //console.log(patchData);
                });
            }
        });
    }, false);
}
/*
IPS (binary patch format)
File Format
Name	IPS (binary patch format)
Ontology
Electronic File Formats
Archiving
IPS (binary patch format)
Extension(s)	.ips
Released	≤ 1993
IPS is a simple format for binary file patches, popular in the ROM hacking community. "IPS" allegedly stands for "International Patching System". The original author of the format is unknown.
Structure

An IPS file starts with the magic number "PATCH" (50 41 54 43 48), followed by a series of hunks and an end-of-file marker "EOF" (45 4f 46). All numerical values are unsigned and stored big-endian.
Regular hunks consist of a three-byte offset followed by a two-byte length of the payload and the payload itself. Applying the hunk is done by writing the payload at the specified offset.
RLE hunks have their length field set to zero; in place of a payload there is a two-byte length of the run followed by a single byte indicating the value to be written. Applying the RLE hunk is done by writing this byte the specified number of times at the specified offset.
As an extension, the end-of-file marker may be followed by a three-byte length to which the resulting file should be truncated. Not every patching program will implement this extension, however.
Limitations and pitfalls

Due to its simplicity, the IPS format suffers from a number of problems:
Programs generating IPS files should avoid generating hunks with offset 0x454f46, as the byte encoding of this offset may be misinterpreted as the end-of-file marker. (One way to do it is to generate them with offset 0x454f45 and include the preceding byte.)
IPS patches are not reversible, unlike e.g. unified diffs: one cannot recover an unpatched binary from a patch file and a patched binary.
There are no integrity checks built into the IPS format. The responsibility to ensure that the patch is not corrupted, that the correct file is patched, and that the result of patching is valid falls upon the user.
The IPS format is next to impossible to extend in a backwards-compatible way; extending the format risks introducing misinterpretations which are often not even detectable by the patching software (given the above).
IPS patches cannot affect bytes beyond offset 16842750 (0x100fffe = 0xffffff + 0xffff); the IPS patch format may be therefore inadequate for files larger than 16 MiB.
External links

Format description at ROM Hack City
*/ 
