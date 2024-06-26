export const downloadImage = (base64Data, fileName) => {
    // Convert base64 to blob
    const byteCharacters = atob(base64Data.split(',')[1]);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: 'image/png' });

    // Create a temporary URL
    const url = URL.createObjectURL(blob);

    // Create a link element, set its attributes, and click it programmatically
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || 'download.png';
    document.body.appendChild(link);
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
};
export const base64ToBlob=(base64String, contentType)=>{
    contentType = contentType || '';
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
}