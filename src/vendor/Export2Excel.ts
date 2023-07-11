import { utils, SSF, write } from 'xlsx'
import { saveAs } from 'file-saver'

type cell = {
  v: any,
  t: string,
  z?: string
}

interface ws {
  [cell_ref: string]: cell | string | Array<any>
}

class Workbook {
  SheetNames: string[] = [];
  Sheets: { [sheetName: string]: any } = {};

  constructor() {
    if (!(this instanceof Workbook)) return new Workbook();
  }
}

// 将字符串转换成ArrayBuffer
function s2ab(s: string) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

//  将日期转换成Excel使用的日期数字格式，date1904为true时，表示使用1904年为基准年，否则使用1900年为基准年 
function datenum(v: any, date1904?: any) {
  // 1462为1904年1月1日与1900年1月1日之间的天数差
  if (date1904) v += 1462;
  // epoch看作是时间戳
  var epoch = Date.parse(v);
  // 返回天数
  return (epoch - new Date(Date.UTC(1899, 11, 30)).getTime()) / (24 * 60 * 60 * 1000);
}

// 将二维数组转换成工作表
export function sheet_from_array_of_arrays(data: any) {
  // 用于存储工作表的数组
  var ws: ws = {};
  // 单元格的范围 sp: start point, ep: end point col:列 row:行
  var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
  // 遍历每个单元格 data是一个二维数组
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      // 判断单元格的范围
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      // cell: 单元格，v: value
      var cell = {
        v: data[R][C],
        t: '',
        z: ''
      };
      // 如果单元格的值为空，跳过
      if (cell.v == null) continue;
      // 生成单元格的位置
      var cell_ref = utils.encode_cell({
        c: C,
        r: R
      });
      // 判断单元格的数据类型
      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        // 日期格式
        cell.z = SSF._table[14];
        cell.v = datenum(cell.v);
      } else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = utils.encode_range(range) as string;
  return ws;
}

// th: 表头，jsonData: 数据，defaultTitle: 默认标题
export function export_json_to_excel({
  multiHeader = [],
  header,
  data,
  filename,
  merges = [],
  autoWidth = true,
  bookType = 'xlsx'
}: any) {
  filename = filename || 'excel-list'
  data = [...data]
  data.unshift(header);

  // 把表头放到数据的第一行
  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i])
  }

  var ws_name = "SheetJS";
  var wb = new Workbook()
  var ws = sheet_from_array_of_arrays(data);

  // 合并单元格
  if (merges.length > 0) {
    if (!ws['!merges']) ws['!merges'] = [];
    merges.forEach((item: any) => {
      (ws['!merges'] as any[]).push(utils.decode_range(item))
    })
  }

  // 设置列宽
  if (autoWidth) {
    // 设置worksheet每列的最大宽度
    const colWidth = data.map((row: any) => row.map((val: any) => {
      // 先判断是否为null/undefined
      if (val == null) {
        return { 'wch': 10 };
      }
      // 再判断是否为中文
      else if (val.toString().charCodeAt(0) > 255) {
        return { 'wch': val.toString().length * 2 };
      } else {
        return { 'wch': val.toString().length };
      }
    }))
    // 以第一行为初始值
    let result = colWidth[0];
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j]['wch'] < colWidth[i][j]['wch']) {
          result[j]['wch'] = colWidth[i][j]['wch'];
        }
      }
      ws['!cols'] = result;
    }
  }

  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  // 生成excel的配置项
  var wbout = write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'
  });

  // 保存excel
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), `${filename}.${bookType}`);

}

