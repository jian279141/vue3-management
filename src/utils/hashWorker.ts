import SparkMD5 from "spark-md5";
let percentage = 0;
self.onmessage = (e) => {
  const { file } = e.data;
  const spark = new SparkMD5();
  function _read(index: number) {
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file[index]);
    fileReader.onload = (e) => {
      spark.append(e.target?.result as string);
      if (index >= file.length - 1) {
        self.postMessage({
          hash: spark.end(),
          percentage: 100,
        });
      } else {
        percentage += 100 / file.length;
        self.postMessage({
          hash: "pending",
          percentage: percentage.toFixed(2),
        });
        _read(index + 1);
      }
    };
  }
  _read(0);
};
