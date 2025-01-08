import { Input } from "@/components/ui/input"

interface FilterProps {
  onYearChange: (range: { start: string; end: string }) => void
  onRevenueChange: (range: { min: string; max: string }) => void
  onNetIncomeChange: (range: { min: string; max: string }) => void
  yearBounds: { min: number; max: number }
  revenueBounds: { min: number; max: number }
  netIncomeBounds: { min: number; max: number }
}

export function DataFilters({
  onYearChange,
  onRevenueChange,
  onNetIncomeChange,
  yearBounds,
  revenueBounds,
  netIncomeBounds
}: FilterProps) {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Year Range</h3>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Start Year"
            min={yearBounds.min}
            max={yearBounds.max}
            onChange={(e) => onYearChange({ start: e.target.value, end: "" })}
          />
          <Input
            type="number"
            placeholder="End Year"
            min={yearBounds.min}
            max={yearBounds.max}
            onChange={(e) => onYearChange({ start: "", end: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Revenue Range (Billions)</h3>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            min={revenueBounds.min}
            max={revenueBounds.max}
            step="0.1"
            onChange={(e) => onRevenueChange({ min: e.target.value, max: "" })}
          />
          <Input
            type="number"
            placeholder="Max"
            min={revenueBounds.min}
            max={revenueBounds.max}
            step="0.1"
            onChange={(e) => onRevenueChange({ min: "", max: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Net Income Range (Billions)</h3>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            min={netIncomeBounds.min}
            max={netIncomeBounds.max}
            step="0.1"
            onChange={(e) => onNetIncomeChange({ min: e.target.value, max: "" })}
          />
          <Input
            type="number"
            placeholder="Max"
            min={netIncomeBounds.min}
            max={netIncomeBounds.max}
            step="0.1"
            onChange={(e) => onNetIncomeChange({ min: "", max: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
} 