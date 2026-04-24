interface BannerSlotProps {
  type?: 'ad' | 'ranking';
  rankingPosition?: number;
}

export function BannerSlot({ type = 'ad', rankingPosition }: BannerSlotProps) {
  return (
    <div className="h-[50px] shrink-0 bg-[#2C2C2E] flex items-center justify-center mx-4 my-1 rounded-xl border border-white/10">
      {type === 'ranking' ? (
        <span className="text-white font-bold text-lg">🏆 #{rankingPosition ?? 0}</span>
      ) : (
        <span className="text-white/40 text-sm">Banner Publicitário</span>
      )}
    </div>
  );
}
