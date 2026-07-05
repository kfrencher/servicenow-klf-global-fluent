import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['e625472b9715a110b2e1f97e6253af50'],
    table: 'ecc_agent_script_include',
    data: {
        active: 'true',
        name: 'KLF_Zip',
        script: `// @ts-nocheck
var KLF_Zip = (function (Packages) {
	var File = Packages.java.io.File;
	var FileInputStream = Packages.java.io.FileInputStream;
	var FileOutputStream = Packages.java.io.FileOutputStream;
	var IOException = Packages.java.io.IOException;
	var ZipEntry = Packages.java.util.zip.ZipEntry;
	var ZipOutputStream = Packages.java.util.zip.ZipOutputStream;
	var JavaArray = Packages.java.lang.reflect.Array;
	var Byte = Packages.java.lang.Byte;
	return {
		exec: function () {

			// Define the folder path that needs to be zipped
			var folderPath = probe.getParameter('folder_path');

			// Create a new ZipOutputStream
			var zipOut = new ZipOutputStream(new FileOutputStream(folderPath + '/' + probe.getParameter('archive_name')));

			// Recursively add all the files in the folder to the zip archive
			var folder = new File(folderPath);
			var me = this;
			folder.listFiles().forEach(function (file) {
				if (file.isFile() && file.getName().endsWith(".json")) {
					me.addToZip(folderPath, file, zipOut);
				}
			});

			// Close the ZipOutputStream
			zipOut.close();
			return 'Created zip file';
		},

		addToZip: function (basePath, file, zipOut) {
			// Create a new ZipEntry for the file
			var zipEntryName = file.getName();
			var zipEntry = new ZipEntry(zipEntryName);
			zipOut.putNextEntry(zipEntry);

			// Write the file content to the zip archive
			var fileIn = new FileInputStream(file);
			var buffer = JavaArray.newInstance(Byte.TYPE, 1024);
			var bytesRead;
			while ((bytesRead = fileIn.read(buffer)) != -1) {
				zipOut.write(buffer, 0, bytesRead);
			}
			fileIn.close();

			// Close the ZipEntry
			zipOut.closeEntry();
		}
	};
	// @ts-ignore -- this is a global variable
})( /**@types{any}*/ Packages);`,
        sys_domain: 'global',
        sys_domain_path: '/',
    },
})
