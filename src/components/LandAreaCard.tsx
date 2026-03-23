import { Ruler } from 'lucide-react';
import { convertArea } from '../utils/areaConversion';

interface Props {
  sqft: number;
}

export default function LandAreaCard({ sqft }: Props) {
  const conversions = convertArea(sqft);

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-9 h-9 bg-[#c9a84c] rounded-xl flex items-center justify-center">
          <Ruler className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[#0a2240]">Land Area Conversions</h2>
          <p className="text-xs text-gray-500">All equivalent measurements</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {conversions.map(({ label, value, unit }) => (
          <div
            key={unit}
            className="bg-white rounded-xl p-3.5 shadow-sm border border-amber-100 text-center hover:shadow-md transition-shadow"
          >
            <p className="text-[#c9a84c] font-bold text-xl leading-none">
              {value.toLocaleString('en-IN')}
            </p>
            <p className="text-[#0a2240] font-semibold text-xs mt-1">{unit}</p>
            <p className="text-gray-400 text-[10px] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-amber-100">
        <p className="text-xs text-gray-500 text-center">
          1 Acre = 43,560 sq.ft &nbsp;•&nbsp; 1 Guntha = 1,089 sq.ft &nbsp;•&nbsp; 1 Cent = 435.6 sq.ft
        </p>
      </div>
    </div>
  );
}
