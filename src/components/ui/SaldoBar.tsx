import { ASSETS } from '../../constants/assets';

interface SaldoBarProps {
  piggyBalance: number;
  diamondBalance: number;
}

export function SaldoBar({ piggyBalance, diamondBalance }: SaldoBarProps) {
  return (
    <div className="h-[56px] shrink-0 bg-[#2C2C2E] flex items-center justify-between px-4 border-t border-white/10">
      <div className="flex items-center gap-2">
        <img src={ASSETS.piggyBank} alt="Piggy" className="h-7 object-contain" />
        <span className="text-white font-medium text-base">{piggyBalance.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-white font-medium text-base">{diamondBalance.toFixed(2)}</span>
        <img src={ASSETS.diamond} alt="Diamonds" className="h-6 object-contain" />
      </div>
    </div>
  );
}
