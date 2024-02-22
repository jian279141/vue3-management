// 返回传入文件的 hash 值
import SparkMD5 from "spark-md5";

export default function createHash(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    const spark = new SparkMD5.ArrayBuffer();
    reader.onload = (e: any) => {
      spark.append(e.target.result);
      resolve(spark.end());
    };
    reader.readAsArrayBuffer(file);
  });
}
