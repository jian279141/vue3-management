import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export function export2zip(th: any, jsonData: any, textName: string, zipName: string) {
  const zip = new JSZip();
  const txt_name = textName || 'file';
  const zip_name = zipName || 'file';
  const data = jsonData;
  let txtData = `${th}\r\n`;

  data.forEach((row: any) => {
    let tempStr = '';
    tempStr = row.toString();
    txtData += `${tempStr}\r\n`;
  })

  zip.file(`${txt_name}.txt`, txtData);
  zip.generateAsync({ type: "blob" }).then((content: any) => {
    saveAs(content, `${zip_name}.zip`);
  }, () => {
    alert('导出失败');
  }
  )


}