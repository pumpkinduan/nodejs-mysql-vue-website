export default {
    download(data) {
        if (!data) return;
        let url = window.URL.createObjectURL(data),
            filename = data.name,
            anchor = document.createElement("a");
        if ("download" in anchor) {
            anchor.href = url;
            anchor.download = filename;
            anchor.style.display = 'none';
            document.body.appendChild(anchor);
            anchor.click();
            URL.revokeObjectURL(anchor.href);
            document.body.removeChild(anchor);
        }
    }
}