export interface AreaConversion {
  label: string;
  value: number;
  unit: string;
}

export function convertArea(sqft: number): AreaConversion[] {
  const acres = sqft / 43560;
  const gunta = sqft / 1089;
  const cent = sqft / 435.6;
  const sqmt = sqft * 0.0929;
  const sqyd = sqft / 9;

  const round = (n: number, d = 4) => parseFloat(n.toFixed(d));

  return [
    { label: 'Square Feet', value: round(sqft, 2), unit: 'sq.ft' },
    { label: 'Acres', value: round(acres, 4), unit: 'Acres' },
    { label: 'Guntha', value: round(gunta, 3), unit: 'Guntha' },
    { label: 'Cent', value: round(cent, 3), unit: 'Cent' },
    { label: 'Square Metres', value: round(sqmt, 2), unit: 'sq.m' },
    { label: 'Square Yards', value: round(sqyd, 2), unit: 'sq.yd' },
  ];
}
