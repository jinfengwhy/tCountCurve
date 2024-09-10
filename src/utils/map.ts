import { formatDateTime } from "./time";

interface MKey {
  date: string;
  sum: number;
}

interface MValue {
  time: string;
  count: number;
  remark: string;
}

interface MValueArray extends Array<MValue> {}

export function putRemark(
    count: number,
    remark: string,
    resMap: Map<MKey, MValueArray>): void {
  const dateTime = formatDateTime(new Date());
  const [date, time] = dateTime.split(" ");

  for (const [key, values] of resMap.entries()) {
    if (key.date === date) {
      key.sum += count;
      values.push({ time, count, remark });
      return;
    }
  }

  const key: MKey = { date, sum: count };
  const values: MValueArray = [{ time, count, remark }];

  resMap.set(key, values);
}
