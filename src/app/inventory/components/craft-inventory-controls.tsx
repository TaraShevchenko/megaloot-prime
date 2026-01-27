"use client";

import Image from "next/image";
import { NumberStepper } from "shared/ui/number-stepper";
import { cn } from "shared/utils/cn";
import {
  ADD_ICONS,
  CHANGE_VALUE_ICONS,
  equipmentPartIcon,
  goldIcon,
  inventoryPanelClasses,
  useCraftCurrencyStore,
} from "modules/inventory/client";

const renderResourceControl = (
  key: string,
  icon: typeof goldIcon,
  value: number,
  onChange: (next: number) => void,
  ariaLabel: string,
) => (
  <div key={key} className="flex items-center gap-2">
    <Image
      src={icon}
      alt=""
      aria-hidden="true"
      className={cn(
        "h-6 w-6 object-contain",
        value > 0 ? "opacity-90" : "opacity-50",
      )}
    />
    <NumberStepper value={value} onChange={onChange} inputAriaLabel={ariaLabel} />
  </div>
);

export function CraftInventoryControls() {
  const gold = useCraftCurrencyStore((state) => state.gold);
  const parts = useCraftCurrencyStore((state) => state.parts);
  const addOrChangeChars = useCraftCurrencyStore(
    (state) => state.addOrChangeChars,
  );
  const changeValueChars = useCraftCurrencyStore(
    (state) => state.changeValueChars,
  );
  const setGold = useCraftCurrencyStore((state) => state.setGold);
  const setParts = useCraftCurrencyStore((state) => state.setParts);
  const setAddOrChangeChar = useCraftCurrencyStore(
    (state) => state.setAddOrChangeChar,
  );
  const setChangeValueChar = useCraftCurrencyStore(
    (state) => state.setChangeValueChar,
  );

  return (
    <div className={inventoryPanelClasses}>
      <div className="flex flex-col gap-3">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300">
          Craft
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:ml-auto">
          {renderResourceControl("gold", goldIcon, gold, setGold, "Gold")}
          {renderResourceControl(
            "parts",
            equipmentPartIcon,
            parts,
            setParts,
            "Equipment parts",
          )}
          {ADD_ICONS.map((icon, index) =>
            renderResourceControl(
              `add-${index + 1}`,
              icon,
              addOrChangeChars[index] ?? 0,
              (next) => setAddOrChangeChar(index + 1, next),
              `Add char level ${index + 1}`,
            ),
          )}
          {CHANGE_VALUE_ICONS.map((icon, index) =>
            renderResourceControl(
              `change-value-${index + 1}`,
              icon,
              changeValueChars[index] ?? 0,
              (next) => setChangeValueChar(index + 1, next),
              `Change value char level ${index + 1}`,
            ),
          )}
        </div>
      </div>
    </div>
  );
}
