import { BatteryCharging } from "lucide-react";

import GlassPanel from "../Panel/GlassPanel";
import AnimatedCounter from "../Counter/AnimatedCounter";
import StatusChip from "../Badge/StatusChip";

function BatteryCard({ value }) {

    const color =
        value > 60
            ? "#22C55E"
            : value > 30
            ? "#F59E0B"
            : "#EF4444";

    const status =
        value > 60
            ? {
                  variant: "success",
                  text: "Excellent"
              }
            : value > 30
            ? {
                  variant: "warning",
                  text: "Low"
              }
            : {
                  variant: "danger",
                  text: "Critical"
              };

    return (

        <GlassPanel
            glow
            className="p-5"
        >

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-xs tracking-[0.25em] uppercase text-gray-500">

                        Battery

                    </p>

                </div>

                <BatteryCharging
                    size={24}
                    color={color}
                />

            </div>

            <AnimatedCounter

                value={value}

                suffix="%"

                className="mt-5 text-5xl font-bold"

            />

            <div className="mt-5 h-2 rounded-full bg-white/10 overflow-hidden">

                <div

                    className="h-full rounded-full transition-all duration-700"

                    style={{
                        width: `${value}%`,
                        background: color
                    }}

                />

            </div>

            <div className="mt-5 flex justify-between items-center">

                <StatusChip

                    variant={status.variant}

                    text={status.text}

                />

                <span className="text-xs text-gray-500">

                    Est. 18 min

                </span>

            </div>

        </GlassPanel>

    );

}

export default BatteryCard;